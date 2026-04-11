// "Relaterede produkter" karrusel – viser produkter fra samme underkategori som det aktuelle produkt.
// Hvis der er færre end 4, suppleres der med produkter fra samme brand.
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import styles from "./DetailRelatedProducts.module.css";

export default function DetailRelatedProducts({ currentProduct, allProducts }) {
  // Filtrer relaterede produkter ud fra under_kategori, men udelad det aktuelle produkt
  let relatedProducts = allProducts.filter(
    (product) =>
      product.under_kategori === currentProduct.under_kategori &&
      product.id !== currentProduct.id,
  );

  // Hvis der er under 4 relaterede produkter, suppleres med produkter fra samme brand
  // Der tjekkes for at undgå duplikater (samme id må ikke optræde to gange)
  if (relatedProducts.length < 4) {
    const brandProducts = allProducts.filter(
      (product) =>
        product.brand === currentProduct.brand &&
        product.id !== currentProduct.id &&
        !relatedProducts.some((p) => p.id === product.id), // Undgå duplikater
    );
    relatedProducts = [...relatedProducts, ...brandProducts];
  }

  // Hvis der slet ikke er nogen relaterede produkter, vises intet
  if (relatedProducts.length === 0) return null;

  return (
    <section className={styles.relatedProductsSection}>
      <div className={styles.relatedProductsHeader}>
        <h3>Relaterede produkter</h3>
      </div>
      {/* Karrusel med links til relaterede produkter */}
      <div className={styles.relatedProductsCarousel}>
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/produkt/${product.id}`}
            className={styles.relatedProductCard}
          >
            {/* Produktkort for hvert relateret produkt */}
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
