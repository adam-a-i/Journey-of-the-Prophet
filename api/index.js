import { groq } from 'groq-sdk';

export default async function handler(req, res) {
  console.log('API request received');

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!process.env.VITE_GROQ_API_KEY) {
    console.error('GROQ API key is missing');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'API key is missing'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { inputText, difficulty, numberOfQs } = req.body;
  
  if (!inputText || !difficulty || !numberOfQs) {
    return res.status(400).json({ 
      error: 'Missing required parameters',
      required: ['inputText', 'difficulty', 'numberOfQs'],
      received: { inputText: !!inputText, difficulty: !!difficulty, numberOfQs: !!numberOfQs }
    });
  }

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
  "quiz": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correct_answer": "string",
      "explanation": "string"
    }
  ]
}`
        },
        {
          role: 'user',
          content: `INPUT_TEXT=${inputText}\nDIFFICULTY=${difficulty}\nNUM_QUESTIONS=${numberOfQs}`
        }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.3,
      max_tokens: 1024,
      top_p: 1,
    });

    const messageContent = chatCompletion?.choices?.[0]?.message?.content;

    if (!messageContent) {
      console.error('No message content received from GROQ');
      return res.status(500).json({ error: 'Failed to generate quiz content' });
    }

    try {
      const cleanedContent = messageContent.trim().replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      const parsedQuiz = JSON.parse(cleanedContent);
      
      if (!parsedQuiz.quiz || !Array.isArray(parsedQuiz.quiz)) {
        throw new Error('Invalid quiz structure');
      }

      return res.status(200).json({ quiz: parsedQuiz });
    } catch (parseError) {
      console.error('Failed to parse GROQ response:', parseError);
      return res.status(500).json({ 
        error: 'Failed to parse quiz content',
        details: parseError.message,
        rawContent: messageContent
      });
    }
  } catch (error) {
    console.error('Quiz Generation Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate quiz',
      details: error.message
    });
  }
} 