import React from "react";
import { useLang } from "../contexts/LanguageContext";
import "../Styles/InfoTwo.css";

import W1 from "../assets/1.png";
import W2 from "../assets/2.png";
import W3 from "../assets/4.png";
import W4 from "../assets/5.png";
import W5 from "../assets/7.png";
import W6 from "../assets/13.png";
import W7 from "../assets/9.png";
import W8 from "../assets/10.png";
import W9 from "../assets/11.png";

const images = [W1, W2, W3, W4, W5, W6, W7, W8, W9];

function InfoTwo() {
  const { t } = useLang();
  const translatedFeatures = t("features");

  return (
    <div className="info-container">
      <div className="info-header">
        <h2>{t("whyBest")}</h2>
        <p>{t("choosingExcellence")}</p>
      </div>

      <div className="info-text">
        <h4>
          {t("tailoredTitle")} <span className="info-text-span">{t("tailoredSpan")}</span>
        </h4>
        <p>{t("tailoredDesc")}</p>
      </div>

      <div className="info-images">
        <div className="info-row first-row">
          {translatedFeatures.slice(0, 5).map((item, index) => (
            <div className="info-card" key={index}>
              <img src={images[index]} alt={item.title} className="info-icon" />
              <h5 className="info-title">{item.title}</h5>
              <p className="info-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="info-row second-row">
          {translatedFeatures.slice(5).map((item, index) => (
            <div className="info-card" key={index + 5}>
              <img src={images[index + 5]} alt={item.title} className="info-icon" />
              <h5 className="info-title">{item.title}</h5>
              <p className="info-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoTwo;
