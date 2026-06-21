import { listBrands, getSettings } from "@/lib/store";
import HeroSection from "@/components/home/HeroSection";
import PriceStrip from "@/components/home/PriceStrip";
import StatsBar from "@/components/home/StatsBar";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedBrands from "@/components/home/FeaturedBrands";
import BulkCTA from "@/components/home/BulkCTA";
import Reveal from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const brands = listBrands();
  const { directPrice, retailPrice } = getSettings();

  return (
    <>
      <HeroSection />
      <PriceStrip directPrice={directPrice} retailPrice={retailPrice} />
      <Reveal>
        <StatsBar />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <FeaturedBrands brands={brands} />
      </Reveal>
      <Reveal>
        <BulkCTA />
      </Reveal>
    </>
  );
}
