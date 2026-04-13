// "Sidst set" karrusel – henter de senest besøgte produkter fra localStorage og viser dem som produktkort.
// Returnerer null og vises ikke, hvis der ikke er nogen sidst set produkter.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import styles from "./DetailRecentProducts.module.css";

const RECENT_PRODUCTS_KEY = "recentProducts"; // Nøgle til localStorage

export default function DetailRecentProducts() {
  // State til at holde listen af sidst sete produkter
  const [recentProducts, setRecentProducts] = useState([]);

  // useEffect kører én gang ved mount og henter produkter fra localStorage
  useEffect(() => {
    // Henter og parser listen fra localStorage. Hvis der ikke er noget, bruges en tom array.
    const products =
      JSON.parse(localStorage.getItem(RECENT_PRODUCTS_KEY)) || [];
    setRecentProducts(products);
  }, []);

  // Hvis der ikke er nogen sidst sete produkter, vises intet (returnerer null)
  if (recentProducts.length === 0) return null;

  return (
    <section className={styles.recentProductsSection}>
      {/* Titel for sektionen */}
      <h3 className={styles.recentProductsTitle}>Sidst set</h3>

      {/* Karrusel med links til de sidst sete produkter */}
      <div className={styles.recentProductsCarousel}>
        {recentProducts.map((product) => (
          <Link
            key={product.id}
            to={`/produkt/${product.id}`}
            className={styles.recentProductCard}
          >
            {/* Viser produktet med ProductCard-komponenten */}
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
