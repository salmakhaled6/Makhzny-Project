import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileImg from '../assets/header-img.png';
import '../Styles/Invoices.css';
import { useLang } from '../contexts/LanguageContext';

function Invoices() {
  const [invoices, setInvoices] = useState({ paid: [], unpaid: [] });
  const [filter, setFilter] = useState('paid');
  const { t, lang } = useLang();

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', id: null };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.post('https://makhzny.odoo.com/get_invoices', {
          partner_id: user.id,
        });

        const result = res.data.result;
        if (result && typeof result === 'object') {
          setInvoices(result); 
        } else {
          setInvoices({ paid: [], unpaid: [] });
        }
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
        setInvoices({ paid: [], unpaid: [] });
      }
    };

    if (user.id) fetchInvoices();
  }, [user.id]);

  const filteredInvoices = Array.isArray(invoices[filter]) ? invoices[filter] : [];

  return (
    <div className="invoices-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="header">
        <img src={profileImg} alt="Profile" className="profile-img" />
        <div className="welcome-text">
          <h3>{t('welcome')}, {user.name}</h3>
          <p>{t('organizeMessage')}</p>
        </div>
      </div>

      <h2 className="section-title">{t('myInvoices')}</h2>

      <div className="invoice-tabs">
        <button
          className={filter === 'paid' ? 'active' : ''}
          onClick={() => setFilter('paid')}
        >
          {t('paid')}
        </button>
        <button
          className={filter === 'unpaid' ? 'active' : ''}
          onClick={() => setFilter('unpaid')}
        >
          {t('unpaid')}
        </button>
      </div>

      <div className="invoice-list">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <div className="invoice-card" key={invoice.id}>
              <img
                src={`https://makhzny.odoo.com${invoice.image || '/makhzany_website_pages/static/unit_placeholder.jpeg'}`}
                alt="Invoice"
                className="invoice-img"
              />
              <div className="invoice-info">
                <h4>{invoice.name || `Invoice #${invoice.id}`}</h4>
                <p>{invoice.price || 'N/A'} SAR</p>
                <p className="invoice-date">
                  {invoice.date
                    ? new Date(invoice.date).toLocaleDateString(
                        lang === 'ar' ? 'ar-EG' : 'en-US'
                      )
                    : 'N/A'}
                </p>
              </div>
              <div className="invoice-actions">
                <span className={`status ${invoice.status}`}>
                  {t(invoice.status)}
                </span>

                {invoice.status === 'unpaid' ? (
                  <a
                    href={`https://makhzny.odoo.com/cart/${invoice.reservation_id}/${invoice.contract_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pay-now-btn"
                  >
                    {t('payNow')}
                  </a>
                ) : (
                  <button className="view-btn">{t('viewInvoice')}</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ padding: '20px' }}>
            {t('noInvoices', { status: t(filter) })}
          </p>
        )}
      </div>
    </div>
  );
}

export default Invoices;
