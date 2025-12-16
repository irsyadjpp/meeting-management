'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating meeting minutes from an audio recording.
 *
 * generateMeetingMinutesFromAudio - A function that takes an audio recording and generates meeting minutes.
 * GenerateMeetingMinutesFromAudioInput - The input type for the generateMeetingMinutesFromAudio function.
 * GenerateMeetingMinutesFromAudioOutput - The return type for the generateMeetingMinutesFromAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateMeetingMinutesFromAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'An audio recording of a meeting, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected grammar and punctuation
    ),
});
export type GenerateMeetingMinutesFromAudioInput = z.infer<
  typeof GenerateMeetingMinutesFromAudioInputSchema
>;

const GenerateMeetingMinutesFromAudioOutputSchema = z.object({
  meetingMinutes: z
    .string()
    .describe('The generated meeting minutes in a readable format.'),
});
export type GenerateMeetingMinutesFromAudioOutput = z.infer<
  typeof GenerateMeetingMinutesFromAudioOutputSchema
>;

export async function generateMeetingMinutesFromAudio(
  input: GenerateMeetingMinutesFromAudioInput
): Promise<GenerateMeetingMinutesFromAudioOutput> {
  return generateMeetingMinutesFromAudioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMeetingMinutesFromAudioPrompt',
  input: {schema: GenerateMeetingMinutesFromAudioInputSchema},
  output: {schema: GenerateMeetingMinutesFromAudioOutputSchema},
  prompt: `You are an AI assistant that generates meeting minutes from audio recordings.

  Analyze the provided audio recording and generate a concise yet comprehensive summary of the meeting.
  The meeting minutes should include key discussion points, decisions made, action items, and any relevant information.
  Ensure the generated minutes are well-structured and easy to understand.

  Audio Recording: {{media url=audioDataUri}}
  Meeting Minutes:`, // Added explicit instructions and Handlebars syntax for audio
});

const generateMeetingMinutesFromAudioFlow = ai.defineFlow(
  {
    name: 'generateMeetingMinutesFromAudioFlow',
    inputSchema: GenerateMeetingMinutesFromAudioInputSchema,
    outputSchema: GenerateMeetingMinutesFromAudioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

