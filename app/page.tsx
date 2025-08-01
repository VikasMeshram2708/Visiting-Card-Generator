import Cta from "@/components/home/cta";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* Features Section */}
      <HowItWorks />
      {/* CTA Section */}
      <Cta />
    </div>
  );
}
