import React from "react";
import illustration from "../assets/illustrations.png";
import c1 from "../assets/c1.png";
import c2 from "../assets/c2.png";
import c3 from "../assets/c3.png";
import c4 from "../assets/c4.png";
import c5 from "../assets/c5.png";
import c6 from "../assets/c6.png";
import "../styles/Store.css";
import { useLang } from "../contexts/LanguageContext"; 

function Store() {
  const { t } = useLang(); 

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>{t("exploreStorage")}</h2>
        <p>{t("whatToStore")}</p>
      </div>

      <div className="store-content">
        <img
          src={illustration}
          alt="illustration"
          className="store-illustration"
        />

        <div className="store-icons">
          <div className="store-icon-row">
            <div className="store-icon">
              <img src={c1} alt="item 1" />
              <p>{t("personal")}</p>
            </div>
            <div className="store-icon">
              <img src={c2} alt="item 2" />
              <p>{t("commercial")}</p>
            </div>
            <div className="store-icon">
              <img src={c3} alt="item 3" />
              <p>{t("food")}</p>
            </div>
          </div>
          <div className="store-icon-row">
            <div className="store-icon">
              <img src={c4} alt="item 4" />
              <p>{t("cosmetics")}</p>
            </div>
            <div className="store-icon">
              <img src={c5} alt="item 5" />
              <p>{t("furniture")}</p>
            </div>
            <div className="store-icon">
              <img src={c6} alt="item 6" />
              <p>{t("medical")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
