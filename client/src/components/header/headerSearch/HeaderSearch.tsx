import  { useContext, useState } from "react";
import { useNavigate  } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import HeaderSearchCity from "./headerSearchCity/HeaderSearchCity";
import HeaderSearchDate from "./headerSearchDate/HeaderSearchDate";
import HeaderSearchPrice from "./headerSearchPrice/HeaderSearchPrice";
import { IItem, IOptions } from "../../../interfaces";
import "./headerSearch.css";

const HeaderSearch = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(SearchContext);
  
  const [destination, setDestination] = useState<string>(state.city || "");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<IItem[]>(state.date);
  //Price picker
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    room: 1,
    price: 150,
    minimum: 50,
    maximum: 250,
  });

  const [isInvalidDestination, setIsInvalidDestination] = useState<boolean>(false);

  const handlePriceOrRoom = (name: keyof IOptions, operation: "i" | "d") => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? prev[name] + (name === 'room' ? 1 : 100) : prev[name] - (name === 'room' ? 1 : 100),
    }));
  };

  const handleSearch = () => {
    if (!destination) return setIsInvalidDestination(true);

    dispatch({
      type: "NEW_SEARCH",
      payload: {
        type: state.type,  
        city: destination,
        date,
        options: {
          room: options.room,
          minimum: options.price - 100,
          maximum: options.price + 100,
          price: options.price,
        },
      },
    });

    const createQuery = (key: string, value: string | boolean | null) => {
      if (value === null || value === undefined || value === "") return "";
      return `${key}=${value.toString()}`;
    };
  
    const queryArray = [
      createQuery("city", destination),
      createQuery("type", state.type),
    ];
  
    const removeEmpty = (item: string) => item !== "";
    const query = queryArray.filter(removeEmpty).join();
    
    navigate(`/houses?${query}`);
  };

  return (
    <div className="headerSearch">
      <HeaderSearchCity
        setDestination={setDestination}
        setIsInvalidDestination={setIsInvalidDestination}
        isInvalidDestination={isInvalidDestination}
      />
      <HeaderSearchDate
        date={date}
        setDate={setDate}
        setOpenDate={setOpenDate}
        openDate={openDate}
      />
      <HeaderSearchPrice
        setOpenOptions={setOpenOptions}
        openOptions={openOptions}
        options={options}
        handlePriceOrRoom={handlePriceOrRoom}
      />

      <div className="headerSearchItem">
        <button className="headerBtn" onClick={handleSearch}>       
          Szukaj
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
