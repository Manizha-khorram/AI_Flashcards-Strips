import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

const systemPrompt = `
You are a flashcard creator.

Your task is to generate flashcards based on the text input provided by the user. Each flashcard should contain a question on one side and an answer on the other. The flashcards should be clear, concise, and focus on key concepts or terms within the input text. Here's how you should process the input:

1. Identify key concepts, terms, or important sentences from the input text.
2. Convert these into question-and-answer pairs.
3. Ensure that each flashcard focuses on a single concept or term for clarity.
4. Generate exactly 10 flashcards.

Let's create some flashcards:

Return in the following JSON format:

flashcards = [{
      "front": str,
      "back": str
}]
`;
export async function POST(req) {
  try {
    const { text } = await req.json();
    const prompt = `${systemPrompt}\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    let flashcards;
    try {
      flashcards = JSON.parse(response);
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      return new NextResponse("Error parsing response from API", {
        status: 500,
      });
    }

    if (!Array.isArray(flashcards)) {
      console.error("Unexpected response format:", flashcards);
      return new NextResponse("Unexpected response format from API", {
        status: 500,
      });
    }

    // Ensure there are exactly 10 flashcards
    if (flashcards.length !== 10) {
      console.error("Unexpected number of flashcards:", flashcards.length);
      return new NextResponse("API did not generate exactly 10 flashcards", {
        status: 500,
      });
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
