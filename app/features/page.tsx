"use client";
import {
  BadgeCheck,
  Palette,
  Wand2,
  Scan,
  Box,
  Globe,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Wand2 className="w-8 h-8 text-purple-600" />,
      title: "AI-Powered Design",
      description:
        "Generate stunning designs in seconds with our advanced AI. Just describe your vision and get professional results.",
      highlights: [
        "No design skills needed",
        "Multiple design concepts",
        "Customizable templates",
      ],
    },
    {
      icon: <Palette className="w-8 h-8 text-blue-600" />,
      title: "Premium Customization",
      description:
        "Full control over colors, fonts, and layouts to match your brand identity perfectly.",
      highlights: [
        "Unlimited color combinations",
        "100+ font choices",
        "Flexible layouts",
      ],
    },
    {
      icon: <Scan className="w-8 h-8 text-green-600" />,
      title: "Smart QR Codes",
      description:
        "Integrated QR codes that link directly to your digital profile or website.",
      highlights: [
        "Customizable QR designs",
        "Analytics tracking",
        "Dynamic URL updates",
      ],
    },
    {
      icon: <Box className="w-8 h-8 text-amber-600" />,
      title: "Print-Ready Files",
      description:
        "Get print-perfect files in all standard formats with bleed and crop marks included.",
      highlights: [
        "300DPI resolution",
        "CMYK color mode",
        "Multiple file formats",
      ],
    },
    {
      icon: <Globe className="w-8 h-8 text-red-600" />,
      title: "Global Shipping",
      description:
        "We print and ship worldwide with fast, reliable delivery options.",
      highlights: [
        "Local printing partners",
        "Express shipping available",
        "Tracking included",
      ],
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security measures.",
      highlights: [
        "End-to-end encryption",
        "GDPR compliant",
        "Regular security audits",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center justify-center mb-4 bg-blue-50 px-4 py-2 rounded-full">
          <BadgeCheck className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-blue-600">
            Trusted by 10,000+ professionals
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 mb-4">
          Professional Features for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Your Brand
          </span>
        </h1>
        <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
          Everything you need to create stunning visiting cards that make
          lasting impressions.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow border-0"
          >
            <CardHeader className="pb-0">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-200">
                  {feature.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-20 text-center">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Elevate Your Brand?
          </h2>
          <p className="text-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who trust our platform for their
            visiting card needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="text-foreground bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              See Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
