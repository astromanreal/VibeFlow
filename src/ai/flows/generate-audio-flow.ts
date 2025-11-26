'use server';
/**
 * @fileOverview A flow for generating audio from text using a Text-to-Speech model.
 *
 * - generateAudio - A function that takes text and returns a Base64 encoded WAV audio file.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import wav from 'wav';

const GenerateAudioInputSchema = z.string();
export type GenerateAudioInput = z.infer<typeof GenerateAudioInputSchema>;

const GenerateAudioOutputSchema = z.object({
  audio: z.string().describe("A data URI of the generated WAV audio file. Format: 'data:audio/wav;base64,<encoded_data>'."),
});
export type GenerateAudioOutput = z.infer<typeof GenerateAudioOutputSchema>;

export async function generateAudio(input: GenerateAudioInput): Promise<GenerateAudioOutput> {
  return generateAudioFlow(input);
}

const generateAudioFlow = ai.defineFlow(
  {
    name: 'generateAudioFlow',
    inputSchema: GenerateAudioInputSchema,
    outputSchema: GenerateAudioOutputSchema,
  },
  async (text) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });
    if (!media) {
      throw new Error('No audio media was generated.');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavData = await toWav(audioBuffer);

    return {
      audio: 'data:audio/wav;base64,' + wavData,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: Buffer[] = [];
    writer.on('error', reject);
    writer.on('data', function (d: Buffer) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
