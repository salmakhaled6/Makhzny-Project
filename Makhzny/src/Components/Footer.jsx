import React from "react";
import { NavLink } from 'react-router-dom';
import { useLang } from "../contexts/LanguageContext";

import footerlogo from "../assets/footer-logo.png";
import applestore from "../assets/group.png";
import googlestore from "../assets/group2.png";
import facebook from "../assets/facebook.png";
import tiktok from "../assets/tiktok.png";
import x from "../assets/x.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import vector1 from "../assets/vector1.png";
import vector2 from "../assets/vector2.png";
import vector3 from "../assets/vector3.png";

import "../Styles/footer.css";

function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-column logo-column">
        <img src={footerlogo} alt="Makhzny logo" className="footer-logo" />
      </div>

      <div className="footer-column links-column">
        <ul className="footer-links">
          <li className="section-title">{t("quickLinks")}</li>
          <li><NavLink to="/RentNow">{t("rentNow")}</NavLink></li>
          <li><NavLink to="/FAQ">{t("faq")}</NavLink></li>
          <li><NavLink to="/PrivacyPolicy">{t("privacyPolicy")}</NavLink></li>
          <li><NavLink to="/Login">{t("login")}</NavLink></li>
          <li><NavLink to="/TermsConditions">{t("terms")}</NavLink></li>
        </ul>
        <div className="app-store-wrapper">
          <img src={applestore} alt="App Store" className="app-store" />
          <img src={googlestore} alt="Google Play" className="app-store" />
        </div>
      </div>

      <div className="footer-column contact-column">
        <ul className="footer-contact">
          <li className="section-title">{t("contactUs")}</li>
          <li><img src={vector1} alt="location" />{t("Riyadh , Jeddah and Dammam")}</li>
          <li><img src={vector2} alt="email" />{t("Hello@makhzny.com")}</li>
          <li><img src={vector3} alt="phone" />{t("phone")}</li>

          <div className="footer-social">
  <a
    href="https://www.facebook.com/makhzny" 
    target="_blank" 
    rel="noopener noreferrer"
    className="social-icon"
  >
    <img src={facebook} alt="Facebook" />
  </a>

  <a
    href="https://www.linkedin.com/company/makhzny-selfstorage-%D9%85%D8%AE%D8%B2%D9%86%D9%8A/"
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    <img src={linkedin} alt="LinkedIn" />
  </a>

  <a
    href="https://x.com/makhzny?s=21&t=zfyvB3GUsGmdMsNPVwweKA"
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    <img src={x} alt="X (Twitter)" />
  </a>

  <a
    href="https://www.tiktok.com/@makhzny?_t=ZS-8xgYk0oTDLE&_r=1"
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    <img src={tiktok} alt="TikTok" />
  </a>

  <a
    href="https://www.instagram.com/makhzny?igsh=MW90M3lqZmhxa2J5bw=="
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon"
  >
    <img src={instagram} alt="Instagram" />
  </a>
</div>
        </ul>

      </div>
    </footer>
  );
}

export default Footer;