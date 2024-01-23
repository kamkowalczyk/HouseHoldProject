import React, { useEffect } from 'react';
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IOptions } from '../../../../interfaces';
import "./headerSearchPrice.css";

interface IProps {
  setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>;
  openOptions: boolean;
  options: IOptions;
  handlePriceOrRoom: (name: keyof IOptions, operation: "i" | "d") => void;
}

const HeaderSearchPrice = ({ setOpenOptions, openOptions, options, handlePriceOrRoom }: IProps) => {
  
  const ref = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return (
    <div className="headerSearchItem" ref={ref}>
      <FontAwesomeIcon icon={faDollarSign} className="headerIcon" />
      <span
        onClick={() => setOpenOptions(!openOptions)}
        className="headerSearchText"
      >{`${options.price}zł | ${options.room} Liczba pokoi`}</span>
      {openOptions && (
        <div className="options">
          <div className="optionItem">
            <span className="optionText">Cena</span>
            <div className="optionsWrapper">
              <button
                disabled={options.price === 0}
                className="optionCounterButton"
                onClick={() => handlePriceOrRoom("price", "d")}
              >
                -
              </button>
              <span className="optionCounterNumber">
                {options.price}
              </span>
              <button
                className="optionCounterButton"
                onClick={() => handlePriceOrRoom("price", "i")}
              >
                +
              </button>
            </div>
          </div>
          <div className="optionItemTwo">
            <span className="optionText">Pokoje</span>

            <div className="optionsWrapper">
              <button
                disabled={options.room <= 1}
                className="optionCounterButton"
                onClick={() => handlePriceOrRoom("room", "d")}
              >
                -
              </button>
              <span className="optionCounterNumber">
                {options.room}
              </span>
              <button
                className="optionCounterButton"
                onClick={() => handlePriceOrRoom("room", "i")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderSearchPrice;
