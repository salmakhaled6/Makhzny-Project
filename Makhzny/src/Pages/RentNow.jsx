
import React, { useState, useEffect } from "react";
import RentCard from "../Components/RentCard";
import { getBranches } from "../api/products";
import { useLang } from "../contexts/LanguageContext";
import "../Styles/RentNow.css";

function RentNow() {
  const { t } = useLang();

  const branchOptions = [
    { id: 2, name: "Jeddah" },
    { id: 3, name: "Riyadh" },
    { id: 4, name: "Dammam" },
  ];

  const maxPriceLimit = 6210;
  const maxSizeLimit = 36;
  const priceGap = 0;
  const sizeGap = 0;

  const [selectedBranch, setSelectedBranch] = useState("3");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(maxSizeLimit);
  const [filteredUnits, setFilteredUnits] = useState([]);

  const handleApplyFilters = async () => {
    const filters = {
      Min_Price: Math.round(minPrice / 1.15),
      Max_Price: Math.round(maxPrice / 1.15),
      Min_Size: minSize,
      Max_Size: maxSize,
    };
    

    if (selectedBranch) {
      filters.company_id = Number(selectedBranch);
    }

    try {
      const data = await getBranches(filters);
      setFilteredUnits(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  useEffect(() => {
    handleApplyFilters();
  }, []);

  return (
    <div className="RentNow">
      <div className="Rent-Bar">
        <div className="Rent-Bar-box">
          <h2>{t("rentNow")}</h2>
          <p>{t("rentNowDescription")}</p>
        </div>
      </div>

      <div className="range-container">
        <div className="Range-box">
        <div className="range-filter">
  <p>{t("priceRange")}</p>
  <div className="input-pair price-range-input">
    <input
      type="number"
      value={minPrice}
      min={0}
      max={maxPrice - priceGap}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (maxPrice - val >= priceGap) setMinPrice(val);
      }}
    />
    <span> - </span>
    <input
      type="number"
      value={maxPrice}
      min={minPrice + priceGap}
      max={maxPriceLimit}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (val - minPrice >= priceGap) setMaxPrice(val);
      }}
    />
  </div>
</div>

<div className="range-filter">
  <p>{t("sizeRange")}</p>
  <div className="input-pair size-range-input">
    <input
      type="number"
      value={minSize}
      min={0}
      max={maxSize - sizeGap}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (maxSize - val >= sizeGap) setMinSize(val);
      }}
    />
    <span> - </span>
    <input
      type="number"
      value={maxSize}
      min={minSize + sizeGap}
      max={maxSizeLimit}
      onChange={(e) => {
        const val = Number(e.target.value);
        if (val - minSize >= sizeGap) setMaxSize(val);
      }}
    />
  </div>
</div>


          <div className="range-filter">
            <p>{t("location")}</p>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">{t("all")}</option>
              {branchOptions.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="range-filter apply-button">
            <button onClick={handleApplyFilters}>{t("apply")}</button>
          </div>
        </div>
      </div>

      <RentCard cards={filteredUnits} />
    </div>
  );
}

export default RentNow;

