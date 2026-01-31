import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message is required in body' });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are SkillSwap AI, a helpful mentor on a skill-exchange platform. Be concise and professional.",
        temperature: 0.7,
      },
    });

    return res.json({ reply: response.text || "I'm having a little trouble thinking." });
  } catch (err) {
    console.error('Gemini chat error:', err);
    return res.status(500).json({ error: 'Gemini API error', details: String(err) });
  }
}
