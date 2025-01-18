import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import OpenAI from "openai";
import path from "path";
import { promisify } from "util";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const writeFile = promisify(fs.writeFile);

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGINS || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Missing imageUrl" }, { status: 400 });
    }

    // Fetch the image as an ArrayBuffer (compatible with Node.js)
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 400 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Define a temporary file path
    const tempFilePath = path.join("/tmp", "image.png");

    // Write the image buffer to a file
    await writeFile(tempFilePath, buffer);

    // Send the image to OpenAI API
    const variationResponse = await openai.images.createVariation({
      model: "dall-e-2",
      image: fs.createReadStream(tempFilePath), // Read from file
      n: 1,
      size: "1024x1024",
    });

    return NextResponse.json(variationResponse, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
