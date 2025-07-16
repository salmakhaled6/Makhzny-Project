import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/logotwo.png'; 
import { useLang } from '../contexts/LanguageContext';

import '../Styles/AccountLayout.css';

function AccountLayout() {
  const { t, lang } = useLang();

  return (
    <div className="account-layout">
      <aside className="account-sidebar">
        <img src={logo} alt="Logo" className="account-logo" />
        <nav className="account-nav">
          <Link to="/account/units"><svg xmlns="http://www.w3.org/2000/svg" id="journals" width="35.131" height="38.14" viewBox="0 0 45.131 48.14"><g id="Group_8" data-name="Group 8"><path id="Path_11" data-name="Path 11" d="M15.035,0H39.1a6.017,6.017,0,0,1,6.017,6.017V36.1A6.017,6.017,0,0,1,39.1,42.122a6.017,6.017,0,0,1-6.017,6.017H9.017A6.017,6.017,0,0,1,3,42.122H6.009a3.009,3.009,0,0,0,3.009,3.009h24.07A3.009,3.009,0,0,0,36.1,42.122V12.035a3.009,3.009,0,0,0-3.009-3.009H9.017a3.009,3.009,0,0,0-3.009,3.009H3A6.017,6.017,0,0,1,9.017,6.017h24.07A6.017,6.017,0,0,1,39.1,12.035V39.113A3.009,3.009,0,0,0,42.113,36.1V6.017A3.009,3.009,0,0,0,39.1,3.009H15.035a3.009,3.009,0,0,0-3.009,3.009H9.017A6.017,6.017,0,0,1,15.035,0Z" transform="translate(0.009 0)" fill="#410b5f"></path><path id="Path_12" data-name="Path 12" d="M3.009,18.009V16.5a1.5,1.5,0,0,1,3.009,0v1.5h1.5a1.5,1.5,0,0,1,0,3.009H1.5a1.5,1.5,0,0,1,0-3.009Zm0,9.026v-1.5a1.5,1.5,0,0,1,3.009,0v1.5h1.5a1.5,1.5,0,1,1,0,3.009H1.5a1.5,1.5,0,1,1,0-3.009Zm0,7.522v1.5H1.5a1.5,1.5,0,0,0,0,3.009H7.522a1.5,1.5,0,0,0,0-3.009h-1.5v-1.5a1.5,1.5,0,1,0-3.009,0Z" transform="translate(0 0.044)" fill="#410b5f"></path></g></svg>             {t('myUnits')}
</Link>
          <Link to="/account/invoices"><svg xmlns="http://www.w3.org/2000/svg" width="32.017" height="35.14" viewBox="0 0 55.017 48.14"> <g id="collection" transform="translate(0.001 0)"> <g id="Group_4" data-name="Group 4" transform="translate(-0.001 0)"> <path id="Path_5" data-name="Path 5" d="M8.6,11.816a1.719,1.719,0,0,1,0-3.439H46.42a1.719,1.719,0,1,1,0,3.439Zm6.877-6.877a1.719,1.719,0,0,1,0-3.439h24.07a1.719,1.719,0,0,1,0,3.439ZM0,44.482A5.158,5.158,0,0,0,5.158,49.64h44.7a5.158,5.158,0,0,0,5.158-5.158V20.412a5.158,5.158,0,0,0-5.158-5.158H5.158A5.158,5.158,0,0,0,0,20.412ZM5.158,46.2a1.719,1.719,0,0,1-1.719-1.719V20.412a1.719,1.719,0,0,1,1.719-1.719h44.7a1.719,1.719,0,0,1,1.719,1.719v24.07A1.719,1.719,0,0,1,49.859,46.2Z" transform="translate(0 -1.5)" fill="#8a8a8b"></path> </g> </g> </svg>  {t('invoices')}</Link>
          <Link to="/account/documents"><svg xmlns="http://www.w3.org/2000/svg" width="32.122" height="35.14" viewBox="0 0 42.122 48.14"> <g id="files-alt" transform="translate(-12)"> <g id="Group_1581" data-name="Group 1581" transform="translate(12)">  <path id="Path_9984" data-name="Path 9984" d="M42.087,0H18.017A6.017,6.017,0,0,0,12,6.017v36.1a6.017,6.017,0,0,0,6.017,6.017h24.07A6.017,6.017,0,0,0,48.1,42.122,6.017,6.017,0,0,0,54.122,36.1V12.035A6.017,6.017,0,0,0,48.1,6.017,6.017,6.017,0,0,0,42.087,0ZM48.1,9.026a3.009,3.009,0,0,1,3.009,3.009V36.1A3.009,3.009,0,0,1,48.1,39.113Zm-33.1-3.009a3.009,3.009,0,0,1,3.009-3.009h24.07A3.009,3.009,0,0,1,45.1,6.017v36.1a3.009,3.009,0,0,1-3.009,3.009H18.017a3.009,3.009,0,0,1-3.009-3.009Z" transform="translate(-12)" fill="#8a8a8b"></path></g> </g> </svg>    {t('documents')}</Link>
          <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="32.357" height="35.14" viewBox="0 0 52.357 48.14"> <g id="house" transform="translate(0 0)"> <g id="Group_7" data-name="Group 7" transform="translate(0 0)"> <path id="Path_9" data-name="Path 9" d="M6,46.137V23.451H9.49V46.137a1.745,1.745,0,0,0,1.745,1.745H42.647a1.745,1.745,0,0,0,1.745-1.745V23.451h3.49V46.137a5.235,5.235,0,0,1-5.235,5.235H11.235A5.235,5.235,0,0,1,6,46.137ZM44.392,7.745V19.961l-6.98-6.98V7.745A1.745,1.745,0,0,1,39.157,6h3.49A1.745,1.745,0,0,1,44.392,7.745Z" transform="translate(-0.762 -3.233)" fill="#8a8a8b" fill-rule="evenodd"></path> <path id="Path_10" data-name="Path 10" d="M25.209,4.644a3.49,3.49,0,0,1,4.935,0l23.2,23.2a1.747,1.747,0,0,1-2.471,2.471l-23.2-23.2-23.2,23.2A1.747,1.747,0,1,1,2.01,27.839Z" transform="translate(-1.498 -3.622)" fill="#8a8a8b" fill-rule="evenodd"></path> </g></g> </svg>   {t('backToWebsite')}</Link>
        </nav>
      </aside>
      <main className="account-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AccountLayout;
