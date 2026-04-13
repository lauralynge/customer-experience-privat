// Kønssektion til forsiden – viser tre billeder med links til baby-, pige- og drenge-kategorisiderne.
import { Link } from "react-router-dom";
import baby from "../image/baby.png";
import pige from "../image/Pige3.png";
import dreng from "../image/Dreng-3.png";
import babystr from "../image/babykoen.svg";
import drengstr from "../image/drengkoen.svg";
import pigestr from "../image/pigekoen.svg";

export default function GenderSection() {
  return (
    // Grid med tre kort – ét for hver kønskategori
    <div className="gender-grid">
      {/* Kort for baby-kategorien */}
      <div className="gender-card">
        <img src={baby} alt="Baby" />
        {/* Link til baby-kategorien. Indeholder et overlay-billede med tekst/grafik */}
        <Link to="/baby" className="gender-link">
          <img src={babystr} alt="Babystr" />
        </Link>
      </div>

      {/* Kort for pige-kategorien */}
      <div className="gender-card">
        <img src={pige} alt="Pige" />
        <Link to="/pige" className="gender-link">
          <img src={pigestr} alt="Pigestr" />
        </Link>
      </div>

      {/* Kort for dreng-kategorien */}
      <div className="gender-card">
        <img src={dreng} alt="Dreng" />
        <Link to="/dreng" className="gender-link">
          <img src={drengstr} alt="Drengstr" />
        </Link>
      </div>
    </div>
  );
}
