// File: /app/api/generate-resume/route.ts

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Flexible validation (accepts either set of fields)
    const validCareerBased = body?.careerGoal && body?.experience;
    const validNameBased = body?.name && body?.jobTitle;

    if (!validCareerBased && !validNameBased) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields." }),
        { status: 400 }
      );
    }

    // ✅ Replace this with your actual n8n webhook URL
    const webhookUrl = "https://nexiumresume1.app.n8n.cloud/webhook/generate-resume";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending to n8n webhook:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send data to n8n." }),
      { status: 500 }
    );
  }
}
