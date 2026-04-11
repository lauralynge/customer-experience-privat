// Navigationsbjælke – viser logo, navigation med dropdown-menuer for Baby/Pige/Dreng og ikoner til søg, profil, favoritter og kurv.
// Indeholder et roterende banner med kampagnetekster øverst.
import { useState, useEffect } from "react";
import { useCartOverlay } from "../context/CartOverlayContext";
import { NavLink } from "react-router";
import banner from "../image/banner.svg";
import logo from "../image/logo.svg";
import søgikon from "../image/søgikon.svg";
import profilikon from "../image/profil.svg";
import hjerteikon from "../image/hjerte.svg";
import kurvikon from "../image/kurv.svg";
import DrengDropdown from "./DrengDropdown";
import PigeDropdown from "./PigeDropdown";
import BabyDropdown from "./BabyDropdown";
import "./Navbar.css";

export default function Navbar() {
  // activeDropdown styrer hvilken dropdown-menu (baby/pige/dreng) der er åben. null = ingen åben
  const [activeDropdown, setActiveDropdown] = useState(null);
  // Henter funktion til at åbne kurv-overlay fra context (bruges til at åbne kurven når man klikker på kurv-ikonet)
  const { setCartOverlayOpen } = useCartOverlay();
  // Arrays til banner-karussel: billeder og tekster. Kan udvides med flere kampagner
  const heroImages = [banner, banner, banner];
  const bannerMessages = [
    "Gratis og hurtig levering indenfor 1-2 hverdage",
    "Over 15.000 tilfredse kunder",
    "Økologisk og GOTS-certificeret tøj",
  ];
  // carouselIndex styrer hvilket banner og tekst der vises (0, 1, 2)
  const [carouselIndex, setCarouselIndex] = useState(0);
  // useEffect skifter banner/tekst automatisk hvert 3. sekund
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    // Wrapper for hele headeren
    <div className="hero-header">
      {/* Topbar med logo, navigation og ikoner */}
      <div className="topnav">
        {/* Logo med link til forsiden */}
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" />
          </NavLink>
        </div>
        {/* Navigation med links og dropdowns. Klik på Baby/Pige/Dreng åbner tilhørende dropdown-menu */}
        <nav className="navbar">
          <NavLink to="/Baby" onClick={() => setActiveDropdown("baby")}>
            Baby
          </NavLink>
          <NavLink to="/Pige" onClick={() => setActiveDropdown("pige")}>
            Pige
          </NavLink>
          <NavLink to="/Dreng" onClick={() => setActiveDropdown("dreng")}>
            Dreng
          </NavLink>
          <NavLink to="/Sale">Udsalg</NavLink>
          <NavLink to="/News">Nyheder</NavLink>
          <NavLink to="/Inspiration">Inspiration</NavLink>
        </nav>

        {/* Ikoner til søg, profil, favoritter og kurv */}
        <div className="klikikoner">
          {/* Søg-ikon (kan udvides med søgefunktion) */}
          <img src={søgikon} alt="Søg" />
          {/* Profil-ikon (kan udvides med login) */}
          <img src={profilikon} alt="Profil" />
          {/* Favorit-ikon med link til favoritside */}
          <NavLink to="/favorites">
            <img src={hjerteikon} alt="Favoritter" />
          </NavLink>
          {/* Kurv-ikon åbner overlay via context. onClick sætter overlay til åben */}
          <button
            type="button"
            className="cart-icon-btn"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label="Åbn kurv"
            onClick={() => setCartOverlayOpen(true)}
          >
            <img src={kurvikon} alt="Kurv" />
          </button>
        </div>
      </div>

      {/* Dropdown-menuer for Baby, Pige og Dreng. Vises kun hvis aktiv. onClose lukker dropdownen */}
      {activeDropdown === "baby" && (
        <BabyDropdown onClose={() => setActiveDropdown(null)} />
      )}

      {activeDropdown === "pige" && (
        <PigeDropdown onClose={() => setActiveDropdown(null)} />
      )}

      {activeDropdown === "dreng" && (
        <DrengDropdown onClose={() => setActiveDropdown(null)} />
      )}

      {/* Banner med billede og roterende tekst. Skifter automatisk hvert 3. sekund */}
      <div className="banner">
        <img
          src={heroImages[carouselIndex]}
          alt="Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <p className="banner-carousel">{bannerMessages[carouselIndex]}</p>
        </div>
      </div>
    </div>
  );
}
