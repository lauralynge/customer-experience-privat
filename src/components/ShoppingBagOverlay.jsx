// Indkøbskurv-overlay – viser kurven som et slide-in panel oven på siden.
// Indlæser og gemmer kurv-data i localStorage. Viser produkter, antal, trin-indikator og samlet pris.
import React from "react";
import {
  loadShoppingbagItems,
  saveShoppingbagItems,
} from "../utils/shoppingbagStorage";
import "../pages/ShoppingbagPage.css";
import { useNavigate } from "react-router-dom";
import antalProdukterIcon from "../image/Antal produkter.svg";
import skraldespandIcon from "../image/skraldespand.svg";
import { withBase } from "../utils/productFilters";

export default function ShoppingBagOverlay({ onClose }) {
  // cartItems: produkter i kurven, hentes fra localStorage ved første render (bruges som state)
  const [cartItems, setCartItems] = React.useState(() =>
    loadShoppingbagItems([]),
  );
  // totalCount: samlet antal produkter i kurven (summerer quantity for alle items)
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // totalPrice: samlet pris for alle produkter (pris * antal for hvert item)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // steps: trin-indikator til checkout-flowet (vises som cirkler øverst)
  const steps = ["Kurv", "Oplysninger", "Levering", "Betaling", "Bekræftelse"];
  // formatPrice: viser pris med to decimaler og DKK (fx 199,00 DKK)
  const formatPrice = (price) => price.toFixed(2).replace(".", ",") + " DKK";
  const navigate = useNavigate();

  // Opdaterer antal af et produkt (kan både øge og mindske)
  // Hvis quantity bliver 0, fjernes produktet fra kurven
  const updateQuantity = (id, delta) => {
    setCartItems((prev) => {
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

  // Henter kurv-data fra localStorage hver gang overlayet åbnes (fx hvis man har tilføjet varer på en anden side)
  React.useEffect(() => {
    setCartItems(loadShoppingbagItems([]));
  }, []);

  return (
    // Overlay med dialog-rolle for tilgængelighed
    <div
      className="shoppingbag-page"
      role="dialog"
      aria-modal="true"
      aria-label="Kurv"
    >
      {/* Klik på baggrunden lukker overlayet */}
      <button
        className="shoppingbag-backdrop"
        onClick={onClose}
        aria-label="Luk kurv"
      />
      <div className="shoppingbag-card">
        <div className="shoppingbag-card-header">
          <h1 className="shoppingbag-page-title">Kurv ({totalCount})</h1>
          {/* Knap til at lukke overlayet */}
          <button
            className="shoppingbag-close-btn"
            onClick={onClose}
            aria-label="Luk kurv"
          >
            ✕
          </button>
        </div>
        {/* Trin-indikator for checkout-flowet. Viser hvor langt brugeren er i processen */}
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
            <p className="shoppingbag-empty">Din kurv er tom.</p>
          ) : (
            cartItems.map((item) => (
              <div className="shoppingbag-item" key={item.id}>
                {/* Produktbillede */}
                <img
                  src={withBase(item.image)}
                  alt={item.name}
                  className="shoppingbag-item-img"
                />
                <div className="shoppingbag-item-info">
                  {/* Navn, pris og størrelse */}
                  <p className="shoppingbag-item-name">{item.name}</p>
                  <p className="shoppingbag-item-price">
                    {formatPrice(item.price)}
                  </p>
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
                    {/* Minus-knap */}
                    <button
                      type="button"
                      className="shoppingbag-qty-hit shoppingbag-qty-hit-minus"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Fjern ét produkt"
                    />
                    {/* Viser antal */}
                    <span className="shoppingbag-qty-count">
                      {item.quantity}
                    </span>
                    {/* Plus-knap */}
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
          {/* Gå til betaling: lukker overlay og navigerer til betalingsside */}
          <button
            className="shoppingbag-checkout-btn"
            onClick={() => {
              onClose();
              navigate("/payment");
            }}
          >
            Til kassen
          </button>
          {/* Fortsæt shopping: lukker overlay */}
          <button className="shoppingbag-continue-btn" onClick={onClose}>
            Forsæt med at shoppe
          </button>
        </div>
      </div>
    </div>
  );
}
