import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Sparkles, Zap } from "lucide-react";
import GenerateForm from "@/components/generate/generate-form";

export default function GeneratePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Wand2 className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            AI Visiting Card Designer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe your ideal card and get AI-generated designs instantly
          </p>
        </div>

        {/* Generation Card */}
        <Card className="border shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent" />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Design Prompt
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <GenerateForm />
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <Sparkles className="h-5 w-5 text-indigo-600" />,
              title: "AI-Powered",
              desc: "Generates unique designs based on your description",
            },
            {
              icon: <Wand2 className="h-5 w-5 text-purple-600" />,
              title: "Instant Preview",
              desc: "See multiple design options in seconds",
            },
            {
              icon: <Zap className="h-5 w-5 text-indigo-600" />,
              title: "One-Click Order",
              desc: "Print premium cards directly from the platform",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-5 border rounded-lg hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground pl-11">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Gradient Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

        {/* Tips Section */}
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-4">
            Pro Tip: Use Specific Keywords
          </h3>
          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {[
              "minimalist",
              "corporate",
              "creative",
              "elegant",
              "modern",
              "vibrant",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium border rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
