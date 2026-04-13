// Dreng dropdown-menu – navigationsoverlay der viser underkategorier til drenge-sektionen.
// Lukkes ved klik på baggrunden eller krydset via onClose-prop.
import { NavLink } from "react-router-dom";
import "./Dropdown.css";
import dropdownbaggrund from "../image/kategoridrengdropdown.svg";
import kryds from "../image/kryds.svg";

export default function DrengDropdown({ onClose }) {
  return (
    // Overlay der dækker hele skærmen. Klik på baggrunden lukker menuen (onClose)
    <div className="dropdown-overlay" onClick={onClose}>
      {/* Selve dropdown-menuen. onClick med stopPropagation forhindrer at klik inde i menuen lukker overlayet. */}
      <div
        className="kategoridropdown"
        onClick={(e) => e.stopPropagation()} // Forhindrer at klik bobler op og lukker overlayet
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
              to="/kategori/dreng/overtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Overtøj
            </NavLink>
            {/* Underkategorier til overtøj. onClick={onClose} lukker dropdown ved navigation. */}
            <NavLink to="/kategori/dreng/overtoj/flyverdragt" onClick={onClose}>
              Flyverdragt
            </NavLink>
            <NavLink to="/kategori/dreng/overtoj/regntoj" onClick={onClose}>
              Regntøj
            </NavLink>
            <NavLink to="/kategori/dreng/overtoj/jakker" onClick={onClose}>
              Jakker
            </NavLink>
            <NavLink
              to="/kategori/dreng/overtoj/huer-og-vanter"
              onClick={onClose}
            >
              Huer og vanter
            </NavLink>
            <NavLink to="/kategori/dreng/overtoj/termotoj" onClick={onClose}>
              Termotøj
            </NavLink>
          </div>

          {/* Kolonne: Overdele */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/overdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Overdele
            </NavLink>
            {/* Underkategorier til overdele */}
            <NavLink to="/kategori/dreng/overdele/strik" onClick={onClose}>
              Strik
            </NavLink>
            <NavLink to="/kategori/dreng/overdele/bluser" onClick={onClose}>
              Bluser
            </NavLink>
            <NavLink to="/kategori/dreng/overdele/skjorter" onClick={onClose}>
              Skjorter
            </NavLink>
            <NavLink to="/kategori/dreng/overdele/t-shirt" onClick={onClose}>
              T-shirt
            </NavLink>
          </div>

          {/* Kolonne: Accessories */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/accessories"
              onClick={onClose}
              className="dropdown-title"
            >
              Accessories
            </NavLink>
            {/* Underkategorier til accessories */}
            <NavLink
              to="/kategori/dreng/accessories/stromper"
              onClick={onClose}
            >
              Strømper
            </NavLink>
            <NavLink to="/kategori/dreng/accessories/hatte" onClick={onClose}>
              Hatte
            </NavLink>
            <NavLink to="/kategori/dreng/accessories/badetoj" onClick={onClose}>
              Badetøj
            </NavLink>
          </div>

          {/* Kolonne: Underdele */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/underdele"
              onClick={onClose}
              className="dropdown-title"
            >
              Underdele
            </NavLink>
            {/* Underkategorier til underdele */}
            <NavLink to="/kategori/dreng/underdele/shorts" onClick={onClose}>
              Shorts
            </NavLink>
            <NavLink to="/kategori/dreng/underdele/jeans" onClick={onClose}>
              Jeans
            </NavLink>
            <NavLink to="/kategori/dreng/underdele/bukser" onClick={onClose}>
              Bukser
            </NavLink>
            <NavLink to="/kategori/dreng/underdele/stromper" onClick={onClose}>
              Strømper
            </NavLink>
          </div>

          {/* Kolonne: Fodtøj */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/fodtoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Fodtøj
            </NavLink>
            {/* Underkategorier til fodtøj */}
            <NavLink to="/kategori/dreng/fodtoj/sko" onClick={onClose}>
              Sko
            </NavLink>
            <NavLink to="/kategori/dreng/fodtoj/stovler" onClick={onClose}>
              Støvler
            </NavLink>
            <NavLink to="/kategori/dreng/fodtoj/gummistovler" onClick={onClose}>
              Gummistøvler
            </NavLink>
            <NavLink to="/kategori/dreng/fodtoj/sandaler" onClick={onClose}>
              Sandaler
            </NavLink>
          </div>

          {/* Kolonne: Undertøj & nattøj, Udsalg, Nyheder. Her bruges kun hovedlinks. */}
          <div className="dropdown-column">
            <NavLink
              to="/kategori/dreng/undertojognattoj"
              onClick={onClose}
              className="dropdown-title"
            >
              Undertøj & nattøj
            </NavLink>
            <NavLink
              to="/kategori/dreng/udsalg"
              onClick={onClose}
              className="dropdown-title"
            >
              Udsalg
            </NavLink>
            <NavLink
              to="/kategori/dreng/nyheder"
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
