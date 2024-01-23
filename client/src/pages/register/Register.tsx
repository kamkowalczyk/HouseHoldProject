import axios from "axios";
import { faUser, faEnvelope, faLock, faPhone, faMapMarkerAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    country: "",
  });

  const [error, setError] = useState<string | null>(null);

  const { state, dispatch } = useContext(AuthContext);
  const { loading } = state;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateForm = () => {
    if (
      credentials.username.trim() === "" ||
      credentials.email.trim() === "" ||
      credentials.password.trim() === "" ||
      credentials.confirmPassword.trim() === "" ||
      credentials.phone.trim() === "" ||
      credentials.city.trim() === "" ||
      credentials.country.trim() === ""
    ) {
      setError("Wszystkie pola są wymagane.");
      return false;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setError("Hasła nie są identyczne.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      dispatch({ type: "REGISTER_START" });
      try {
        const res = await axios.post("/api/auth/register", credentials);
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
        navigate("/");
      } catch (err: any) {
        if (err.response?.status === 409) {
          setError("Użytkownik o podanym adresie email już istnieje.");
        } else {
          setError("Użytkownik o podanym adresie email lub nazwie już istnieje .");
        }
        dispatch({ type: "REGISTER_FAILURE", payload: err.response?.data });
      }
    }
  };
  const handleGoogleRegister = async (response: any) => {
    try {
      const res = await axios.post("/api/auth/google-register", {
        tokenId: response.tokenId,
      });
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err: any) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2 className="formTitle">Rejestracja</h2>
        <div className="inputs">
          <div className="input-container">
            <FontAwesomeIcon width={16}  icon={faUser} className="input-icon" />
            <input
              type="text"
              placeholder="Nazwa użytkownika"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon width={16}  icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Hasło"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon width={16}  icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Powtórz hasło"
              id="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon width={16}  icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon width={16}  icon={faPhone} className="input-icon" />
            <input
              type="text"
              placeholder="Telefon"
              id="phone"
              value={credentials.phone}
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon width={16} icon={faMapMarkerAlt} className="input-icon" />
            <input
              type="text"
              placeholder="Miasto"
              id="city"
              value={credentials.city}
              onChange={handleChange}
              className="lInput"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon width={16} height={16} icon={faGlobe} className="input-icon" />
            <input
              type="text"
              placeholder="Kraj"
              id="country"
              value={credentials.country}
              onChange={handleChange}
              className="lInput"
            />
          </div>
        </div>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Zarejestruj się
        </button>
        {error && <span className="error">{error}</span>}
        <Link className="formLinks" to={"/login"}>
          Masz już konto? Zaloguj się!
        </Link>
      </div>
    </div>
  );
};

export default Register;
