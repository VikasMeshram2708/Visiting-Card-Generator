import Cta from "@/components/home/cta";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/how-it-works";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HowItWorks />
      {/* Features Section */}
      <Features />
      {/* CTA Section */}
      <Cta />
    </div>
  );
}
