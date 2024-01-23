import {useState, useContext, useEffect } from 'react';
import HeaderListItem from './headerListItem/HeaderListItem';
import {
  faTree,
  faHouseChimney,
  faBuilding,
  faCity,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import './headerList.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../context/SearchContext';

const HeaderList = () => {
  const { state } = useContext(SearchContext);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState(state.type);
  const params = new URLSearchParams(location.search);

const handleItemClick = (selectedType: string) => {
  setSelectedType(selectedType);
  dispatch({ type: "SET_TYPE", payload: selectedType });

  const query = new URLSearchParams(params);

const setQuery = (key: string, value: string | null) => {
  if (value === null || value === undefined || value === "") return query.delete(key);
  query.set(key, value);
}

setQuery("type", selectedType);

  navigate(`/houses?${query.toString()}`);
}

useEffect(() => {
  setSelectedType(state.type);
}
, [state.type]);
return (
  <div className="headerList" >
    <HeaderListItem
      title="Popularne"
      icon={faFire}
      link={"/houses"}
      onClick={() => handleItemClick("")}
      className={selectedType === "" ? "active" : ""}
    />
    <HeaderListItem
      title="Domy"
      icon={faHouseChimney}
      link={"/houses?type=house"}
      onClick={() => handleItemClick("house")}
      className={selectedType === "house" ? "active" : ""}
    />
    <HeaderListItem
      title="Mieszkania"
      icon={faBuilding}
      link={"/houses?type=flat"}
      onClick={() => handleItemClick("flat")}
      className={selectedType === "flat" ? "active" : ""}
    />
    <HeaderListItem
      title="Na wsi"
      icon={faTree}
      link={"/houses?type=village"}
      onClick={() => handleItemClick("village")}
      className={selectedType === "village" ? "active" : ""}
    />
    <HeaderListItem
      title="W mieście"
      icon={faCity}
      link={"/houses?type=city"}
      onClick={() => handleItemClick("city")}
      className={selectedType === "city" ? "active" : ""}
    />
  </div>
)
}

export default HeaderList;
