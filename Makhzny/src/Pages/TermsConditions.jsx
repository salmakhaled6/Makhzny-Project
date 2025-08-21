import React from 'react'
import '../Styles/Terms.css'
import { useTranslation } from "react-i18next";



function TermsConditions() {
    const { t } = useTranslation();

  return (
    <div className="terms-page">
      <h2>{t("termsTitle")}</h2>


<div className="">
<h3>{t("overviewTitle")}</h3>
        <p>{t("overviewText")}</p>
</div>

<div className="">
<h3>{t("onlineStoreTermsTitle")}</h3>
      <p>{t("onlineStoreTermsText")}</p>
</div>
<div className="">
  <h3>{t("generalConditionsTitle")}</h3>
  <p>{t("generalConditionsText")}</p>
</div>


<div className="">
<h3>{t("accuracyTitle")}</h3>
      <p>{t("accuracyText")}</p>
</div>
<div className="">
  <h3>{t("modifications.title")}</h3>
  <p>{t("modifications.content")}</p>
</div>

<div className="">
  <h3>{t("products.title")}</h3>
  <p>{t("products.content")}</p>
</div>


<div>
  <h3>{t("billingInfoTitle")}</h3>
  <p>{t("billingInfoContent")}</p>
</div>

<div className="">
  <h3>{t("optionalToolsTitle")}</h3>
  <p>{t("optionalToolsContent")}</p>
</div>

<div>
  <h3>{t("thirdPartyLinksTitle")}</h3>
  <p>{t("thirdPartyLinksContent")}</p>
</div>


<div className="">
  <h3>{t("userCommentsTitle")}</h3>
  <p>{t("userCommentsContent")}</p>
</div>

<div className="">
  <h3>{t("personalInfoTitle")}</h3>
  <p>{t("personalInfoContent")}</p>
</div>


<div className="">
  <h3>{t("errorsTitle")}</h3>
  <p>{t("errorsContent")}</p>
</div>


<div className="">
  <h3>{t("prohibitedUsesTitle")}</h3>
  <p>{t("prohibitedUsesContent")}</p>
</div>

<div>
  <h3>{t("disclaimerTitle")}</h3>
  <p>{t("disclaimerText")}</p>
</div>


<div className="">
  <h3>{t("indemnificationTitle")}</h3>
  <p>{t("indemnificationContent")}</p>
</div>


<div className="">
  <h3>{t("severabilityTitle")}</h3>
  <p>{t("severabilityContent")}</p>
</div>


<div className="">
  <h3>{t("terminationTitle")}</h3>
  <p>{t("terminationContent")}</p>
</div>


<div className="">
  <h3>{t("entireAgreementTitle")}</h3>
  <p>{t("entireAgreementContent")}</p>
</div>


<div className="">
  <h3>{t("governingLawTitle")}</h3>
  <p>{t("governingLawContent")}</p>
</div>


<div className="">
  <h3>{t("changesToTermsTitle")}</h3>
  <p>{t("changesToTermsContent")}</p>
</div>


<div className="">
  <h3>{t("contactInfoTitle")}</h3>
  <p>{t("contactInfoContent")}</p>
</div>

    </div>
  )
}

export default TermsConditions
