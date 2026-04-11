// Nyhedsside – simpel side med breadcrumbs og overskrift. Indholdet kan udbygges med nyhedsprodukter.
import Breadcrumbs from "../components/Breadcrumbs";
export default function News() {
  return (
    // Wrapper for hele nyhedssiden. Kan udbygges med nyhedsprodukter senere.
    <>
      {/* Brødkrummenavigation */}
      <Breadcrumbs items={[{ label: "Nyheder" }]} />
      <header>
        {/* Overskrift for nyhedssiden */}
        <h1>Nyheder</h1>
      </header>
      {/* Hovedindhold. Tomt nu, men kan udbygges med produkter */}
      <main></main>
    </>
  );
}
