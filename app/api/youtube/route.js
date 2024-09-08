// app/api/youtube/route.js

import fetch from 'node-fetch'; // Make sure you're importing fetch correctly

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return new Response('Query parameter is required', { status: 400 });
  }

  try {
    // Use a complete and correct YouTube API URL
    const apiKey = process.env.YOUTUBE_API_KEY; // Ensure you have your API key correctly configured
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}`;

    const apiResponse = await fetch(apiUrl);
    if (!apiResponse.ok) {
      throw new Error('Failed to fetch from YouTube API');
    }

    const data = await apiResponse.json();

    // Check the structure of the returned data and adjust accordingly
    const links = data.items.map(item => `https://www.youtube.com/watch?v=${item.id.videoId}`);

    return new Response(JSON.stringify({ links }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching YouTube links:', error);
    return new Response('Failed to fetch YouTube links', { status: 500 });
  }
}
