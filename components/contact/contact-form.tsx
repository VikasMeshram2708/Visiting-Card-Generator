"use client";
import { Loader2, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useActionState } from "react";
import { SendContact } from "@/app/(dal)/contact-action";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(SendContact, null);
  return (
    <form className="space-y-6" action={action}>
      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <Input
          name="subject"
          id="subject"
          placeholder="What's this about?"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name
          </label>
          <Input name="name" id="name" placeholder="Your name" required />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-foreground"
        >
          Your Message
        </label>
        <Textarea
          name="message"
          id="message"
          rows={5}
          placeholder="How can we help you?"
          required
        />
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          <Send className="w-4 h-4 mr-2" />
          {isPending ? <Loader2 className="animate-spin" /> : "Send Message"}
        </Button>
        <Button type="reset" variant="outline">
          Clear Form
        </Button>
      </div>
    </form>
  );
}
