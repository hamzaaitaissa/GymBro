
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";


export default function Home() {
  return (
  
    <main className="flex min-h-screen flex-col items-center justify-center font-mono">
      <HeroSection />
      <FeaturesSection />
    </main>

  );
}
