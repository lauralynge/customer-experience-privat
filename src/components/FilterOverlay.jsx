// Filter-sidebar overlay – åbner en sidebar med sortering, produkttyper, farver, størrelser, brands og kønsfiltre.
// Bruger et "draft filters"-mønster, så ændringer kun anvendes når brugeren trykker på "Vis resultater".
import { useState } from "react";
import filterButtonIcon from "../image/filter.svg";
import plusIcon from "../image/plus.svg";
import minusIcon from "../image/minus.svg";
import closeIcon from "../image/kryds.svg";
import styles from "./ProductGrid.module.css";

export default function FilterOverlay({
  isOpen,
  onOpen,
  onClose,
  options,
  draftFilters,
  onDraftFiltersChange,
  onReset,
  onApply,
}) {
  const [openSections, setOpenSections] = useState({
    sort: false,
    productTypes: false,
    colors: false,
    sizes: false,
    brands: false,
    genders: false,
    prices: false,
  });

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const toggleCheckbox = (group, value) => {
    const currentValues = draftFilters[group] || [];
    const isSelected = currentValues.includes(value);

    onDraftFiltersChange({
      ...draftFilters,
      [group]: isSelected
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value],
    });
  };

  const setSort = (value) => {
    onDraftFiltersChange({
      ...draftFilters,
      sort: value,
    });
  };

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
      <button
        type="button"
        className={styles.filterTriggerButton}
        onClick={onOpen}
        aria-label="Åbn filter"
      >
        <img src={filterButtonIcon} alt="" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className={styles.filterOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Filter"
        >
          <button
            type="button"
            className={styles.filterOverlayBackdrop}
            onClick={onClose}
            aria-label="Luk filter"
          />

          <aside className={styles.filterSidebar}>
            <div className={styles.filterHeader}>
              <h1>Filter</h1>

              <button
                type="button"
                className={styles.filterCloseButton}
                onClick={onClose}
                aria-label="Luk filter"
              >
                <img src={closeIcon} alt="" aria-hidden="true" />
              </button>
            </div>

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

            <div className={styles.filterActionBar}>
              <button
                type="button"
                className={styles.filterResetButton}
                onClick={onReset}
              >
                Nulstil filter
              </button>

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
