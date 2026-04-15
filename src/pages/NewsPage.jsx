// Nyhedsside – simpel side med breadcrumbs og overskrift. Indholdet kan udbygges med nyhedsprodukter.
import ProductGrid from "../components/ProductGrid";

export default function NewsPage() {
  return (
    // Wrapper for hele nyhedssiden. Kan udbygges med nyhedsprodukter senere.
    <>
      <ProductGrid
        genderTypes={["baby", "dreng", "pige"]}
        title="Nyheder"
        filterBy={{ news: true }}
      />
    </>
  );
}
