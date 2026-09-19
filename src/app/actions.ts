"use server";

import { recommendFragrance } from "@/ai/flows/fragrance-recommendation";
import { zaraFragrances } from "@/lib/data";
import type { Fragrance } from "@/lib/types";
import { z } from "zod";

const FragranceArraySchema = z.array(z.string());

export async function getRecommendations(
  preferredNotes: string[]
): Promise<Fragrance[]> {
  if (preferredNotes.length === 0) {
    return [];
  }
  
  // Convert preferred notes to lowercase for case-insensitive comparison
  const lowercasedPreferredNotes = preferredNotes.map(note => note.toLowerCase());

  const recommendedFragrances = zaraFragrances.filter((fragrance) => {
    // Combine all notes of a fragrance into a single array and convert to lowercase
    const allNotes = [
      ...fragrance.notes.top,
      ...fragrance.notes.middle,
      ...fragrance.notes.base,
    ].map(note => note.toLowerCase());

    // Check if at least ONE of the selected preferred notes is present in the fragrance's notes
    // This implements the "one or more" logic requested by the user
    return lowercasedPreferredNotes.some(preferredNote => allNotes.includes(preferredNote));
  });

  return recommendedFragrances;
}
