// Produktinformationsboks – viser navn, pris (inkl. udsalgspris), farvevalg, størrelsesvælger,
// lagerinfo, tilføj-til-kurv-knap, leveringsinformation og akkordeon med detaljer.
import { useNavigate } from "react-router-dom";
import styles from "./DetailInfoBox.module.css";
import SizeSelector from "./DetailSizeSelector";
import DetailAccordion from "./DetailAccordion";
import BabyDropdown from "./BabyDropdown";
import laegIKurvSvg from "../image/laeg-i-kurv-knap.svg";
import leveringIkonSvg from "../image/levering-ikon.svg";
import fragtIkonSvg from "../image/fragt-ikon.svg";
import returretIkonSvg from "../image/returret-ikon.svg";

export default function DetailInfoBox({ product }) {
  const navigate = useNavigate();

  // Hvis der ikke er noget produkt, vises intet
  if (!product) return null;

  // Udregner om produktet er på udsalg og hvad udsalgsprisen er (15% rabat)
  const isSale = product.sale;
  const originalPrice = product.price;
  const salePrice = isSale ? (originalPrice * 0.85).toFixed(2) : originalPrice;

  // Map fra farvenavn til farvekode, så farvecirklerne får den rigtige farve
  const colorMap = {
    plaid: "#d1c7b7",
    rose: "#e2b6d3",
    blue: "#6ca7d5",
    pink: "#f5c1d6",
    tramonto: "#f5c16c",
    floral: "#e2b6d3",
    "kitty dot": "#f7e7b7",
    beech: "#5f543fff",
    beige: "#edcfa9ff",
    antique_white: "#faebd7",
    mint: "#98c898ff",
    lavender: "#8585ddff",
    "misty blue": "#5684acff",
    green: "#87b789ff",
    yellow: "#e9db8cff",
    brown: "#6b4e39ff",
  };

  return (
    <div className={styles.infoBox}>
      {/* Produktnavn */}
      <h3>{product.title}</h3>
      {/* Prisvisning. Viser både udsalgspris og originalpris hvis produktet er på udsalg */}
      <div className={styles.priceRow}>
        <p className={styles.price}>
          {isSale ? `${salePrice} DKK` : `${originalPrice} DKK`}
        </p>
        {isSale && (
          <p className={styles.originalPrice}>{`${originalPrice} DKK`}</p>
        )}
      </div>
      {/* Farvevalg. Viser farvecirkler for alle varianter, eller én hvis der kun er én farve */}
      <section className={styles["color-selection"]}>
        <p>Vælg farve: {product.color}</p>
        <div className={styles.colorRow}>
          {/* Hvis produktet har flere varianter (fx forskellige farver), vises én farvecirkel for hver variant */}
          {product.variants ? (
            product.variants.map((v, idx) => (
              <span
                key={idx}
                className={styles.colorCircle}
                style={{
                  // Brug farvekode fra colorMap hvis den findes, ellers brug farvenavnet direkte som CSS-farve
                  background: colorMap[v.color] || v.color,
                }}
                // Ved klik på en cirkel navigeres der til den variant, så URL'en opdateres og produktdetaljen skifter
                onClick={() =>
                  navigate(
                    `/produkt/${product.parentId || product.id}-${v.variantId}`,
                  )
                }
                // title-prop viser farvenavnet som tooltip ved hover
                title={v.color}
              ></span>
            ))
          ) : (
            // Hvis der kun er én farve/ingen varianter, vises én farvecirkel for produktets farve
            <span
              className={styles.colorCircle}
              style={{
                background: colorMap[product.color] || product.color,
              }}
              // Klik navigerer til produktets egen side
              onClick={() => navigate(`/produkt/${product.id}`)}
              title={product.color}
            ></span>
          )}
        </div>
      </section>
      {/* Størrelsesvalg og guide */}
      <section className={styles["size-selection"]}>
        <div className={styles["size-selection-options"]}>
          <p className={styles["size-selection-title"]}>Vælg størrelse</p>
          <p className={styles["size-selection-guide"]}>Størrelsesguide</p>
        </div>
        {/* Komponent til at vælge størrelse */}
        <SizeSelector variants={product.variants} size={product.size} />
      </section>
      {/* Lagerstatus. Viser antal på lager eller "På lager" hvis > 0 */}
      <div className={styles.stockInfo}>
        <p>
          {product.stock > 0 ? (
            product.stock
          ) : (
            <>
              <span className={styles.stockDot}></span>
              På lager
            </>
          )}
        </p>
      </div>
      {/* Tilføj til kurv-knap */}
      <button className={styles["add-to-cart"]}>
        <img src={laegIKurvSvg} alt="Add to cart" />
      </button>
      {/* Leveringsinformation med ikoner */}
      <section className={styles.deliveryInfo}>
        <div>
          <img src={leveringIkonSvg} alt="1-2 dages levering" />
          1-2 dages levering
        </div>
        <div>
          <img src={fragtIkonSvg} alt="Gratis fragt" />
          Gratis fragt
        </div>
        <div>
          <img src={returretIkonSvg} alt="30 dages returrret" />
          30 dages returrret
        </div>
      </section>
      {/* Akkordeon med produktdetaljer */}
      <section className={styles.additionalInfo}>
        <DetailAccordion product={product} />
      </section>
    </div>
  );
}
