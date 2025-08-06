"use server";

import { ContactFormFB } from "@/components/contact/contact-mailer";
import prisma from "@/utils/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { rateLimit } from "@/utils/rate-limiter";

const ContactSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(250, "Subject should only have 250 characters"),
  email: z.email("Invalid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(250, "Message should only have 250 characters"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed more than 100 characters"),
});

export type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function SendContact(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  const session = await getServerSession();
  // console.log("session", session);
  if (!session) throw new Error("Unauthorized");

  // Rate limiting: 5 requests per minute per user
  const { success, message } = await rateLimit({
    key: `user:${session?.user?.email}`,
    limit: 5,
    windowInSeconds: 60,
  });

  if (!success) {
    return {
      success: false,
      message,
    };
  }

  const payload = {
    subject: formData.get("subject"),
    email: formData.get("email"),
    message: formData.get("message"),
    name: formData.get("name"),
  };

  const parsed = ContactSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    await prisma.contact.create({
      data: parsed.data,
    });

    await ContactFormFB({ userEmail: parsed.data.email });

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "Internal Server Error. Failed to submit the contact form.",
    };
  }
}
