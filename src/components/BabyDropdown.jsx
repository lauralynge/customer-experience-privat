// Baby dropdown-menu – navigationsoverlay der viser underkategorier til baby-sektionen.
// Lukkes ved klik på baggrunden eller krydset via onClose-prop.
import { NavLink } from "react-router-dom";
import "./Dropdown.css";
import dropdownbaggrund from "../image/kategoribabydropdown.svg";
import kryds from "../image/kryds.svg";

// BabyDropdown-komponenten viser en dropdown-menu med underkategorier til baby-sektionen.
// onClose-proppen bruges til at lukke menuen, enten ved klik på baggrunden eller på krydset.
export default function BabyDropdown({ onClose }) {
  return (
    // Overlay der dækker hele skærmen. Klik på overlayet (uden for menuen) lukker dropdown.
    <div className="dropdown-overlay" onClick={onClose}>
      {/* Selve dropdown-menuen. onClick med stopPropagation forhindrer at klik inde i menuen lukker overlayet. */}
      <div
        className="kategoridropdown"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundImage: `url(${dropdownbaggrund})` }} // Baggrundsbillede for menuen
      >
        {/* Luk-knap (øverste højre hjørne). Klik lukker dropdown. */}
        <button className="dropdown-close" onClick={onClose}>
          <img src={kryds} alt="Luk" />
        </button>

        {/* Grid-layout med 6 kolonner, én for hver hovedkategori. */}
        <div className="dropdown-grid">
          {/* Kolonne: Overtøj. NavLink bruges for at kunne style aktivt link og for at undgå fuld reload. */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/baby/overtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Overtøj
            </NavLink>
            {/* Underkategorier til overtøj. onClick={onClose} lukker dropdown ved navigation. */}
            <NavLink to="/kategori/baby/overtoj/flyverdragt" onClick={onClose}>
              Flyverdragt
            </NavLink>
            <NavLink to="/kategori/baby/overtoj/regntoj" onClick={onClose}>
              Regntøj
            </NavLink>
            <NavLink to="/kategori/baby/overtoj/jakker" onClick={onClose}>
              Jakker
            </NavLink>
            <NavLink
              to="/kategori/baby/overtoj/huer-og-vanter"
              onClick={onClose}
            >
              Huer og vanter
            </NavLink>
            <NavLink to="/kategori/baby/overtoj/termotoj" onClick={onClose}>
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
            <NavLink to="/kategori/baby/overdele/strik" onClick={onClose}>
              Strik
            </NavLink>
            <NavLink to="/kategori/baby/overdele/bluser" onClick={onClose}>
              Bluser
            </NavLink>
            <NavLink to="/kategori/baby/overdele/skjorter" onClick={onClose}>
              Skjorter
            </NavLink>
            <NavLink to="/kategori/baby/overdele/t-shirt" onClick={onClose}>
              T-shirt
            </NavLink>
            <NavLink to="/kategori/baby/overdele/kjoler" onClick={onClose}>
              Kjoler
            </NavLink>
            <NavLink to="/kategori/baby/overdele/bodyer" onClick={onClose}>
              Bodyer
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
            <NavLink to="/kategori/baby/accessories/stromper" onClick={onClose}>
              Strømper
            </NavLink>
            <NavLink to="/kategori/baby/accessories/hatte" onClick={onClose}>
              Hatte
            </NavLink>
            <NavLink to="/kategori/baby/accessories/badetoj" onClick={onClose}>
              Badetøj
            </NavLink>
            <NavLink to="/kategori/baby/accessories/harpynt" onClick={onClose}>
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
            <NavLink to="/kategori/baby/underdele/shorts" onClick={onClose}>
              Shorts
            </NavLink>
            <NavLink to="/kategori/baby/underdele/bukser" onClick={onClose}>
              Bukser
            </NavLink>
            <NavLink to="/kategori/baby/underdele/nederdele" onClick={onClose}>
              Nederdele
            </NavLink>
            <NavLink
              to="/kategori/baby/underdele/leggins-og-strompebukser"
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
            <NavLink to="/kategori/baby/fodtoj/sko" onClick={onClose}>
              Sko
            </NavLink>
            <NavLink to="/kategori/baby/fodtoj/futter" onClick={onClose}>
              Futter
            </NavLink>
            <NavLink to="/kategori/baby/fodtoj/gummistovler" onClick={onClose}>
              Gummistøvler
            </NavLink>
            <NavLink to="/kategori/baby/fodtoj/sandaler" onClick={onClose}>
              Sandaler
            </NavLink>
          </div>

          {/* Kolonne: Undertøj & nattøj, Udsalg, Nyheder. Her bruges kun hovedlinks. */}
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
