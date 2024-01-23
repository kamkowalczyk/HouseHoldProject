import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './reservations.css';

const Reservations = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="reservations">
      <h2 className="reservations-title">Twoje rezerwacje</h2>
      <div className="reservations-list">
        {state.reservations.map((reservation, index) => (
          <div className="reservation-card" key={index}>
            <img src={reservation.image} alt={reservation.name} className="reservation-image" />
            <div className="reservation-info">
              <h3>{reservation.name}</h3>
              <p>Koszt: {reservation.price} zł</p>
              <p>Nocy: {reservation.nights}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
