import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import dotenv from 'dotenv';
dotenv.config();

const model = new ChatOpenAI({
  temperature: 0.3,
  openAIApiKey: process.env.OPENAI_API_KEY
});

export async function generateCards(text) {
  const prompt = PromptTemplate.fromTemplate(`
Erstelle 5 Karteikarten aus folgendem Vorlesungstext:
{text}
Format: Frage - Antwort
`);

  const chain = prompt.pipe(model);
  const result = await chain.invoke({ text });

  // Aufteilen in Objekte {question, answer}
  return result.content.split('\n').map(line => {
    const [question, answer] = line.split(' - ');
    return { question, answer };
  });
}
