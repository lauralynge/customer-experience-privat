// Størrelsesvælger – viser alle tilgængelige størrelser som klikkbare cirkler.
// Udsolgte størrelser markeres med en overstregning. Håndterer både varianter og enkeltprodukter.
import { useState } from "react";
import styles from "./DetailInfoBox.module.css";

export default function SizeSelector({ variants, size }) {
  // selectedSize holder styr på hvilken størrelse brugeren har valgt (null = ingen valgt endnu)
  const [selectedSize, setSelectedSize] = useState(null);

  // Samler alle størrelser og deres tilgængelighed i et array af [størrelse, tilgængelig]
  // Hvis produktet har varianter (fx forskellige farver), samles alle størrelser fra alle varianter
  // Hvis ikke, bruges størrelserne direkte fra size-objektet
  let sizesObj = [];
  if (variants) {
    // flatMap samler alle størrelser fra alle varianter i ét samlet array
    sizesObj = variants.flatMap((v) => Object.entries(v.size || {}));
  } else if (size) {
    sizesObj = Object.entries(size);
  }

  // Fjern dubletter og sorter størrelser numerisk
  // new Map sikrer at hver størrelse kun optræder én gang (sidste forekomst vinder)
  // Eksempel: hvis både variant 1 og 2 har "92", vil kun den sidste tælle
  const uniqueSizes = Array.from(
    new Map(sizesObj.map(([size, available]) => [size, available])).entries(),
  ).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  return (
    <div className={styles.sizeGrid}>
      {/* Mapper over alle unikke størrelser og viser dem som cirkler */}
      {uniqueSizes.map(([size, available]) => (
        <div
          key={size}
          className={
            available
              ? `${styles.sizeCircle} ${selectedSize === size ? styles.sizeSelected : ""}`
              : `${styles.sizeCircle} ${styles.sizeUnavailable}`
          }
          // Kun klikbar hvis størrelsen er tilgængelig (ellers ingen effekt)
          onClick={() => available && setSelectedSize(size)}
        >
          {/* Viser størrelsen. Hvis valgt, vises den med hvid tekst */}
          <p style={selectedSize === size ? { color: "#fff" } : {}}>{size}</p>
          {/* Hvis størrelsen ikke er tilgængelig, vises en overstregning (strikeThrough) */}
          {!available && <div className={styles.strikeThrough}></div>}
        </div>
      ))}
    </div>
  );
}
