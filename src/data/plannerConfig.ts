/**
 * Budget planner configuration.
 *
 * This is the ONLY file you need to edit to change prices, packages,
 * photos or slider ranges on the Inquire page. All prices are in CAD.
 *
 * The prices below are placeholders — replace them with your real ranges.
 */

import stageClassic from "@/components/assets/hero.jpeg";
import stageStatement from "@/components/assets/walima/img14.jpg";
import stageGrand from "@/components/assets/image4.jpeg";
import entranceSimple from "@/components/assets/barat/img5.jpg";
import entranceStyled from "@/components/assets/walima/img11.jpg";
import entranceFull from "@/components/assets/image1.jpeg";
import tablesSimple from "@/components/assets/walima/img12.jpg";
import tablesGarden from "@/components/assets/image6.jpeg";
import tablesLuxe from "@/components/assets/walima/img6.jpg";
import sweetheartEssentials from "@/components/assets/barat/img7.jpg";
import sweetheartStyled from "@/components/assets/walima/img3.jpg";
import momentsBackdrop from "@/components/assets/walima/img4.jpg";
import momentsBooth from "@/components/assets/barat/img4.jpg";
import momentsInstallation from "@/components/assets/walima/img5.jpg";
import signageEssentials from "@/components/assets/mehendi/img8.jpg";
import signageSignature from "@/components/assets/walima/img6.jpg";

export type FloralStyle = "fresh" | "mix" | "faux";

export interface PlannerTier {
  name: string;
  description: string;
  image: string;
  /** Price range. For `perTable` categories this is the price of ONE table. */
  low: number;
  high: number;
}

export interface PlannerCategory {
  id: string;
  /** Short label shown above the tier name, e.g. "Main stage". */
  label: string;
  /** One line shown in the "What matters most?" list. */
  blurb: string;
  /** Cheapest tier first. */
  tiers: PlannerTier[];
  /** Price is per guest table; the number of tables comes from the guest count. */
  perTable?: boolean;
  /** Price changes with the Fresh / Mix / Faux choice. */
  floral?: boolean;
}

/** Default priority order (top = upgraded first). */
const categories: PlannerCategory[] = [
  {
    id: "stage",
    label: "Main stage",
    blurb: "The backdrop behind you, for the Nikah, Mehndi or reception",
    floral: true,
    tiers: [
      { name: "Classic", description: "Draped backdrop, two floral pillars and stage seating", image: stageClassic, low: 900, high: 1200 },
      { name: "Statement", description: "Arched panels, layered draping and lush floral work", image: stageStatement, low: 1600, high: 2100 },
      { name: "Grand", description: "Full stage build with panels, chandeliers and florals throughout", image: stageGrand, low: 2800, high: 3600 },
    ],
  },
  {
    id: "entrance",
    label: "Entrance & aisle",
    blurb: "The first thing guests see as they walk in",
    floral: true,
    tiers: [
      { name: "Simple", description: "A welcome arch or a pair of floral stands", image: entranceSimple, low: 300, high: 450 },
      { name: "Styled", description: "Entrance arch plus candles and markers down the aisle", image: entranceStyled, low: 600, high: 850 },
      { name: "Full walkway", description: "Floral entrance and a fully lined aisle", image: entranceFull, low: 1100, high: 1500 },
    ],
  },
  {
    id: "tables",
    label: "Guest tables",
    blurb: "Centrepieces every guest sees all night",
    floral: true,
    perTable: true,
    tiers: [
      { name: "Simple", description: "Floating candles and bud vases", image: tablesSimple, low: 20, high: 30 },
      { name: "Garden", description: "A medium floral arrangement with candles", image: tablesGarden, low: 40, high: 55 },
      { name: "Luxe", description: "Tall statement arrangements", image: tablesLuxe, low: 75, high: 100 },
    ],
  },
  {
    id: "sweetheart",
    label: "Sweetheart table",
    blurb: "Where the two of you sit",
    floral: true,
    tiers: [
      { name: "Essentials", description: "Draped table with a floral runner", image: sweetheartEssentials, low: 250, high: 350 },
      { name: "Styled", description: "Floral runner, backdrop panel and candles", image: sweetheartStyled, low: 500, high: 700 },
    ],
  },
  {
    id: "moments",
    label: "Statement moments",
    blurb: "Photo wall, booth or that one wow corner",
    tiers: [
      { name: "Backdrop", description: "A styled photo wall with florals", image: momentsBackdrop, low: 400, high: 550 },
      { name: "Booth", description: "Full photo booth setup with lighting", image: momentsBooth, low: 750, high: 1000 },
      { name: "Installation", description: "A floral or candle installation guests remember", image: momentsInstallation, low: 1400, high: 1900 },
    ],
  },
  {
    id: "signage",
    label: "Signage & stationery",
    blurb: "Welcome sign, seating chart and the little touches",
    tiers: [
      { name: "Essentials", description: "Welcome sign and seating chart", image: signageEssentials, low: 120, high: 180 },
      { name: "Signature", description: "Adds table numbers and a bar sign", image: signageSignature, low: 250, high: 350 },
      { name: "Every detail", description: "Adds custom menus and place cards", image: signageEssentials, low: 450, high: 600 },
    ],
  },
];

export const plannerConfig = {
  budget: { min: 1000, max: 15000, step: 250, default: 5000 },
  guests: { min: 20, max: 600, step: 10, default: 150 },
  guestsPerTable: 10,

  /** Multiplies the price of every category marked `floral: true`. */
  floralMultiplier: { fresh: 1.2, mix: 1, faux: 0.85 } satisfies Record<FloralStyle, number>,
  floralOptions: [
    { value: "fresh", label: "Fresh" },
    { value: "mix", label: "A mix" },
    { value: "faux", label: "Faux" },
  ] satisfies { value: FloralStyle; label: string }[],

  eventTypes: ["Wedding", "Nikah", "Mehndi", "Walima / Reception", "Birthday", "Corporate", "Other"],

  /**
   * Optional link to Calendly / Cal.com etc. When set, the thank-you screen
   * shows a "Choose a time for your call" button. Leave empty to hide it.
   */
  bookingUrl: "",

  categories,
};
