'use server';
/**
 * @fileOverview An AI agent that suggests Korean definitions and example sentences for an English word.
 *
 * - suggestWordDefinition - A function that handles the word definition suggestion process.
 * - SuggestWordDefinitionInput - The input type for the suggestWordDefinition function.
 * - SuggestWordDefinitionOutput - The return type for the suggestWordDefinition function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestWordDefinitionInputSchema = z.object({
  englishWord: z.string().describe('The English word for which to suggest a Korean definition and examples.'),
});
export type SuggestWordDefinitionInput = z.infer<typeof SuggestWordDefinitionInputSchema>;

const SuggestWordDefinitionOutputSchema = z.object({
  koreanDefinition: z.string().describe('A concise Korean definition for the English word.'),
  exampleSentences: z.array(z.string()).describe('An array of 2-3 example sentences using the English word, each followed by its Korean translation. Format each entry as "English sentence. (Korean translation.)"'),
});
export type SuggestWordDefinitionOutput = z.infer<typeof SuggestWordDefinitionOutputSchema>;

export async function suggestWordDefinition(input: SuggestWordDefinitionInput): Promise<SuggestWordDefinitionOutput> {
  return suggestWordDefinitionFlow(input);
}

const suggestWordDefinitionPrompt = ai.definePrompt({
  name: 'suggestWordDefinitionPrompt',
  input: { schema: SuggestWordDefinitionInputSchema },
  output: { schema: SuggestWordDefinitionOutputSchema },
  prompt: `You are an expert English-Korean dictionary and language tutor. Your task is to provide a concise Korean definition and 2-3 example sentences with Korean translations for a given English word.

Ensure your output is a JSON object matching the following schema:
{{jsonSchema output}}

English word: {{{englishWord}}}`,
});

const suggestWordDefinitionFlow = ai.defineFlow(
  {
    name: 'suggestWordDefinitionFlow',
    inputSchema: SuggestWordDefinitionInputSchema,
    outputSchema: SuggestWordDefinitionOutputSchema,
  },
  async (input) => {
    const { output } = await suggestWordDefinitionPrompt(input);
    return output!;
  }
);
