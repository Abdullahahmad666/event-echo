/**
 * Budget planner configuration.
 *
 * This is the ONLY file you need to edit to change prices, packages,
 * photos or slider ranges on the Inquire page. All prices are in CAD.
 *
 * The prices below are placeholders — replace them with your real ranges.
 */

import stageClassic from "@/components/assets/planner/stage-classic-draped.jpeg";
import stageStatement from "@/components/assets/planner/stage-statement-gold-arches.jpeg";
import stageGrand from "@/components/assets/planner/stage-grand-gold-frames.jpeg";
import partitionFloral from "@/components/assets/walima/img14.jpg";
import entertainment from "@/components/assets/image4.jpeg";
import entranceSimple from "@/components/assets/barat/img5.jpg";
import entranceStyled from "@/components/assets/walima/img11.jpg";
import entranceGrand from "@/components/assets/planner/entrance-grand-floral.jpeg";
import aisleStyled from "@/components/assets/image1.jpeg";
import aisleFull from "@/components/assets/planner/aisle-full-walkway.jpeg";
import familySimple from "@/components/assets/planner/family-table-simple.jpeg";
import familyStyled from "@/components/assets/planner/family-table-styled.jpeg";
import familyLuxe from "@/components/assets/planner/family-table-luxe.jpeg";
import tablesSimple from "@/components/assets/walima/img12.jpg";
import tablesGarden from "@/components/assets/image6.jpeg";
import tablesLuxe from "@/components/assets/planner/centerpiece-luxe-tall.jpeg";
import sweetheartEssentials from "@/components/assets/barat/img7.jpg";
import sweetheartStyled from "@/components/assets/walima/img3.jpg";
import sweetheartLuxe from "@/components/assets/planner/sweetheart-luxe.jpeg";
import momentsBackdrop from "@/components/assets/walima/img4.jpg";
import momentsBooth from "@/components/assets/barat/img4.jpg";
import momentsInstallation from "@/components/assets/walima/img5.jpg";
import signageEssentials from "@/components/assets/mehendi/img8.jpg";
import signageSignature from "@/components/assets/walima/img6.jpg";
import signageDetails from "@/components/assets/planner/signage-table-number.jpeg";

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
    id: "family",
    label: "Family table decor",
    blurb: "The reserved tables for parents and close family",
    floral: true,
    tiers: [
      { name: "Simple", description: "Linens, a table runner and candles", image: familySimple, low: 150, high: 250 },
      { name: "Styled", description: "Floral runner, chargers and reserved signs", image: familyStyled, low: 300, high: 450 },
      { name: "Luxe", description: "Tall florals, chargers and custom linens", image: familyLuxe, low: 550, high: 750 },
    ],
  },
  {
    id: "centerpieces",
    label: "Centerpieces",
    blurb: "On every guest table, priced by your guest count",
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
    label: "Sweetheart table decor",
    blurb: "Where the two of you sit",
    floral: true,
    tiers: [
      { name: "Essentials", description: "Draped table with a floral runner", image: sweetheartEssentials, low: 250, high: 350 },
      { name: "Styled", description: "Floral runner, backdrop panel and candles", image: sweetheartStyled, low: 500, high: 700 },
      { name: "Luxe", description: "Full floral front, backdrop and candle cluster", image: sweetheartLuxe, low: 900, high: 1200 },
    ],
  },
  {
    id: "entrance",
    label: "Entrance decor",
    blurb: "The first thing guests see as they walk in",
    floral: true,
    tiers: [
      { name: "Simple", description: "A pair of floral stands or a welcome arch", image: entranceSimple, low: 250, high: 400 },
      { name: "Styled", description: "Floral arch with lanterns and candles", image: entranceStyled, low: 500, high: 700 },
      { name: "Grand", description: "A full floral entrance installation", image: entranceGrand, low: 900, high: 1300 },
    ],
  },
  {
    id: "aisle",
    label: "Aisle decor",
    blurb: "The walk down to the stage",
    floral: true,
    tiers: [
      { name: "Simple", description: "Aisle runner with candle markers", image: entranceStyled, low: 200, high: 300 },
      { name: "Styled", description: "Floral aisle stands with candles", image: aisleStyled, low: 450, high: 650 },
      { name: "Full walkway", description: "A fully lined floral aisle", image: aisleFull, low: 900, high: 1300 },
    ],
  },
  {
    id: "partition",
    label: "Nikah partition",
    blurb: "The divider between the two sides during the Nikah",
    floral: true,
    tiers: [
      { name: "Sheer drape", description: "Draped fabric panels on stands", image: momentsBackdrop, low: 250, high: 350 },
      { name: "Floral", description: "Draping with floral garlands or a jali panel", image: partitionFloral, low: 500, high: 700 },
      { name: "Statement", description: "A full floral wall partition", image: momentsInstallation, low: 900, high: 1200 },
    ],
  },
  {
    id: "signage",
    label: "Welcome sign & seating chart",
    blurb: "Greets guests and shows them to their seats",
    tiers: [
      { name: "Welcome sign", description: "A custom welcome sign on an easel", image: signageEssentials, low: 100, high: 150 },
      { name: "Sign & chart", description: "Welcome sign and guest seating chart", image: signageSignature, low: 220, high: 320 },
      { name: "Every detail", description: "Adds table numbers and reserved signs", image: signageDetails, low: 400, high: 550 },
    ],
  },
  {
    id: "extras",
    label: "Extras",
    blurb: "DJ, sparklers, dry ice and photo booth",
    tiers: [
      { name: "Photo booth", description: "Photo booth with a styled backdrop and lighting", image: momentsBooth, low: 500, high: 750 },
      { name: "Booth & effects", description: "Photo booth plus cold sparklers and dry ice for your first dance", image: momentsBackdrop, low: 1100, high: 1500 },
      { name: "Full entertainment", description: "DJ, photo booth, cold sparklers and dry ice", image: entertainment, low: 2200, high: 3000 },
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

  /** Shown on the Inquire page for people who'd rather reach out directly. */
  contact: {
    email: "decorbyconnectingthedots@gmail.com",
    phone: "+1 (905) 299-9442",
  },

  categories,
};
