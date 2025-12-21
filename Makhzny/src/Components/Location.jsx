import React from "react";
import { useLang } from "../contexts/LanguageContext";
import location1 from "../assets/location1.png";
import location2 from "../assets/location4.jpg";
import location3 from "../assets/Jubail.jpg";
import location4 from "../assets/location4.png";
import location5 from "../assets/location5.png";
import location6 from "../assets/ph.jpg";

import "../Styles/location.css";

function Location() {
  const { t, lang } = useLang();

  return (
    <div className="location-section">
      <h2>{t("whereToFindUs")}</h2>
      <p>{t("exploreLocations")}</p>

      <div className="location-grid">
        <div className="row">
          <div className="location-card tall">
            <img src={location1} alt={t("riyadh")} />
            <p>{t("riyadh")}</p>
            <div className="card-hover-content">
              <p>{t("riyadh")}</p>
              <ul
  className="hover-location-list"
  style={{ direction: lang === "ar" ? "rtl" : "ltr", textAlign: lang === "ar" ? "right" : "left" }}
>               
 {/* <li className="soon-location">
                  <span className="icon">📍</span> {t("qadisiyah")} - {t("soon")}
                </li> */}
            
                <li className="soon-location">
                  <span className="icon">📍</span> {t("mahadiyah")} - {t("soon")}
                </li>
                <li className="soon-location">
                  <span className="icon">📍</span> {t("Qurtubah")} - {t("soon")}
                </li>
               
                <li>
                  <span className="icon">📞</span> 920024021
                </li>
              </ul>

              <a
                href="https://www.google.com/maps/dir/26.3941629,50.1597741/Makhzny+Self+Storage+%D9%85%D8%AE%D8%B2%D9%86%D9%8A,+Prince+Mohammed+Bin+Abdulrahman+Bin+Abdulaziz,+As-suly+District,+Riyadh%E2%80%AD/@25.4924874,47.7898225,9z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e2fa9ea333cd53f:0xfe165baea21e32e8!2m2!1d46.8364615!2d24.6544882?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover-btn">{t("getDirections")}</button>
              </a>
            </div>
          </div>

          <div className="location-card">
            <img src={location4} alt={t("dammam")} />
            <p>{t("dammam")}</p>
            <div className="card-hover-content">
              <p>{t("dammam")}</p>
              <ul
  className="hover-location-list"
  style={{ direction: lang === "ar" ? "rtl" : "ltr", textAlign: lang === "ar" ? "right" : "left" }}
>                  <li className="soon-location">
                  {/* <span className="icon">📍</span> {t("saif")} - {t("soon")} */}
                </li>
                <li>
  <span className="icon">📍</span>
  <a 
    href="https://maps.app.goo.gl/JR7bVzUeGbjdfuSs5?g_st=ipc" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="green-location"
  >
    {t("firstlocation")}
  </a>
</li>

                <li>
                  <span className="icon">📍</span>
                  <span className="green-location">{t("khalidiyyah")}</span>
                </li>
                <li>
                  <span className="icon">📞</span> 920024021
                </li>
              </ul>
              <a
                href="https://www.google.com/maps/dir/26.3941629,50.1597741/Makhzny+Self+Storage+%D9%85%D8%AE%D8%B2%D9%86%D9%8A,+%D8%B3%D9%84%D9%85%D8%A7%D9%86+%D8%A7%D9%84%D9%81%D8%A7%D8%B1%D8%B3%D9%8A%D8%8C+Dammam%E2%80%AD/@26.394201,50.157049,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3e49e515812e8195:0xade05ccd3f3141a8!2m2!1d50.1596536!2d26.3941583?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover-btn">{t("getDirections")}</button>
              </a>
            </div>
          </div>

          <div className="location-card">
            <img src={location5} alt={t("jeddah")} />
            <p>{t("jeddah")}</p>
            <div className="card-hover-content">
              <p>{t("jeddah")}</p>
              <ul
  className="hover-location-list"
  style={{ direction: lang === "ar" ? "rtl" : "ltr", textAlign: lang === "ar" ? "right" : "left" }}
>                <li>
                  <span className="icon">📍</span>
                  <span className="green-location">{t("rayyan")}</span>
                </li>
                <li>
                  <span className="icon">📞</span> 920024021
                </li>
              </ul>
              <a
                href="https://www.google.com/maps/dir/26.3941629,50.1597741/Makhzny+Self+Storage+%D9%85%D8%AE%D8%B2%D9%86%D9%8A,+Jeddah%E2%80%AD/@23.9026348,41.9961441,7z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x15c17dfe799262c7:0x4add1a8d3032f54!2m2!1d39.209709!2d21.6965037?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover-btn">{t("getDirections")}</button>
              </a>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="location-card">
            <img src={location2} alt={t("abha")} />
            <p>{t("abha")}</p>
            <p>{t("soon")}</p>
          </div>
          <div className="location-card">
            <img src={location3} alt={t("jubail")} />
            <p>{t("jubail")}</p>
            <p>{t("soon")}</p>
          </div>
          <div className="location-card">
            <img src={location4} alt={t("")} />
            <p>{t("modnsanaya")}</p>
            <div className="card-hover-content">
              <p>{t("modnsanaya")}</p>
              <ul
  className="hover-location-list"
  style={{ direction: lang === "ar" ? "rtl" : "ltr", textAlign: lang === "ar" ? "right" : "left" }}
>                  <li className="soon-location">
                  {/* <span className="icon">📍</span> {t("saif")} - {t("soon")} */}
                </li>
                <li>
  {/* <span className="icon">📍</span> */}
  <a 
    href="https://maps.app.goo.gl/tgvnwgHoRsFujyTT8?g_st=ic" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="green-location"
  >
    {/* {t("firstlocation")} */}
  </a>
</li>

              
                <li>
                  <span className="icon">📞</span> 920024021
                </li>
              </ul>
              <a
                href="https://maps.app.goo.gl/tgvnwgHoRsFujyTT8?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover-btn">{t("getDirections")}</button>
              </a>
            </div>
          </div>

          <div className="location-card">
            <img src={location6} alt={t("")} />
            <p>{t("qadisiyah")}</p>
            <div className="card-hover-content">
              <p>{t("qadisiyah")}</p>
              <ul
  className="hover-location-list"
  style={{ direction: lang === "ar" ? "rtl" : "ltr", textAlign: lang === "ar" ? "right" : "left" }}
>            <li>
                  <span className="icon">📍</span>
                  <span className="green-location">{t("suly")}</span>
                </li>
                <li>
  {/* <span className="icon">📍</span> */}
  <a 
    href="https://maps.app.goo.gl/i4JgePdmQmGyyYvv6" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="green-location"
  >
    {/* {t("firstlocation")} */}
  </a>
</li>

              
                <li>
                  <span className="icon">📞</span> 920024021
                </li>
              </ul>
              <a
                href="https://maps.app.goo.gl/i4JgePdmQmGyyYvv6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="hover-btn">{t("getDirections")}</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
