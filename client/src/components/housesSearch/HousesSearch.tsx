import { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { IItem } from "../../interfaces";
import HousesDateSearch from "./housesDateSearch/housesDateSearch";
import "./housesSearch.css";
import { useNavigate } from "react-router-dom";

const HousesSearch = () => {
  const { state, dispatch } = useContext(SearchContext);
  const dateRef = useRef<IItem[]>(state.date);
  const navigate = useNavigate();
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isPopularChecked, setIsPopularChecked] = useState(state.options?.showPopular || false);

  useEffect(() => {
    selectRef.current!.value = state.type;
    if (state.options?.showPopular === true ||  state.type === "") {
      setIsPopularChecked(true);
    }
    else {
      setIsPopularChecked(false);
    }
  }, [state.type, state.options?.showPopular]);


 const handleSubmit = (e: any) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const selectedType = selectRef.current!.value;

  dispatch({
    type: "NEW_SEARCH",
    payload: {
      city: formData.get("destination"),
      type: formData.get("type") || "",
      date: dateRef.current,
      options: {
        minimum: formData.get("minPrice"),
        maximum: formData.get("maxPrice"),
        room: formData.get("rooms"),
        price: state.options?.price,
        showPopular: formData.get("showPopular") ? true : false,
      },
    }, 
  });

  const createQuery = (key: string, value: string | boolean | null) => {
    if (value === null || value === undefined || value === "") return "";
    return `${key}=${value.toString()}`;
  };

  const queryArray = [
    createQuery("city", formData.get("destination") as string),
    createQuery("type", selectedType),
    createQuery("showPopular", isPopularChecked ? "true" : ""),
  ];

  const removeEmpty = (item: string) => item !== "";
  const query = queryArray.filter(removeEmpty).join("&");

  navigate(`/houses?${query}`);
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="listSearch">
        <h1 className="housesSearchTitle">Szukaj</h1>
        <div className="housesSearchItem">
          <label>Miasto</label>
          <input type="text" defaultValue={state.city} name="destination" />
        </div>
        <HousesDateSearch dateRef={dateRef} />
        <div className="lsItem">
          <label>Typ nieruchomości:</label>
          <select name="type" defaultValue={state.type} ref={selectRef} > 
            <option value="">-- Wybierz --</option>
            <option value="flat">Mieszkanie</option>
            <option value="house">Dom</option>
            <option value="villa">Willa</option>
            <option value="apartment">Apartament</option>
            <option value="village">Na wsi</option>
            <option value="city">W mieście</option>
          </select>
        </div>
        <div className="housesSearchItem">
          <label>Dostępne opcje:</label>
          <div className="housesSearchOptions">
            <div className="housesSearchOptionItem">
              <span className="housesSearchOptionText">Minimalna cena:</span>
              <input
                type="number"
                defaultValue={state.options?.minimum || 0}
                className="housesSearchOptionInput"
                name="minPrice"
              />
            </div>
            <div className="housesSearchOptionItem">
              <span className="housesSearchOptionText">Maksymalna cena:</span>
              <input
                type="number"
                name="maxPrice"
                defaultValue={state.options?.maximum || 1000}
                className="housesSearchOptionInput"
              />
            </div>
          </div>
        </div>
        <div className="housesSearchItem">
          <div className="housesSearchOptions">
            <div className="housesSearchOptionItem">
              <span className="housesSearchOptionText">Pokoje:</span>
              <input
                type="number"
                name="rooms"
                defaultValue={state.options?.room}
                min="1"
                className="housesSearchOptionInput"
              />
            </div>
          </div>
        </div>
        <div className="housesSearchItem">
      <div className="showPopularCheckbox">
        <input 
          type="checkbox" 
          id="showPopular" 
          name="showPopular" 
          checked={isPopularChecked} 
          disabled={state.type === "" ? true : false}
          onChange={e => setIsPopularChecked(e.target.checked)}
        />
        <label htmlFor="showPopular">Pokaż popularne nieruchomości</label>
      </div>
    </div>
        <button type="submit">Szukaj</button>
      </div>
    </form>
  );
};

export default HousesSearch;
