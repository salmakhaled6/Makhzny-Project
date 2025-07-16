import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Documents.css';
import profileImg from '../assets/header-img.png'; 
import doc from '../assets/doc.png';
import { useLang } from '../contexts/LanguageContext';

function Document() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLang();

  useEffect(() => {
    if (!user.id) return;
    fetchDocuments();
  }, [user.id]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://makhzny.odoo.com/api/get_docs', {
        partner_id: user.id
      });
      setDocuments(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1]; 

      try {
        await axios.post('https://makhzny.odoo.com/api/upload_document', {
          partner_id: user.id,
          attachment_name: file.name,
          attach_data: base64Data,
        });

        alert(t("uploadSuccess"));
        fetchDocuments(); 
      } catch (error) {
        console.error(" Upload failed:", error);
        alert(t("uploadFail"));
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="account-section" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="account-header">
        <div className="user-info">
          <img src={profileImg} alt="Profile" className="profile-img" />
          <div>
            <h2>{t("welcome")}, {user.name || 'User'}</h2>
            <p>{t("organizeMessage")}</p>
          </div>
        </div>
      </div>

      <div className="documents-header">
        <h3>{t("documents")}</h3>
        <label className="add-file-btn">
          {t("addFile")}
          <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
        </label>
      </div>

      <div className="document-preview">
        {loading ? (
          <p>{t("loading")}</p>
        ) : documents.length === 0 ? (
          <>
            <img src={doc} alt="Document" />
            <p>{t("noResults")}</p>
          </>
        ) : (
          <div className="documents-grid">
            {documents.map((d, idx) => (
              <div key={idx} className="doc-card">
                <img src={doc} alt="Doc icon" />
                <p>{d.name || `${t("documents")} ${idx + 1}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Document;
