// Forside – samler alle forsidekomponenter i én side.
// Indeholder hero-slider, brandkarrusel, kønssektioner, badges, inspiration, infoikoner og anmeldelser.
import "./HomePage.css";
import HeroPictures from "../components/HeroPictures";
import BrandKarrusel from "../components/BrandKarrusel";
import GenderSection from "../components/GenderSection";
import Badges from "../components/Badges";
import ForsideInspiration from "../components/ForsideInspiration";
import Infoikoner from "./../components/Infoikoner";
import AnmeldelserForside from "../components/AnmeldelserForside";

export default function HomePage() {
  return (
    // Hele forsiden er samlet i <main>
    <>
      <main>
        {/* Hero Section med slider og farverig titel */}
        <section className="hero">
          <HeroPictures />
          {/* Farvet forår/nyheder-titel. Hver bogstav har sin egen farve for at skabe blikfang */}
          <p className="title">
            <span style={{ color: "var(--blå)" }}> F</span>
            <span style={{ color: "var(--lyserød)" }}> O</span>
            <span style={{ color: "var(--orange)" }}> R</span>
            <span style={{ color: "var(--gul)" }}> Å</span>
            <span style={{ color: "var(--grøn)" }}> R</span>
            <span style={{ color: "var(--rød)" }}> S</span>
            <br />
            <span style={{ color: "var(--gul)" }}> N</span>
            <span style={{ color: "var(--blå)" }}> Y</span>
            <span style={{ color: "var(--rød)" }}> H</span>
            <span style={{ color: "var(--grøn)" }}> E</span>
            <span style={{ color: "var(--lyserød)" }}> D</span>
            <span style={{ color: "var(--orange)" }}> E</span>
            <span style={{ color: "var(--blå)" }}> R</span>
          </p>
        </section>

        {/* Populære brands Section – viser brandkarrusel */}
        <section className="populære-brands">
          <BrandKarrusel />
        </section>

        {/* Køn Section – viser links til baby/pige/dreng */}
        <section className="køn">
          <GenderSection />
        </section>

        {/* Badges Section – viser badges for fx økologi, certificeringer mv. */}
        <section className="badges">
          <Badges />
        </section>

        {/* Inspiration Section – inspirationsbilleder og Instagram-tag */}
        <section className="inspiration">
          <ForsideInspiration />
        </section>

        {/* Infoikoner Section – leveringsinfo, fri fragt, retur, anmeldelser */}
        <section className="infoikonersektion">
          <Infoikoner />
        </section>
        {/* Anmeldelser Section – kundeanmeldelser */}
        <section className="anmeldelser-sektion">
          <AnmeldelserForside />
        </section>
      </main>
    </>
  );
}
