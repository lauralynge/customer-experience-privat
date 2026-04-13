// Indkøbskurvside – viser kurven som en fuld side med produkter, antal, priser og trin-indikator.
// Indlæser og gemmer kurv-data i localStorage via shoppingbagStorage.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingbagPage.css";
import antalProdukterIcon from "../image/Antal produkter.svg";
import skraldespandIcon from "../image/skraldespand.svg";
import {
  loadShoppingbagItems,
  saveShoppingbagItems,
} from "../utils/shoppingbagStorage";
import { withBase } from "../utils/productFilters";

// Initial tom kurv (kan evt. udbygges med default-items til test)
const initialCartItems = [];
// Navne på trin i checkout-flowet
const steps = ["Kurv", "Oplysninger", "Levering", "Betaling", "Bekræftelse"];

export default function ShoppingbagPage() {
  // cartItems: array af produkter i kurven. Hentes fra localStorage ved første render.
  const [cartItems, setCartItems] = useState(() =>
    loadShoppingbagItems(initialCartItems),
  );
  // navigate bruges til at skifte side (fx til betaling eller tilbage)
  const navigate = useNavigate();

  // Funktion til at lukke overlayet/kurven (går tilbage i historikken)
  const closeOverlay = () => {
    navigate(-1);
  };

  // Opdaterer antal af et produkt i kurven (kan både øge og mindske)
  const updateQuantity = (id, delta) => {
    setCartItems((prev) => {
      // Find produktet og opdater antal
      const nextItems = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0); // Fjern produkter med 0 i antal
      saveShoppingbagItems(nextItems); // Gem i localStorage
      return nextItems;
    });
  };

  // Fjerner et produkt helt fra kurven
  const removeItem = (id) => {
    setCartItems((prev) => {
      const nextItems = prev.filter((item) => item.id !== id);
      saveShoppingbagItems(nextItems);
      return nextItems;
    });
  };

  // Udregner samlet antal produkter i kurven
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // Udregner samlet pris for alle produkter
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Formatterer pris med to decimaler og DKK
  const formatPrice = (price) => price.toFixed(2).replace(".", ",") + " DKK";

  return (
    // Hele kurv-siden er wrapped i en dialog for tilgængelighed
    <div
      className="shoppingbag-page"
      role="dialog"
      aria-modal="true"
      aria-label="Kurv"
    >
      {/* Klik på baggrunden lukker kurven */}
      <button
        className="shoppingbag-backdrop"
        onClick={closeOverlay}
        aria-label="Luk kurv"
      />
      <div className="shoppingbag-card">
        {/* Header med titel og luk-knap */}
        <div className="shoppingbag-card-header">
          <h1 className="shoppingbag-page-title">Kurv ({totalCount})</h1>
          <button
            className="shoppingbag-close-btn"
            onClick={closeOverlay}
            aria-label="Luk kurv"
          >
            ✕
          </button>
        </div>

        {/* Trin-indikator for checkout-flowet */}
        <div className="shoppingbag-steps">
          {steps.map((label, i) => (
            <div className="shoppingbag-step" key={i}>
              <div
                className={`shoppingbag-step-circle ${i === 0 ? "active" : ""}`}
              >
                {i + 1}
              </div>
              <span className="shoppingbag-step-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Liste over produkter i kurven */}
        <div className="shoppingbag-items">
          {cartItems.length === 0 ? (
            // Hvis kurven er tom
            <p className="shoppingbag-empty">Din kurv er tom.</p>
          ) : (
            // Ellers vis alle produkter
            cartItems.map((item) => (
              <div className="shoppingbag-item" key={item.id}>
                {/* Produktbillede */}
                <img
                  src={withBase(item.image)}
                  alt={item.name}
                  className="shoppingbag-item-img"
                />
                <div className="shoppingbag-item-info">
                  {/* Produktnavn */}
                  <p className="shoppingbag-item-name">{item.name}</p>
                  {/* Pris pr. stk. */}
                  <p className="shoppingbag-item-price">
                    {formatPrice(item.price)}
                  </p>
                  {/* Valgt størrelse */}
                  <p className="shoppingbag-item-size">Str. {item.size}</p>
                  {/* Antal-vælger med plus/minus-knapper */}
                  <div
                    className="shoppingbag-qty"
                    aria-label={`Antal ${item.quantity}`}
                  >
                    <img
                      src={antalProdukterIcon}
                      alt=""
                      aria-hidden="true"
                      className="shoppingbag-qty-icon"
                    />
                    <button
                      type="button"
                      className="shoppingbag-qty-hit shoppingbag-qty-hit-minus"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Fjern ét produkt"
                    />
                    <span className="shoppingbag-qty-count">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="shoppingbag-qty-hit shoppingbag-qty-hit-plus"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Tilføj ét produkt"
                    />
                  </div>
                </div>
                {/* Knap til at fjerne produktet helt fra kurven */}
                <button
                  className="shoppingbag-delete-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label="Fjern produkt"
                >
                  <img
                    src={skraldespandIcon}
                    alt=""
                    aria-hidden="true"
                    className="shoppingbag-delete-icon"
                  />
                </button>
              </div>
            ))
          )}
        </div>

        <hr className="shoppingbag-divider" />

        {/* Footer med samlet pris og handlingsknapper */}
        <div className="shoppingbag-footer">
          <div className="shoppingbag-total">
            <span>I ALT</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          {/* Gå til betaling */}
          <button
            className="shoppingbag-checkout-btn"
            onClick={() => navigate("/payment")}
          >
            Til kassen
          </button>
          {/* Fortsæt shopping: sender brugeren til produktsiden */}
          <button
            className="shoppingbag-continue-btn"
            onClick={() => navigate("/products")}
          >
            Forsæt med at shoppe
          </button>
        </div>
      </div>
    </div>
  );
}
