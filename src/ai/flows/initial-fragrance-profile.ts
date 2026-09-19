'use server';

/**
 * @fileOverview Helps a new user establish their initial fragrance preferences through a short prompt.
 *
 * - getInitialFragranceProfile - A function that guides the user through a prompt to determine fragrance preferences.
 * - InitialFragranceProfileInput - The input type for the getInitialFragranceProfile function.
 * - InitialFragranceProfileOutput - The return type for the getInitialFragranceProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InitialFragranceProfileInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
});
export type InitialFragranceProfileInput = z.infer<typeof InitialFragranceProfileInputSchema>;

const InitialFragranceProfileOutputSchema = z.object({
  preferredScentFamilies: z
    .string()
    .describe('The scent families that the user prefers.'),
  dislikedScentFamilies: z
    .string()
    .describe('The scent families that the user dislikes.'),
});
export type InitialFragranceProfileOutput = z.infer<typeof InitialFragranceProfileOutputSchema>;

export async function getInitialFragranceProfile(
  input: InitialFragranceProfileInput
): Promise<InitialFragranceProfileOutput> {
  return initialFragranceProfileFlow(input);
}

const initialFragranceProfilePrompt = ai.definePrompt({
  name: 'initialFragranceProfilePrompt',
  input: {schema: InitialFragranceProfileInputSchema},
  output: {schema: InitialFragranceProfileOutputSchema},
  prompt: `Hello, {{{userName}}}! Welcome to ScentSense. To help us personalize your fragrance recommendations, please tell us about your fragrance preferences.

        Consider the following scent families: Floral, Oriental, Woody, Fresh, Fruity, Spicy.

        Which scent families do you prefer, and which do you dislike? Please provide your answers as comma-separated lists.
        Preferred Scent Families: 
        Disliked Scent Families:`,
});

const initialFragranceProfileFlow = ai.defineFlow(
  {
    name: 'initialFragranceProfileFlow',
    inputSchema: InitialFragranceProfileInputSchema,
    outputSchema: InitialFragranceProfileOutputSchema,
  },
  async input => {
    const {output} = await initialFragranceProfilePrompt(input);
    return output!;
  }
);
