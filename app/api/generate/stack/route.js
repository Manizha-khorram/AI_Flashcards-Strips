// app/api/generate/stack/route.js

import "server-only";
import { StackServerApp } from "@stackframe/stack";

const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
});

export async function GET(req, res) {
  // Use stackServerApp here if needed
  const result = await stackServerApp.someMethod();

  return new Response(JSON.stringify({ message: "Success", data: result }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
