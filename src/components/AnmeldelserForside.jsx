// Importerer SVG-ikoner til brug i anmeldelserne
import fyldtprofilikon from "../image/anmeldelserprofil.svg"; // Profilikon til brugeranmeldelser
import fyldtstjerneikon from "../image/anmeldelserstjernefyldt.svg"; // Stjerneikon til ratings
import trustpilotstjerne from "../image/trustpilotstjerne.svg"; // Trustpilot-logo
import "./AnmeldelserForside.css"; // Importerer CSS for styling af komponenten

// Komponenten viser et grid med fire kundeanmeldelser på forsiden
export default function AnmeldelserForside() {
  return (
    <div className="anmeldelser-section">
      {/* Overskrift for anmeldelses-sektionen */}
      <h3>Hvad vores kunder mener</h3>

      {/* Grid med fire kundeanmeldelser */}
      <div className="anmeldelser-grid">
        {/* Første anmeldelse */}
        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            {/* Profilikon */}
            <img src={fyldtprofilikon} alt="Profil1" />
            {/* Stjerne-rating */}
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            {/* Selve anmeldelsesteksten */}
            <p>
              “Jeg er virkelig glad for at have fundet Little Looms. Tøjet er så
              fint og i virkelig god kvalitet. Jeg kan især godt lide de
              naturlige materialer, og at designet er så enkelt og tidløst. Det
              er helt klart blevet en af mine favorit webshops til børnetøj.”
            </p>
            <p className="anmeldelse-forfatter">– Maria Andersen</p>
          </div>
        </div>

        {/* Anden anmeldelse */}
        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            <img src={fyldtprofilikon} alt="Profil2t" />
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            <p>
              “Super flot webshop og virkelig nem at finde rundt på. Jeg elsker
              udvalget af brands, og man kan tydeligt mærke at der er tænkt over
              kvalitet og stil. Jeg blev også positivt overrasket over hvor
              hurtigt min ordre kom.”
            </p>
            <p className="anmeldelse-forfatter">– Lærke Mathiasen</p>
          </div>
        </div>

        {/* Tredje anmeldelse */}
        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            <img src={fyldtprofilikon} alt="Profil3" />
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            <p>
              “Jeg er virkelig glad for at have fundet Little Looms. Tøjet er så
              fint og i virkelig god kvalitet. Jeg kan især godt lide de
              naturlige materialer, og at designet er så enkelt og tidløst. Det
              er helt klart blevet en af mine favorit webshops til børnetøj.”
            </p>
            <p className="anmeldelse-forfatter">– Sofie Berthelsen</p>
          </div>
        </div>

        {/* Fjerde anmeldelse */}
        <div className="anmeldelse-card">
          <div className="anmeldelse-top">
            <img src={fyldtprofilikon} alt="Profil4" />
            <div className="rating">
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
              <img src={fyldtstjerneikon} alt="Stjerne" />
            </div>
          </div>
          <div className="anmeldelse-tekst">
            <p>
              “Super flot webshop og virkelig nem at finde rundt på. Jeg elsker
              udvalget af brands, og man kan tydeligt mærke at der er tænkt over
              kvalitet og stil. Jeg blev også positivt overrasket over hvor
              hurtigt min ordre kom.”
            </p>
            <p className="anmeldelse-forfatter">– Julie Sørensen</p>
          </div>
        </div>
      </div>

      {/* Link til at se alle anmeldelser på Trustpilot */}
      <div className="trustpilot-link">
        <p>Vis alle 15.764 anmeldelser</p>
      </div>

      {/* Trustpilot-logo og tekst */}
      <div className="trustpilot-logo">
        <img src={trustpilotstjerne} alt="Trustpilot Stjerner" />
        <p>Trustpilot</p>
      </div>
    </div>
  );
}
