import React, { createContext, useReducer } from "react";
import { useLocation } from "react-router-dom";
import { addDays } from "date-fns";
import { type } from "os";

interface SearchOptions {
  room: number;
  minimum?: number;
  maximum?: number;
  price?: number;
  showPopular?: boolean | null;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface SearchState {
  city: string;
  type: string;
  date: DateRange[];
  options: SearchOptions;
}

interface SearchAction {
  type: string;
  payload: any;
}

export const INITIAL_STATE: SearchState = {
  city: "",
  type: "",
  date: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ],
  options: {
    room: 1,
    minimum: 50,
    maximum: 250,
    price: 150,
    showPopular: null,
  },
};

type SearchDispatch = React.Dispatch<SearchAction>;

interface SearchContextProps {
  state: SearchState;
  dispatch: SearchDispatch;
}

export const SearchContext = createContext<SearchContextProps>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

const SearchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "CHANGE_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "SET_TYPE":
      return {
        ...state,
        type: action.payload,
      };
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

interface SearchContextProviderProps {
  children: React.ReactElement<ChildProps> | React.ReactElement<ChildProps>[];
}

interface ChildProps {
  type: string;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const initialOptions = { ...INITIAL_STATE.options };
  const initialState: SearchState = { ...INITIAL_STATE, options: initialOptions };
  

  queryParams.forEach((value, key) => {
    switch (key) {
      case "city":
        initialState.city = value;
        break;
      case "type":
        initialState.type = value;
        break;
      default:
        break;
    }
  });

  const [state, dispatch] = useReducer(SearchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
