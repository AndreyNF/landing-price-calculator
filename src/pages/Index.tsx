import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PriceSection from "@/components/PriceSection";
import FaqSection from "@/components/FaqSection";
import DocumentModal from "@/components/DocumentModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "var(--obsidian)", minHeight: "100vh" }}>
      <HeroSection onScrollTo={scrollTo} onOpenModal={() => setModalOpen(true)} />
      <PriceSection onScrollTo={scrollTo} onOpenModal={() => setModalOpen(true)} />
      <FaqSection onOpenModal={() => setModalOpen(true)} />
      <DocumentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
