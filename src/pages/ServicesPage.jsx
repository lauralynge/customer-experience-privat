// Servicesside – simpel statisk side med overskrift. Indholdet kan udbygges med serviceoplysninger.
export default function ServicesPage() {
  return (
    // React fragment (<></>) bruges til at wrappe flere elementer uden at tilføje ekstra DOM-niveau
    <>
      {/* Header-sektion med sidens overskrift */}
      <header>
        {/* H1 bruges som hovedoverskrift for SEO og tilgængelighed */}
        <h1>Services</h1>
      </header>
      {/* Main-sektion til hovedindholdet på siden */}
      {/* Her kan du senere tilføje servicebeskrivelser, kontaktinfo, FAQ, åbningstider eller andet relevant indhold */}
      {/* Eksempel: <section><h2>Vores services</h2><p>Her kan du læse om ...</p></section> */}
      <main></main>
    </>
  );
}
