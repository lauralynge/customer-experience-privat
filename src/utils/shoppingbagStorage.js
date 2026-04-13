// Nøgle til localStorage hvor kurv-items gemmes
const STORAGE_KEY = "shoppingbagItems";

// Tjekker om koden kører i en browser (og localStorage er tilgængelig)
function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

// Loader kurv-items fra localStorage. Returnerer fallback hvis intet fundet eller fejl.
export function loadShoppingbagItems(fallback = []) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // Sikrer at det faktisk er et array
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    // Returnerer fallback hvis der opstår fejl (fx korrupt JSON)
    return fallback;
  }
}

// Gemmer kurv-items i localStorage
export function saveShoppingbagItems(items) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Tilføjer et item til kurven. Hvis samme baseId+size findes, opdateres quantity.
export function addShoppingbagItem(item) {
  // Henter eksisterende items fra localStorage
  const items = loadShoppingbagItems([]);
  // Finder om produktet allerede findes (samme baseId og størrelse)
  const index = items.findIndex(
    (existing) =>
      existing.baseId === item.baseId && existing.size === item.size,
  );

  if (index === -1) {
    // Hvis produktet ikke findes, tilføj det som nyt
    const nextItems = [...items, item];
    saveShoppingbagItems(nextItems);
    return nextItems;
  }

  // Hvis produktet findes, opdater quantity (lægger til eksisterende antal)
  const nextItems = items.map((existing, i) =>
    i === index
      ? {
          ...existing,
          quantity: (existing.quantity || 0) + (item.quantity || 1),
        }
      : existing,
  );

  saveShoppingbagItems(nextItems);
  return nextItems;
}
