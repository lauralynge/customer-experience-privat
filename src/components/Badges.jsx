// Kvalitetsbadges til forsiden – viser fire badges: naturlige materialer, GOTS-certificering, holdbarhed og komfort.
import badge1 from "../image/naturlige-materialer-badge.svg";
import badge2 from "../image/lyseroedbadge.svg";
import badge3 from "../image/holdbarhedbadge.svg";
import badge4 from "../image/komfortbadge.svg";

// Badges-komponenten viser fire badges med tilhørende beskrivelser på forsiden.
export default function Badges() {
  return (
    // Sektion der indeholder alle badges
    <section className="badges-section">
      {/* Grid-layout for at placere badges side om side */}
      <div className="badges-grid">
        {/* Badge 1: Naturlige materialer */}
        <div className="badge-card">
          <img
            src={badge1}
            alt="Naturlige materialer badge"
            className="badge-image"
          />
          <p className="badge-description">
            Fremstillet af økologiske og nøje udvalgte naturfibre. Materialerne
            er skånsomme og fri for unødig kemi.
          </p>
        </div>

        {/* Badge 2: GOTS certificering */}
        <div className="badge-card">
          <img
            src={badge2}
            alt="GOTS certificering badge"
            className="badge-image"
          />
          <p className="badge-description">
            Mange af vores produkter følger standarden, som stiller krav til
            både miljø, kemi og arbejdsforhold.
          </p>
        </div>

        {/* Badge 3: Holdbarhed */}
        <div className="badge-card">
          <img src={badge3} alt="Holdbarhed badge" className="badge-image" />
          <p className="badge-description">
            Vi udvælger tøj i slidstærk kvalitet, der holder form og farve.
            Skabt til at kunne bruges længe og gå i arv.
          </p>
        </div>

        {/* Badge 4: Komfort */}
        <div className="badge-card">
          <img src={badge4} alt="Komfort badge" className="badge-image" />
          <p className="badge-description">
            Materialer som sikrer høj komfort for barnet. Pasformer er udviklet
            til fri bevægelse, leg og hverdagsbrug.
          </p>
        </div>
      </div>
    </section>
  );
}
