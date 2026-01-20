
import { GoogleGenAI, Type } from "@google/genai";
import { LearningPath } from "../types";

const getAIClient = () => {
  try {
    const apiKey = (window as any).process?.env?.API_KEY || process.env.API_KEY || "";
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    return null;
  }
};

/**
 * Uses Gemini to generate a structured learning curriculum.
 */
export const generateAILearningPath = async (
  goal: string, 
  level: string, 
  dailyTime: number,
  days: number,
  language: string = 'English',
  prioritizeQuality: boolean = true
): Promise<LearningPath> => {
  if (!goal.trim()) throw new Error("Goal is required");
  
  const ai = getAIClient();
  if (!ai) {
    throw new Error("API Key required for AI Curriculum Generation. Please ensure process.env.API_KEY is configured.");
  }

  const qualityInstruction = prioritizeQuality 
    ? "Select only videos with high view counts, high ratings, and positive educational feedback."
    : "Select a mix of emerging and established content.";

  const prompt = `Act as an expert educational curator and AI architect. Create a highly structured ${days}-day learning curriculum for the goal: "${goal}". 
  The student is at a ${level} level and can study for ${dailyTime} minutes per day.
  Primary Language: ${language}.
  ${qualityInstruction}
  
  Break this down into daily themes with exactly 2-3 specific video lessons per day.
  Each lesson must have a realistic YouTube videoId.
  Return a JSON object representing a LearningPath.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            goal: { type: Type.STRING },
            level: { type: Type.STRING },
            totalDays: { type: Type.NUMBER },
            dailyMinutes: { type: Type.NUMBER },
            curriculum: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  theme: { type: Type.STRING },
                  lessons: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        videoId: { type: Type.STRING },
                        duration: { type: Type.NUMBER },
                        type: { type: Type.STRING }
                      },
                      required: ["id", "title", "videoId", "duration", "type"]
                    }
                  }
                },
                required: ["day", "theme", "lessons"]
              }
            }
          },
          required: ["id", "goal", "level", "totalDays", "dailyMinutes", "curriculum"]
        }
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return {
      ...data,
      createdAt: new Date().toISOString()
    } as LearningPath;
  } catch (error) {
    console.error("Critical Failure in AI Path Generation:", error);
    return {
      id: "fallback_" + Date.now(),
      goal,
      level,
      totalDays: days,
      dailyMinutes: dailyTime,
      createdAt: new Date().toISOString(),
      curriculum: [
        {
          day: 1,
          theme: "Introduction to " + goal,
          lessons: [
            { id: "f1", title: "Mastering the Fundamentals", videoId: "v1", duration: 15, type: "theory", completed: false },
            { id: "f2", title: "First Hands-on Project", videoId: "v7", duration: 25, type: "practical", completed: false }
          ]
        }
      ]
    } as LearningPath;
  }
};
