import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resumeData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const prompt = `You are a career coach specializing in helping first-year university students. Based on the following resume data, write a compelling LinkedIn "About" section (150-200 words) in first person. The tone should be enthusiastic, genuine, and forward-looking — like an ambitious student excited about their career journey. Do NOT use clichés like "passionate" excessively. Focus on what they've done and where they're headed.

Resume Data:
- Name: ${resumeData.basicInfo?.name || "Student"}
- Education: ${resumeData.education?.degree || "Undergraduate"} at ${resumeData.education?.college || "University"}
- Technical Skills: ${resumeData.technicalSkills?.join(", ") || "Various"}
- Soft Skills: ${resumeData.softSkills?.join(", ") || "Various"}
- Projects: ${resumeData.projects?.filter((p: any) => p.title).map((p: any) => p.title).join(", ") || "None listed"}
- Experience: ${resumeData.experience?.filter((e: any) => e.title).map((e: any) => `${e.title} at ${e.organization}`).join(", ") || "None listed"}
- Clubs: ${resumeData.clubs?.filter((c: any) => c.name).map((c: any) => `${c.role} at ${c.name}`).join(", ") || "None listed"}
- Certifications: ${resumeData.certifications?.join(", ") || "None listed"}

Write ONLY the About section text, nothing else.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "user", content: prompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI gateway error");
    }

    const result = await response.json();
    const text = result.choices?.[0]?.message?.content || "Unable to generate content.";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-linkedin error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
