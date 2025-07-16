import React from 'react';
import "../Styles/Products.css";
import { useLang } from "../contexts/LanguageContext";

import box from "../assets/box.jpeg";
import bubbleWrap from "../assets/bubbleWrap.jpg";
import foamRoll from "../assets/foamRoll.jpg";
import corrugated from "../assets/corrugated.png";
import cutter from "../assets/cutter.jpg";
import scissors from "../assets/scissors.jpg";
import Padlock from "../assets/lock.jpeg";
import tape from "../assets/tape.jpg";
import shrink from "../assets/shrink.jpg";
import marker from "../assets/marker.jpg";

function Products() {
  const { currentLang, t } = useLang();

  const images = [
    box,
    bubbleWrap,
    foamRoll,
    corrugated,
    cutter,
    scissors,
    Padlock,
    tape,
    shrink,
    marker
  ];

  const productList = t("packagingProducts", { returnObjects: true }).map((product, index) => ({
    name: product.name,
    img: images[index]
  }));

  const repeatedProducts = [...productList, ...productList];

  return (
    <div className="products-section" dir={currentLang === "ar" ? "rtl" : "ltr"}>
      <h2 className="products-title">{t("packagingProductsTitle")}</h2>
      <div className="carousel-wrapper">
        <div className="products-carousel">
          {repeatedProducts.map((item, index) => (
            <div className="product-card" key={index}>
              <img src={item.img} alt={item.name} className="product-img" />
              <p className="product-name">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
