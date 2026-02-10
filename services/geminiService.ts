import { GoogleGenAI } from "@google/genai";
import { Transaction, Asset, Liability } from "../types.ts";
import { ExpenseCategory } from "../pages/Expenses/types/index.ts";

const apiKey = process.env.API_KEY || ''; // Ensure API key is available

// Initialize GenAI client only when needed to avoid early initialization issues
const getAiClient = () => new GoogleGenAI({ apiKey });

export const getFinancialAdvice = async (
  context: any,
  query: string
): Promise<string> => {
  if (!apiKey) return "API Key not configured. Unable to generate insights.";

  try {
    const ai = getAiClient();
    
    // Construct a context-aware prompt
    const prompt = `
      You are an expert financial advisor and portfolio manager. 
      Analyze the following financial data provided in JSON format.
      
      Data Context:
      ${JSON.stringify(context, null, 2)}
      
      User Request: "${query}"
      
      Guidelines:
      1. Be specific and actionable.
      2. If analyzing investments, comment on diversification, risk exposure, and potential rebalancing.
      3. Use professional but accessible language.
      4. Format the response with clear headings or bullet points using Markdown-like spacing (no HTML).
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