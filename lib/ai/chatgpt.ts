import OpenAI from 'openai';
import { GameContext } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Get DM narration from ChatGPT based on game context and player action
 */
export async function getDMNarration(
  gameContext: GameContext,
  playerAction: string
) {
  const systemPrompt = buildSystemPrompt(gameContext);

  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: playerAction },
    ],
    stream: true,
    temperature: 0.8, // Creative storytelling
    max_tokens: 500,
  });

  return stream;
}

/**
 * Build system prompt with game context
 */
function buildSystemPrompt(context: GameContext): string {
  const { campaign, characters, enemies, currentCombat, location } = context;

  return `You are an expert Dungeon Master running a D&D campaign.

CAMPAIGN: ${campaign.name}
Session ${campaign.sessionNumber} of ${campaign.totalSessions}

CURRENT LOCATION: ${location}

CHARACTERS:
${characters.map(c =>
  `- ${c.characterName} (${c.characterType}): HP ${c.stats.hp.current}/${c.stats.hp.max}, Mana ${c.stats.mana.current}/${c.stats.mana.max}`
).join('\n')}

${currentCombat.inCombat ? `
COMBAT STATUS:
- Round ${currentCombat.round}
- Turn: ${currentCombat.turnOrder[currentCombat.currentTurn]?.name}

ENEMIES:
${enemies.map(e =>
  `- ${e.name}: HP ${e.stats.hp.current}/${e.stats.hp.max} ${e.isAlive ? '(alive)' : '(defeated)'}`
).join('\n')}
` : ''}

RULES:
- Narrate with dramatic, immersive storytelling
- Keep responses clear for text-to-speech (avoid complex formatting)
- Apply D&D 5e rules strictly
- Request dice rolls when needed (format: "ROLL: 1d20+5 for attack")
- Describe outcomes vividly
- Stay in character as the DM

TONE: Heroic and adventurous with moments of chaotic humor

Respond as the Dungeon Master would, narrating the scene and consequences.`;
}

/**
 * Generate character portrait using DALL-E 3
 */
export async function generateCharacterPortrait(
  characterName: string,
  characterType: string,
  appearance: string
): Promise<string> {
  const prompt = `Portrait of ${characterName}, a ${characterType}. ${appearance}.
    D&D character portrait, fantasy art, digital painting, detailed, high quality,
    dramatic lighting, heroic pose.`;

  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  });

  return response.data[0].url!;
}

/**
 * Convert text to speech using OpenAI TTS
 */
export async function textToSpeech(text: string): Promise<Buffer> {
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'onyx', // Deep, dramatic voice for DM
    input: text,
    speed: 0.95, // Slightly slower for dramatic effect
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  return buffer;
}
