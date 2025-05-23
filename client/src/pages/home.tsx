import NavigationHeader from "@/components/navigation-header";
import HeroSection from "@/components/hero-section";
import FeatureCards from "@/components/feature-cards";
import RegistrationSection from "@/components/registration-section";
import QRScannerSection from "@/components/qr-scanner-section";
import VerificationSection from "@/components/verification-section";
import AuthoritiesSection from "@/components/authorities-section";
import StatsSection from "@/components/stats-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavigationHeader />
      <HeroSection />
      <FeatureCards />
      <RegistrationSection />
      <QRScannerSection />
      <VerificationSection />
      <AuthoritiesSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
