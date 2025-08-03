// app/billing/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronUp,
  CreditCard,
  Loader2,
  Zap,
  Sparkles,
  Briefcase,
} from "lucide-react";

export default function BillingPage() {
  const currentPlan = {
    name: "Professional",
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    price: "₹1,999",
    cardCount: "500 Cards",
    pricePerCard: "₹4 per card (60% savings)",
    features: [
      "5 AI-generated designs",
      "Premium matte/linen paper",
      "3-5 business day delivery",
      "Priority support",
      "Free digital copy",
      "2 free revisions",
    ],
    renewDate: "January 15, 2024",
  };

  const loading = false;

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
          Your Billing
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Manage your subscription and payment details
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Current Plan Card */}
        <Card className="rounded-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              {currentPlan.icon}
              <CardTitle className="text-2xl font-bold text-white">
                {currentPlan.name} Plan
              </CardTitle>
              <Badge variant="secondary" className="ml-auto">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-3xl font-bold text-white">
                {currentPlan.price}
              </div>
              <div className="text-gray-300 font-medium">
                {currentPlan.cardCount}
              </div>
              <div className="text-sm font-medium text-purple-400">
                {currentPlan.pricePerCard}
              </div>
              <div className="pt-4">
                <p className="text-gray-400">Next billing date:</p>
                <p className="text-white">{currentPlan.renewDate}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-white mb-3">Plan Benefits</h3>
              <ul className="space-y-3">
                {currentPlan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row gap-4 border-t border-gray-700 pt-6">
            <Button
              variant="outline"
              className="w-full md:w-auto border-gray-600 hover:bg-gray-700"
            >
              Change Plan
            </Button>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 border-gray-600 hover:bg-gray-700"
              >
                Update Payment
              </Button>
              <Button variant="destructive" className="flex-1">
                Cancel Plan
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Billing History */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Billing History
            </CardTitle>
            <CardDescription className="text-gray-400">
              View your past invoices and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-700">
              {[
                {
                  date: "Dec 15, 2023",
                  amount: "₹1,999",
                  status: "Paid",
                  id: "INV-7892",
                  plan: "Professional",
                },
                {
                  date: "Nov 15, 2023",
                  amount: "₹1,999",
                  status: "Paid",
                  id: "INV-6754",
                  plan: "Professional",
                },
                {
                  date: "Oct 15, 2023",
                  amount: "₹499",
                  status: "Paid",
                  id: "INV-5432",
                  plan: "Starter",
                },
              ].map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4"
                >
                  <div>
                    <p className="font-medium text-white">{invoice.date}</p>
                    <p className="text-sm text-gray-400">
                      {invoice.id} • {invoice.plan}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-white">{invoice.amount}</p>
                    <Badge
                      variant={
                        invoice.status === "Paid" ? "default" : "outline"
                      }
                    >
                      {invoice.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-gray-700 pt-6">
            <Button variant="ghost" className="w-full text-purple-400">
              View Full History
            </Button>
          </CardFooter>
        </Card>

        {/* Payment Method */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700/50">
              <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="font-medium text-white">Visa •••• 4242</p>
                  <p className="text-sm text-gray-400">Expires 04/2025</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-gray-600 hover:bg-gray-700"
              >
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
        </div>
      )}

      <div className="max-w-5xl mx-auto text-center text-xs text-gray-500 mt-12">
        Made with ❣️ v0.0.1
      </div>
    </div>
  );
}
