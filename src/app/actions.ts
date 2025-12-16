"use server";
import { generateMeetingMinutesFromAudio } from "@/ai/flows/generate-meeting-minutes-from-audio";

export async function handleGenerateMinutes(audioDataUri: string) {
    if (!audioDataUri) {
        return { error: "Audio data is missing." };
    }
    
    try {
        const result = await generateMeetingMinutesFromAudio({ audioDataUri });
        return { minutes: result.meetingMinutes };
    } catch (error: any) {
        console.error("AI Generation Error:", error);
        return { error: error.message || "An unexpected error occurred during AI processing." };
    }
}
