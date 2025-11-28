// Core Game Types

export interface Character {
  id: string;
  campaignId: string;
  playerName: string;
  characterName: string;
  characterType: string;
  characterClass?: string;
  stats: CharacterStats;
  backstory?: string;
  appearance?: Appearance;
  skills: Skill[];
  specialAbilities?: SpecialAbility[];
  inventory: InventoryItem[];
  companions?: Companion[];
  xp: number;
  gold: number;
  level: number;
  portraitUrl?: string;
  corruptionPoints?: number;
  sessionState?: SessionState;
}

export interface CharacterStats {
  hp: { current: number; max: number };
  mana: { current: number; max: number };
  armor: number;
  speed: string;
  size?: string;
  weight?: string;
}

export interface Appearance {
  height: string;
  features: string;
  distinctiveTraits: string[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'active' | 'passive' | 'once_per_session' | 'special';
  manaCost: number;
  range?: string;
  damage?: string;
  duration?: string;
  saveDC?: number;
  attackBonus?: number;
  modifier?: number;
  usedThisSession?: boolean;
  cooldown?: number;
  effects?: Record<string, any>;
  checkRequired?: Record<string, { dice: string; dc: number }>;
}

export interface SpecialAbility {
  name: string;
  description: string;
  passive: boolean;
  bonus?: string;
  usesRemaining?: number;
  temporary?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'utility' | 'magical' | 'consumable' | 'quest_item' | 'alchemy_reagent' | 'crafting_material';
  quantity: number;
  effects?: ItemEffect[];
  equipped: boolean;
  description: string;
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  value?: number;
  imageUrl?: string;
}

export interface ItemEffect {
  type: string;
  value: string | number;
  condition?: string;
}

export interface Companion {
  id: string;
  name: string;
  type: string;
  hp: { current: number; max: number };
  armor?: number;
  speed?: string;
  abilities?: string[];
  personality?: string;
  description?: string;
}

export interface SessionState {
  turnOrder?: number;
  statusEffects: StatusEffect[];
  tempModifiers: TempModifier[];
  notesFromPlayer?: string;
}

export interface StatusEffect {
  name: string;
  description: string;
  duration: string | number;
  effect: string;
}

export interface TempModifier {
  type: string;
  value: number;
  usesRemaining?: number;
}

export interface Enemy {
  id: string;
  campaignId: string;
  name: string;
  type: string;
  stats: {
    hp: { current: number; max: number };
    armor: number;
    speed: string;
    size: string;
  };
  abilities: EnemyAbility[];
  resistances?: string[];
  vulnerabilities?: string[];
  isAlive: boolean;
  defeatedBy?: string[];
  loot?: LootItem[];
  xpReward: number;
  combatLog?: CombatAction[];
  imageUrl?: string;
}

export interface EnemyAbility {
  name: string;
  type: 'attack' | 'special';
  damage?: string;
  range?: string;
  saveDC?: number;
  effects?: string[];
  description?: string;
}

export interface LootItem {
  name: string;
  type: string;
  value?: number;
  description: string;
}

export interface CombatAction {
  turn: number;
  action: string;
  damage?: number;
  status?: string;
}

export interface Campaign {
  id: string;
  name: string;
  settings: CampaignSettings;
  progress: CampaignProgress;
  players: string[];
  location: LocationState;
  questLog: Quest[];
  enemies: EnemyTracker;
  partyInventory: PartyInventory;
  sessionHistory: SessionSummary[];
  dmContext: DMContext;
  nextSession?: NextSessionPreview;
}

export interface CampaignSettings {
  totalDuration: number;
  sessionDuration: number;
  tone: string;
  difficulty: 'Strict' | 'Narrative';
}

export interface CampaignProgress {
  currentSession: number;
  totalSessions: number;
  sessionCompleted: boolean;
}

export interface LocationState {
  current: string;
  previous?: string;
  discovered: string[];
}

export interface Quest {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'in_progress' | 'completed' | 'failed';
  objectives?: QuestObjective[];
  progress?: string;
  hint?: string;
  questHook?: string;
}

export interface QuestObjective {
  text: string;
  completed: boolean;
}

export interface EnemyTracker {
  encountered: string[];
  remaining: string[];
}

export interface PartyInventory {
  gold: number;
  sharedItems: SharedItem[];
}

export interface SharedItem {
  name: string;
  quantity: number;
  holder: string;
}

export interface SessionSummary {
  sessionNumber: number;
  duration?: string;
  summary: string;
  majorEvents: string[];
  lootGained: string[];
  xpGained: number;
  endingCliffhanger?: string;
}

export interface DMContext {
  recentNarration?: string;
  activePlotThreads: string[];
  npcRelationships: Record<string, string>;
}

export interface NextSessionPreview {
  preview: string;
  preparedElements: string[];
}

// Dice Types
export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DiceRoll {
  dieType: DieType;
  quantity: number;
  modifier: number;
  advantage?: boolean;
  disadvantage?: boolean;
  result: {
    rolls: number[];
    total: number;
    isCritical: boolean;
  };
}

// Combat Types
export interface CombatState {
  inCombat: boolean;
  turnOrder: Actor[];
  currentTurn: number;
  round: number;
}

export interface Actor {
  id: string;
  name: string;
  type: 'character' | 'enemy';
  initiative: number;
  hp: { current: number; max: number };
  statusEffects: StatusEffect[];
}

// Game Context for ChatGPT
export interface GameContext {
  campaign: {
    name: string;
    sessionNumber: number;
    totalSessions: number;
  };
  characters: Character[];
  enemies: Enemy[];
  currentCombat: CombatState;
  recentActions: Action[];
  inventory: InventoryItem[];
  questLog: Quest[];
  location: string;
  mood?: 'dangerous' | 'peaceful' | 'mysterious' | 'epic';
}

export interface Action {
  actorId: string;
  actorName: string;
  actionType: string;
  target?: string;
  roll?: DiceRoll;
  description: string;
  timestamp: Date;
}

// Image Generation Types
export interface ImageGenerationRequest {
  type: 'character' | 'scene' | 'enemy' | 'item' | 'moment';
  characterId?: string;
  sceneDescription?: string;
  enemyId?: string;
  itemId?: string;
  customPrompt?: string;
}

export interface GeneratedImage {
  id: string;
  campaignId: string;
  type: string;
  prompt: string;
  imageUrl: string;
  metadata?: Record<string, any>;
  generatedAt: Date;
}
