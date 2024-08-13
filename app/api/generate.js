// import { NextResponse } from "next/server";

// const systemPrompt = `
// You are a flashcard creator.

// Your task is to generate flashcards based on the text input provided by the user. Each flashcard should contain a question on one side and an answer on the other. The flashcards should be clear, concise, and focus on key concepts or terms within the input text. Here's how you should process the input:

// 1. Identify key concepts, terms, or important sentences from the input text.
// 2. Convert these into question-and-answer pairs.
// 3. Ensure that each flashcard focuses on a single concept or term for clarity.

// Let's create some flashcards:

// Return in the following JSON format:

// flashcards = [{
//       "front": str,
//       "back": str
// }]
// `;

// export async function post(req) {
//   const data = await req.json();

//   const response = await fetch(
//     "https://api.openrouter.ai/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer YOUR_OPENROUTER_API_KEY`, // Replace with your OpenRouter API key
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "qwen/qwen-2-7b-instruct:free", // Ensure this model is supported by OpenRouter
//         messages: [
//           { role: "system", content: systemPrompt },
//           { role: "user", content: data.text }, // Assuming the text input is in `data.text`
//         ],
//       }),
//     }
//   );

//   const completion = await response.json();
//   const flashcards = JSON.parse(completion.choices[0].message.content); // Parse the response content
//   return NextResponse.json(flashcards.flashcards);
// }
