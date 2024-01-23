import { createContext, useEffect, useReducer, Dispatch } from "react";

type Reservation = {
  name: string;
  price: number;
  nights: number;
  image: string;
};

type User = {
  _id: string; 
  username: string;
  forename: string;
  surname: string;
  email: string;
  phone: string;
  country: string;
  city: string;
};

type AuthState = {
  user: User | null;
  reservations: Reservation[];
  loading: boolean;
  error: any;
};

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "ADD_RESERVATION"; payload: Reservation }; 
  
const userFromLocalStorage = localStorage.getItem("user");
const INITIAL_STATE: AuthState = {
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null,
  reservations: [],
  loading: false,
  error: null,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({ state: INITIAL_STATE, dispatch: () => null });

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        reservations: [],
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        reservations: [],
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        reservations: [],
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
        reservations: [],
      };
    case "REGISTER_START":
      return {
        user: null,
        loading: true,
        error: null,
        reservations: [],
      };
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
        reservations: [],
      };
    case "REGISTER_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
        reservations: [],
      };
      case "ADD_RESERVATION":
        return {
          ...state,
          reservations: [...state.reservations, action.payload],
        };  
    default:
      return state;
  }
};

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);


  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
