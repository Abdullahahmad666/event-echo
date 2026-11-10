import { useCallback, useEffect, useMemo, useState } from "react";
import { plannerConfig, type FloralStyle } from "@/data/plannerConfig";
import {
  budgetStatus,
  defaultPriorities,
  isExtraId,
  priceSelection,
  suggestPackage,
  type Priority,
  type Selection,
} from "@/lib/planner";

export interface PlannerState {
  eventType: string;
  budget: number;
  guests: number;
  floral: FloralStyle;
  priorities: Priority[];
  /** Ids of the add-ons switched on. */
  extras: string[];
  selection: Selection;
  /** True once the visitor has changed a tier by hand. */
  customized: boolean;
}

type Inputs = Pick<PlannerState, "eventType" | "budget" | "guests" | "floral" | "priorities" | "extras">;

const STORAGE_KEY = "ctd-budget-planner-v1";

function initialState(): PlannerState {
  const inputs: Inputs = {
    eventType: plannerConfig.eventTypes[0],
    budget: plannerConfig.budget.default,
    guests: plannerConfig.guests.default,
    floral: "mix",
    priorities: defaultPriorities(),
    extras: [],
  };
  return { ...inputs, selection: suggestPackage(inputs), customized: false };
}

const clamp = (n: unknown, min: number, max: number, fallback: number) =>
  typeof n === "number" && Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;

/** Restores a saved session, discarding anything that no longer matches the config. */
function loadState(): PlannerState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<PlannerState>;
    const ids = plannerConfig.categories.map((c) => c.id);

    const priorities = Array.isArray(saved.priorities) ? saved.priorities : [];
    const samePriorities =
      priorities.length === ids.length && ids.every((id) => priorities.some((p) => p?.id === id));
    if (!samePriorities) return null;

    const inputs: Inputs = {
      eventType: plannerConfig.eventTypes.includes(saved.eventType ?? "") ? saved.eventType! : plannerConfig.eventTypes[0],
      budget: clamp(saved.budget, plannerConfig.budget.min, plannerConfig.budget.max, plannerConfig.budget.default),
      guests: clamp(saved.guests, plannerConfig.guests.min, plannerConfig.guests.max, plannerConfig.guests.default),
      floral: saved.floral && saved.floral in plannerConfig.floralMultiplier ? saved.floral : "mix",
      priorities: priorities.map((p) => ({ id: p.id, enabled: p.enabled !== false })),
      extras: Array.isArray(saved.extras) ? [...new Set(saved.extras.filter(isExtraId))] : [],
    };

    let selection = suggestPackage(inputs);
    let customized = false;
    if (saved.customized && saved.selection) {
      const valid = plannerConfig.categories.every((c) => {
        const t = saved.selection![c.id];
        return t === undefined || t === null || (Number.isInteger(t) && t >= 0 && t < c.tiers.length);
      });
      if (valid) {
        selection = saved.selection;
        customized = true;
      }
    }
    return { ...inputs, selection, customized };
  } catch {
    return null;
  }
}

export function usePlanner() {
  const [state, setState] = useState<PlannerState>(() => loadState() ?? initialState());

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode etc.) — the planner still works, it just won't remember.
    }
  }, [state]);

  /** Changing any input re-runs the suggestion. */
  const setInputs = useCallback((patch: Partial<Inputs>) => {
    setState((s) => {
      const next = { ...s, ...patch };
      return { ...next, selection: suggestPackage(next), customized: false };
    });
  }, []);

  const setEventType = useCallback((eventType: string) => setState((s) => ({ ...s, eventType })), []);

  const setTier = useCallback((categoryId: string, tierIndex: number | null) => {
    setState((s) => ({ ...s, selection: { ...s.selection, [categoryId]: tierIndex }, customized: true }));
  }, []);

  /** Add-ons change the money left for decor, so re-suggest unless the visitor has customised tiers. */
  const toggleExtra = useCallback((id: string, on: boolean) => {
    setState((s) => {
      const extras = on ? [...new Set([...s.extras, id])] : s.extras.filter((e) => e !== id);
      const next = { ...s, extras };
      return s.customized ? next : { ...next, selection: suggestPackage(next) };
    });
  }, []);

  const resetToSuggestion = useCallback(() => {
    setState((s) => ({ ...s, selection: suggestPackage(s), customized: false }));
  }, []);

  const clear = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setState(initialState());
  }, []);

  const pkg = useMemo(
    () => priceSelection(state.selection, state.priorities, state.guests, state.floral, state.extras),
    [state.selection, state.priorities, state.guests, state.floral, state.extras],
  );
  const status = budgetStatus(pkg.low, pkg.high, state.budget);

  return { state, pkg, status, setInputs, setEventType, setTier, toggleExtra, resetToSuggestion, clear };
}
