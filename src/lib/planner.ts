import { plannerConfig, type FloralStyle, type PlannerCategory, type PlannerExtra } from "@/data/plannerConfig";

/** Tier index per category id; `null` = enabled but not included in the package. */
export type Selection = Record<string, number | null>;

export interface Priority {
  id: string;
  enabled: boolean;
}

export interface PlannerInput {
  budget: number;
  guests: number;
  floral: FloralStyle;
  /** Ordered: first = most important. */
  priorities: Priority[];
  /** Ids of the add-ons the visitor switched on. */
  extras: string[];
}

export type BudgetStatus = "within" | "slightly-over" | "over";

export interface PricedItem {
  category: PlannerCategory;
  tierIndex: number | null;
  low: number;
  high: number;
}

export interface PricedPackage {
  items: PricedItem[];
  /** Add-ons the visitor switched on, in config order. */
  extras: PlannerExtra[];
  low: number;
  high: number;
}

const categoryById = new Map(plannerConfig.categories.map((c) => [c.id, c]));

export function getCategory(id: string): PlannerCategory | undefined {
  return categoryById.get(id);
}

export function isExtraId(id: unknown): id is string {
  return typeof id === "string" && plannerConfig.extras.some((e) => e.id === id);
}

export function defaultPriorities(): Priority[] {
  return plannerConfig.categories.map((c) => ({ id: c.id, enabled: true }));
}

export function tableCount(guests: number): number {
  return Math.max(1, Math.ceil(guests / plannerConfig.guestsPerTable));
}

/** Price range of one category at one tier, after guest count and floral style. */
export function tierPrice(
  category: PlannerCategory,
  tierIndex: number,
  guests: number,
  floral: FloralStyle,
): { low: number; high: number } {
  const tier = category.tiers[tierIndex];
  const qty = category.perTable ? tableCount(guests) : 1;
  const mult = category.floral ? plannerConfig.floralMultiplier[floral] : 1;
  return { low: tier.low * qty * mult, high: tier.high * qty * mult };
}

/** Totals are rounded outward to the nearest $100 so ranges read cleanly. */
const roundDown = (n: number) => Math.floor(n / 100) * 100;
const roundUp = (n: number) => Math.ceil(n / 100) * 100;

export function priceSelection(
  selection: Selection,
  priorities: Priority[],
  guests: number,
  floral: FloralStyle,
  extraIds: string[],
): PricedPackage {
  const items: PricedItem[] = [];
  const extras = plannerConfig.extras.filter((e) => extraIds.includes(e.id));
  let low = extras.reduce((sum, e) => sum + e.low, 0);
  let high = extras.reduce((sum, e) => sum + e.high, 0);

  for (const p of priorities) {
    if (!p.enabled) continue;
    const category = getCategory(p.id);
    if (!category) continue;
    const tierIndex = selection[p.id] ?? null;
    if (tierIndex === null) {
      items.push({ category, tierIndex: null, low: 0, high: 0 });
      continue;
    }
    const price = tierPrice(category, tierIndex, guests, floral);
    low += price.low;
    high += price.high;
    items.push({ category, tierIndex, ...price });
  }

  return { items, extras, low: roundDown(low), high: roundUp(high) };
}

/**
 * Builds the suggested package:
 *  1. Walk the priorities top-down and include each category at its base tier
 *     if the package's high end still fits the budget.
 *  2. Walk again top-down and upgrade each included category as far as it fits,
 *     so the top priority gets upgraded first.
 * Add-ons the visitor switched on are always counted, so decor fills what's left.
 */
export function suggestPackage(input: PlannerInput): Selection {
  const { budget, guests, floral, priorities, extras } = input;
  const selection: Selection = {};
  const enabled = priorities.filter((p) => p.enabled && getCategory(p.id));
  const fits = () => priceSelection(selection, priorities, guests, floral, extras).high <= budget;

  for (const p of enabled) {
    selection[p.id] = 0;
    if (!fits()) selection[p.id] = null;
  }

  for (const p of enabled) {
    const category = getCategory(p.id)!;
    while (selection[p.id] !== null && selection[p.id]! < category.tiers.length - 1) {
      selection[p.id] = selection[p.id]! + 1;
      if (!fits()) {
        selection[p.id] = selection[p.id]! - 1;
        break;
      }
    }
  }

  return selection;
}

/**
 * within        – the top of the range fits the budget
 * slightly-over – the middle of the range fits the budget
 * over          – otherwise
 */
export function budgetStatus(low: number, high: number, budget: number): BudgetStatus {
  if (high <= budget) return "within";
  if ((low + high) / 2 <= budget) return "slightly-over";
  return "over";
}

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

export function formatMoney(n: number): string {
  return currency.format(n);
}

export function formatRange(low: number, high: number): string {
  return `${formatMoney(low)} – ${formatMoney(high)}`;
}
