import React, { useState, useEffect } from "react";
import "../../Styles/RequestQuote.css";
import { useLang } from '../../contexts/LanguageContext'; 


function RequestQuote() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [price, setPrice] = useState(0);
  const [quotation, setQuotation] = useState([]);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [showPersonalInfoPopup, setShowPersonalInfoPopup] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [receivingMethod, setReceivingMethod] = useState("");
  const { t, lang } = useLang();


  useEffect(() => {
    if (selectedBranch) {
      fetchUnitsForBranch(selectedBranch);
    }
  }, [selectedBranch]);

  const BRANCH_MAP = {
    Riyadh: 3,
    Dammam: 4,
    Jeddah: 2,
  };
  
  const fetchUnitsForBranch = async (branch) => {
    const company_id = BRANCH_MAP[branch];
    if (!company_id) return;
  
    try {
      const res = await fetch("https://makhzny.odoo.com/get_products_quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_id }),
      });
  
      const json = await res.json();
      setQuotation(json.result?.data || []);
    } catch (error) {
      console.error("Failed to fetch units:", error);
    }
  };
  
  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setCurrentStep(2);
  };
  

  const handleReceivingOption = (method) => {
    setReceivingMethod(method);
    setShowPersonalInfoPopup(true);
  };

  const handleSubmitQuote = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      alert(t("pleaseFillAllFields"));
      js
      Copy
      Edit
            return;
    }

    try {
      setLoadingQuote(true);

      const requestBody = {
        branch: selectedBranch,
        area: parseFloat(selectedSize),
        duration: selectedDuration,
        title: "Storage",
        partner_name: userInfo.name,
        partner_email: userInfo.email,
        partner_phone: "+966" + userInfo.phone,

        is_email: receivingMethod === "email",
        is_wp: receivingMethod === "whatsapp",
        is_pdf: receivingMethod === "pdf",
        price,
      };

      const response = await fetch("https://makhzny.odoo.com/get_quot_pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (receivingMethod === "pdf") {
        const pdfUrl = data.result;
        if (pdfUrl && pdfUrl.startsWith("http")) {
          window.open(pdfUrl, "_blank");
          setShowPersonalInfoPopup(false);
          return;
        } else {
          alert(t("pdfFailed"));
          return;
        }
      }

      if (
        (receivingMethod === "email" || receivingMethod === "whatsapp") &&
        data.result === "Sent"
      ) {
        alert(
          receivingMethod === "email"
            ? t("quoteSentEmail")
            : t("quoteSentWhatsapp")
        );
        
        setShowPersonalInfoPopup(false);
        return;
      }

      alert(t("quoteError"));
    } catch (error) {
      console.error("Failed to send quote:", error);
      alert(t("quoteSendError"));
    } finally {
      setLoadingQuote(false);
    }
  };

 

  const handleAreaSelect = (area, priceValue) => {
    setSelectedSize(area);
    setPrice(priceValue);
    setCurrentStep(3);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setCurrentStep(4);
  };

  const steps = [
    { number: 1, label: t("step1") },
    { number: 2, label: t("step2") },
    { number: 3, label: t("step3") },
    { number: 4, label: t("step4") },
  ];
  

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
<div className="request-quote-container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="request-quote">
        <div className="request-quote-box">
        <h2>{t("requestQuoteTitle")}</h2>
<p>{t("requestQuoteDescription")}</p>

        </div>
      </div>

      <div className="steps-indicator">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="step-item">
              <div
                className={`step-circle ${
                  currentStep >= step.number ? "active" : ""
                }`}
              >
                {step.number}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-line ${
                  currentStep > step.number ? "active" : ""
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {currentStep === 1 && (
        <div className="step-content">
         <h3>{t("step1")}</h3>
<button onClick={() => handleBranchSelect("Riyadh")}>{t("riyadhBranch")}</button>
<button onClick={() => handleBranchSelect("Dammam")}>{t("dammamBranch")}</button>
<button onClick={() => handleBranchSelect("Jeddah")}>{t("jeddahBranch")}</button>

        </div>
      )}

      {currentStep === 2 && (
        <div className="step-content">
          <h3>{t("step2")}</h3>
<p>{t("selectedBranch")}: {selectedBranch}</p>
          <div className="area-buttons-group">
            {quotation.map((unit, idx) => (
              <button key={idx} onClick={() => handleAreaSelect(unit.area, unit.price)}>
                {unit.area} M<sup>2</sup>
              </button>
            ))}
          </div>
          <div className="step-buttons">
            <button onClick={handlePreviousStep}>Previous</button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="step-content">
          <h3>{t("step3")}</h3>
<button onClick={() => handleDurationSelect("1 Month")}>{t("monthlyDiscount")}</button>
<button onClick={() => handleDurationSelect("3 Months")}>{t("threeMonthDiscount")}</button>
<button onClick={() => handleDurationSelect("6 Months")}>{t("sixMonthDiscount")}</button>
<button onClick={() => handleDurationSelect("Annual")}>{t("annualDiscount")}</button>
          <div className="step-buttons">
            <button onClick={handlePreviousStep}>Previous</button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="step-content">
     <h3>{t("step4")}</h3>
<button onClick={() => handleReceivingOption("email")}>{t("sendViaEmail")}</button>
<button onClick={() => handleReceivingOption("whatsapp")}>{t("sendViaWhatsapp")}</button>
<button onClick={() => handleReceivingOption("pdf")}>{t("downloadPDF")}</button>

          <div className="step-buttons">
            <button onClick={handlePreviousStep}>Previous</button>
          </div>
        </div>
      )}

      {showPersonalInfoPopup && (
        <div className="popup-overlay-quote">
          <div className="popup-box-quote">
          <h3>{t("enterPersonalInfo")}</h3>
            <div className="input-fields-wrapper">
              <input
                type="text"
                placeholder={t("fullNamePlaceholder")}
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
              <input
                type="tel"
                placeholder={t("phonePlaceholder")}
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
            </div>
            <div className="popup-actions">
            <button onClick={() => setShowPersonalInfoPopup(false)}>{t("cancel")}</button>
            <button onClick={handleSubmitQuote}>{t("submit")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestQuote;
