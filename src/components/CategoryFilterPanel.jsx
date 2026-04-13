// Kategorifilter-panel – viser knapper til filtrering på underkategorier på kategorisiden.
// selectedSub og setSelectedSub styrer den aktive kategori-knap.
import styles from "./ProductGrid.module.css";

export default function CategoryFilterPanel({
  subCategories, // Array af underkategorier, fx ["Strik", "Bluser", ...]
  selectedSub, // Navnet på den aktuelt valgte underkategori (eller "all" for alle)
  setSelectedSub, // Funktion til at ændre den valgte underkategori
}) {
  return (
    // Sektion med ARIA-label for tilgængelighed
    <section className={styles.filterPanel} aria-label="Product filters">
      {/* Wrapper til alle kategori-knapper */}
      <div className={styles.categoryButtons}>
        {/* Knap til at vise alle produkter (ingen filter) */}
        <button
          className={`${styles.categoryButton} ${selectedSub === "all" ? styles.activeCategoryButton : ""}`}
          onClick={() => setSelectedSub("all")}
        >
          Alle
        </button>
        {/* Mapper over alle underkategorier og laver en knap for hver */}
        {subCategories.map((sub) => (
          <button
            key={sub}
            className={`${styles.categoryButton} ${selectedSub === sub ? styles.activeCategoryButton : ""}`}
            // Når man klikker på en knap, sættes den valgte underkategori til denne værdi
            onClick={() => setSelectedSub(sub)}
          >
            {sub}
          </button>
        ))}
      </div>
    </section>
  );
}
