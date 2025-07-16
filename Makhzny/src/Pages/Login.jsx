import React, { useState } from 'react';
import '../Styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    if (!phone || phone.trim().length < 8) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const requestBody = { phone_number: `+966${phone}` };
      const res = await axios.post('https://makhzny.odoo.com/generate_otp', requestBody);
      alert("OTP sent successfully");
      setOtpSent(true);
    } catch (err) {
      console.error('Error sending OTP:', err);
      alert('Failed to send OTP: ' + err.message);
    }
  };

  const handleLogin = async () => {
    if (!phone || phone.trim().length < 8) {
      alert("Please enter a valid phone number.");
      return;
    }
  
    if (!otp || otp.trim().length < 4) {
      alert("Please enter a valid OTP.");
      return;
    }
  
    try {
      const requestBody = {
        phone: `+966${phone}`,
        otp: otp
      };
  
      const res = await axios.post('https://makhzny.odoo.com/web/customer_login_api', requestBody);
      const result = res.data.result;
  
      if (result?.error) {
        alert(result.error);
        return;
      }
  
      const token = res.data.token;
      const userData = {
        id: result?.partner_id
      };
  
      login(token, userData);

  
      alert("✅ Login successful");
  
      setTimeout(() => {
        navigate('/');
      }, 50);
  
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };
  
  
  

  return (
    <div className="login-container">
      <p className="heading">Login</p>

    
        <input
        
          type="number"
          placeholder="5XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
     

      <button className="btn2" onClick={handleSendOtp}>Send OTP</button>

      {otpSent && (
        <>
          <input
            type="number"
            placeholder="Enter the OTP you received"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn1" onClick={handleLogin}>Login</button>
        </>
      )}

      <button className="btn2" onClick={() => navigate('/SignUp')}>Sign Up</button>
    </div>
  );
}

export default Login;
