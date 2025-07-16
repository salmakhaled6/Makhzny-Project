import React from 'react';
import transfer from '../../assets/transfer.png';
import '../../Styles/TransferRequest.css';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../contexts/LanguageContext'; 

function TransferRequest() {
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const handleRequestClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      navigate('/Form');
    } else {
      navigate('/Login');
    }
  };

  return (
    <div className="transfer-page" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="transfer-hero">
        <div className="transfer-hero-box">
          <h2>{t("MovingRequest")}</h2>
          <p>{t("transferDescription")}</p>
        </div>
      </div>

      <div className="transfer-content">
        <img src={transfer} alt="Transfer Icon" />
        <p>{t("noTransfers")}</p>
        <button className="transfer-btn" onClick={handleRequestClick}>
          {t("requestNow")}
        </button>
      </div>
    </div>
  );
}

export default TransferRequest;
