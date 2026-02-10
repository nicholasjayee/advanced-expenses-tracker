import { GoogleGenAI } from "@google/genai";
import { Transaction, Asset, Liability } from "../types.ts";
import { ExpenseCategory } from "../pages/Expenses/types/index.ts";

const apiKey = process.env.API_KEY || ''; // Ensure API key is available

// Initialize GenAI client only when needed to avoid early initialization issues
const getAiClient = () => new GoogleGenAI({ apiKey });

export const getFinancialAdvice = async (
  context: {
    expenses: Transaction[];
    assets: Asset[];
    liabilities: Liability[];
  },
  query: string
): Promise<string> => {
  if (!apiKey) return "API Key not configured. Unable to generate insights.";

  try {
    const ai = getAiClient();
    const prompt = `
      You are an expert financial advisor. Analyze the following financial data JSON and answer the user's query briefly and professionally.
      
      Data:
      ${JSON.stringify(context, null, 2)}
      
      User Query: "${query}"
      
      Keep the advice actionable, concise, and professional. Return plain text only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate advice at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the financial advisor AI.";
  }
};

export const categorizeTransaction = async (description: string): Promise<string> => {
  if (!apiKey) return "Uncategorized";

  const categories = Object.values(ExpenseCategory).join(', ');

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Categorize this transaction description into exactly one of these categories: [${categories}]. 
      If it fits 'Electricity' or power bills, use 'Electricity'. 
      If it is rent or mortgage, use 'Rent' or 'Liability Payment'. 
      If it is a gift, use 'Gift'. 
      If money was lost or stolen, use 'Lost Money'.
      Return ONLY the category name. Description: "${description}"`,
    });
    return response.text?.trim() || "Other";
  } catch (error) {
    return "Other";
  }
};
