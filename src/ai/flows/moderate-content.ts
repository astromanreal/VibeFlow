'use server';
/**
 * @fileOverview A flow for moderating user-generated content in support groups.
 *
 * - moderateContent - A function that checks if content is appropriate for a mental health support community.
 * - ModerateContentInput - The input type for the moderateContent function.
 * - ModerateContentOutput - The return type for the moderateContent function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ModerateContentInputSchema = z.object({
  content: z.string().describe('The user-generated text content to be moderated.'),
});
export type ModerateContentInput = z.infer<typeof ModerateContentInputSchema>;

const ModerateContentOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe(
      'Whether the content is appropriate for a supportive, non-clinical mental health community.'
    ),
  reason: z
    .string()
    .optional()
    .describe(
      'If inappropriate, the reason why. This may be shown to the user.'
    ),
  category: z.enum([
      "SAFE",
      "HATE_SPEECH",
      "SELF_HARM",
      "VIOLENCE",
      "SEXUAL_CONTENT",
      "SPAM",
      "ADVICE_GIVING",
      "OTHER"
    ]).describe("The category of violation, or SAFE if none."),
});
export type ModerateContentOutput = z.infer<typeof ModerateContentOutputSchema>;

export async function moderateContent(
  input: ModerateContentInput
): Promise<ModerateContentOutput> {
  return moderateContentFlow(input);
}

const moderateContentPrompt = ai.definePrompt({
  name: 'moderateContentPrompt',
  input: {schema: ModerateContentInputSchema},
  output: {schema: ModerateContentOutputSchema},
  prompt: `You are an AI moderator for "VibeFlow," a mental health and wellness app. Your primary role is to ensure that user-generated content within our anonymous peer Support Circles remains safe, supportive, and respectful.

Evaluate the following user message based on these strict guidelines:

1.  **No Self-Harm or Suicide-Related Content:** Immediately flag any content that discusses, encourages, or depicts self-harm or suicide.
2.  **No Hate Speech or Harassment:** Flag any form of hate speech, bullying, personal attacks, or discriminatory language.
3.  **No Graphic or Violent Content:** Flag any explicit descriptions of violence or gore.
4.  **No Unsolicited Medical or Psychiatric Advice:** Flag any messages that give specific medical or therapeutic advice (e.g., "You should take X medication," or "You need to do Y therapy"). Sharing personal experiences is okay (e.g., "I found X helpful for me"), but direct advice is not.
5.  **No Spam or Solicitation:** Flag any promotional content, spam, or external links that are not relevant to supportive discussion.
6.  **Maintain Anonymity:** Flag any message that asks for or shares personally identifiable information (names, locations, contact info).

User Message:
"{{{content}}}"

Based on your evaluation, determine if the message is appropriate. If it is not, provide a brief, user-facing reason and select the most accurate violation category. If the content is safe, set isAppropriate to true and category to "SAFE".`,
});

const moderateContentFlow = ai.defineFlow(
  {
    name: 'moderateContentFlow',
    inputSchema: ModerateContentInputSchema,
    outputSchema: ModerateContentOutputSchema,
  },
  async (input) => {
    // For very sensitive topics, we can add extra safety filtering.
    // For this example, the prompt instructions are the primary guardrail.
    const {output} = await moderateContentPrompt(input);
    return output!;
  }
);
