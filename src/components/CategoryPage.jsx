// Dynamisk kategoriside – viser produkter filtreret på køn, overkategori og underkategori fra URL-parametre.
// Indeholder også avanceret filteroverlay med sortering, farver, størrelser og brands.
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";
import CategoryFilterPanel from "./CategoryFilterPanel";
import FilterOverlay from "./FilterOverlay";
import {
  applyProductFilters,
  buildFilterOptions,
  createEmptyFilters,
} from "../utils/productFilters";

// Mapping fra URL-parametre til pæne labels til visning og filtrering
const genderMap = {
  baby: "Baby",
  pige: "Pige",
  dreng: "Dreng",
};

const mainCategoryMap = {
  overtoj: "Overtøj",
  overdele: "Overdele",
  accessories: "Accessories",
  underdele: "Underdele",
  fodtoj: "Fodtøj",
  undertojognattoj: "Undertøj & nattøj",
  udsalg: "Udsalg",
  nyheder: "Nyheder",
};

const subMap = {
  flyverdragt: "Flyverdragt",
  regntoj: "Regntøj",
  jakker: "Jakke",
  huerogvanter: "Hue og vanter",
  termotoj: "Termotøj",

  strik: "Strik",
  bluser: "Bluse",
  skjorter: "Skjorte",
  tshirt: "T-shirt",
  kjoler: "Kjole",
  bodyer: "Bodyer",
  cardigans: "Cardigan",

  stromper: "Strømper",
  hatte: "Hat",
  badetoj: "Badetøj",
  harpynt: "Hårpynt",

  shorts: "Shorts",
  jeans: "Jeans",
  bukser: "Bukser",
  nederdele: "Nederdel",
  legginsogstrompebukser: "Leggins og strømpebukser",

  sko: "Sko",
  stovler: "Støvler",
  gummistovler: "Gummistøvler",
  sandaler: "Sandaler",
  futter: "Futter",
};

export default function CategoryPage() {
  // Henter parametre fra URL'en, fx /pige/overdele/strik
  // Disse bruges til at filtrere produkterne og vise korrekt breadcrumb og overskrift
  const { gender, mainCategory, subcategory } = useParams();
  // products: alle produkter der matcher filtrene.
  // Indeholder listen af produkter, der skal vises. Opdateres når du henter eller filtrerer produkter.
  const [products, setProducts] = useState([]);
  // isMobileFilterOpen: styrer om filter-overlayet er åbent eller lukket på mobil
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // activeFilters: de filtre der aktuelt er gældende (fx valgt farve, størrelse, kategori).
  const [activeFilters, setActiveFilters] = useState(createEmptyFilters());
  // draftFilters: bruges til at lave ændringer i filter-overlayet uden at de slår igennem før man trykker "Anvend"
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters());

  // useEffect henter produkter og filtrerer dem ud fra URL-parametre
  useEffect(() => {
    async function fetchProducts() {
      // Henter alle produkter fra en lokal JSON-fil
      const response = await fetch(`${import.meta.env.BASE_URL}products.json`);
      const data = await response.json();

      let filtered = data;
      const initialFilters = createEmptyFilters();

      // Filtrerer på køn hvis det findes i URL'en (fx "pige" -> "Pige")
      if (genderMap[gender]) {
        filtered = filtered.filter((p) => p.gender === genderMap[gender]);
      }

      // Filtrerer på udsalg eller nyheder hvis det vælges i URL'en
      // Hvis mainCategory er "udsalg", vis kun produkter med sale=true
      // Hvis mainCategory er "nyheder", vis kun produkter med news=true
      // Ellers filtreres på overkategori (fx "overdele")
      if (mainCategory === "udsalg") {
        filtered = filtered.filter((p) => p.sale === true);
      } else if (mainCategory === "nyheder") {
        filtered = filtered.filter((p) => p.news === true);
      } else if (mainCategoryMap[mainCategory]) {
        filtered = filtered.filter(
          (p) => p.over_kategori === mainCategoryMap[mainCategory],
        );
      }

      // Hvis der er valgt en underkategori (fx "strik"), sættes types-filtret til denne
      // Dette bruges til at forudvælge filteret i filter-overlay og knapper
      if (subcategory) {
        const mappedSub = subMap[subcategory];
        if (mappedSub) {
          initialFilters.types = [mappedSub];
        }
      }

      // Opdaterer state med filtrerede produkter og filtre
      setProducts(filtered);
      setActiveFilters(initialFilters);
      setDraftFilters(initialFilters);
    }

    // Kører fetchProducts hver gang URL-parametre ændrer sig
    fetchProducts();
  }, [gender, mainCategory, subcategory]);

  // Når brugeren vælger en underkategori i filter-panelet (CategoryFilterPanel)
  // Opdaterer både aktive og kladde-filtre, så UI og overlay matcher
  const handleSubCategoryChange = (sub) => {
    // Hvis "all" vælges, fjernes types-filtret, ellers sættes det til den valgte underkategori
    const nextTypes = sub === "all" ? [] : [sub];
    setActiveFilters((prev) => ({
      ...prev,
      types: nextTypes,
    }));
    setDraftFilters((prev) => ({
      ...prev,
      types: nextTypes,
    }));
  };

  // Udleder alle unikke underkategorier fra de filtrerede produkter
  // Bruges til at vise knapper i CategoryFilterPanel
  const subCategories = [
    ...new Set(products.map((p) => p.under_kategori)),
  ].sort();

  // Bygger filtermuligheder (fx farver, størrelser, brands) ud fra de viste produkter
  // Bruges til at vise relevante filtermuligheder i FilterOverlay
  const filterOptions = buildFilterOptions(products);
  // Filtrerer produkterne yderligere ud fra aktive filtre (fx farve, størrelse)
  // applyProductFilters håndterer alle avancerede filtre
  const finalProducts = applyProductFilters(products, activeFilters);

  // Funktioner til at åbne/lukke og anvende/nulstille filter-overlay på mobil
  // Når overlay åbnes, kopieres de aktive filtre til kladde
  const openMobileFilter = () => {
    setDraftFilters(activeFilters);
    setIsMobileFilterOpen(true);
  };

  // Når brugeren trykker "Anvend" i overlayet, kopieres kladde-filtre til aktive filtre
  const applyMobileFilter = () => {
    setActiveFilters(draftFilters);
    setIsMobileFilterOpen(false);
  };

  // Nulstiller alle filtre (både aktive og kladde) og lukker overlay
  const resetMobileFilter = () => {
    const empty = createEmptyFilters();
    setActiveFilters(empty);
    setDraftFilters(empty);
  };

  return (
    <div>
      {/* Brødkrummenavigation – viser hvor brugeren er i kategorihierarkiet */}
      <Breadcrumbs />

      {/* Overskrift med pæn label for hovedkategori (fx "Overdele") */}
      <h1>{mainCategoryMap[mainCategory] || mainCategory}</h1>

      {/* Filter-overlay til mobil (sortering, farver, størrelser, brands) */}
      <FilterOverlay
        isOpen={isMobileFilterOpen}
        onOpen={openMobileFilter}
        onClose={() => setIsMobileFilterOpen(false)}
        options={filterOptions}
        draftFilters={draftFilters}
        onDraftFiltersChange={setDraftFilters}
        onReset={resetMobileFilter}
        onApply={applyMobileFilter}
      />

      {/* Panel med knapper til at vælge underkategori (fx "Strik", "Bluser") */}
      <CategoryFilterPanel
        subCategories={subCategories}
        selectedSub={activeFilters.types[0] || "all"}
        setSelectedSub={handleSubCategoryChange}
      />

      {/* Grid med alle viste produkter efter filtrering */}
      <div className={styles.productGrid}>
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
