import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import WhyPartnerSection from "@/components/WhyPartnerSection";
import FaqSection from "@/components/FaqSection";
import PartnerCtaSection from "@/components/PartnerCtaSection";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-[#E5DFD3]">
      <Header activePath="/" />
      
      <main className="flex-1 flex flex-col">
        <SectionReveal>
          <HeroSection />
        </SectionReveal>

        <SectionReveal withDivider={true}>
          <SpecialtiesSection />
        </SectionReveal>

        <SectionReveal withDivider={true}>
          <WhyPartnerSection />
        </SectionReveal>

        <SectionReveal withDivider={true}>
          <FaqSection />
        </SectionReveal>

        <SectionReveal withDivider={true}>
          <PartnerCtaSection />
        </SectionReveal>
      </main>
    </div>
  );
}







