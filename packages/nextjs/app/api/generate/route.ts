import { NextRequest, NextResponse } from "next/server";
import { File } from "formdata-node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const config = {
  runtime: "edge", // Keep Edge runtime
};

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

    // Fetch image as an array buffer
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: 400 });
    }

    const arrayBuffer = await response.arrayBuffer();

    const file = new File([arrayBuffer], "image.png", { type: "image/png" });

    // Send the image to OpenAI API
    const variationResponse = await openai.images.createVariation({
      model: "dall-e-2",
      image: file,
      n: 1,
      size: "1024x1024",
    });

    return NextResponse.json(variationResponse, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = String(error.message);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
