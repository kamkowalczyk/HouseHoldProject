import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./login.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


const Login = () => {
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const { state, dispatch } = useContext(AuthContext);
  const { loading, error } = state;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/google-login", { token: credentialResponse.credential });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 404) {
        dispatch({ type: "LOGIN_FAILURE", payload: "Nie znaleziono użytkownika. Login lub hasło są niepoprawne." });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
      }
    }
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err: any) {
      if (err.response?.status === 404) {
        dispatch({ type: "LOGIN_FAILURE", payload: "Nie znaleziono użytkownika. Login lub hasło są niepoprawne." });
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="formTitle">Logowanie</h2>
        <div className="input-container">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="login-input"
          />
        </div>
        <div className="input-container">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Hasło"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="login-input"
          />
        </div>
        <button
          disabled={loading}
          onClick={handleClick}
          className="login-button"
        >

         Zaloguj się
        </button>
        <GoogleOAuthProvider clientId="809171500629-uc972dht0cvpo1mu50qeq531p230f1cb.apps.googleusercontent.com">
        <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          dispatch({ type: "LOGIN_FAILURE", payload: "Logowanie przez Google nie powiodło się." });
        }}
      />
          </GoogleOAuthProvider>
  {error && <span className="login-error">{error.message}</span>}
        <Link className="formLinks" to={"/register"}>
          Nie masz konta? Zarejestruj się!
        </Link>
      </div>
    </div>
  );
};

export default Login;
