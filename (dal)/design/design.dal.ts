"use server";

import { GoogleGenAI, Modality } from "@google/genai";
import assert from "node:assert";
import fs from "fs";
import path from "node:path";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { rateLimit } from "@/utils/rate-limiter";
import { NextRequest } from "next/server";

// System prompt for visiting card generation
const VISITING_CARD_PROMPT = `
Generate a professional horizontal visiting card with these specifications:

1. LAYOUT:
   - Left-aligned text content (70% width)
   - Right-side reserved for QR code/social icons (30% width)

2. DESIGN FRAMEWORK:
   - Background: [User's color preference] gradient (default: deep navy blue)
   - Text: High-contrast color (white/light for dark backgrounds, dark for light)
   - Accent: Thin divider line in complementary color

3. CONTENT STRUCTURE:
   [NAME] (Bold, largest font)
   ━━━━━━━━━━━━━ (Thin accent line)
   [TITLE] | [COMPANY] (Medium font)
   [TAGLINE] (Italic, smaller font if provided)

   [PHONE] • [EMAIL]
   [WEBSITE] • [SOCIAL MEDIA HANDLES]

4. RIGHT-SIDE ELEMENTS:
   - QR code linking to [PRIMARY URL]
   - Minimalist social media icons (if provided)

5. STYLE CONSTRAINTS:
   - Max 2 font families
   - Subtle texture/pattern at <10% opacity
   - 300 DPI resolution
   - Always maintain negative space

Corporate visiting card, ultra-detailed, 8k, studio lighting, minimalist, professional
`;

const IMAGE_DIR = path.join(process.cwd(), "public/generated");

export async function createDesign(_: unknown, formData: FormData) {
  try {
    const { success, message } = await rateLimit({
      key: "user",
      limit: 1,
      windowInSeconds: 60,
    });
    const { isAuthenticated } = getKindeServerSession();
    if (!success) {
      return {
        success: false,
        message: message,
      };
    }
    if (!(await isAuthenticated())) {
      throw new Error("Unauthorized");
    }
    const userInput = formData.get("message")?.toString() || "";
    assert(userInput.length > 0, "Please enter a description");
    assert(process.env.GEMINI_KEY, "API key not configured");

    // Create directory if needed
    if (!fs.existsSync(IMAGE_DIR)) {
      fs.mkdirSync(IMAGE_DIR, { recursive: true });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${VISITING_CARD_PROMPT}\n\nUSER REQUIREMENTS:\n${userInput}`,
            },
          ],
        },
      ],
      config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
    });

    const parts = response?.candidates?.[0]?.content?.parts;
    if (!parts) throw new Error("No content generated");

    let textResponse = "";
    let imageBase64 = "";

    for (const part of parts) {
      if (part.text) {
        textResponse = part.text;
      } else if (part.inlineData?.data) {
        imageBase64 = part.inlineData.data;
      }
    }

    if (!imageBase64) throw new Error("No image generated");

    // Return image as base64 for direct display
    return {
      success: true,
      message: textResponse || "Visiting card generated successfully",
      imageData: `data:image/png;base64,${imageBase64}`,
    };
  } catch (error) {
    console.error("Generation error:", error);
    return {
      success: false,
      message: (error as Error).message || "Generation failed",
      imageData: null,
    };
  }
}
