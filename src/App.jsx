// Importerer alle nødvendige komponenter, sider og hooks til routing og context
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  CartOverlayProvider,
  useCartOverlay,
} from "./context/CartOverlayContext";
import ShoppingBagOverlay from "./components/ShoppingBagOverlay";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import NotFoundPage from "./pages/NotFoundPage";
import SalePage from "./pages/SalePage";
import PaymentPage from "./pages/PaymentPage";
import NewsPage from "./pages/NewsPage";
import InspirationPage from "./pages/InspirationPage";
import FavoritesPage from "./pages/FavoritesPage";
import DetailPage from "./pages/DetailPage";
import SustainabilityPage from "./pages/SustainabilityPage";
import ProductGridBaby from "./components/ProductGridBaby";
import ProductGridGirls from "./components/ProductGridGirls";
import ProductGridBoys from "./components/ProductGridBoys";
import CategoryPage from "./components/CategoryPage";
import ShoppingbagPage from "./pages/ShoppingbagPage";
import BrandPage from "./pages/BrandPage";

export default function App() {
  // useLocation giver adgang til den aktuelle URL og state
  const location = useLocation();
  // backgroundLocation bruges til at vise overlays (fx kurv) oven på en anden side
  const backgroundLocation = location.state?.backgroundLocation;

  // Consumer-komponent til at vise/lukke kurv-overlay via context
  function CartOverlayConsumer() {
    // Henter overlay-state og funktion til at lukke overlay fra context
    const { isCartOverlayOpen, setCartOverlayOpen } = useCartOverlay();
    // Viser overlay hvis det er åbent
    return isCartOverlayOpen ? (
      <ShoppingBagOverlay onClose={() => setCartOverlayOpen(false)} />
    ) : null;
  }

  return (
    // CartOverlayProvider gør overlay-state tilgængelig for hele appen
    <CartOverlayProvider>
      {/* Wrapper for hele layoutet inkl. navbar, footer og routes */}
      <div className="footer-wrapper">
        {/* Navbar vises på alle sider */}
        <Navbar />
        {/* Routes håndterer navigation mellem sider. Hvis backgroundLocation er sat, vises overlay oven på den side brugeren kom fra. */}
        <Routes location={backgroundLocation || location}>
          {/* Forside */}
          <Route path="/" element={<HomePage />} />
          {/* Statisk indhold */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/sale" element={<SalePage />} />
          {/* Produktkategorier */}
          <Route path="/baby" element={<ProductGridBaby />} />
          <Route path="/pige" element={<ProductGridGirls />} />
          <Route path="/dreng" element={<ProductGridBoys />} />
          {/* Checkout og betaling */}
          <Route path="/payment" element={<PaymentPage />} />
          {/* Nyheder, inspiration, favoritter */}
          <Route path="/news" element={<NewsPage />} />
          <Route path="/inspiration" element={<InspirationPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* Produktdetalje og kategorisider */}
          <Route path="/produkt/:id" element={<DetailPage />} />
          <Route path="/kategori/:category" element={<CategoryPage />} />
          <Route path="/detail" element={<DetailPage />} />
          {/* Underkategorier med valgfri subcategory */}
          <Route
            path="/kategori/:gender/:mainCategory/:subcategory?"
            element={<CategoryPage />}
          />
          {/* 404 fallback */}
          <Route path="*" element={<NotFoundPage />} />
          {/* Bæredygtighed, kurv og brands */}
          <Route path="/sustainability" element={<SustainabilityPage />} />
          <Route path="/shoppingbag" element={<ShoppingbagPage />} />
          <Route path="/brand/:brandSlug" element={<BrandPage />} />
        </Routes>
        {/* Hvis backgroundLocation er sat, vis overlays oven på den side brugeren kom fra */}
        {backgroundLocation && (
          <Routes>
            {/* Overlay for kurv og evt. baby-side */}
            <Route path="/shoppingbag" element={<ShoppingbagPage />} />
            <Route path="/baby" element={<ProductGridBaby />} />
          </Routes>
        )}
        {/* Kurv-overlay (slide-in) styret via context */}
        <CartOverlayConsumer />
        {/* Footer vises på alle sider */}
        <Footer />
      </div>
    </CartOverlayProvider>
  );
}
