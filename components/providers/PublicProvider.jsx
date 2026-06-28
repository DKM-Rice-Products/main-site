"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast from "@/components/ui/Toast";
import QuickEnquiryModal from "@/components/enquiry/QuickEnquiryModal";
import { useToast } from "@/hooks/useToast";

const PublicContext = createContext(null);

export function usePublic() {
  const ctx = useContext(PublicContext);
  if (!ctx) throw new Error("usePublic must be used within <PublicProvider>");
  return ctx;
}

// Provides app-wide toast notifications and the global "Quick Enquiry" modal
// so any page or component can trigger them.
export default function PublicProvider({ children, showPrices = true }) {
  const { toasts, push: toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBrand, setModalBrand] = useState(null);

  const openEnquiry = useCallback((brand = null) => {
    setModalBrand(brand);
    setModalOpen(true);
  }, []);

  return (
    <PublicContext.Provider value={{ toast, openEnquiry }}>
      {children}
      <Toast toasts={toasts} />
      <QuickEnquiryModal
        open={modalOpen}
        brand={modalBrand}
        showPrices={showPrices}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          toast("Enquiry submitted! We'll contact you within 2 hours.");
        }}
        onError={(msg) => toast(msg, "error")}
      />
    </PublicContext.Provider>
  );
}
