import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from '../../../../context/SearchContext';

interface IProps {
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  isInvalidDestination: boolean;
  setIsInvalidDestination: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderSearchCity: React.FC<IProps> = ({ setDestination, isInvalidDestination, setIsInvalidDestination }) => {
  const { state } = useContext(SearchContext);

  const inputPlaceholder = isInvalidDestination ? "Podaj Miejscowość" : "Miejscowość";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
    setIsInvalidDestination(false);
  };

  return (
    <div className="headerSearchItem">
      <FontAwesomeIcon icon={faHouse} className={`headerIcon ${isInvalidDestination ? "invalid" : ""}`} />
      <input
        type="text"
        placeholder={inputPlaceholder}
        className={`headerSearchInput ${isInvalidDestination ? "invalid" : ""}`}
        defaultValue={state.city || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default HeaderSearchCity;
