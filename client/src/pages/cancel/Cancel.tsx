import { Link } from 'react-router-dom';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CancelPage = () => {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '50px' }}>
         <FontAwesomeIcon icon={faTimesCircle} size="3x" color="red" />
        <h1>Płatność anulowana</h1>
        <p>Transakcja została anulowana. Możesz spróbować ponownie.</p>
        <Link to="/">Powrót do strony głównej</Link>
      </div>
    </>
  );
};

export default CancelPage;