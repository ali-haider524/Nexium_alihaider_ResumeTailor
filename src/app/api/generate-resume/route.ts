import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);

    const response = await fetch("https://nexiumresume1.app.n8n.cloud/webhook/generate-resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("n8n status:", response.status);

    const text = await response.text();
    console.log("n8n response:", text);

    if (!response.ok) {
      return NextResponse.json({ error: "n8n error", details: text }, { status: 500 });
    }

    const data = JSON.parse(text); // force parse if it's text
    return NextResponse.json(data);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Unexpected error", details: `${err}` }, { status: 500 });
  }
}
