// Favoritside – viser brugerens favoritprodukter med mulighed for at fjerne dem eller lægge dem i kurven.
// Produkterne er i øjeblikket hardkodet i initialFavorites, men kan kobles til localStorage.
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import "./FavoritesPage.css";
import { addShoppingbagItem } from "../utils/shoppingbagStorage";
import nyhedIcon from "../image/nyhed-ikon.svg";
import saleIcon from "../image/sale-ikon.svg";
import HeartIcon from "../components/HeartIcon";
import { withBase } from "../utils/productFilters";

// Hardkodet liste over favoritprodukter (kan udskiftes med localStorage senere)
const initialFavorites = [
  {
    id: 1,
    name: "langærmet strik top",
    price: "227,95 DKK",
    image: withBase("/product-pics/64-1.png"),
    sale: true,
    sizes: ["86", "92", "98", "104", "110", "116"],
  },
  {
    id: 2,
    name: "økologisk bomuld top",
    price: "143,95 DKK",
    image: withBase("/product-pics/70-1.png"),
    sale: true,
    sizes: ["56", "62", "68", "74", "80", "86"],
  },
  {
    id: 3,
    name: "elva kjole eggshell",
    price: "449,00 DKK",
    image: withBase("/product-pics/71-1.png"),
    news: true,
    sizes: ["98", "104", "110", "116", "122", "128"],
  },
  {
    id: 4,
    name: "mimmi bluse tramonto",
    price: "279,95 DKK",
    image: withBase("/product-pics/1-1.png"),
    sizes: ["74", "80", "86", "92", "98", "104"],
  },
  {
    id: 5,
    name: "savora cardigan",
    price: "299,95 DKK",
    image: withBase("/product-pics/81-1.png"),
    news: true,
    sizes: ["86", "92", "98", "104", "110"],
  },
  {
    id: 6,
    name: "regular strikket top",
    price: "259,95 DKK",
    image: withBase("/product-pics/62-1.png"),
    sizes: ["92", "98", "104", "110", "116"],
  },
  {
    id: 7,
    name: "nyfødt slå-om body",
    price: "249,00 DKK",
    image: withBase("/product-pics/93-1.png"),
    news: true,
    sizes: ["50", "56", "62", "68"],
  },
];

// Ikon til deling af favoritter
function ShareIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="M8 8l4-4 4 4" />
      <path d="M4 17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3" />
    </svg>
  );
}

export default function FavoritesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // State: nuværende favoritter
  const [favorites, setFavorites] = useState(initialFavorites);
  // State: fjernede favoritter (bruges til fortryd)
  const [removedFavorites, setRemovedFavorites] = useState({});
  // State: id på det kort der er hovered (for at vise størrelsesvælger)
  const [hoveredCard, setHoveredCard] = useState(null);
  // State: valgt størrelse for hvert produkt (objekt: { produktId: størrelse })
  const [selectedSizes, setSelectedSizes] = useState({});
  // State: styrer "Lagt i kurv"-feedback for hvert produkt
  const [addedToCart, setAddedToCart] = useState({});

  // Fjerner et produkt fra favoritter (og gemmer det i removedFavorites så det kan fortrydes)
  const removeFavorite = (id) => {
    // Find produktet der skal fjernes
    const product = favorites.find((p) => p.id === id);
    if (!product) return;
    // Gem produktet i removedFavorites
    setRemovedFavorites((prev) => ({ ...prev, [id]: product }));
    // Fjern produktet fra favoritter
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  };

  // Fortryder fjernelse af et favoritprodukt
  const undoRemove = (id) => {
    const product = removedFavorites[id];
    if (!product) return;
    // Tilføj produktet tilbage til favoritter og sorter så rækkefølgen bevares
    setFavorites((prev) => {
      const updated = [...prev, product];
      updated.sort(
        (a, b) =>
          initialFavorites.findIndex((p) => p.id === a.id) -
          initialFavorites.findIndex((p) => p.id === b.id),
      );
      return updated;
    });
    // Fjern produktet fra removedFavorites
    setRemovedFavorites((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Vælger størrelse for et produkt (opdaterer selectedSizes)
  const selectSize = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  // Lægger ét produkt i kurven (kræver at størrelse er valgt)
  const addToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size) return; // Gør intet hvis ingen størrelse valgt
    // Tilføj produktet til kurven (shoppingbag)
    addShoppingbagItem({
      id: `${product.id}-${size}`,
      baseId: product.id,
      name: product.name,
      price: Number(product.price.replace(" DKK", "").replace(",", ".")),
      size,
      quantity: 1,
      image: product.image,
    });
    // Vis "Lagt i kurv"-feedback
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
    // Naviger til kurv-side (overlay)
    navigate("/shoppingbag", { state: { backgroundLocation: location } });
    // Fjern feedback efter 2 sekunder
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Lægger alle favoritter i kurven (vælger første størrelse hvis ingen valgt)
  const addAllToCart = () => {
    if (favorites.length === 0) return;
    const addedIds = [];
    const inferredSizes = {};
    // Gennemgå alle favoritter
    favorites.forEach((product) => {
      // Brug valgt størrelse eller første mulige
      const size = selectedSizes[product.id] || product.sizes?.[0];
      if (!size) return; // Spring over hvis ingen størrelse
      addShoppingbagItem({
        id: `${product.id}-${size}`,
        baseId: product.id,
        name: product.name,
        price: Number(product.price.replace(" DKK", "").replace(",", ".")),
        size,
        quantity: 1,
        image: product.image,
      });
      // Hvis brugeren ikke selv har valgt størrelse, gem hvilken der blev brugt
      if (!selectedSizes[product.id]) {
        inferredSizes[product.id] = size;
      }
      addedIds.push(product.id);
    });
    if (addedIds.length === 0) return;
    // Naviger til kurv-side (overlay)
    navigate("/shoppingbag", { state: { backgroundLocation: location } });
    // Opdater selectedSizes hvis der blev valgt størrelser automatisk
    if (Object.keys(inferredSizes).length > 0) {
      setSelectedSizes((prev) => ({ ...prev, ...inferredSizes }));
    }
    // Vis "Lagt i kurv"-feedback for alle produkter
    setAddedToCart((prev) => {
      const next = { ...prev };
      addedIds.forEach((id) => {
        next[id] = true;
      });
      return next;
    });
    // Fjern feedback efter 2 sekunder
    setTimeout(() => {
      setAddedToCart((prev) => {
        const next = { ...prev };
        addedIds.forEach((id) => {
          next[id] = false;
        });
        return next;
      });
    }, 2000);
  };

  return (
    <main className="favorite-page">
      <section className="favorite-content">
        {/* Brødkrummenavigation */}
        <Breadcrumbs />

        <header className="favorite-header">
          <h2>Mine Favoritter</h2>
          {/* Viser antal favoritter */}
          <p>{favorites.length} artikler</p>
        </header>

        {/* Login-boks for at gemme favoritter (kun visning, ingen funktionalitet) */}
        <section
          className="favorite-login-box"
          aria-label="Login for favoritter"
        >
          <h3>Mist ikke dine favoritter!</h3>
          <p>Log ind eller opret bruger for at gemme dine favoritter</p>
          <button type="button">OPRET / LOG IND</button>
        </section>

        {/* Del-funktion (kun ikon og tekst) */}
        <section className="favorite-share" aria-label="Del favoritter">
          <p>Del dine favoritter</p>
          <ShareIcon />
        </section>

        {/* Grid med alle favorit-produkter */}
        <section className="favorite-grid" aria-label="Favorit produkter">
          {/* Gennemgår alle produkter i initialFavorites for at bevare rækkefølge og undo-funktion */}
          {initialFavorites.map((product) => {
            // Tjek om produktet stadig er i favoritter
            const activeProduct = favorites.find((p) => p.id === product.id);
            if (!activeProduct) {
              // Hvis produktet er fjernet, vis fortryd-knap hvis muligt
              if (!removedFavorites[product.id]) return null;
              return (
                <div key={`undo-${product.id}`} className="favorite-undo-tile">
                  <button
                    type="button"
                    onClick={() => undoRemove(product.id)}
                    className="favorite-undo-btn"
                  >
                    Fortryd
                  </button>
                </div>
              );
            }
            // Viser størrelsesvælger når kortet er hovered
            const isSizeOpen = hoveredCard === product.id;
            return (
              <article
                key={activeProduct.id}
                className="favorite-card"
                onMouseEnter={() => setHoveredCard(activeProduct.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="favorite-image-wrap">
                  <div className="favorite-top-bar">
                    <div className="favorite-left-icons">
                      {/* Nyhed- og sale-ikoner */}
                      {activeProduct.news && (
                        <img
                          src={nyhedIcon}
                          alt="Nyhed"
                          className="favorite-badge-icon"
                        />
                      )}
                      {activeProduct.sale && (
                        <img
                          src={saleIcon}
                          alt="Sale"
                          className="favorite-badge-icon"
                        />
                      )}
                    </div>
                  </div>
                  {/* Hjerte-ikon til at fjerne fra favoritter */}
                  <button
                    type="button"
                    aria-label={`Fjern ${activeProduct.name} fra favoritter`}
                    className="favorite-heart"
                  >
                    <HeartIcon
                      initialFilled={true}
                      onToggle={() => removeFavorite(activeProduct.id)}
                    />
                  </button>
                  {/* Produktbillede */}
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="favorite-product-image"
                  />
                </div>

                <div className="favorite-card-body">
                  {/* Produktnavn */}
                  <h3>{activeProduct.name}</h3>
                  {/* Pris, evt. med sale-style */}
                  <p
                    className={
                      activeProduct.sale ? "favorite-price-sale" : undefined
                    }
                  >
                    {activeProduct.price}
                  </p>
                </div>

                {/* Størrelsesvælger (vises kun når kortet er hovered) */}
                <div className="favorite-size-wrap">
                  <p className="favorite-size-label">
                    {selectedSizes[activeProduct.id]
                      ? `Str. ${selectedSizes[activeProduct.id]}`
                      : "Vælg størrelse"}
                  </p>
                  {isSizeOpen && (
                    <ul
                      className="favorite-size-inline"
                      aria-label="Vælg størrelse"
                    >
                      {activeProduct.sizes.map((size) => (
                        <li key={size}>
                          <button
                            type="button"
                            className={`favorite-size-inline-option ${selectedSizes[activeProduct.id] === size ? "selected" : ""}`}
                            onClick={() => selectSize(activeProduct.id, size)}
                          >
                            {size}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Læg i kurv-knap. Disabled hvis ingen størrelse valgt. Viser feedback hvis lagt i kurv. */}
                <button
                  type="button"
                  className={`favorite-cart-btn ${!selectedSizes[activeProduct.id] ? "disabled" : ""}`}
                  onClick={() => addToCart(activeProduct)}
                  disabled={!selectedSizes[activeProduct.id]}
                >
                  {addedToCart[activeProduct.id]
                    ? "✓ Lagt i kurv!"
                    : "Læg i kurv"}
                </button>
              </article>
            );
          })}
        </section>

        {/* Knap til at lægge alle favoritter i kurven */}
        <div className="favorite-bulk-wrap">
          <button
            type="button"
            className="favorite-bulk-btn"
            onClick={addAllToCart}
            disabled={favorites.length === 0}
          >
            Føj alle til kurv
          </button>
        </div>
      </section>
    </main>
  );
}
