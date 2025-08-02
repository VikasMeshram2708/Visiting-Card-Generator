"use client";
import { useActionState } from "react";
import { createDesign } from "@/(dal)/design/design.dal";
import { Download, Loader2, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function GenerateForm() {
  const [state, action, isPending] = useActionState(createDesign, null);

  const handleDownload = () => {
    if (!state?.imageData) return;
    const link = document.createElement("a");
    link.href = state.imageData;
    link.download = `visiting-card-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      {state?.imageData && (
        <div className="border rounded-lg p-4 bg-white">
          <div className="relative w-full h-64">
            <img
              src={state.imageData}
              alt="Generated visiting card"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </div>
        </div>
      )}

      {/* Status */}
      {isPending && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="animate-spin h-6 w-6 mr-2" />
          <span>Generating your design...</span>
        </div>
      )}

      {/* Form */}
      <form action={action} className="space-y-4">
        <Textarea
          name="message"
          rows={6}
          placeholder="Describe your visiting card..."
          required
        />
        <Button type="submit" disabled={isPending}>
          <Zap className="mr-2 h-4 w-4" />
          {isPending ? "Generating..." : "Generate Design"}
        </Button>
      </form>

      {/* Error Message */}
      {!state?.success && state?.message && (
        <p className="text-red-500 text-center">{state.message}</p>
      )}
    </div>
  );
}
