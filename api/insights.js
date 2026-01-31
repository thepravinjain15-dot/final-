import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const skill = String(req.query.skill || '');
  if (!skill) return res.status(400).json({ error: 'skill query param is required' });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a 2-sentence market insight for the skill "${skill}" and list 3 helpful learning URLs.`,
      config: { tools: [{ googleSearch: {} }] },
    });

    const summary = response.text || 'No insights found for this skill.';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const chunks = Array.isArray(groundingChunks) ? groundingChunks : [];
    const links = chunks
      .filter((c) => c && c.web)
      .map((c) => ({ title: c.web.title, uri: c.web.uri }))
      .slice(0, 3);

    return res.json({ summary, links });
  } catch (err) {
    console.error('Gemini insights error:', err);
    return res.status(500).json({ error: 'Failed to fetch insights from Gemini', details: String(err) });
  }
}
