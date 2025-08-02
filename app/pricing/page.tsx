"use client";
import { Check, Zap, Sparkles, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      price: "₹499",
      cardCount: "50 Cards",
      pricePerCard: "₹10 per card",
      cta: "Get Started",
      features: [
        "3 AI-generated designs",
        "Standard 300gsm paper",
        "5-7 business day delivery",
        "Digital preview",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      price: "₹1,999",
      cardCount: "500 Cards",
      pricePerCard: "₹4 per card (60% savings)",
      cta: "Best Value",
      features: [
        "5 AI-generated designs",
        "Premium matte/linen paper",
        "3-5 business day delivery",
        "Priority support",
        "Free digital copy",
        "2 free revisions",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      price: "Custom",
      cardCount: "1000+ Cards",
      pricePerCard: "Volume discounts",
      cta: "Contact Sales",
      features: [
        "Unlimited design concepts",
        "Premium paper & finishes",
        "24-48hr rush delivery",
        "Dedicated account manager",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
          Simple Pricing
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Pay only for what you need. No subscriptions, no hidden fees.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`border-gray-700 rounded-lg hover:shadow-lg transition-shadow ${
              tier.highlight ? "ring-2 ring-purple-500" : ""
            }`}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </div>
            )}

            <CardHeader className="pb-0">
              <div className="flex items-center gap-3 mb-4">
                {tier.icon}
                <CardTitle className="text-2xl font-bold text-white">
                  {tier.name}
                </CardTitle>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">
                  {tier.price}
                </div>
                <div className="text-gray-300 font-medium">
                  {tier.cardCount}
                </div>
                <div className="text-sm font-medium text-blue-400">
                  {tier.pricePerCard}
                </div>
              </div>
            </CardHeader>

            <CardContent className="py-6">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                size="lg"
                className={`w-full ${
                  tier.highlight
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
                }`}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto mt-20 border border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-white border-b border-gray-700">
                Features
              </th>
              <th className="px-6 py-4 text-center font-semibold text-white border-b border-gray-700">
                Starter
              </th>
              <th className="px-6 py-4 text-center font-semibold text-purple-400 border-b border-gray-700">
                Professional
              </th>
              <th className="px-6 py-4 text-center font-semibold text-white border-b border-gray-700">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {[
              ["AI design concepts", "3", "5", "Unlimited"],
              ["Delivery time", "5-7 days", "3-5 days", "24-48hrs"],
              ["Paper quality", "Standard", "Premium", "Premium+"],
              ["Support", "Email", "Priority", "Dedicated"],
            ].map(([feature, ...plans]) => (
              <tr key={feature as string}>
                <td className="px-6 py-4 font-medium text-gray-300">
                  {feature}
                </td>
                {plans.map((plan, i) => (
                  <td
                    key={i}
                    className={`px-6 py-4 text-center ${
                      i === 1
                        ? "font-semibold text-purple-400"
                        : "text-gray-300"
                    }`}
                  >
                    {plan}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
