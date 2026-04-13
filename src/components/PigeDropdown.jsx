// Pige dropdown-menu – navigationsoverlay der viser underkategorier til pige-sektionen.
// Lukkes ved klik på baggrunden eller krydset via onClose-prop.
import { NavLink } from "react-router-dom";
import "./Dropdown.css";
import dropdownbaggrund from "../image/kategoripigedropdown.svg";
import kryds from "../image/kryds.svg";

export default function PigeDropdown({ onClose }) {
  return (
    // Overlay der dækker hele skærmen. Klik på baggrunden lukker menuen (onClose)
    <div className="dropdown-overlay" onClick={onClose}>
      {/* Selve dropdown-menuen. Klik på denne stopper eventen, så overlayet ikke lukkes */}
      <div
        className="kategoridropdown"
        onClick={(e) => e.stopPropagation()} // Forhindrer at klik bobler op og lukker overlayet
        style={{ backgroundImage: `url(${dropdownbaggrund})` }}
      >
        {/* Knap til at lukke dropdown-menuen */}
        <button className="dropdown-close" onClick={onClose}>
          <img src={kryds} alt="Luk" />
        </button>

        {/* Grid-layout med kolonner for hver underkategori */}
        <div className="dropdown-grid">
          {/* Kolonne: Overtøj */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/overtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Overtøj
            </NavLink>
            {/* Underkategorier til overtøj */}
            <NavLink to="/kategori/pige/overtoj/flyverdragt" onClick={onClose}>
              Flyverdragt
            </NavLink>
            <NavLink to="/kategori/pige/overtoj/regntoj" onClick={onClose}>
              Regntøj
            </NavLink>
            <NavLink to="/kategori/pige/overtoj/jakker" onClick={onClose}>
              Jakker
            </NavLink>
            <NavLink
              to="/kategori/pige/overtoj/huer-og-vanter"
              onClick={onClose}
            >
              Huer og vanter
            </NavLink>
            <NavLink to="/kategori/pige/overtoj/termotoj" onClick={onClose}>
              Termotøj
            </NavLink>
          </div>

          {/* Kolonne: Overdele */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/overdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Overdele
            </NavLink>
            {/* Underkategorier til overdele */}
            <NavLink to="/kategori/pige/overdele/strik" onClick={onClose}>
              Strik
            </NavLink>
            <NavLink to="/kategori/pige/overdele/bluser" onClick={onClose}>
              Bluser
            </NavLink>
            <NavLink to="/kategori/pige/overdele/skjorter" onClick={onClose}>
              Skjorter
            </NavLink>
            <NavLink to="/kategori/pige/overdele/t-shirt" onClick={onClose}>
              T-shirt
            </NavLink>
            <NavLink to="/kategori/pige/overdele/kjoler" onClick={onClose}>
              Kjoler
            </NavLink>
          </div>

          {/* Kolonne: Accessories */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/accessories"
              onClick={onClose}
              className="dropdown-title"
            >
              Accessories
            </NavLink>
            {/* Underkategorier til accessories */}
            <NavLink to="/kategori/pige/accessories/stromper" onClick={onClose}>
              Strømper
            </NavLink>
            <NavLink to="/kategori/pige/accessories/hatte" onClick={onClose}>
              Hatte
            </NavLink>
            <NavLink to="/kategori/pige/accessories/badetoj" onClick={onClose}>
              Badetøj
            </NavLink>
            <NavLink to="/kategori/pige/accessories/harpynt" onClick={onClose}>
              Hårpynt
            </NavLink>
          </div>

          {/* Kolonne: Underdele */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/underdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Underdele
            </NavLink>
            {/* Underkategorier til underdele */}
            <NavLink to="/kategori/pige/underdele/shorts" onClick={onClose}>
              Shorts
            </NavLink>
            <NavLink to="/kategori/pige/underdele/jeans" onClick={onClose}>
              Jeans
            </NavLink>
            <NavLink to="/kategori/pige/underdele/bukser" onClick={onClose}>
              Bukser
            </NavLink>
            <NavLink to="/kategori/pige/underdele/nederdele" onClick={onClose}>
              Nederdele
            </NavLink>
            <NavLink
              to="/kategori/pige/underdele/leggins-og-strompebukser"
              onClick={onClose}
            >
              Leggins og strømpebukser
            </NavLink>
          </div>

          {/* Kolonne: Fodtøj */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/fodtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Fodtøj
            </NavLink>
            {/* Underkategorier til fodtøj */}
            <NavLink to="/kategori/pige/fodtoj/sko" onClick={onClose}>
              Sko
            </NavLink>
            <NavLink to="/kategori/pige/fodtoj/stovler" onClick={onClose}>
              Støvler
            </NavLink>
            <NavLink to="/kategori/pige/fodtoj/gummistovler" onClick={onClose}>
              Gummistøvler
            </NavLink>
            <NavLink to="/kategori/pige/fodtoj/sandaler" onClick={onClose}>
              Sandaler
            </NavLink>
          </div>

          {/* Kolonne: Undertøj & nattøj, Udsalg, Nyheder */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/undertojognattoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Undertøj & nattøj
            </NavLink>
            <NavLink
              to="/kategori/baby/udsalg"
              onClick={onClose}
              className="dropdown-title"
            >
              Udsalg
            </NavLink>

            <NavLink
              to="/kategori/baby/nyheder"
              onClick={onClose}
              className="dropdown-title"
            >
              Nyheder
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
