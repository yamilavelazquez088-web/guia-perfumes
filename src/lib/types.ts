import { type ComponentType } from "react";

export type ScentFamily =
  | "Ambar / Oriental"
  | "Floral"
  | "Fougere"
  | "Cuero"
  | "Cítrica"
  | "Gourmand"
  | "Amaderada"
  | "Chipre";

export type FragranceCategory = "Mujer" | "Hombre" | "Niños & Niñas";

export type Fragrance = {
  id: number;
  name: string;
  category: FragranceCategory;
  scentFamily: ScentFamily;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  description: string;
  equivalence?: string;
  collection?: string;
};

export type ScentFamilyInfo = {
  name: ScentFamily;
  icon: ComponentType<{ className?: string }>;
  description: string;
  color: string;
};
