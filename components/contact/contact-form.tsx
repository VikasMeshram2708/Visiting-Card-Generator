"use client";
import { SendContact } from "@/app/(dal)/contact-action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2, Send } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function ContactForm() {
  const [state, formAction] = useActionState(SendContact, initialState);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <Input name="name" id="name" required />
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <Input name="email" id="email" type="email" required />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input name="subject" id="subject" required />
        {state?.errors?.subject && (
          <p className="text-sm text-red-500">{state.errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea name="message" id="message" rows={5} required />
        {state?.errors?.message && (
          <p className="text-sm text-red-500">{state.errors.message}</p>
        )}
      </div>

      <SubmitButton />

      {state?.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}
