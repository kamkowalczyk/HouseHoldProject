import React, { createContext, useReducer } from "react";
import { addDays } from "date-fns";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IHouse } from "../interfaces";

interface SummaryAction {
    type: string;
    payload: any;
  }
  
  interface DateRange {
    startDate: Date;
    endDate: Date;
    key: string;
  }

interface SummaryState {
    forename: string;
    surname: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    postalCode: string;
    price: number;
    days: number;
    product?: IHouse;
    }



export const INITIAL_STATE: SummaryState = {
    forename: "",
    surname: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    price: 0,
    days: 0,
    product: undefined,
};

type SummaryDispatch = React.Dispatch<SummaryAction>;

interface SummaryContextProps {
  state: SummaryState;
  dispatch: SummaryDispatch;
}

export const SummaryContext = createContext<SummaryContextProps>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

const SummaryReducer = (state: SummaryState, action: SummaryAction): SummaryState => {
  switch (action.type) {
    case "NEW_SUMMARY":
        return {
            ...state,
            forename: action.payload.forename,
            surname: action.payload.surname,
            email: action.payload.email,
            phone: action.payload.phone,
            street: action.payload.street,
            city: action.payload.city,
            postalCode: action.payload.postalCode,
            price: action.payload.price,
            days: action.payload.days,
            product: action.payload.product,
        };
    default:
    return state;
  }
};

interface SummaryContextProviderProps {
  children: React.ReactElement<ChildProps> | React.ReactElement<ChildProps>[];
}

interface ChildProps {
  type: string;
}

export const SummaryContextProvider = ({ children }: SummaryContextProviderProps) => {
  const initialState: SummaryState = { ...INITIAL_STATE};
  


  const [state, dispatch] = useReducer(SummaryReducer, initialState);

  return (
    <SummaryContext.Provider value={{ state, dispatch }}>
      {children}
    </SummaryContext.Provider>
  );
};
