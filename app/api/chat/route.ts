// import { RetrievalQAChain, loadQAStuffChain } from 'langchain/chains';
import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { NextRequest, NextResponse } from 'next/server';
import { PromptTemplate } from 'langchain/prompts';

type PromptRequest = {
  messages: Message[];
};

export async function POST(req: NextRequest) {
  try {
    const { messages }: PromptRequest = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ status: 204 });
    }

    const { stream, handlers } = LangChainStream();

    const template = `You are a lawyer assistant. Use the following pieces of context to answer the question at the end.
      If you don't know the answer, just say that you don't know, don't try to make up an answer.
      Use three sentences maximum and keep the answer as concise as possible.
      Always answer in Finnish. Never use English unless it is a name.
      {context}
      Question: {question}
      Helpful Answer:`;

    const QA_CHAIN_PROMPT = new PromptTemplate({
      inputVariables: ['context', 'question'],
      template,
    });

    const llm = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.2,
      streaming: true,
    });

    // const chain = new RetrievalQAChain({
    //   combineDocumentsChain: loadQAStuffChain(llm, { prompt: QA_CHAIN_PROMPT }),
    //   returnSourceDocuments: true,
    //   inputKey: 'question',
    // });

    // chain
    //   .call(
    //     {
    //       question: messages[messages.length - 1].content,
    //     },
    //     [handlers]
    //   )
    //   .catch(console.error);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error while POST chat' });
  }
}
