import { groq } from 'groq-sdk';

export default async function handler(req, res) {
  console.log('API request received:', {
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { inputText, difficulty, numberOfQs } = req.body;
  
  try {
    console.log('Creating GROQ client with API key:', process.env.VITE_GROQ_API_KEY ? 'exists' : 'missing');
    
    const groqClient = new groq({ 
      apiKey: process.env.VITE_GROQ_API_KEY 
    });

    console.log('Sending request to GROQ API...');
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

    console.log('GROQ API response received');
    const messageContent = chatCompletion?.choices?.[0]?.message?.content;

    if (messageContent) {
      console.log('Raw message content:', messageContent);
      const cleanedContent = messageContent.trim().replace(/^[^{]*/, '').replace(/[^}]*$/, '');
      console.log('Cleaned content:', cleanedContent);
      
      const parsedQuiz = JSON.parse(cleanedContent);
      console.log('Parsed quiz:', parsedQuiz);
      
      if (!parsedQuiz.quiz || !Array.isArray(parsedQuiz.quiz)) {
        throw new Error('Invalid quiz structure');
      }

      return res.status(200).json({ quiz: parsedQuiz });
    } else {
      console.log('No message content found');
      return res.status(500).json({ error: 'No valid message content found in the response.' });
    }
  } catch (error) {
    console.error('Quiz Generation Error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate quiz.',
      details: error.message,
      stack: error.stack
    });
  }
} 