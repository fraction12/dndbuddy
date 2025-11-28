import NarrationPanel from '@/components/dm/NarrationPanel';
import { GameContext } from '@/types';

// Sample game context for testing
const sampleGameContext: GameContext = {
  campaign: {
    name: 'Epic Quest',
    sessionNumber: 1,
    totalSessions: 5,
  },
  characters: [
    {
      id: 'char-1',
      campaignId: 'camp-1',
      playerName: 'A',
      characterName: 'Lira',
      characterType: 'Fairy',
      stats: {
        hp: { current: 18, max: 18 },
        mana: { current: 24, max: 24 },
        armor: 10,
        speed: 'Fast',
      },
      skills: [],
      inventory: [],
      xp: 30,
      gold: 3,
      level: 1,
    },
    {
      id: 'char-2',
      campaignId: 'camp-1',
      playerName: 'B',
      characterName: 'Rorek',
      characterType: 'Rune Knight Fighter',
      stats: {
        hp: { current: 32, max: 32 },
        mana: { current: 8, max: 8 },
        armor: 17,
        speed: 'Medium',
      },
      skills: [],
      inventory: [],
      xp: 30,
      gold: 0,
      level: 1,
    },
    {
      id: 'char-3',
      campaignId: 'camp-1',
      playerName: 'P',
      characterName: 'Elliathel',
      characterType: 'Elf Ranger',
      stats: {
        hp: { current: 22, max: 24 },
        mana: { current: 10, max: 10 },
        armor: 14,
        speed: 'Fast',
      },
      skills: [],
      inventory: [],
      xp: 30,
      gold: 3,
      level: 1,
    },
    {
      id: 'char-4',
      campaignId: 'camp-1',
      playerName: 'D',
      characterName: 'Veyrath',
      characterType: 'Dark High Mage',
      stats: {
        hp: { current: 20, max: 20 },
        mana: { current: 28, max: 28 },
        armor: 12,
        speed: 'Medium',
      },
      skills: [],
      inventory: [],
      xp: 30,
      gold: 12,
      level: 1,
    },
  ],
  enemies: [],
  currentCombat: {
    inCombat: false,
    turnOrder: [],
    currentTurn: 0,
    round: 0,
  },
  recentActions: [],
  inventory: [],
  questLog: [],
  location: 'Brightwick Town',
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-fantasy-darkBrown via-fantasy-brown to-fantasy-darkBrown p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-fantasy-parchment mb-2">
            🎲 DM Narration Demo
          </h1>
          <p className="text-fantasy-parchment/80">
            Test the AI Dungeon Master narration system
          </p>
        </div>

        {/* Character Summary */}
        <div className="fantasy-border parchment-bg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Party</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {sampleGameContext.characters.map((char) => (
              <div
                key={char.id}
                className="border-2 border-fantasy-brown rounded p-3"
              >
                <h3 className="font-bold">{char.characterName}</h3>
                <p className="text-sm text-gray-600">{char.characterType}</p>
                <div className="mt-2 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>HP:</span>
                    <span className="font-bold">
                      {char.stats.hp.current}/{char.stats.hp.max}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mana:</span>
                    <span className="font-bold">
                      {char.stats.mana.current}/{char.stats.mana.max}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DM Narration Panel */}
        <NarrationPanel gameContext={sampleGameContext} />

        {/* Instructions */}
        <div className="mt-8 fantasy-border parchment-bg p-4">
          <h3 className="font-bold mb-2">🎯 Try These Actions:</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>I explore the town square</li>
            <li>I talk to the Mayor</li>
            <li>I search for the East Storage Barn</li>
            <li>I prepare for battle</li>
            <li>I use my special ability</li>
          </ul>
          <p className="mt-3 text-xs text-gray-600">
            💡 <strong>Note:</strong> Make sure you've added your OpenAI API key to{' '}
            <code>.env.local</code> for this to work!
          </p>
        </div>
      </div>
    </main>
  );
}
