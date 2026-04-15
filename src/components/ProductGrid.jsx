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

// ProductGrid er en generisk komponent til at vise produktgrids for alle køn, nyheder, udsalg osv.
// Den tager props: genderTypes (array af køn, fx ["dreng", "unisex"]), title (overskrift), og filterBy (ekstra filter, fx {news: true})
export default function ProductGrid({
  genderTypes = [],
  title,
  filterBy = {},
}) {
  // State til de produkter der skal vises
  const [products, setProducts] = useState([]);
  // State til valgt hovedkategori (fx "overdele"), "all" viser alle
  const [selectedCategory, setSelectedCategory] = useState("all");
  // State til om filter-overlayet er åbent på mobil
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // State til aktive filtre (farve, brand, størrelse osv.)
  const [activeFilters, setActiveFilters] = useState(createEmptyFilters());
  // State til kladde-filtre i overlayet (ændres først når "Anvend" trykkes)
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters());

  // Henter produkter fra products.json og flader varianter ud
  useEffect(() => {
    async function fetchProducts() {
      // Hent JSON-data
      const url = `${import.meta.env.BASE_URL}products.json`;
      const response = await fetch(url);
      const data = await response.json();

      // Flad listen ud, så hver variant bliver et produktkort
      // (fx samme produkt i flere farver/størrelser)
      const allProducts = data.flatMap((product) => {
        if (product.variants && product.variants.length > 0) {
          // Hvis produktet har varianter, lav et kort for hver variant
          return product.variants.map((variant) => ({
            ...variant,
            id: product.id + "-" + variant.variantId, // Unik id for varianten
            parentId: product.id, // Reference til hovedprodukt
            mainTitle: product.title, // Hovedtitel
            price: product.price,
            gender: variant.gender || product.gender, // Brug variantens gender hvis den findes
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
        // Hvis ikke, returnér produktet som det er
        return [product];
      });

      // Filtrér på køn og evt. ekstra filter (fx news/sale)
      // genderTypes: array af køn, fx ["dreng", "unisex"]
      // filterBy: ekstra filter, fx {news: true}
      const filteredProducts = allProducts.filter((product) => {
        // Gender filter: tjek om mindst ét køn matcher
        const genderMatch = Array.isArray(product.gender)
          ? product.gender.some((g) => genderTypes.includes(g))
          : genderTypes.includes(product.gender);
        // Ekstra filter: alle key/value-par i filterBy skal matche
        const extraMatch = Object.entries(filterBy || {}).every(
          ([key, value]) => product[key] === value,
        );
        return genderMatch && extraMatch;
      });

      // Sæt state med de filtrerede produkter
      setProducts(filteredProducts);
      setSelectedCategory("all");
      setActiveFilters(createEmptyFilters());
      setDraftFilters(createEmptyFilters());
    }
    fetchProducts();
  }, [genderTypes, filterBy]);

  // Find unikke hovedkategorier (over_kategori) til kategori-knapper
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

  // Byg filtermuligheder (farver, brands, størrelser osv.) ud fra viste produkter
  const filterOptions = buildFilterOptions(products);
  // Filtrér produkter yderligere ud fra aktive filtre (fx farve, brand, størrelse)
  const finalProducts = applyProductFilters(shownProducts, activeFilters);

  // Åbn filter-overlay på mobil
  const openMobileFilter = () => {
    setDraftFilters(activeFilters);
    setIsMobileFilterOpen(true);
  };

  // Anvend filtre fra overlay
  const applyMobileFilter = () => {
    setActiveFilters(draftFilters);
    setIsMobileFilterOpen(false);
  };

  // Nulstil alle filtre og kategori
  const resetMobileFilter = () => {
    const empty = createEmptyFilters();
    setActiveFilters(empty);
    setDraftFilters(empty);
    setSelectedCategory("all");
  };

  return (
    <div>
      {/* Brødkrumme-navigation */}
      <Breadcrumbs items={[{ label: title }]} />
      {/* Header med titel og grafik */}
      <section className={styles.headerSection}>
        <h1>{title}</h1>
        <img src={sun} alt="sol grafik" />
      </section>
      {/* Kategori-knapper (fx Overdele, Underdele, Accessories) */}
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
      {/* Produktgrid med alle viste produkter */}
      <div className={styles.productGrid}>
        {finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
