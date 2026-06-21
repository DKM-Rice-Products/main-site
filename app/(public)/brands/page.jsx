import { listBrands } from "@/lib/store";
import PageHeader from "@/components/ui/PageHeader";
import BrandsExplorer from "@/components/brands/BrandsExplorer";

export const dynamic = "force-dynamic";

export const metadata = { title: "Our Rice Brands | Sri Durai Kannammal Rice Products" };

export default function BrandsPage() {
  const brands = listBrands();
  return (
    <div style={{ paddingTop: 64 }}>
      <PageHeader
        eyebrow="Product Catalog"
        title="Our Rice Brands"
        subtitle="Premium varieties for household, restaurant, or bulk orders."
      />
      <BrandsExplorer brands={brands} />
    </div>
  );
}
