// Brødkrummenavigation – opbygger automatisk navigation ud fra URL-parametre (køn, kategori, underkategori).
// Kan også modtage eksplicitte items-props fra forrældrekomponenten.
import { NavLink, useParams } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  // Henter parametre fra URL'en, fx /pige/overdele/strik giver gender="pige", mainCategory="overdele", subcategory="strik"
  const { gender, mainCategory, subcategory } = useParams();

  // Map der oversætter tekniske URL-værdier til pæne labels til visning i brødkrummen.
  // Fx "overtoj" bliver til "Overtøj". Hvis en værdi ikke findes i mappet, vises den rå værdi.
  const labelMap = {
    baby: "Baby",
    pige: "Pige",
    dreng: "Dreng",

    overtoj: "Overtøj",
    overdele: "Overdele",
    accessories: "Accessories",
    underdele: "Underdele",
    fodtoj: "Fodtøj",
    undertojognattoj: "Undertøj & nattøj",

    udsalg: "Udsalg",
    nyheder: "Nyheder",
    inspiration: "Inspiration",

    flyverdragt: "Flyverdragt",
    regntoj: "Regntøj",
    jakker: "Jakker",
    huerogvanter: "Huer og vanter",
    termotoj: "Termotøj",

    strik: "Strik",
    bluser: "Bluser",
    skjorter: "Skjorter",
    tshirt: "T-shirt",
    kjoler: "Kjoler",
    bodyer: "Bodyer",
    cardigans: "Cardigans",

    stromper: "Strømper",
    hatte: "Hatte",
    badetoj: "Badetøj",
    harpynt: "Hårpynt",

    shorts: "Shorts",
    jeans: "Jeans",
    bukser: "Bukser",
    nederdele: "Nederdele",
    legginsogstrompebukser: "Leggins og strømpebukser",

    sko: "Sko",
    stovler: "Støvler",
    gummistovler: "Gummistøvler",
    sandaler: "Sandaler",
    futter: "Futter",
  };

  // Funktion der slår op i labelMap og returnerer en pæn label, eller bare værdien hvis den ikke findes i mappet.
  const getLabel = (value) => labelMap[value] || value;

  // Bygger automatisk en liste af breadcrumb-items ud fra de URL-parametre, der er til stede.
  // Hvis fx kun gender og mainCategory er i URL'en, bliver listen kun to elementer lang.
  // Hvert item er et objekt med en label (og evt. en 'to'-prop hvis man vil gøre det til et link).
  const autoItems = [
    gender && { label: getLabel(gender) },
    mainCategory && { label: getLabel(mainCategory) },
    subcategory && { label: getLabel(subcategory) },
  ].filter(Boolean); // Fjerner tomme værdier, så kun udfyldte parametre bliver til items

  // Hvis komponenten får en 'items'-prop udefra, bruges den. Ellers bruges autoItems fra URL.
  const breadcrumbItems = items || autoItems;

  return (
    // Wrapper med styling til brødkrummen
    <nav className={styles.breadcrumbs}>
      {/* Første led i brødkrummen er altid et link til forsiden */}
      <NavLink to="/">Forside</NavLink>

      {/* Mapper over alle items og viser dem i rækkefølge. Hvis item har en 'to'-prop, vises det som link, ellers som tekst. */}
      {breadcrumbItems.map((item, index) => (
        <span key={index}>
          {" > "}
          {item.to ? (
            <NavLink to={item.to}>{item.label}</NavLink>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
