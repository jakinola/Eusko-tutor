
import { GoogleGenAI, Type } from "@google/genai";
import { CorrectionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
Tu es un tuteur expert de la langue basque (Euskara Batua, dialecte d'Iparralde) pour un public de proviseurs d'établissements scolaires (niveau A1).
Ton rôle est de corriger les phrases soumises, d'expliquer les règles de grammaire simplement et de fournir des exemples professionnels liés au milieu scolaire (conseils de classe, réunions, gestion).

Règles de réponse :
1. Correction : Réécrire la phrase sans faute.
2. Explication : Expliquer la règle de grammaire de manière concise et académique (adaptée A1).
3. Focus Iparralde : Utiliser le vocabulaire du Pays Basque Nord.
4. Exemples Pro : Générer 3 exemples de phrases d'application dans un contexte scolaire.

Format de sortie : JSON pur.
`;

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    corrected: { type: Type.STRING, description: "La phrase corrigée" },
    rule: { type: Type.STRING, description: "L'explication de la règle de grammaire" },
    proExamples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          basque: { type: Type.STRING },
          french: { type: Type.STRING }
        },
        required: ["basque", "french"]
      }
    }
  },
  required: ["corrected", "rule", "proExamples"]
};

export const getCorrection = async (input: string): Promise<CorrectionResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Corrige et explique cette phrase basque : "${input}"`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: responseSchema
    }
  });

  const result = JSON.parse(response.text || '{}');
  return {
    original: input,
    corrected: result.corrected,
    rule: result.rule,
    proExamples: result.proExamples,
    timestamp: Date.now()
  };
};
