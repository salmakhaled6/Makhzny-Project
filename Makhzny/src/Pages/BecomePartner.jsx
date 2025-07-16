import React from "react";
import "../Styles/BecomePartner.css";
import { useLang } from "../contexts/LanguageContext";

function BecomePartner() {
  const { t, lang } = useLang();

  return (
    <div className="become-partner-container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="become-partner-bar">
        <div className="become-partner-box" >
          <h2>
            {t("partnerTitle")} <strong>Makhzny.</strong>
          </h2>
          <p>{t("partnerSubtitle")}</p>
        </div>
      </div>

      <form className="partner-form container">
        <label htmlFor="name">{t("yourName")}</label>
        <input id="name" type="text" required />

        <label htmlFor="phone">{t("phoneNumber")}</label>
        <input id="phone" type="text" />

        <label htmlFor="email">{t("yourEmail")}</label>
        <input id="email" type="email" required />

        <label htmlFor="company">{t("yourCompany")}</label>
        <input id="company" type="text" />

        <label htmlFor="subject">{t("subject")}</label>
        <input id="subject" type="text" required />

        <label htmlFor="question">{t("yourQuestion")}</label>
        <textarea id="question" rows="4" required></textarea>

        <button type="submit">{t("submit")}</button>
      </form>
    </div>
  );
}

export default BecomePartner;
