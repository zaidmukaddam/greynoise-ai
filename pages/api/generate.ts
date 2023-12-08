import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { NextResponse } from "next/server"
import { functions, runFunction } from '@/utils/functions'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = "edge";

export default async function handler(req: Request) {

  // deny requests that are not POST
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 })
  }

  const { prompt } = await req.json()

  let system_message =
  {
    role: "system",
    content: "You are a GreyNoise bot. You are a bot that helps people find information about IP addresses. Use the function `get_ip_data` to get information about an IP address. But pass the IP address as a parameter to the function from the message for example: {\"ip\": \"8.8.8.8\"}. The function will return the latest data about the IP address. So do not worry about the data being out of date. ",
  };
  let user_message =
  {
    role: "user",
    content: prompt,
  }

  const messages: any[] = [system_message, user_message]

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      max_tokens: 1024,
      messages: [...messages],
      functions,
      stream: true,
      function_call: "auto"
    })

    const results = OpenAIStream(completion, {
      experimental_onFunctionCall: async (
        { name, arguments: args },
        createFunctionCallMessages,
      ) => {
        const result = await runFunction(name, args);
        const newMessages = createFunctionCallMessages(result);
        console.log(newMessages)
        return openai.chat.completions.create({
          model: "gpt-4-1106-preview",
          max_tokens: 500,
          temperature: 0.7,
          messages: [...messages, ...newMessages],
          stream: true,
        })
      },
    })

    return new StreamingTextResponse(results)
  } catch (err: any) {
    console.error("Error getting suggestions", err)
    return new NextResponse(err.message, { status: 500 })
  }
}
