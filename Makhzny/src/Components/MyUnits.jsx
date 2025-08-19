import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/MyUnits.css';
import profileImg from '../assets/header-img.png';
import { useLang } from '../contexts/LanguageContext'; 

function MyUnits() {
  const [units, setUnits] = useState([]);
  const [profile, setProfile] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || { id: null, name: "User" };
  const { t, lang } = useLang();

  useEffect(() => {
    if (!user?.id) return;

    axios.post('https://makhzny.odoo.com/get_partner_data', {
      partner_id: user.id
    })
    .then(res => {
      console.log("Partner API response:", res.data);
      if (res.data?.result) {
        setProfile(res.data.result); 
      }
    })
    .catch(err => {
      console.error("Failed to fetch partner data:", err);
    });
  }, [user.id]);

  useEffect(() => {
    if (!user?.id) return;
  
    axios.post('https://makhzny.odoo.com/get_units', {
      partner_id: user.id
    })
    .then(res => {
      console.log("Units API response:", res.data); 
      if (res.data?.result) {
        setUnits(res.data.result); 
      }
    })
    .catch(err => {
      console.error("Failed to fetch units:", err);
    });
  }, [user.id]);

  return (
    <div className="my-units-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="header">
        <img src={profileImg} alt="Profile" className="profile-img" />
        <div className="welcome-text">
          <h3>{t("welcome")}, {profile?.name || user.name}</h3>
          <p>Name: {profile?.name || user.name}</p>
          <p>Email: {profile?.email || user.email || "N/A"}</p>
          <p>Phone: {profile?.phone || user.phone || "N/A"}</p>
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
