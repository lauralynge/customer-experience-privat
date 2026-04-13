// Filter-sidebar overlay – åbner en sidebar med sortering, produkttyper, farver, størrelser, brands og kønsfiltre.
// Bruger et "draft filters"-mønster, så ændringer kun anvendes når brugeren trykker på "Vis resultater".
import { useState } from "react";
import filterButtonIcon from "../image/product-pics/filter.svg";
import plusIcon from "../image/plus.svg";
import minusIcon from "../image/minus.svg";
import closeIcon from "../image/kryds.svg";
import styles from "./ProductGrid.module.css";

export default function FilterOverlay({
  isOpen, // Om overlayet er åbent (true/false)
  onOpen, // Funktion til at åbne overlayet (bruges til filter-knap på mobil)
  onClose, // Funktion til at lukke overlayet (bruges til baggrund og kryds)
  options, // Mulige filtermuligheder (sort, typer, farver, størrelser, brands, køn, priser) – genereres dynamisk ud fra produkterne
  draftFilters, // De aktuelle (ikke-anvendte) filtervalg – ændres løbende mens brugeren klikker rundt
  onDraftFiltersChange, // Funktion til at opdatere draftFilters, så parent-komponenten kan holde styr på filter-state
  onReset, // Funktion til at nulstille alle filtre (både i UI og i parent)
  onApply, // Funktion til at anvende valgte filtre (kopierer draftFilters til aktive filtre i parent)
}) {
  // openSections holder styr på hvilke filtersektioner der er foldet ud (true/false for hver sektion)
  // Bruges til at folde grupper ud/ind (fx "Farver", "Brands")
  const [openSections, setOpenSections] = useState({
    sort: false,
    productTypes: false,
    colors: false,
    sizes: false,
    brands: false,
    genders: false,
    prices: false,
  });

  // Skifter om en sektion er åben/lukket (bruges til at folde filtergrupper ud/ind)
  // Når brugeren klikker på en sektion, toggles dens state
  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  // Tilføjer/fjerner et filtervalg i en gruppe (fx farver, brands, størrelser)
  // Hvis værdien allerede er valgt, fjernes den – ellers tilføjes den
  // Dette gør det muligt at vælge flere værdier i samme filtergruppe
  const toggleCheckbox = (group, value) => {
    const currentValues = draftFilters[group] || [];
    const isSelected = currentValues.includes(value);

    onDraftFiltersChange({
      ...draftFilters,
      [group]: isSelected
        ? currentValues.filter((item) => item !== value) // Fjern hvis valgt
        : [...currentValues, value], // Tilføj hvis ikke valgt
    });
  };

  // Sætter sorteringsfilteret (kun én kan vælges ad gangen)
  const setSort = (value) => {
    onDraftFiltersChange({
      ...draftFilters,
      sort: value,
    });
  };

  // Viser plus/minus-ikon afhængigt af om sektionen er åben (bruges til at indikere fold ud/ind)
  const renderSectionIcon = (isSectionOpen) => (
    <img
      src={isSectionOpen ? minusIcon : plusIcon}
      alt=""
      aria-hidden="true"
      className={styles.filterSectionIcon}
    />
  );

  return (
    <>
      {/* Knap til at åbne filter-overlayet (vises typisk på mobil). onOpen sætter isOpen=true i parent. */}
      <button
        type="button"
        className={styles.filterTriggerButton}
        onClick={onOpen}
        aria-label="Åbn filter"
      >
        <img src={filterButtonIcon} alt="" aria-hidden="true" />
      </button>

      {/* Selve overlayet vises kun hvis isOpen er true */}
      {isOpen && (
        <div
          className={styles.filterOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Filter"
        >
          {/* Klik på baggrunden (uden for sidebar) lukker overlayet */}
          <button
            type="button"
            className={styles.filterOverlayBackdrop}
            onClick={onClose}
            aria-label="Luk filter"
          />

          {/* Sidebar med alle filtermuligheder */}
          <aside className={styles.filterSidebar}>
            <div className={styles.filterHeader}>
              <h1>Filter</h1>

              {/* Knap til at lukke filteret (øverste højre hjørne) */}
              <button
                type="button"
                className={styles.filterCloseButton}
                onClick={onClose}
                aria-label="Luk filter"
              >
                <img src={closeIcon} alt="" aria-hidden="true" />
              </button>
            </div>

            {/* Sorteringssektion (radio-knapper, kun én kan vælges) */}
            <button
              type="button"
              className={styles.filterSectionButton}
              onClick={() => toggleSection("sort")}
            >
              <span>Sorter</span>
              {renderSectionIcon(openSections.sort)}
            </button>

            {openSections.sort && (
              <div className={styles.filterSectionContent}>
                <div className={styles.filterOptionList}>
                  {options.sort.map((option) => (
                    <label
                      key={option.value}
                      className={styles.filterOptionRow}
                    >
                      <input
                        type="radio"
                        name="sort"
                        checked={draftFilters.sort === option.value}
                        onChange={() => setSort(option.value)}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Produkttype-sektion (checkboxe, flere kan vælges) */}
            <button
              type="button"
              className={styles.filterSectionButton}
              onClick={() => toggleSection("productTypes")}
            >
              <span>Produkttype</span>
              {renderSectionIcon(openSections.productTypes)}
            </button>

            {openSections.productTypes && (
              <div className={styles.filterSectionContent}>
                <div className={styles.filterOptionList}>
                  {options.types.map((type) => (
                    <label key={type} className={styles.filterOptionRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.types.includes(type)}
                        onChange={() => toggleCheckbox("types", type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Farve-sektion (checkboxe, flere kan vælges) */}
            <button
              type="button"
              className={styles.filterSectionButton}
              onClick={() => toggleSection("colors")}
            >
              <span>Farver</span>
              {renderSectionIcon(openSections.colors)}
            </button>

            {openSections.colors && (
              <div className={styles.filterSectionContent}>
                <div className={styles.filterOptionList}>
                  {options.colors.map((color) => (
                    <label key={color} className={styles.filterOptionRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.colors.includes(color)}
                        onChange={() => toggleCheckbox("colors", color)}
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Størrelsessektion (checkboxe, grupperet efter label, flere kan vælges) */}
            <button
              type="button"
              className={styles.filterSectionButton}
              onClick={() => toggleSection("sizes")}
            >
              <span>Størrelse</span>
              {renderSectionIcon(openSections.sizes)}
            </button>

            {openSections.sizes && (
              <div className={styles.filterSectionContent}>
                {/* Hver gruppe kan fx være "Baby", "Børn", "Teen" – grupperes for bedre overblik */}
                {options.sizes.map((group) => (
                  <div key={group.label} className={styles.filterSizeGroup}>
                    <p>{group.label}</p>

                    <div className={styles.filterOptionList}>
                      {group.options.map((size) => (
                        <label key={size} className={styles.filterOptionRow}>
                          <input
                            type="checkbox"
                            checked={draftFilters.sizes.includes(size)}
                            onChange={() => toggleCheckbox("sizes", size)}
                          />
                          <span>{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Brand-sektion (checkboxe, flere kan vælges) */}
            <button
              type="button"
              className={styles.filterSectionButton}
              onClick={() => toggleSection("brands")}
            >
              <span>Brands</span>
              {renderSectionIcon(openSections.brands)}
            </button>

            {openSections.brands && (
              <div className={styles.filterSectionContent}>
                <div className={styles.filterOptionList}>
                  {options.brands.map((brand) => (
                    <label key={brand} className={styles.filterOptionRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.brands.includes(brand)}
                        onChange={() => toggleCheckbox("brands", brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Køn-sektion (checkboxe, flere kan vælges) */}
            <button
              type="button"
              className={styles.filterSectionButton}
              onClick={() => toggleSection("genders")}
            >
              <span>Køn</span>
              {renderSectionIcon(openSections.genders)}
            </button>

            {openSections.genders && (
              <div className={styles.filterSectionContent}>
                <div className={styles.filterOptionList}>
                  {options.genders.map((gender) => (
                    <label key={gender} className={styles.filterOptionRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.genders.includes(gender)}
                        onChange={() => toggleCheckbox("genders", gender)}
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Pris-sektion (checkboxe, flere kan vælges) */}
            <button
              type="button"
              className={styles.filterSectionButton}
              onClick={() => toggleSection("prices")}
            >
              <span>Pris</span>
              {renderSectionIcon(openSections.prices)}
            </button>

            {openSections.prices && (
              <div className={styles.filterSectionContent}>
                <div className={styles.filterOptionList}>
                  {options.prices.map((price) => (
                    <label key={price.value} className={styles.filterOptionRow}>
                      <input
                        type="checkbox"
                        checked={draftFilters.prices.includes(price.value)}
                        onChange={() => toggleCheckbox("prices", price.value)}
                      />
                      <span>{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Handlingsknapper nederst: Nulstil og Vis produkter */}
            <div className={styles.filterActionBar}>
              {/* Nulstil alle filtre (både i overlay og parent) */}
              <button
                type="button"
                className={styles.filterResetButton}
                onClick={onReset}
              >
                Nulstil filter
              </button>

              {/* Anvend valgte filtre (kopierer draftFilters til aktive filtre i parent) */}
              <button
                type="button"
                className={styles.filterApplyButton}
                onClick={onApply}
              >
                Vis Produkter
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
