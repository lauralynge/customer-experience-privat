// Udsalgsside – simpel side med breadcrumbs og overskrift. Kan udbygges med udsalgsprodukter.
import ProductGrid from "../components/ProductGrid";
export default function SalePage() {
  return (
    // Wrapper for hele udsalgssiden. Kan udbygges med udsalgsprodukter senere.
    <>
      <ProductGrid
        genderTypes={["baby", "dreng", "pige", "unisex"]}
        title="Udsalg"
        filterBy={{ sale: true }}
      />
    </>
  );
}
