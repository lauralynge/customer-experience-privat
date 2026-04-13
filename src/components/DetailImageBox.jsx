// Produktbilledgalleri – viser produktbilleder med dot-navigation, thumbnail-række og nyhed/sale-ikoner.
// Håndterer både produkter med direkte billeder og produkter med varianter.
import { useEffect, useState } from "react";
import styles from "./DetailImageBox.module.css";
import HeartIcon from "./HeartIcon";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/sale-ikon.svg";
import { withBase } from "../utils/productFilters";

export default function DetailImageBox({ product, className }) {
  // validImages indeholder de billeder, der skal vises (filtreret og med base-path tilføjet)
  const [validImages, setValidImages] = useState([]);
  // activeIndex angiver hvilket billede der vises som hovedbillede
  const [activeIndex, setActiveIndex] = useState(0);

  // Hvis der ikke er noget produkt, vises intet
  if (!product) return null;

  // useEffect opdaterer billederne hver gang produktet ændrer sig
  useEffect(() => {
    // Finder billeder: først direkte på produktet, ellers på første variant, ellers placeholder
    const images =
      product.images && product.images.length > 0
        ? product.images
        : product.variants &&
            product.variants.length > 0 &&
            product.variants[0].images &&
            product.variants[0].images.length > 0
          ? product.variants[0].images
          : ["/images/placeholder.jpg"];

    // Filtrerer tomme billeder fra og tilføjer base-path
    setValidImages(
      images.filter((src) => src && src.trim() !== "").map(withBase),
    );
    // Starter altid med første billede
    setActiveIndex(0);
  }, [product]);

  // Funktion der kan bruges til at håndtere fejl ved billedindlæsning (fx fallback eller log)
  function handleImageError(src) {
    // Du kan fx sætte et fallback billede eller logge fejl
    console.warn("Billedet kunne ikke indlæses:", src);
  }

  return (
    <div className={className}>
      <section className={styles.imageWrapper}>
        {/* Vis det aktive billede */}
        {validImages[activeIndex] && (
          <img
            src={validImages[activeIndex]}
            alt={product.title}
            className={styles.image}
            onError={() => handleImageError(validImages[activeIndex])}
          />
        )}
        {/* Topbar med nyhed/sale og favorit */}
        <div className={styles.topBar}>
          <div className={styles.leftIcons}>
            {/* Viser nyhed-ikon hvis produktet er markeret som nyhed */}
            {product.news && (
              <img src={nyhedIcon} alt="Nyhed" className={styles.nyhedBoks} />
            )}
            {/* Viser sale-ikon hvis produktet er på tilbud */}
            {product.sale && (
              <img src={saleIcon} alt="Sale" className={styles.saleBoks} />
            )}
          </div>
          {/* Hjerte-ikon til favorit */}
          <div className={styles.heartWrapper}>
            <HeartIcon className={styles.heartIcon} />
          </div>
        </div>
        {/* Dot-navigation under hovedbilledet. Klik på en dot skifter billede. */}
        <div className={styles.dotWrapper}>
          {validImages.map((_, idx) => (
            <span
              key={idx}
              className={
                idx === activeIndex
                  ? styles.dot + " " + styles.activeDot
                  : styles.dot
              }
              onClick={() => setActiveIndex(idx)}
            />
          ))}
        </div>
        {/* Billedrække med thumbnails. Klik på et thumbnail skifter hovedbilledet. */}
        <div className={styles.imageRow}>
          {validImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt=""
              className={styles.variantImage}
              onClick={() => setActiveIndex(idx)}
              onError={() => handleImageError(src)}
            />
          ))}
          {/* Viser tomme pladsholdere hvis der er færre end 4 billeder, så layoutet bevares */}
          {Array.from({ length: 4 - validImages.length }).map((_, idx) => (
            <div key={`ph-${idx}`} className={styles.variantImage} />
          ))}
        </div>
      </section>
    </div>
  );
}
