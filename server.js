import express from 'express';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import cors from 'cors';

// Specify the path to your .env file
dotenv.config({ path: './.env' });

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Groq with API key
const groq = new Groq({ apiKey: process.env.VITE_GROQ_API_KEY });

app.post('/generate-quiz', async (req, res) => {
  const { inputText, difficulty, numberOfQs } = req.body;
  try {
    console.log('=== Quiz Generation Started ===');

    const chatCompletion = await groq.chat.completions.create({
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
      temperature: 0.3, // Even lower temperature for more deterministic output
      max_tokens: 1024,
      top_p: 1,
    });

    const messageContent = chatCompletion?.choices?.[0]?.message?.content;

    if (messageContent) {
      console.log('=== Generated Quiz ===');
      try {
        // First clean the response to ensure it's valid JSON
        const cleanedContent = messageContent.trim().replace(/^[^{]*/, '').replace(/[^}]*$/, '');
        const parsedQuiz = JSON.parse(cleanedContent);
        
        // Validate the structure
        if (!parsedQuiz.quiz || !Array.isArray(parsedQuiz.quiz)) {
          throw new Error('Invalid quiz structure');
        }

        console.log(JSON.stringify(parsedQuiz, null, 2));
        res.json({ quiz: parsedQuiz });
      } catch (parseError) {
        console.error('=== JSON Parse Error ===');
        console.error(messageContent);
        console.error(parseError);
        res.status(500).json({ error: 'Failed to parse quiz response.' });
      }
    } else {
      res.status(500).json({ error: 'No valid message content found in the response.' });
    }
  } catch (error) {
    console.error('=== Quiz Generation Error ===');
    console.error(error);
    res.status(500).json({ error: 'Failed to generate quiz.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
}); 