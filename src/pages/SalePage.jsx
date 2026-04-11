// Udsalgsside – simpel side med breadcrumbs og overskrift. Kan udbygges med udsalgsprodukter.
import Breadcrumbs from "../components/Breadcrumbs";
export default function SalePage() {
  return (
    // Wrapper for hele udsalgssiden. Kan udbygges med udsalgsprodukter senere.
    <>
      {/* Brødkrummenavigation */}
      <Breadcrumbs items={[{ label: "Udsalg" }]} />
      <header>
        {/* Overskrift for udsalgssiden */}
        <h1>Udsalg</h1>
      </header>
      {/* Hovedindhold. Tomt nu, men kan udbygges med produkter */}
      <main></main>
    </>
  );
}
