import { useContext, useState } from "react";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import "./checkout.css";
import { SummaryContext } from "../../context/SummaryContext";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCreditCard,
  faBuilding,
  faListAlt
} from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51OK4fKAuxcCPLWUM0rCOndmAyfJd66cc7DvysaZp6YvDtkLmkC8sEUR368c47u4FcWUPNCxooah6vxeQMvhshtJi00SCPIdxA4");

const Checkout = () => {
  const [userDataIsCorrect, setUserDataIsCorrect] = useState(false);
  const { state } = useContext(SummaryContext);
  const { product, price, days } = state;
  const tax = Math.round(price * 0.05 * 100);
  const totalPrice = (price + tax) * 100;

  const handlePayment = async () => {
  const stripe = await stripePromise;
  if (!stripe) {
    console.error("Stripe has not been initialized");
    return;
  }
    try {
      const response = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: totalPrice }),
      });

      const session = await response.json();

      if (response.ok) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      }
    } catch (error) {
      console.error('Wystąpił problem z płatnością:', error);
    }
  };

  if (!state.product) return <Navigate to="/" />;
  return (
    <div className="checkoutWrapper">
      <div className="checkoutContainer">
        <h2 className="checkoutTitle"><FontAwesomeIcon icon={faShoppingCart} className="icon" />Koszyk</h2>
        <div className="break"></div>
        <div className="leftWrapper">
          <CheckoutForm  setUserDataIsCorrect={setUserDataIsCorrect}/>
        </div>
        <div className="rightWrapper">
          <div className="checkoutInfo">
            <h3 className="checkoutInfoTitle"><FontAwesomeIcon icon={faBuilding} className="icon"/>Nieruchomość</h3>
            <div className="checkoutInfoWrapper">
              <div className="checkoutInfoItem">
                <span className="checkoutInfoKey">Nazwa:</span>
                <span className="checkoutInfoValue">{product?.title}</span>
              </div>
              <div className="checkoutInfoItem">
                <span className="checkoutInfoKey">Lokalizacja:</span>
                <span className="checkoutInfoValue">{product?.city}, {product?.address}</span>
              </div>
              <div className="checkoutInfoItem">
                <span className="checkoutInfoKey">Nocy:</span>
                <span className="checkoutInfoValue">{days}</span>
              </div>
            </div>
          </div>

          <div className="checkoutInfo">
            <h3 className="checkoutInfoTitle"><FontAwesomeIcon icon={faListAlt} className="icon"/> Podsumowanie</h3>
            <div className="checkoutInfoWrapper">
              <div className="checkoutInfoItem">
                <span className="checkoutInfoKey">Cena:</span>
                <span className="checkoutInfoValue">{price} zł</span>
              </div>
              <div className="checkoutInfoItem">
                <span className="checkoutInfoKey">Podatek:</span>
                <span className="checkoutInfoValue">{tax} zł</span>
              </div>
              <div className="checkoutInfoItem">
                <span className="checkoutInfoKey">Całkowita cena:</span>
                <span className="checkoutInfoValue">{price + tax} zł</span>
              </div>
              <div className="checkoutInfoItem">
              <button disabled={!userDataIsCorrect} className="checkoutButton" onClick={handlePayment}>
              <FontAwesomeIcon icon={faCreditCard} className="icon"/> Zapłać
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;