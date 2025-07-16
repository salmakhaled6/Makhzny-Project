import React from "react";
import "../Styles/Reviews.css";
import user1 from "../assets/user11.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import user5 from "../assets/user5.png";
import user6 from "../assets/user6.png";
import user7 from "../assets/user7.png";
import user8 from "../assets/user8.png";
import user9 from "../assets/user9.png";
import { useLang } from "../contexts/LanguageContext";

function Reviews() {
  const { t, currentLang } = useLang(); 
  const reviews = t("reviewsList", { returnObjects: true });

  const userImages = [
    user1, user2, user3, user4, user5,
    user6, user7, user8, user9,
  ];

  const dates = [
    "2025-06-01", "2025-06-03", "2025-06-05",
    "2025-06-06", "2025-06-10", "2025-06-12",
    "2025-06-14", "2025-06-18", "2025-06-20",
  ];

  const infiniteReviews = [...reviews, ...reviews];

  return (
    <div className="reviews-container" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <h2 className="reviews-title">{t("reviewsTitle")}</h2>
      <p className="reviews-subtitle">{t("reviewsSubtitle")}</p>

      <div className="reviews-scroll-wrapper">
        <div className="reviews-marquee">
          {infiniteReviews.map((review, i) => (
            <div className="review-card" key={i}>
              <div className="review-top">
                <img
                  src={userImages[i % userImages.length]}
                  alt={review.name}
                  className="review-img"
                />
                <div className="review-header">
                  <h3 className="review-name">{review.name}</h3>
                  <div className="review-rate">{"⭐".repeat(5)}</div>
                </div>
              </div>
              <div className="review-bottom">
                <p className="review-text">{review.text}</p>
                <p className="review-date">{dates[i % dates.length]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
