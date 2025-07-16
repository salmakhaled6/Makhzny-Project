import React, { useState } from 'react';
import '../Styles/FAQ.css';
import { useLang } from '../contexts/LanguageContext';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [openIndex2, setOpenIndex2] = useState(null);
  const { t, lang } = useLang();

  const toggleFAQ = (index, setOpen, open) => {
    setOpen(open === index ? null : index);
  };

  const faqPart1 = t("faqIndividual");
  const faqPart2 = t("faqCompany");

  return (
    <div className="faq-container" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="faq-Bar">
        <div className="faq-Bar-box">
          <h2>{t("faqIndividualsTitle")}</h2>
          <p>{t("faqDescription")}</p>
        </div>
      </div>

      <div className="FAQ-part1">
        {faqPart1.map((item, index) => (
          <div
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index, setOpenIndex, openIndex)}
          >
            <div className="faq-question">
              <span>{item.question}</span>
              <span className="faq-toggle">{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>

      <div className="faq-Bar">
        <div className="faq-Bar-box">
          <h2>{t("faqCompanyTitle")}</h2>
          <p>{t("faqDescription")}</p>
        </div>
      </div>

      <div className="FAQ-part2">
        {faqPart2.map((item, index) => (
          <div
            className={`faq-item ${openIndex2 === index ? 'open' : ''}`}
            key={index}
            onClick={() => toggleFAQ(index, setOpenIndex2, openIndex2)}
          >
            <div className="faq-question">
              <span>{item.question}</span>
              <span className="faq-toggle">{openIndex2 === index ? '-' : '+'}</span>
            </div>
            {openIndex2 === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
