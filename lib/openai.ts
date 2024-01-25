import { OpenAIEmbeddings, OpenAIEmbeddingsParams } from 'langchain/embeddings/openai';
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateEmbeddings = (configs?: Partial<OpenAIEmbeddingsParams>) => {
  const embeddings = new OpenAIEmbeddings(configs);

  return embeddings;
};
