// Produktgrid til baby-siden – henter alle baby-produkter fra products.json og flader varianter ud til individuelle kort.
// Indeholder kategorifilterpanel og avanceret filteroverlay.
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";
import Breadcrumbs from "./Breadcrumbs";
import sun from "../image/product-page-sun.svg";
import FilterOverlay from "./FilterOverlay";
import {
  applyProductFilters,
  buildFilterOptions,
  createEmptyFilters,
} from "../utils/productFilters";

export default function ProductGridBaby() {
  // products: alle baby-produkter (inkl. varianter fladet ud)
  const [products, setProducts] = useState([]);
  // selectedCategory: aktiv hovedkategori (fx "Overdele"), "all" viser alle
  const [selectedCategory, setSelectedCategory] = useState("all");
  // isMobileFilterOpen: styrer om filter-overlayet er åbent på mobil
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // activeFilters: de filtre der aktuelt er gældende
  const [activeFilters, setActiveFilters] = useState(createEmptyFilters());
  // draftFilters: bruges til at lave ændringer i filter-overlayet uden at de slår igennem før man trykker "Anvend"
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters());

  // useEffect henter produkter og flader varianter ud
  useEffect(() => {
    async function fetchProducts() {
      const url = `${import.meta.env.BASE_URL}products.json`;
      const response = await fetch(url);
      const data = await response.json();

      // Flad listen ud, så hver variant bliver et produktkort
      // Hvis et produkt har varianter, laves et kort for hver variant med relevante props
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

      // Filtrér på gender EFTER flatten, så kun baby-produkter vises
      const babyProducts = allProducts.filter(
        (product) => product.gender === "Baby",
      );

      setProducts(babyProducts);
      setSelectedCategory("all");
      setActiveFilters(createEmptyFilters());
      setDraftFilters(createEmptyFilters());
    }
    fetchProducts();
  }, []);

  // Find unikke over_kategorier til filterpanel
  const categories = [
    ...new Set(products.map((product) => product.over_kategori)),
  ].sort();

  // Filtrér produkter efter valgt hovedkategori
  const shownProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.over_kategori === selectedCategory,
        );

  // Bygger filtermuligheder (fx farver, størrelser, brands) ud fra de viste produkter
  const filterOptions = buildFilterOptions(products);
  // Filtrerer produkterne yderligere ud fra aktive filtre (fx farve, størrelse)
  const finalProducts = applyProductFilters(shownProducts, activeFilters);

  // Funktioner til at åbne/lukke og anvende/nulstille filter-overlay på mobil
  const openMobileFilter = () => {
    setDraftFilters(activeFilters);
    setIsMobileFilterOpen(true);
  };

  const applyMobileFilter = () => {
    setActiveFilters(draftFilters);
    setIsMobileFilterOpen(false);
  };

  const resetMobileFilter = () => {
    const empty = createEmptyFilters();
    setActiveFilters(empty);
    setDraftFilters(empty);
    setSelectedCategory("all");
  };

  return (
    <div>
      {/* Brødkrummenavigation */}
      <Breadcrumbs items={[{ label: "Baby" }]} />
      <section className={styles.headerSection}>
        <h1>Baby</h1>
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
