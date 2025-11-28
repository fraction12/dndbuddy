import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Dice roll utilities
export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollMultipleDice(quantity: number, sides: number): number[] {
  return Array.from({ length: quantity }, () => rollDice(sides));
}

export function calculateTotal(rolls: number[], modifier: number = 0): number {
  return rolls.reduce((sum, roll) => sum + roll, 0) + modifier;
}

// HP/Mana percentage for visual displays
export function getPercentage(current: number, max: number): number {
  return Math.round((current / max) * 100);
}

// Status color based on percentage
export function getStatusColor(percentage: number): string {
  if (percentage >= 70) return "green";
  if (percentage >= 30) return "yellow";
  return "red";
}

// Format gold with comma separators
export function formatGold(amount: number): string {
  return amount.toLocaleString();
}

// Check if ability is on cooldown
export function isOnCooldown(usedThisSession: boolean, type: string): boolean {
  if (type === "once_per_session") {
    return usedThisSession;
  }
  return false;
}
