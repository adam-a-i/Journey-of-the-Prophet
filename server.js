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
    console.log('Content:', inputText);
    console.log('Difficulty:', difficulty);
    console.log('Number of questions:', numberOfQs);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an Islamic history expert and quiz generator. Generate a quiz based on the provided text about Prophet Muhammad's (ﷺ) life. The questions should be meaningful, educational, and directly related to the content provided.

Create a quiz that follows this JSON structure:
{
  "quiz": [
    {
      "question": "Create a thoughtful question about the specific event or topic from the provided content",
      "options": [
        "Option 1 - historically accurate answer from the content",
        "Option 2 - plausible but incorrect answer",
        "Option 3 - plausible but incorrect answer",
        "Option 4 - plausible but incorrect answer"
      ],
      "correct_answer": "The correct option (exactly matching one of the options)",
      "explanation": "Provide a detailed explanation with historical context and significance, referencing the specific content"
    }
  ]
}

Guidelines:
- Questions MUST be based on the provided content only
- Focus on key events, their significance, and their impact
- Include questions about specific details mentioned in the content
- Explanations should reference the content and provide additional context
- All content should be respectful and historically accurate
- Generate ${numberOfQs} questions at ${difficulty} difficulty level

Content to base questions on: ${inputText}`
        },
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
    });

    const messageContent = chatCompletion?.choices?.[0]?.message?.content;

    if (messageContent) {
      console.log('=== Generated Quiz ===');
      const parsedQuiz = JSON.parse(messageContent);
      console.log(JSON.stringify(parsedQuiz, null, 2));
      res.json({ quiz: parsedQuiz });
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