// Brandside – viser alle produkter tilhørende et specifikt brand.
// Brandet hentes fra URL-parameteren (:brandSlug) og matches mod products.json.
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import styles from "../components/ProductGrid.module.css";

// brandMap bruges til at matche slug fra URL til brandnavn i data
const brandMap = {
  dilling: "Dilling",
  "konges-slojd": "Konges Slojd",
  "lil-atelier": "Lil' Atelier",
  "mar-mar-copenhagen": "MarMar Copenhagen",
  "mini-rodini": "Mini Rodini",
  "serendipity-organics": "Serendipity Organics",
  wheat: "Wheat",
};

// brandTitleMap bruges til at vise pænt navn i overskrift og brødkrumme
const brandTitleMap = {
  dilling: "Dilling",
  "konges-slojd": "Konges Sløjd",
  "lil-atelier": "Lil' Atelier",
  "mar-mar-copenhagen": "MarMar Copenhagen",
  "mini-rodini": "Mini Rodini",
  "serendipity-organics": "Serendipity Organics",
  wheat: "Wheat",
};

export default function BrandPage() {
  // Henter brandSlug fra URL'en, fx /brand/dilling => brandSlug = "dilling"
  const { brandSlug } = useParams();
  // products: alle produkter for det valgte brand
  const [products, setProducts] = useState([]);

  // brandName bruges til at matche mod data, pageTitle til visning
  const brandName = brandMap[brandSlug];
  const pageTitle = brandTitleMap[brandSlug] || brandName;

  // Brødkrumme med brandnavn
  const breadcrumbItems = [{ label: pageTitle }];

  useEffect(() => {
    async function fetchProducts() {
      // Henter alle produkter fra JSON-fil
      const response = await fetch(`${import.meta.env.BASE_URL}products.json`);
      const data = await response.json();

      // Filtrerer produkter så kun dem med det ønskede brand vises
      const brandProducts = data.filter(
        (product) =>
          product.brand &&
          product.brand.trim().toLowerCase() === brandName?.toLowerCase(),
      );

      setProducts(brandProducts);
    }

    fetchProducts();
  }, [brandName]);

  return (
    <section>
      {/* Brødkrummenavigation med brandnavn */}
      <Breadcrumbs items={breadcrumbItems} />
      {/* Overskrift med pænt brandnavn */}
      <h1>{pageTitle}</h1>

      {/* Grid med alle produkter for brandet */}
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
