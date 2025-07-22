import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/MyUnits.css';
import profileImg from '../assets/header-img.png';
import { useLang } from '../contexts/LanguageContext'; 

function MyUnits() {
  const [units, setUnits] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { name: "User" };
  const { t, lang } = useLang();

  useEffect(() => {
    if (!user?.id) return;
  
    axios.post('https://makhzny.odoo.com/api/get_units', {
      partner_id: user.id
      
    })
    .then(res => {
      console.log("Units API response:", res.data); 
      if (res.data?.data) {
        setUnits(res.data.data);
      }
    })
    .catch(err => {
      console.error("Failed to fetch units:", err);
    });
  }, [user.id]);
  console.log("User ID:", user.id);


  return (
    <div className="my-units-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="header">
        <img src={profileImg} alt="Profile" className="profile-img" />
        <div className="welcome-text">
          <h3>{t("welcome")}, {user.name}</h3>
          <p>{t("organizeMessage")}</p>
        </div>
      </div>

      <h2 className="section-title">{t("myUnits")}</h2>

      <div className="units-grid">
        {units.length > 0 ? (
          units.map((unit) => (
            <div className="unit-card" key={unit.id}>
              <img src="" alt={unit.name} className="unit-img" />
              <h4>{unit.name}</h4>
              <p className="unit-price">{unit.price || "N/A"}</p>
            </div>
          ))
        ) : (
          <p>{t("noUnits")}</p>
        )}
      </div>
    </div>
  );
}

export default MyUnits;
