// Produktdetaljeside – viser alt information om ét produkt.
// Henter produktet (eller en variant) fra products.json baseret på id i URL-parameteren.
// Gemmer besøgte produkter i localStorage til "Sidst set"-karrusellen.
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import DetailImageBox from "../components/DetailImageBox";
import DetailInfoBox from "../components/DetailInfoBox";
import styles from "./DetailPage.module.css";
import DetailRecentProducts from "../components/DetailRecentProducts";
import DetailRelatedProducts from "../components/DetailRelatedProducts";

const RECENT_PRODUCTS_KEY = "recentProducts";

export default function DetailPage() {
  const { id } = useParams(); // Henter produkt-id fra URL
  const [product, setProduct] = useState(null); // State til det aktuelle produkt
  const [allProducts, setAllProducts] = useState([]); // Alle produkter til relaterede produkter
  const location = useLocation();

  // Henter produktdata fra products.json baseret på id
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}products.json`);
      const products = await response.json();
      setAllProducts(products);

      // Find hovedprodukt eller variant
      // Først søges efter et produkt med matching id
      let foundProduct = products.find((p) => p.id == id);

      // Hvis ikke fundet, søges efter variant (fx id = "142-v1")
      if (!foundProduct) {
        for (const p of products) {
          if (p.variants && Array.isArray(p.variants)) {
            const variant = p.variants.find(
              (v) => `${p.id}-${v.variantId}` === id,
            );
            if (variant) {
              // Kombinerer hovedprodukt og variant-data
              foundProduct = {
                ...p,
                ...variant,
                id: `${p.id}-${variant.variantId}`,
                parentId: p.id,
                images: variant.images, // Sikrer at billederne er fra varianten!
              };
              break;
            }
          }
        }
      }

      setProduct(foundProduct);
    };
    fetchProduct();
  }, [id]);

  // Gemmer det aktuelle produkt i localStorage, så det kan vises i "sidst set"-karrusellen
  useEffect(() => {
    if (!product) return;
    let products = JSON.parse(localStorage.getItem(RECENT_PRODUCTS_KEY)) || [];
    products = products.filter((p) => p.id !== product.id); // Fjerner duplikater
    products.unshift(product); // Tilføjer det aktuelle produkt forrest
    products = products.slice(0, 10); // Begrænser til de 10 nyeste produkter
    localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(products)); // Gemmer listen
  }, [product]);

  // Scroller til toppen når man skifter produkt (ny URL)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Viser loading, hvis produktet ikke er hentet endnu
  if (!product) return <div>Loading...</div>;

  return (
    <>
      <div>
        {/* Brødkrummenavigation */}
        <Breadcrumbs />
      </div>
      <main>
        <section className={styles["product-detail"]}>
          {/* Produktbillede */}
          <DetailImageBox product={product} className={styles.imageBox} />
          {/* Produktinfo */}
          <div>
            <DetailInfoBox product={product} className={styles.infoBox} />
          </div>
        </section>
        <section className="Relaterede-produkter">
          {/* Karrusel med relaterede produkter */}
          <DetailRelatedProducts
            currentProduct={product}
            allProducts={allProducts}
          />
        </section>
        <section className="Sidst-set">
          {/* Karrusel med sidst sete produkter */}
          <DetailRecentProducts />
        </section>
      </main>
    </>
  );
}
