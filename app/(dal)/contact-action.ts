"use server";

import { ContactFormFB } from "@/components/contact/contact-mailer";
import prisma from "@/utils/prisma";
import assert from "node:assert";
import * as z from "zod/v4";
const ContactSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(250, "Subject should only have 250 characters"),
  email: z.email(),
  message: z
    .string()
    .min(1, "Message is required")
    .max(250, "Message should only have 250 characters"),
});

type ContactSchema = z.infer<typeof ContactSchema>;

export async function SendContact(prevState: unknown, formData: FormData) {
  const payload = {
    subject: formData.get("subject"),
    email: formData.get("email"),
    message: formData.get("message"),
  };
  // console.log("payload", payload);

  // rate limit
  // sanitize
  const parsed = ContactSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: z.flattenError(parsed.error).fieldErrors,
    };
  }

  assert(parsed.data);

  try {
    // save the message to db and notify the owner
    const newCnt = await prisma.contact.create({
      data: {
        email: parsed.data.email,
        message: parsed.data.message,
        subject: parsed.data.subject,
      },
    });
    // send mail
    await ContactFormFB({ userEmail: parsed.data.email });
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal Server Error. Failed to submit the contact form.",
    };
  }
}
