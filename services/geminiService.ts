
import { GoogleGenAI, Type } from "@google/genai";
import { Video } from "../types";

/**
 * Initializes the Gemini API client safely.
 */
const initAI = () => {
  try {
    const apiKey = (window as any).process?.env?.API_KEY || process.env.API_KEY || "";
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    return null;
  }
};

export const searchVideosAI = async (query: string): Promise<Video[]> => {
  if (!query.trim()) return [];
  const ai = initAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a list of 8 realistic fictional YouTube video results for search: "${query}". 
      Return valid JSON array. id, title, channelName, views, postedAt, duration, description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              channelName: { type: Type.STRING },
              views: { type: Type.STRING },
              postedAt: { type: Type.STRING },
              duration: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["id", "title", "channelName", "views", "postedAt", "duration", "description"]
          }
        }
      }
    });

    const text = response.text || "[]";
    const results = JSON.parse(text);
    return Array.isArray(results) ? results.map((v: any, index: number) => ({
      ...v,
      thumbnail: `https://picsum.photos/seed/${v.id || index}/600/340`,
      channelAvatar: `https://picsum.photos/seed/chan${v.id || index}/48/48`
    })) : [];
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

export const getRecommendedVideos = async (videoId: string): Promise<Video[]> => {
  if (!videoId) return [];
  const ai = initAI();
  if (!ai) return [];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 10 recommended videos related to video ID: ${videoId}. JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              channelName: { type: Type.STRING },
              views: { type: Type.STRING },
              postedAt: { type: Type.STRING },
              duration: { type: Type.STRING },
            },
            required: ["id", "title", "channelName", "views", "postedAt", "duration"]
          }
        }
      }
    });

    const text = response.text || "[]";
    const results = JSON.parse(text);
    return Array.isArray(results) ? results.map((v: any, index: number) => ({
      ...v,
      thumbnail: `https://picsum.photos/seed/rec${v.id || index}/400/225`,
      channelAvatar: `https://picsum.photos/seed/chanrec${v.id || index}/48/48`
    })) : [];
  } catch (error) {
    console.error("Gemini Recommendation Error:", error);
    return [];
  }
};
