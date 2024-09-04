import { Request, Response } from "express";
import Groq from "groq-sdk";
export const getResponse = async (req: Request, res: Response) => {
  try {
    console.log("hello");
    console.log(process.env.GROQ_API_KEY);
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    console.log(groq);
    const question = req.body.question;
    const conditionalPrompt = `
      You are an AI assistant with expertise in the Indian Penal Code (IPC) and the Indian judicial system. 
      Provide detailed and accurate responses related to legal consequences of crimes under the IPC.
      Your response should include relevant sections of the IPC and possible punishments. 
      If the question pertains to general legal advice or other topics not related to IPC, provide a general disclaimer stating that specific legal advice should be sought from a qualified professional. 
      For instance, if a user asks about the consequences of a specific crime, respond with the relevant IPC section and possible penalties.
    `;
    const answer = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: conditionalPrompt,
        },
        {
          role: "user",
          content: question,
        },
      ],
      model: "llama3-8b-8192",
    });
    return res.status(200).json({
      result: answer.choices[0].message.content,
    });
  } catch (error) {}
};
