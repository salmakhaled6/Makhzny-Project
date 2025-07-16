import React from 'react';
import '../Styles/GetInTouch.css'; 
import { useLang } from "../contexts/LanguageContext";


function GetInTouch() {
  const { t, lang } = useLang();

  return (
<div className="get-in-touch-container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="getinTouch-bar">
        <div className="getinTouch-box">
        <h2>{t("getInTouch")}</h2>
        <p>{t("getInTouchDesc")}</p>

        </div>
      </div>

      <div className="container contact-info">
        <div className="info-box">
          📞
          <div>
          <p className="info-title">{t("phoneNumber")}</p>
            <p className="info-text">+966545933222</p>
          </div>
        </div>

        <div className="info-box">
        📍          <div>
        <p className="info-title">{t("address")}</p>
            <p className="info-text">Dammam, Alkhaldyiah Aljanoubiyah, Salman Alfarsi St</p>
          </div>
        </div>

        <div className="info-box">
        📧          <div>
        <p className="info-title">{t("email")}</p>
            <p className="info-text">hello@makhzny.com</p>
          </div>
        </div>
      </div>

      <form className="container contact-form">
        <div className="form-row">
        <label htmlFor="name">{t("nameLabel")}</label>
          <input id="name" type="text" required />
        </div>

        <div className="form-row">
        <label htmlFor="phone">{t("phoneLabel")}</label>
          <input id="phone" type="text" />
        </div>

        <div className="form-row">
        <label htmlFor="email">{t("emailLabel")}</label>
          <input id="email" type="email" required />
        </div>

        <div className="form-row">
        <label htmlFor="question">{t("questionLabel")}</label>
          <input id="question" type="text" required />
        </div>

        <div className="form-row">
        <label>{t("submit")}</label>
        <button type="submit">{t("submit")}</button>
        </div>
      </form>
    </div>
  );
}

export default GetInTouch;
