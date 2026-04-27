import { HeroSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";

export default function MarketingPage() {
  return (
    <div className="bg-hero-bg min-h-screen">
      <Navbar />
      <HeroSection />
    </div>
  );
}
