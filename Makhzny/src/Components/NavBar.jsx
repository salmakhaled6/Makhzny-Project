import React, { useState, useEffect } from 'react';
import logo from '../assets/logotwo.png';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import '../Styles/NavBar.css';

function NavBar() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [MobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const closeMenu = () => setMobileMenuOpen(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const syncAuthState = () => {
      const token = localStorage.getItem('token');
    };

    syncAuthState();

    window.addEventListener('storage-update', syncAuthState);
    window.addEventListener('storage', syncAuthState);

    return () => {
      window.removeEventListener('storage-update', syncAuthState);
      window.removeEventListener('storage', syncAuthState);
    };
  }, [location.pathname]);

  return (
    <div className="Nav-Bar">
      <div className="navbar-box">
        <div className="Nav-logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="hamburger" onClick={() => setMobileMenuOpen(prev => !prev)}>
          ☰
        </div>

        <div className={MobileMenuOpen ? "menu-content open" : "menu-content"}>
          <ul className="nav-links">
            <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>{t('home')}</NavLink></li>
            <li><NavLink to="/RentNow" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>{t('rentNow')}</NavLink></li>
            <li><NavLink to="/RequestQuote" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>{t('requestQuote')}</NavLink></li>
            <li><NavLink to="/TransferRequest" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>{t('moving')}</NavLink></li>
            <li><NavLink to="/howitWorks" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>{t('howItWorks')}</NavLink></li>
            <li><NavLink to="/GetInTouch" onClick={closeMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>{t('getInTouch')}</NavLink></li>

            <li className="dropdown-parent">
  <span onClick={() => setDropdownOpen(prev => !prev)} className="plus-toggle">
    <span className={`arrow-icon ${dropdownOpen ? 'open' : ''}`}></span>
  </span>
  <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
    <li>
      <NavLink
        to="/BecomePartner"
        onClick={closeMenu}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        {t("becomePartner")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/FAQ"
        onClick={closeMenu}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        {t("faq")}
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/ourlocations"
        onClick={closeMenu}
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        {t("ourLocations")}
      </NavLink>
    </li>
  </ul>
</li>

          </ul>

          {MobileMenuOpen && (
            <div className="right-controls mobile-only">
              <div className="flags">
                <select
                  value={lang}
                  onChange={(e) => {
                    const newLang = e.target.value;
                    setLang(newLang);
                    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
                  }}
                >
                  <option value="en">🇬🇧 EN</option>
                  <option value="ar">🇸🇦 AR</option>
                </select>
              </div>

              {isLoggedIn ? (
  <div className="logout-dropdown">
   <span className="logout-label" onClick={() => setUserDropdownOpen(prev => !prev)}>
  <span className="user-name">{user?.name || 'My Account'}</span>
  <span className={`dropdown-arrow ${userDropdownOpen ? 'open' : ''}`}>⌄</span>
</span>




    {userDropdownOpen && (
      <ul className="logout-dropdown-menu">
        <li onClick={() => { setUserDropdownOpen(false); navigate('/account/units'); }}>
          {t('myAccount') || 'My Account'}
        </li>
        <li onClick={handleLogout}>
          {t('logout') || 'Logout'}
        </li>
      </ul>
    )}
  </div>
) : (
  <button onClick={() => navigate('/LogIn')}>{t('signIn') || 'Sign In'}</button>
)}

            </div>
          )}
        </div>

        <div className="right-controls desktop-only">
          <div className="flags">
            <select
              value={lang}
              onChange={(e) => {
                const newLang = e.target.value;
                setLang(newLang);
                document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
              }}
            >
              <option value="en">🇬🇧 EN</option>
              <option value="ar">🇸🇦 AR</option>
            </select>
          </div>

          {isLoggedIn ? (
            <div className="logout-dropdown">
           <span className="logout-label" onClick={() => setUserDropdownOpen(prev => !prev)}>
  <span className="user-name">{user?.name || 'My Account'}</span>
  <span className={`dropdown-arrow ${userDropdownOpen ? 'open' : ''}`}>⌄</span>
</span>

              {userDropdownOpen && (
                <ul className="logout-dropdown-menu">
                  <li onClick={() => { setUserDropdownOpen(false); navigate('/account/units'); }}>
                    {t('myAccount') || 'My Account'}
                  </li>
                  <li onClick={handleLogout}>
                    {t('logout') || 'Logout'}
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/LogIn')}>{t('signIn') || 'Sign In'}</button>
          )}
        </div>
      </div>
    </div>
    
  );
  
}

export default NavBar;
