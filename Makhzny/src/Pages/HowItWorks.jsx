import React from "react";
// import img1 from '../assets/img1.jpg';
// import img2 from '../assets/img2.jpg';
// import img3 from '../assets/img3.jpg';
// import img4 from '../assets/img4.jpg';
import work1 from "../assets/work1.png";
import work2 from "../assets/work2.png";
import "../Styles/Works.css";
import { useLang } from "../contexts/LanguageContext"; 


function HowItWorks() {
  const { t, lang } = useLang();

  return (
<div className="HowitWorks-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="HowitWorks-Bar">
      <div className="container">
        <div className="HowitWorks-Bar-box">
        <h2>{t("howItWorks")}</h2>
        <p>
  {t("howItWorksDesc")} <span>Makhzny</span>. 
  {/* {t("howItWorksDesc2") } */}
</p>
        </div>
        </div>
      </div>

      <div className="howit-works-content">
      <div className="container">
        <div className="howit-step image-right">
          <div className="howit-text">
          <h3>{t("storageMadeSimple")}</h3>
          <p>{t("storageSimpleDesc")}</p>

          </div>
          <img src={work1} alt="Step 1" />
        </div>

        <div className="howit-step image-close">
          <img src={work2} alt="Step 2" />
          <div className="howit-text">
          <h3>{t("simplifyJourney")}</h3>
          <p>{t("simplifyJourneyDesc")}</p>

          </div>
        </div>

        <div className="howit-step image-right">
          <div className="howit-text">
          <h3>{t("storageMadeSimple")}</h3>
          <p>{t("contactDesc")}</p>

          </div>
          <img src={work1} alt="Step 3" />
        </div>

        <div className="howit-step image-close">
          <img src={work2} alt="Step 4" />
          <div className="howit-text">
          <h3>{t("startLiving")}</h3>
          <p>{t("startLivingDesc")}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default HowItWorks;
