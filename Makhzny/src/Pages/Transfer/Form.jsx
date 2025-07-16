import React, { useEffect, useState } from "react";
import axios from "axios";
import back from "../../assets/back.png";
import "../../Styles/Form.css";
import { useLang } from '../../contexts/LanguageContext'; 

import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const { t } = useLang();
  const currentUser = JSON.parse(localStorage.getItem("user"));



  const [formData, setFormData] = useState({
    partner_id: currentUser.id,
    item_type_id: "",
    item_size_id: "",
    date: "",
    city_id: "",
    branch_id: 2,
    detailed_address_from: "",
    detailed_address_to: "", 

    notes: "",
    request_unpacking: false,
  });

  const [itemTypes, setItemTypes] = useState([]);
  const [itemSizes, setItemSizes] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    axios
      .get("https://makhzny.odoo.com/api/item_types")
      .then((res) => setItemTypes(res.data.data));

    axios
      .get("https://makhzny.odoo.com/api/item_sizes")
      .then((res) => setItemSizes(res.data.data));

    axios
      .get("https://makhzny.odoo.com/api/get_cities")
      .then((res) => setCities(res.data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting transport request with payload:", formData);
  
    try {
      const res = await axios.post(
        "https://makhzny.odoo.com/api/transport_requests",
        formData
      );
      setShowSuccessPopup(true);
      navigate("/TransferOrder");

      console.log("Response from backend:", res.data);
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("Failed to submit transfer request");
    }
  };
  
  const today = new Date().toISOString().split("T")[0];
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);



  return (
    <div className="form-container">
      <div className="transfer-hero">
        <div className="transfer-hero-box">
          <h2>{t("transferRequest")}</h2>
<p>{t("transferDescription")}</p>
        </div>
      </div>

      <div className="form-section">
        <div className="form-img-box">
          <img
            src={back}
            alt="Back"
            className="form-image"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          />
<p className="form-heading">{t("submitTransfer")}</p>
        </div>

        <form className="transfer-form" onSubmit={handleSubmit}>
        <label>{t("itemTypes")}</label>
          <select
            name="item_type_id"
            value={formData.item_type_id}
            onChange={handleChange}
            required
          >
<option value="">{t("selectItemType")}</option>
            {itemTypes &&
              itemTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>

      
          <label>{t("itemSizes")}</label>
          <select
            name="item_size_id"
            value={formData.item_size_id}
            onChange={handleChange}
            required
          >
<option value="">{t("selectItemSize")}</option>
            {itemSizes &&
              itemSizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.name}
                </option>
              ))}
          </select>
          
          <label>{t("Details of the items")}</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <label>{t("shippingDate")}</label>
          <input
  type="date"
  name="date"
  value={formData.date}
  onChange={handleChange}
  min={today} 
  required
/>


<label>{t("shippingAddress")}</label>
<div className="address-inputs">
  <p>{t("from")}</p>
  <input
    type="text"
    name="detailed_address_from"
    value={formData.detailed_address_from}
    onChange={handleChange}
    required
    placeholder={t("addressPlaceholder")} 
  />
<p>{t("to")}</p>
<select
  name="city_id"
  value={formData.city_id}
  onChange={handleChange}
  required
>
<option value="">{t("transferTo")}</option>
              {cities &&
                cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>  ))}
</select>

<label>{t("Detailed Address")}</label>
<input
  type="text"
  name="detailed_address_to"
  value={formData.detailed_address_to}
  onChange={handleChange}
  required
  placeholder={t("District ,Street")} 
/>


</div>

          <label>{t("additionalNotes")}</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              name="request_unpacking"
              checked={formData.request_unpacking}
              onChange={handleChange}
            />
<p>{t("requestDisassembly")}</p>
          </div>

         
<button className="submit-btn" type="submit">
  {t("sendRequest")}
</button>
          
        </form>
      </div>
      {showSuccessPopup && (
  <div className="success-popup-overlay">
    <div className="success-popup-box">
      <div className="checkmark">&#10004;</div>
      <h3>{t("requestSubmitted")}</h3>
      <p>{t("requestConfirmation")}</p>
      <button onClick={() => setShowSuccessPopup(false)}>{t("close")}</button>
    </div>
  </div>
)}

    </div>
  );
}

export default Form;
