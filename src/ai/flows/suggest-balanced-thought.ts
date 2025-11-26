'use server';
/**
 * @fileOverview A flow for suggesting a balanced thought based on CBT principles.
 *
 * - suggestBalancedThought - A function that suggests a reframed, balanced thought.
 * - SuggestBalancedThoughtInput - The input type for the suggestBalancedThought function.
 * - SuggestBalancedThoughtOutput - The return type for the suggestBalancedThought function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestBalancedThoughtInputSchema = z.object({
  automaticThought: z.string().describe("The user's initial automatic negative thought."),
  trigger: z.string().describe('The situation that triggered the thought.'),
  cognitiveDistortions: z.array(z.string()).describe('A list of cognitive distortions the user identified.'),
});
export type SuggestBalancedThoughtInput = z.infer<typeof SuggestBalancedThoughtInputSchema>;

const SuggestBalancedThoughtOutputSchema = z.object({
  suggestion: z.string().describe('A more balanced, realistic, and compassionate alternative thought.'),
});
export type SuggestBalancedThoughtOutput = z.infer<typeof SuggestBalancedThoughtOutputSchema>;

export async function suggestBalancedThought(input: SuggestBalancedThoughtInput): Promise<SuggestBalancedThoughtOutput> {
  return suggestBalancedThoughtFlow(input);
}

const suggestBalancedThoughtPrompt = ai.definePrompt({
  name: 'suggestBalancedThoughtPrompt',
  input: {schema: SuggestBalancedThoughtInputSchema},
  output: {schema: SuggestBalancedThoughtOutputSchema},
  prompt: `You are a compassionate and helpful CBT therapy assistant. Your goal is to help a user reframe their negative automatic thoughts into more balanced and realistic ones.

Here is the user's situation:
Situation (Trigger): {{{trigger}}}

Here is their automatic thought:
Automatic Thought: "{{{automaticThought}}}"

They have identified the following cognitive distortions at play:
{{#if cognitiveDistortions}}
{{#each cognitiveDistortions}}
- {{this}}
{{/each}}
{{else}}
- (No specific distortions identified)
{{/if}}

Based on this, provide a single, alternative, balanced thought. The suggestion should be compassionate, realistic, and avoid toxic positivity. It should gently challenge the automatic thought. Frame it as a suggestion. Return only the suggested thought in the response.`,
});

const suggestBalancedThoughtFlow = ai.defineFlow(
  {
    name: 'suggestBalancedThoughtFlow',
    inputSchema: SuggestBalancedThoughtInputSchema,
    outputSchema: SuggestBalancedThoughtOutputSchema,
  },
  async (input) => {
    const {output} = await suggestBalancedThoughtPrompt(input);
    return output!;
  }
);
