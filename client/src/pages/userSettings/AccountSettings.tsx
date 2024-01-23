import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faFlag, faCity, faPhone, faSignature} from '@fortawesome/free-solid-svg-icons';
import './accountSettings.css';

const AccountSettings = () => {
  const { state } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    username: '',
    forename: '',
    surname: '',
    email: '',
    country: '',
    city: '',
    phone: '',

  });
  useEffect(() => {
    const userId = state.user?._id; 
    const fetchUserData = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/users/${userId}`);
          const data = await response.json();
          setUserData({ ...data });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [state.user]);

  const handleInputChange = (e:any) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const userId = state.user?._id;
  
    if (userId) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const updatedUser = await response.json();
        
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  return (
    <div className="account-settings">
      <h1>Ustawienia konta</h1>
      <form onSubmit={handleSubmit} className="account-form">
      <div className="form-group">
        <label><FontAwesomeIcon icon={faUser} /> Imie:</label>
        <input type="text" name="forename" value={userData.forename} onChange={handleInputChange} />
      </div>

      <div className="form-group">
        <label><FontAwesomeIcon icon={faSignature} /> Nazwisko:</label>
        <input type="text" name="surname" value={userData.surname} onChange={handleInputChange} />
      </div>

        <div className="form-group">
          <label><FontAwesomeIcon icon={faEnvelope} />Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label><FontAwesomeIcon icon={faFlag}/>Kraj:</label>
          <input type="text" name="country" value={userData.country} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label><FontAwesomeIcon icon={faCity}/>Miasto:</label>
          <input type="text" name="city" value={userData.city} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label><FontAwesomeIcon icon={faPhone}/>Telephone:</label>
          <input type="tel" name="phone" value={userData.phone} onChange={handleInputChange} />
        </div>
        <button type="submit" className="submit-btn">Zapisz zmiany</button>
      </form>
    </div>
  );
};


export default AccountSettings;
