
import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import AuthProvider from "./Auth/AuthContext";

export default function Home() {
  return (
    <AuthProvider>
    <main className="flex min-h-screen flex-col items-center justify-center font-mono">
      <HeroSection />
      <FeaturesSection />
    </main>
    </AuthProvider>
  );
}
