import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);

async function chat(prompt, setup) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: setup },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // extract the answer from response
  const answer = response.data.choices[0].message.content;

  return answer;
}

const setup = `Answer as Homero Simpson drunk`;
const prompt = `Homero como se llama tu hija menor?`;

console.log(await chat(prompt, setup));
