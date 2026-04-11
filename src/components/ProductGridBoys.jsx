// Produktgrid til drenge-siden – henter drenge- og unisex-produkter fra products.json.
// Indeholder kategorifilterpanel og avanceret filteroverlay.
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";
import FilterOverlay from "./FilterOverlay";
import sun from "../image/product-page-sun.svg";
import {
  applyProductFilters,
  buildFilterOptions,
  createEmptyFilters,
} from "../utils/productFilters";

export default function ProductGridBoys() {
  // products: alle drenge/unisex-produkter (inkl. varianter fladet ud)
  const [products, setProducts] = useState([]);
  // selectedCategory: aktiv hovedkategori (fx "Overdele"), "all" viser alle
  const [selectedCategory, setSelectedCategory] = useState("all");
  // isMobileFilterOpen: styrer om filter-overlayet er åbent på mobil
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // activeFilters: de filtre der aktuelt er gældende
  const [activeFilters, setActiveFilters] = useState(createEmptyFilters());
  // draftFilters: bruges til at lave ændringer i filter-overlayet uden at de slår igennem før man trykker "Anvend"
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters());

  useEffect(() => {
    async function fetchProducts() {
      const url = `${import.meta.env.BASE_URL}products.json`;
      const response = await fetch(url);
      const data = await response.json();
      // Først: flad listen ud, så hver variant bliver et produktkort
      // Dette sikrer at alle varianter (fx farver/størrelser) vises som individuelle kort
      const allProducts = data.flatMap((product) => {
        if (product.variants && product.variants.length > 0) {
          return product.variants.map((variant) => ({
            ...variant,
            id: product.id + "-" + variant.variantId, // fx "142-v1"
            parentId: product.id,
            mainTitle: product.title,
            price: product.price,
            gender: variant.gender || product.gender,
            over_kategori: product.over_kategori,
            under_kategori: product.under_kategori,
            brand: product.brand,
            description: product.description,
            materiale: product.materiale,
            pasform: product.pasform,
            rating: product.rating,
            news: product.news,
            sale: product.sale,
            available: product.available,
            images: variant.images || product.images,
          }));
        }
        return [product];
      });

      // Filtrér på gender EFTER flatten, så både "Dreng" og "Unisex" (og arrays med disse værdier) inkluderes
      // Dette sikrer at produkter, der er markeret som "Unisex" eller har flere køn, også vises
      const boysAndUnisex = allProducts.filter(
        (product) =>
          product.gender === "Dreng" ||
          product.gender === "Unisex" ||
          (Array.isArray(product.gender) && product.gender.includes("Dreng")) ||
          (Array.isArray(product.gender) && product.gender.includes("Unisex")),
      );

      setProducts(boysAndUnisex);
      setSelectedCategory("all");
      setActiveFilters(createEmptyFilters());
      setDraftFilters(createEmptyFilters());
    }
    fetchProducts();
  }, []);

  // Find unikke over_kategorier til filterpanel
  // Vi bruger Set for at få unikke værdier, så der kun vises én knap pr. hovedkategori
  const categories = [
    ...new Set(products.map((product) => product.over_kategori)),
  ].sort();

  // Filtrér produkter efter valgt hovedkategori
  // Hvis "all" er valgt, vises alle produkter. Ellers vises kun produkter fra den valgte kategori
  const shownProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.over_kategori === selectedCategory,
        );

  // Bygger filtermuligheder (fx farver, størrelser, brands) ud fra de viste produkter
  // Dette bruges til at vise relevante filtre i overlayet
  const filterOptions = buildFilterOptions(products);
  // Filtrerer produkterne yderligere ud fra aktive filtre (fx farve, størrelse)
  // applyProductFilters håndterer alle avancerede filtre
  const finalProducts = applyProductFilters(shownProducts, activeFilters);

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

  // Nulstiller alle filtre (både aktive og kladde) og sætter kategori til "all"
  const resetMobileFilter = () => {
    const empty = createEmptyFilters();
    setActiveFilters(empty);
    setDraftFilters(empty);
    setSelectedCategory("all");
  };

  return (
    <div>
      {/* Brødkrummenavigation */}
      <Breadcrumbs items={[{ label: "Dreng" }]} />
      <section className={styles.headerSection}>
        <h1>Drenge</h1>
        <img src={sun} alt="sol grafik" />
      </section>

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

      {/* Panel med knapper til at vælge hovedkategori */}
      <section className={styles.filterPanel} aria-label="Product filters">
        <div className={styles.categoryButtons}>
          <button
            type="button"
            className={`${styles.categoryButton} ${selectedCategory === "all" ? styles.activeCategoryButton : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            Alle
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.activeCategoryButton : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      {/* Grid med alle viste produkter */}
      <div className={styles.productGrid}>
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
