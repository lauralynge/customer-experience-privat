// Produktkort – viser produktbillede, nyhed/sale-ikoner, favorit-hjerte, produktnavn og pris.
// Linker til produktdetaljesiden baseret på produkt-id eller variant-id.
import { Link } from "react-router-dom"; // Korrekt import til routing
import styles from "./ProductCard.module.css";
import HeartIcon from "./HeartIcon";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/sale-ikon.svg";
// withBase prepender Vite's BASE_URL til billedstier, så billeder vises korrekt – især hvis projektet hostes i et subdirectory (fx på GitHub Pages).
import { withBase } from "../utils/productFilters";

// Funktion der finder det første billede, enten fra images eller fra variant
function getFirstImage(product) {
  // 1. Hvis produktet har et images-array med mindst ét billede, bruges det første billede
  if (product.images && product.images.length > 0) {
    // withBase sikrer at billedstien virker både lokalt og på fx GitHub Pages
    return withBase(product.images[0]);
  }
  // 2. Hvis produktet har varianter, og første variant har billeder, bruges det første billede fra første variant
  if (
    product.variants &&
    product.variants.length > 0 &&
    product.variants[0].images &&
    product.variants[0].images.length > 0
  ) {
    return withBase(product.variants[0].images[0]);
  }
  // 3. Hvis ingen billeder findes, bruges en standard placeholder-billede
  return withBase("/images/placeholder.jpg");
}

export default function ProductCard({ product, className }) {
  return (
    <div className={className}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {/* Klikbart billede: Linker til produktets detaljeside. Hvis der er variantId, dannes URL med variant, ellers kun id. */}
          <Link
            to={
              product.variantId
                ? `/produkt/${product.parentId || product.id}-${product.variantId}`
                : `/produkt/${product.id}`
            }
            onClick={() => window.scrollTo(0, 0)} // Scroll til top ved navigation
            className={styles.cardLink}
          >
            {/* Viser første billede eller placeholder hvis ingen billeder */}
            <img
              src={getFirstImage(product)}
              alt={product.title}
              className={styles.image}
            />
          </Link>
          {/* TopBar med ikoner */}
          <div className={styles.topBar}>
            <div className={styles.leftIcons}>
              {/* Nyhed-ikon vises hvis produktet er markeret som nyhed */}
              {product.news && (
                <img src={nyhedIcon} alt="Nyhed" className={styles.nyhedBoks} />
              )}
              {/* Sale-ikon vises hvis produktet er på tilbud */}
              {product.sale && (
                <img src={saleIcon} alt="Sale" className={styles.saleBoks} />
              )}
            </div>
            <div className={styles.heartWrapper}>
              {/* Favorit-hjerte. Kan evt. udvides med logik til at gemme favoritter */}
              <HeartIcon className={styles.heartIcon} />
            </div>
          </div>
        </div>
        {/* Klikbart info-område: Link til detaljeside med navn og pris */}
        <Link
          to={
            product.variantId
              ? `/produkt/${product.parentId || product.id}-${product.variantId}`
              : `/produkt/${product.id}`
          }
          onClick={() => window.scrollTo(0, 0)}
          className={styles.cardLink}
        >
          <div className={styles.info}>
            {/* Produktnavn eller fallback hvis titel mangler */}
            <h6 className={styles.title}>{product.title || "Produktnavn"}</h6>
            {/* Pris i DKK */}
            <p className={styles.price}>{product.price} DKK</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
