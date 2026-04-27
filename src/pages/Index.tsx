import HeroSection from "@/components/HeroSection";
import PriceSection from "@/components/PriceSection";
import FaqSection from "@/components/FaqSection";

const Index = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "var(--obsidian)", minHeight: "100vh" }}>
      <HeroSection onScrollTo={scrollTo} />
      <PriceSection onScrollTo={scrollTo} />
      <FaqSection />
    </div>
  );
};

export default Index;
