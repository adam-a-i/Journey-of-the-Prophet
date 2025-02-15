import Groq from 'groq-sdk';

export default async function handler(req, res) {
  try {
    console.log('=== API Request Started ===');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Available env vars:', Object.keys(process.env));
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);

    // Set CORS headers - allow both domains
    const allowedOrigins = [
      'https://journeyoftheprophet.vercel.app',
      'https://journeyoftheprophet-a5eva8qky-admas-projects-46edb5cc.vercel.app',
      'http://localhost:3000'
    ];
    
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS request');
      res.status(200).end();
      return;
    }

    // Check API key
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is missing from environment variables');
    }

    if (req.method !== 'POST') {
      console.log('Invalid method:', req.method);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { inputText, difficulty, numberOfQs } = req.body;
    console.log('Parsed request parameters:', { inputText, difficulty, numberOfQs });
    
    if (!inputText || !difficulty || !numberOfQs) {
      console.log('Missing parameters:', { 
        hasInputText: !!inputText, 
        hasDifficulty: !!difficulty, 
        hasNumberOfQs: !!numberOfQs 
      });
      return res.status(400).json({ 
        error: 'Missing required parameters',
        required: ['inputText', 'difficulty', 'numberOfQs'],
        received: { inputText: !!inputText, difficulty: !!difficulty, numberOfQs: !!numberOfQs }
      });
    }

    try {
      console.log('Creating GROQ client...');
      const groqClient = new Groq({ 
        apiKey: process.env.GROQ_API_KEY 
      });

      console.log('Sending request to GROQ API...');
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

      console.log('GROQ API response received');
      const messageContent = chatCompletion?.choices?.[0]?.message?.content;
      console.log('Raw message content:', messageContent);

      if (!messageContent) {
        console.error('No message content received from GROQ');
        return res.status(500).json({ error: 'Failed to generate quiz content' });
      }

      try {
        console.log('Cleaning content...');
        const cleanedContent = messageContent.trim().replace(/^[^{]*/, '').replace(/[^}]*$/, '');
        console.log('Cleaned content:', cleanedContent);

        console.log('Parsing JSON...');
        const parsedQuiz = JSON.parse(cleanedContent);
        console.log('Parsed quiz:', parsedQuiz);
        
        if (!parsedQuiz.quiz || !Array.isArray(parsedQuiz.quiz)) {
          console.error('Invalid quiz structure:', parsedQuiz);
          throw new Error('Invalid quiz structure');
        }

        console.log('Sending successful response');
        return res.status(200).json({ quiz: parsedQuiz });
      } catch (parseError) {
        console.error('Failed to parse GROQ response:', parseError);
        console.error('Parse error details:', {
          message: parseError.message,
          stack: parseError.stack
        });
        return res.status(500).json({ 
          error: 'Failed to parse quiz content',
          details: parseError.message,
          rawContent: messageContent
        });
      }
    } catch (error) {
      console.error('Quiz Generation Error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      return res.status(500).json({ 
        error: 'Failed to generate quiz',
        details: error.message,
        errorType: error.name
      });
    }
  } catch (error) {
    console.error('=== Fatal Error ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    return res.status(500).json({
      error: 'Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
} 