import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { messages, model, apiKey } = req.body;
    if (!apiKey || !model || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Ogiltig begäran' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OpenAI API-fel' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('API error', err);
    return res.status(500).json({ error: 'Intern serverfel' });
  }
}