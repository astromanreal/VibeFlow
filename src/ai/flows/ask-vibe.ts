'use server';

/**
 * @fileOverview A flow for the Ask Vibe AI assistant, which provides guidance and support
 * on topics such as affirmations, manifestation, and maintaining a positive mindset.
 *
 * - askVibe - A function that handles user queries and returns personalized guidance.
 * - AskVibeInput - The input type for the askVibe function, representing the user's question.
 * - AskVibeOutput - The return type for the askVibe function, representing the AI's response.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AskVibeInputSchema = z.object({
  query: z.string().describe('The user\u0027s question or query for the AI Wisdom Assistant.'),
});
export type AskVibeInput = z.infer<typeof AskVibeInputSchema>;

const AskVibeOutputSchema = z.object({
  response: z.string().describe('The AI Wisdom Assistant\u0027s response to the user\u0027s query.'),
});
export type AskVibeOutput = z.infer<typeof AskVibeOutputSchema>;

export async function askVibe(input: AskVibeInput): Promise<AskVibeOutput> {
  return askVibeFlow(input);
}

const askVibePrompt = ai.definePrompt({
  name: 'askVibePrompt',
  input: {
    schema: AskVibeInputSchema,
  },
  output: {
    schema: AskVibeOutputSchema,
  },
  prompt: `You are Vibe, an AI Wisdom Assistant. Your purpose is to provide guidance and support on topics such as affirmations, manifestation, and maintaining a positive mindset.

  User query: {{{query}}}

  Response:`,
});

const askVibeFlow = ai.defineFlow(
  {
    name: 'askVibeFlow',
    inputSchema: AskVibeInputSchema,
    outputSchema: AskVibeOutputSchema,
  },
  async input => {
    const {output} = await askVibePrompt(input);
    return output!;
  }
);
