import React from 'react';
import { useLang } from '../contexts/LanguageContext';

import p1 from '../assets/p1.webp';
import p2 from '../assets/p2.webp';
import p3 from '../assets/p3.webp';
import p4 from '../assets/p4.webp';

import '../Styles/OurServices.css';

function OurServices() {
  const { t } = useLang(); 

  return (
<div className="our-services-container">
  <h2>{t("ourServicesTitle")}</h2>
  <div className="our-services-grid">
    <div className="service-card">
      <img src={p1} alt={t("selfStorage")} />
      <p>{t("selfStorage")}</p>
    </div>
    <div className="service-card">
      <img src={p2} alt={t("privateOffices")} />
      <p>{t("privateOffices")}</p>
    </div>
    <div className="service-card">
      <img src={p3} alt={t("meetingRooms")} />
      <p>{t("meetingRooms")}</p>
    </div>
    <div className="service-card">
      <img src={p4} alt={t("moving")} />
      <p>{t("moving")}</p>
    </div>
  </div>
</div>

  );
}

export default OurServices;
