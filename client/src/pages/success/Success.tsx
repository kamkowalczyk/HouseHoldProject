import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../context/AuthContext';

const SuccessPage = () => {
  const { dispatch } = useContext(AuthContext);
  const location = useLocation();
  const houseId = new URLSearchParams(location.search).get('houseId');

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await fetch(`/api/houses/find/${houseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch house details');
        }
        const house = await response.json();

        dispatch({
          type: 'ADD_RESERVATION',
          payload: {
            name: house.name,
            price: house.price,
            nights: house.nights,
            image: house.photos[0]
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (houseId) {
      fetchHouseDetails();
    }
  }, [dispatch, houseId]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
      <h1>Płatność zakończona sukcesem!</h1>
      <p>Twoja płatność została pomyślnie przetworzona.</p>
      <Link to="/">Powrót do strony głównej</Link>
    </div>
  );
};

export default SuccessPage;