import  { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faHouse, faSignOutAlt, faBars, faCog } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext.state;
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event : any) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    authContext.dispatch({ type: 'LOGOUT' });
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  const handleMobileMenu = () => {
    //
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={'/'} className="logo">
          <FontAwesomeIcon icon={faHouse} className="logo_icon" />
          HouseHold
        </Link>
        {user ? (
        <div className="navItems">
          {user.username && (
            <span className="username">Witaj, {user.username}</span>
          )}
          <FontAwesomeIcon icon={faCog} className="settings_icon" onClick={toggleSettings} />
          {showSettings && (
           <div className="settingsDropdown" ref={settingsRef}>
              <Link to="/your-reservations">Twoje rezerwacje</Link>
              <Link to="/account-settings">Ustawienia konta</Link>
            </div>
          )}
            <span className="navButton" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="logout_icon" />
              Wyloguj
            </span>
            <FontAwesomeIcon className='hamburgerIcon' icon={faBars} onClick={handleMobileMenu}/>
          </div>
        ) : (
          <div className="navItems">
            <Link to={'/register'} className="navButton">
              <FontAwesomeIcon icon={faUsers} className="user_icon" />
              Rejestracja
            </Link>
            <Link to={'/login'} className="navButton">
              <FontAwesomeIcon icon={faUser} className="user_icon" />
              Logowanie
            </Link>
            <FontAwesomeIcon className='hamburgerIcon' icon={faBars} onClick={handleMobileMenu}/>
          </div>
        )}
           
      </div>
    </div>
  );
};

export default Navbar;
