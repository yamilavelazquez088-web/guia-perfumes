'use server';

/**
 * @fileOverview Un agente de IA para recomendación de fragancias.
 *
 * - recommendFragrance - Una función que maneja el proceso de recomendación de fragancias.
 * - RecommendFragranceInput - El tipo de entrada para la función recommendFragrance.
 * - RecommendFragranceOutput - El tipo de retorno para la función recommendFragrance.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendFragranceInputSchema = z.object({
  preferredNotes: z
    .string()
    .describe("Las notas olfativas preferidas del usuario, como 'vainilla', 'sándalo', 'jazmín', etc. Separa múltiples notas con comas."),
  catalog: z.string().describe('El catálogo de fragancias de Zara Argentina para filtrar.'),
});
export type RecommendFragranceInput = z.infer<typeof RecommendFragranceInputSchema>;

const RecommendFragranceOutputSchema = z.object({
  recommendedFragrances: z
    .string()
    .describe('Una lista de fragancias recomendadas de Zara Argentina basadas en las notas olfativas preferidas.'),
});
export type RecommendFragranceOutput = z.infer<typeof RecommendFragranceOutputSchema>;

export async function recommendFragrance(input: RecommendFragranceInput): Promise<RecommendFragranceOutput> {
  return recommendFragranceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendFragrancePrompt',
  input: {schema: RecommendFragranceInputSchema},
  output: {schema: RecommendFragranceOutputSchema},
  prompt: `Eres un experto en fragancias especializado en recomendaciones de Zara Argentina.

Basado en las notas olfativas preferidas del usuario, recomienda 3 a 5 fragancias del catálogo de Zara Argentina.
Ten en cuenta todo el catálogo para identificar qué fragancias contienen las notas que más se ajustan al gusto del usuario, y considera lo que está disponible para la venta en Argentina.

Notas Olfativas Preferidas: {{{preferredNotes}}}
Catálogo de Zara Argentina (con sus notas): {{{catalog}}}

Devuelve solo una lista separada por comas de los nombres de las fragancias recomendadas.
Fragancias Recomendadas:`,
});

const recommendFragranceFlow = ai.defineFlow(
  {
    name: 'recommendFragranceFlow',
    inputSchema: RecommendFragranceInputSchema,
    outputSchema: RecommendFragranceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
