import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
});

const systemPrompt = `

You are a flashcard creator. Create 10 flashcards based on the provided text.
Each flashcard should have a question and an answer.
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

const linksPrompt = `
You are a search assistant.

Your task is to provide relevant articles, links, or resources related to the following topic. Please generate a list of recommended resources that users can visit to learn more about the topic.

Here's how you should process the input:

1. Identify the main topic or key concepts from the provided text.
2. Suggest relevant articles, websites, or other resources that are credible and informative.
3. Provide a short description or title for each suggested resource.
4. Return a list of 5 suggestions in the following format:

links = [{
  "title": str,
  "url": str,
  "description": str
}]
`;

async function generateLinks(topic) {
  const prompt = `${linksPrompt}\n${topic}`;
  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  let links;
  try {
    links = JSON.parse(response);
  } catch (jsonError) {
    console.error("Error parsing JSON response:", jsonError);
    throw new Error("Error parsing response from API");
  }

  if (!Array.isArray(links)) {
    console.error("Unexpected response format:", links);
    throw new Error("Unexpected response format from API");
  }

  return links;
}

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

    // Fetch related articles/links
    let links;
    try {
      links = await generateLinks(text);
    } catch (error) {
      console.error("Error fetching links:", error);
      return new NextResponse("Error fetching related articles", {
        status: 500,
      });
    }

    return NextResponse.json({ flashcards, links });
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
