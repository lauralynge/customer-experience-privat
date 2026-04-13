// Hero-billedslider til forsiden – skifter automatisk mellem tre billeder hvert 4. sekund.
// Viser dot-navigation og et CTA-billede oven på slideren.
import { useState, useEffect } from "react";

import img1 from "../image/hero-billede-1.svg";
import img2 from "../image/hero-billede-2.svg";
import img3 from "../image/hero-billede-3.svg";
import heroCta from "../image/nyhederhero.svg";

export default function HeroPictures() {
  // Array med billeder til slideren
  const images = [img1, img2, img3];
  // current angiver hvilket billede der vises (0, 1 eller 2)
  const [current, setCurrent] = useState(0);

  // useEffect sørger for at billedet skifter automatisk hvert 4. sekund
  useEffect(() => {
    const timer = setTimeout(() => {
      // Hvis vi er på sidste billede, start forfra, ellers gå til næste billede
      if (current === 2) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, 4000);

    // Rydder timeren op hvis komponenten unmountes eller current ændres
    return () => clearTimeout(timer);
  }, [current]);

  return (
    // Wrapper for hele slideren
    <div className="hero-slider">
      {/* Viser det aktuelle billede */}
      <img src={images[current]} alt="Hero billede" className="hero-image" />
      {/* CTA-billede oven på slideren */}
      <img src={heroCta} alt="Shop nyheder" className="hero-cta" />

      {/* Dot-navigation. Den aktive dot får klassen 'active' */}
      <div className="hero-dots">
        <span className={current === 0 ? "dot active" : "dot"}></span>
        <span className={current === 1 ? "dot active" : "dot"}></span>
        <span className={current === 2 ? "dot active" : "dot"}></span>
      </div>
    </div>
  );
}
