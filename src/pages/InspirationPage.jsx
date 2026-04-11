// Inspirationsside – simpel side med breadcrumbs og overskrift. Indholdet kan udbygges med inspirationsindhold.
import Breadcrumbs from "../components/Breadcrumbs";

export default function InspirationPage() {
  return (
    // Wrapper for hele inspirationssiden. Kan udbygges med billeder, tekst mv. senere.
    <>
      {/* Brødkrummenavigation */}
      <Breadcrumbs items={[{ label: "Inspiration" }]} />
      <header>
        {/* Overskrift for inspirationssiden */}
        <h1>Inspiration</h1>
      </header>
      {/* Hovedindhold. Tomt nu, men kan udbygges med inspirationsindhold */}
      <main></main>
    </>
  );
}
