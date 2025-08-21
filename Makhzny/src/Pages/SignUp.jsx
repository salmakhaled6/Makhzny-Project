import React, { useState } from "react";
import axios from "axios";

import "../Styles/Login.css";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    dob: '',
    goodsNature: '',
    address: '',
    companyName: '',
    cr: '',
    vat: '',
    legalId: '',
    legalName: '',
    authName: '',
    authMobile: '',
    authId: '',
  });

  
  const [type, setType] = useState("personal");
  const [otp, setOtp] = useState('');
const [otpId, setOtpId] = useState(null);


const handleSendOtp = async () => {
  if (!formData.phone) {
    alert('Please enter your phone number first.');
    return;
  }

  try {
    const response = await axios.post('https://makhzny.odoo.com/generate_otp', {
      phone_number: formData.phone,
    });

    const id = response.data?.result?.data?.otp_id;

    console.log('OTP response:', response.data);
    console.log('Extracted OTP ID:', id);


    if (id) {
      setOtpId(id);
      alert('OTP sent successfully!');
    } else {
      alert('Failed to send OTP. Please try again.');
    }
  } catch (error) {
    console.error('OTP error:', error);
    alert('Error sending OTP');
  }
};




const handleSubmit = async () => {
  if (!otp) {
    alert('Please enter the OTP.');
    return;
  }

  try {
    const payload =
      type === 'personal'
        ? {
            name: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            id_number: formData.idNumber,
            bod: formData.dob,
            auth_name: formData.fullName,
            auth_mobile: formData.phone,
            vat: '',
            cr: '',
            otp: otp,
            street: formData.address || '',
            nature_of_goods_stored: formData.goodsNature || '',
          }
        : {
            name: formData.companyName,
            phone: formData.phone,
            email: formData.email,
            id_number: formData.legalId,
            bod: formData.dob,
            auth_name: formData.authName,
            auth_mobile: formData.authMobile,
            vat: formData.vat || '',
            cr: formData.cr || '',
            otp: otp,
            street: formData.address || '',
            nature_of_goods_stored: formData.goodsNature || '',
          };

    console.log("Sending registration payload:", payload);

    const res = await axios.post(
      'https://makhzny.odoo.com/web/register_new_customer_api',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (res.data?.result?.error) {
      alert('Registration failed: ' + res.data.result.error);
      return;
    }

    alert(' Registration successful!');
    console.log('Server response:', res.data);

    const result = res.data?.result?.data || {};
    const token = res.data?.token;

    const userData = {
      id: result.partner_id,
      name: result.name,
      email: result.email,
      phone: result.phone,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("token", token);
    }

  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration failed: ' + (error.response?.data?.message || error.message));
  }
};





  return (
    <div className="login-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
     <button
  onClick={() => setType("personal")}
  style={{
    backgroundColor: type === "personal" ? "#410B5F" : "#ccc",
    color: "#fff",
    marginRight: "10px",
    padding: "8px 16px",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "18px", 
    textTransform: "uppercase",
  }}
>
  Personal
</button>

<button
  onClick={() => setType("business")}
  style={{
    backgroundColor: type === "business" ? "#410B5F" : "#ccc",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "40px",
    cursor: "pointer",
    fontSize: "18px", 
    textTransform: "uppercase",
  }}
>
  Business
</button>

      </div>

      {type === "personal" && (
        <>
          <h3 className="signup-heading">Your Personal Information</h3>
          <p>
            Please ensure that you enter the information in accordance with
            official documents.
          </p>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ID Number"
            name="idNumber"
            value={formData.idNumber} 

            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="+966XXXXXXXXXXXX"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />{" "}
<button className="no-border-btn" onClick={handleSendOtp}>Send OTP</button>
<input
  type="text"
  placeholder="Enter OTP"
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
/>

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}

            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Nature of Goods stored"
            name="goodsNature"
            value={formData.goodsNature}

            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}

            name="address"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={formData.dob}

            name="dob"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />{" "}
        </>
      )}

      {type === "business" && (
        <>
          <h3  className="signup-heading">Your Business Information</h3>
          <p>
            Please ensure that you enter the information in accordance with
            official documents.
          </p>


<input
  type="text"
  placeholder="Legal Representative Name"
  name="legalName"
  value={formData.legalName}

  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="Legal Representative ID Number"
  value={formData.legalId}

  name="legalId"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="date"
  value={formData.dob} 

  placeholder="Legal Representative Date of Birth"
  name="dob"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="Company Name"
  name="companyName"
  value={formData.companyName}

  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="C.R Number"
  value={formData.cr}

  name="cr"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="VAT Registration"
  value={formData.vat}

  name="vat"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="+966XXXXXXXXXXXX"

  name="phone"
  value={formData.phone}
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<button className="no-border-btn" onClick={handleSendOtp}>Send OTP</button>

<input
  type="text"
  placeholder="Your OTP Number"
  value={otp}
  onChange={(e) => setOtp(e.target.value)}
/>

<input
  type="email"
  placeholder="Company Email"
  value={formData.email}

  name="email"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="Nature of Goods stored"
  value={formData.goodsNature}

  name="goodsNature"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="Authorized Person ID Number"
  value={formData.authId}

  name="authId"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="Authorized Person Mobile Number"
  name="authMobile"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="Authorized Person Name"
  value={formData.authName}

  name="authName"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

<input
  type="text"
  placeholder="Address (Exactly as Registered on ZATCA)"
  value={formData.address}

  name="address"
  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
/>

        </>
      )}

      <button
        style={{
          width: "100%",
          marginTop: "1rem",
          backgroundColor: "#410B5F",
          color: "white",
          textTransform: "uppercase",
          border: "none",
          borderRadius: "25px",
          padding: "10px",
        }}
        onClick={handleSubmit}
      >
        CONTINUE
      </button>
    </div>
  );
}

export default SignUp;


// 
// import React, { useState } from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";  
// import "../Styles/Login.css";

// function SignUp() {
//   const { t } = useTranslation(); 

//   const [formData, setFormData] = useState({});
//   const [type, setType] = useState("personal");
//   const [otp, setOtp] = useState('');
//   const [otpId, setOtpId] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSendOtp = async () => {
//     if (!formData.phone) {
//       alert(t("alerts.enterPhone"));
//       return;
//     }

//     try {
//       const response = await axios.post("https://makhzny.odoo.com/generate_otp", {
//         phone_number: formData.phone,
//       });

//       const id = response.data?.result?.data?.otp_id;
//       if (id) {
//         setOtpId(id);
//         alert(t("alerts.otpSent"));
//       } else {
//         alert(t("alerts.otpFailed"));
//       }
//     } catch (error) {
//       console.error("OTP error:", error);
//       alert(t("alerts.otpError"));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!otp) {
//       alert(t("alerts.enterOtp"));
//       return;
//     }

//     console.log("Submitting signup:", { formData, otp, otpId, type });
//     alert(t("alerts.signupSuccess"));
//   };

//   return (
//     <div className="login-container">
//       <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
//         <button
//           onClick={() => setType("personal")}
//           style={{
//             backgroundColor: type === "personal" ? "#410B5F" : "#ccc",
//             color: "#fff",
//           }}
//         >
//           {t("personalBtn")}
//         </button>
//         <button
//           onClick={() => setType("business")}
//           style={{
//             backgroundColor: type === "business" ? "#410B5F" : "#ccc",
//             color: "#fff",
//           }}
//         >
//           {t("businessBtn")}
//         </button>
//       </div>

//       {type === "personal" && (
//         <>
//           <h3 className="signup-heading">{t("personalHeading")}</h3>
//           <p>{t("ensureInfo")}</p>

//           <input type="text" placeholder={t("fullName")} name="fullName" onChange={handleChange} />
//           <input type="text" placeholder={t("idNumber")} name="idNumber" onChange={handleChange} />
//           <input type="text" placeholder={t("phone")} name="phone" onChange={handleChange} />

//           <button className="no-border-btn" onClick={handleSendOtp}>{t("sendOtp")}</button>
//           <input type="text" placeholder={t("enterOtp")} value={otp} onChange={(e) => setOtp(e.target.value)} />

//           <input type="email" placeholder={t("email")} name="email" onChange={handleChange} />
//           <input type="text" placeholder={t("goodsNature")} name="goodsNature" onChange={handleChange} />
//           <input type="text" placeholder={t("address")} name="address" onChange={handleChange} />
//           <input type="date" placeholder={t("dob")} name="dob" onChange={handleChange} />
//         </>
//       )}

//       {type === "business" && (
//         <>
//           <h3 className="signup-heading">{t("businessHeading")}</h3>
//           <p>{t("ensureInfo")}</p>

//           <input type="text" placeholder={t("legalName")} name="legalName" onChange={handleChange} />
//           <input type="text" placeholder={t("legalId")} name="legalId" onChange={handleChange} />
//           <input type="date" placeholder={t("legalDob")} name="dob" onChange={handleChange} />
//           <input type="text" placeholder={t("companyName")} name="companyName" onChange={handleChange} />
//           <input type="text" placeholder={t("cr")} name="cr" onChange={handleChange} />
//           <input type="text" placeholder={t("vat")} name="vat" onChange={handleChange} />
//           <input type="text" placeholder={t("phone")} name="phone" onChange={handleChange} />

//           <button className="no-border-btn" onClick={handleSendOtp}>{t("sendOtp")}</button>
//           <input type="text" placeholder={t("enterOtp")} value={otp} onChange={(e) => setOtp(e.target.value)} />

//           <input type="email" placeholder={t("companyEmail")} name="email" onChange={handleChange} />
//           <input type="text" placeholder={t("goodsNature")} name="goodsNature" onChange={handleChange} />
//           <input type="text" placeholder={t("authId")} name="authId" onChange={handleChange} />
//           <input type="text" placeholder={t("authMobile")} name="authMobile" onChange={handleChange} />
//           <input type="text" placeholder={t("authName")} name="authName" onChange={handleChange} />
//           <input type="text" placeholder={t("zatcaAddress")} name="address" onChange={handleChange} />
//         </>
//       )}

//       <button
//         style={{ width: "100%", marginTop: "1rem", backgroundColor: "#410B5F", color: "white" }}
//         onClick={handleSubmit}
//       >
//         {t("continue")}
//       </button>
//     </div>
//   );
// }

// export default SignUp;

