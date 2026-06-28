import { getSettings } from "@/lib/store";
import PublicProvider from "@/components/providers/PublicProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

export default function PublicLayout({ children }) {
  const { showPrices = true } = getSettings();
  return (
    <PublicProvider showPrices={showPrices}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </PublicProvider>
  );
}
