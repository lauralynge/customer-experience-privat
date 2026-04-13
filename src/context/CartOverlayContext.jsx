// Importerer React-funktioner til context og state management
import { createContext, useContext, useState } from "react";

// Opretter en context til at dele overlay-state på tværs af komponenter
const CartOverlayContext = createContext();

// Provider-komponent: wrapper hele appen og gør overlay-state tilgængelig via context
export function CartOverlayProvider({ children }) {
  // State: styrer om kurv-overlayet er åbent (true/false)
  const [isCartOverlayOpen, setCartOverlayOpen] = useState(false);
  return (
    <CartOverlayContext.Provider
      value={{ isCartOverlayOpen, setCartOverlayOpen }} // Gør state og set-funktion tilgængelig for alle child-komponenter
    >
      {children}
    </CartOverlayContext.Provider>
  );
}

// Custom hook: giver nem adgang til overlay-state og set-funktion i child-komponenter
export function useCartOverlay() {
  return useContext(CartOverlayContext);
}
