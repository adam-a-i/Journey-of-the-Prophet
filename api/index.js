import { groq } from 'groq-sdk';

export default async function handler(req, res) {
  // Add CORS headers - allow both production and preview URLs
  const allowedOrigins = [
    'https://journeyoftheprophet.vercel.app',
    'https://journeyoftheprophet-a5eva8qky-admas-projects-46edb5cc.vercel.app'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { inputText, difficulty, numberOfQs } = req.body;
  
  try {
    const groqClient = new groq({ 
      apiKey: process.env.VITE_GROQ_API_KEY 
    });

    const chatCompletion = await groqClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a JSON-only API endpoint. You must output syntactically valid JSON matching this schema:
{
  "type": "object",
  "required": ["quiz"],
  "properties": {
    "quiz": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["question", "options", "correct_answer", "explanation"],
        "properties": {
          "question": { "type": "string" },
          "options": { "type": "array", "items": { "type": "string" }, "minItems": 4, "maxItems": 4 },
          "correct_answer": { "type": "string" },
          "explanation": { "type": "string" }
        }
      },
      "minItems": ${numberOfQs},
      "maxItems": ${numberOfQs}
    }
  }
}`
        },
        {
          role: 'user',
          content: `INPUT_TEXT=${inputText}\nDIFFICULTY=${difficulty}\nOUTPUT_FORMAT=JSON\nNUM_QUESTIONS=${numberOfQs}`
        }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.3,
      max_tokens: 1024,
      top_p: 1,
    });

    const messageContent = chatCompletion?.choices?.[0]?.message?.content;

    if (messageContent) {
      const cleanedContent = messageContent.trim().replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      const parsedQuiz = JSON.parse(cleanedContent);
      
      if (!parsedQuiz.quiz || !Array.isArray(parsedQuiz.quiz)) {
        throw new Error('Invalid quiz structure');
      }

      return res.status(200).json({ quiz: parsedQuiz });
    } else {
      return res.status(500).json({ error: 'No valid message content found in the response.' });
    }
  } catch (error) {
    console.error('Quiz Generation Error:', error);
    return res.status(500).json({ error: 'Failed to generate quiz.' });
  }
} 