// Favorit-hjerte-ikon – toggler mellem fyldt og tomt hjerte når der klikkes.
// Kalder onToggle-callback med ny tilstand, hvis den er angivet.
import { useState } from "react";
import likeHeartStroke from "../image/like-hjerte-stroke.svg";
import likeHeartFyldt from "../image/like-hjerte-fyldt.svg";

export default function HeartIcon({ initialFilled = false, onToggle }) {
  // filled angiver om hjertet er fyldt (favorit) eller ej
  const [filled, setFilled] = useState(initialFilled);

  // handleToggle skifter tilstand og kalder evt. callback
  const handleToggle = (e) => {
    e.stopPropagation(); // Stopper eventen fra at boble op (fx så klik ikke rammer bagvedliggende elementer)
    e.preventDefault(); // Forhindrer evt. default-adfærd (fx hvis brugt i form)
    setFilled((prev) => !prev); // Skifter mellem fyldt og tomt hjerte
    if (onToggle) onToggle(!filled); // Kalder callback hvis angivet, med den nye tilstand
  };

  return (
    // Viser billedet af hjerte-ikonet. Klik toggler tilstand.
    <img
      src={filled ? likeHeartFyldt : likeHeartStroke}
      alt={filled ? "Fjern fra favoritter" : "Tilføj til favoritter"}
      onClick={handleToggle}
      style={{
        cursor: "pointer",
        width: "32px",
        height: "32px",
        transition: "filter 0.2s",
      }}
      role="button"
      tabIndex={0}
    />
  );
}
