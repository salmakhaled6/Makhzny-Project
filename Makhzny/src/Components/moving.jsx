import React from "react";
import "./../Styles/Moving.css";
import moveImage from "../assets/move.png";
import { useLang } from "../contexts/LanguageContext";


function MoveWithUs() {
  
  const { t, currentLang } = useLang();
<div
  className={`move-section ${currentLang === "ar" ? "rtl" : "ltr"}`}
  dir={currentLang === "ar" ? "rtl" : "ltr"}
></div>
  return (
    <div className="move-section" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <div className="move-text">
        <h2>{t("moveWithUsTitle")}</h2>
        <p style={{ whiteSpace: "pre-line" }}>
          {t("moveWithUsParagraph")}
        </p>
      </div>
      
      <div className="move-image">
        <img src={moveImage} alt="Moving Services" />
      </div>
    </div>
  );
}

export default MoveWithUs;
