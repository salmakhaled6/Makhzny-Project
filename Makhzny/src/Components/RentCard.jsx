import React, { useState } from "react";
import pic1 from "../assets/pic1.jpg";
import "../Styles/RentCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLang } from "../contexts/LanguageContext";

function RentCard({ cards }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [entryDate, setEntryDate] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoResult, setPromoResult] = useState(null);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(null);

  const { t } = useLang();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const periodMap = {
    monthly: 1,
    "3months": 3,
    "6months": 6,
    annual: 12,
  };

  const periodDiscounts = {
    "3months": 5,
    "6months": 15,
    annual: 35,
  };

  const periodLabels = {
    monthly: t("monthly"),
    "3months": `${t("3 months")} (5% discount)`,
    "6months": `${t("6 months")} (15% discount)`,
    annual: `${t("annual")}`,
  };

  const calculateCardPriceWithVAT = (priceWithoutVAT) => {
    if (!priceWithoutVAT) return 0;
    const priceWithVAT = priceWithoutVAT * 1.15;
    return Math.round(priceWithVAT / 10) * 10;
  };

  const checkPromoValidity = async (code) => {
    if (!code.trim()) return null;
    try {
      const response = await axios.post(
        "https://makhzny.odoo.com/check_promocode_validity",
        { promocode: code.trim() }
      );
  
      const result = response.data?.result;
      const success = result?.validity === true;
      const discountMap = result?.percentage;
      const currentMonths = periodMap[selectedPeriod] || 1;
      const promoDiscount = discountMap?.[currentMonths];
  
      return {
        valid: success && !!promoDiscount,
        discount_percent: success && promoDiscount ? promoDiscount * 100 : null,
      };
    } catch (error) {
      console.error("Promo code error:", error);
      return { valid: false, discount_percent: null };
    }
  };
  

  const applyPromo = () => {
    if (promoValid && promoResult) {
      setAppliedDiscountPercent(promoResult);
    }
  };

  const handleBookClick = (card) => {
    setEntryDate(new Date().toISOString().split("T")[0]);
    setSelectedCard(card);
    setShowPopup(true);

    setPromoCode("");
    setPromoValid(null);
    setPromoResult(null);
    setAppliedDiscountPercent(null);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
    setSelectedPeriod("");
  };

  const calculateFinalPrice = () => {
    if (!selectedCard) return { original: 0, discounted: null };

    const months = periodMap[selectedPeriod] || 1;
    const baseUnitPrice = selectedCard.price; 

    const basePrice = baseUnitPrice * months;

    const periodDiscount = periodDiscounts[selectedPeriod] || 0;
    const promoDiscount = appliedDiscountPercent || 0;

    const totalDiscountPercent = periodDiscount + promoDiscount;

    const priceAfterDiscount = basePrice * (1 - totalDiscountPercent / 100);

    const priceWithVAT = priceAfterDiscount * 1.15;

    const finalPrice = Math.round(priceWithVAT / 10) * 10;

    const originalPriceWithVAT = Math.round((basePrice * 1.15) / 10) * 10;

    return {
      original: originalPriceWithVAT,
      discounted: totalDiscountPercent > 0 ? finalPrice : null,
      totalDiscountPercent,
    };
  };

  const handleRent = async () => {
    if (!currentUser) {
      navigate("/Login");
      return;
    }

    if (!selectedCard || !selectedPeriod || !entryDate) {
      alert("Please select a unit, period, and date.");
      return;
    }

    const { discounted, original } = calculateFinalPrice();
    const totalPrice = discounted !== null ? discounted : original;

    const payload = {
      partner_id: currentUser.id,
      branch_id: selectedCard.branch_id || 2,
      unit_id: selectedCard.id,
      installment_duration: periodMap[selectedPeriod],
      move_in_date: entryDate,
      price: totalPrice,
    };

    console.log("Sent to backend:", payload);
    console.log("User sees in UI:", totalPrice);

    try {
      const res = await axios.post("https://makhzny.odoo.com/reserve_api", payload);
      const reservationId = res.data?.result;

      if (reservationId) {
        alert(`Unit reserved! Reservation ID: ${reservationId}`);
        handleClosePopup();
        navigate("/Signature", {
          state: {
            reservationId,
            selectedCard,
            selectedPeriod,
            entryDate,
          },
        });
      } else {
        alert("Reservation failed. Please try again.");
      }
    } catch (error) {
      console.error("Reservation error:", error);
      alert("An error occurred during reservation.");
    }
  };

  return (
    <>
      <div className="rent-cards">
        {cards.map((card) => (
          <div className="rent-card" key={card.id}>
            <img
              src={card.image ? `https://makhzny.odoo.com${card.image}` : pic1}
              alt={card.title || "No title"}
            />
            <p className="code">{card.title || "No title"}</p>
            <p className="size">{card.area || "N/A"} m²</p>
            <p className="price">
              {calculateCardPriceWithVAT(card.price)} <span className="monthly"> / Monthly</span>
            </p>

            <button className="book-btn" onClick={() => handleBookClick(card)}>
              Book it
            </button>
          </div>
        ))}
      </div>

      {showPopup && selectedCard && (
        <div className="popup-overlay-rentcard">
          <div className="popup-rentcard">
            <div className="popup-box-rentcard">
              <div className="popup-box">
                <h3>{t("rentalOptions")}</h3>
                <p className="subtitle">{t("invoicePeriod")}</p>
                <p className="description">{t("selectDuration")}</p>

                <div className="radio-group">
                  {["monthly", "3months", "6months", "annual"].map((period) => (
                    <label key={period} className="radio-option">
                      <input
                        type="radio"
                        name="period"
                        value={period}
                        checked={selectedPeriod === period}
                        onChange={() => {
                          setSelectedPeriod(period);
                          setPromoValid(null);
                          setPromoResult(null);
                          setAppliedDiscountPercent(null);
                        }}
                      />
                      <span className={selectedPeriod === period ? "selected" : ""}>
                        {periodLabels[period]}
                      </span>
                    </label>
                  ))}
                </div>

                <hr />

                <p className="subtitle">{t("warehouseEntryDate")}</p>
                <p className="description">{t("chooseDate")}</p>
                <label className="date-label" htmlFor="entryDate">
                  {t("startIn")}
                </label>
                <input type="date" id="entryDate" className="date-input" value={entryDate} readOnly />

                <div className="promo-section">
                  <div className="promo-container">
                  <input
  type="text"
  placeholder={t("Enter Promocode")}
  value={promoCode}
  onChange={async (e) => {
    const code = e.target.value;
    setPromoCode(code);
    setPromoValid(null);
    setPromoResult(null);
    setAppliedDiscountPercent(null);

    if (code.length > 2) {
      setPromoLoading(true);
      const result = await checkPromoValidity(code); 
      setPromoLoading(false);
      if (result?.valid) {
        setPromoValid(true);
        setPromoResult(result);
        setAppliedDiscountPercent(result.discount_percent);
      } else {
        setPromoValid(false);
      }
    }
  }}
  className="promo-input"
/>

                
                    {/* <button className="promo-btn" onClick={applyPromo} disabled={!promoValid || !promoResult}>
                      {t("apply")}
                    </button> */}
                  </div>

                  {promoValid === true && <p style={{ color: "green" }}>{t("promoValid")}</p>}
                  {promoValid === false && <p style={{ color: "red" }}>{t("promoInvalid")}</p>}
                </div>
              </div>

              <div className="popup-footer">
                <p className="total">
                  {t("total")}:{" "}
                  <span style={{ color: "white" }}>
                    {calculateFinalPrice().discounted ?? calculateFinalPrice().original}
                  </span>
                </p>

                <div className="rent-card-buttons">
                  <button className="rent-btn" onClick={handleClosePopup}>
                    {t("cancel")}
                  </button>
                  <button className="rent-btn" onClick={handleRent}>
                    {t("rent")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RentCard;
