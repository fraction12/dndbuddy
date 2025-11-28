import { GameContext, Character, Enemy, CombatState } from '@/types';

/**
 * Build game context for ChatGPT from current game state
 */
export function buildGameContext(
  campaignName: string,
  sessionNumber: number,
  totalSessions: number,
  characters: Character[],
  enemies: Enemy[],
  currentCombat: CombatState,
  location: string,
  recentActions: any[] = []
): GameContext {
  return {
    campaign: {
      name: campaignName,
      sessionNumber,
      totalSessions,
    },
    characters,
    enemies,
    currentCombat,
    recentActions,
    inventory: characters.flatMap(c => c.inventory),
    questLog: [], // Will be populated from database
    location,
  };
}

/**
 * Summarize combat state for context
 */
export function summarizeCombat(combat: CombatState): string {
  if (!combat.inCombat) {
    return 'Not in combat';
  }

  const currentActor = combat.turnOrder[combat.currentTurn];
  return `Round ${combat.round}, ${currentActor.name}'s turn`;
}

/**
 * Get character status summary
 */
export function getCharacterStatus(character: Character): string {
  const hpPercent = Math.round(
    (character.stats.hp.current / character.stats.hp.max) * 100
  );
  const manaPercent = Math.round(
    (character.stats.mana.current / character.stats.mana.max) * 100
  );

  let status = 'healthy';
  if (hpPercent < 30) status = 'badly wounded';
  else if (hpPercent < 60) status = 'injured';

  return `${character.characterName}: ${status}, ${manaPercent}% mana`;
}

/**
 * Prune old messages to keep context under token limit
 */
export function pruneContext(
  messages: any[],
  maxMessages: number = 20
): any[] {
  if (messages.length <= maxMessages) {
    return messages;
  }

  // Keep system message and recent messages
  const systemMessage = messages.find(m => m.role === 'system');
  const recentMessages = messages.slice(-maxMessages);

  return systemMessage
    ? [systemMessage, ...recentMessages.filter(m => m.role !== 'system')]
    : recentMessages;
}
