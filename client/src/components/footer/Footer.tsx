import { Link, useLocation, useNavigate } from 'react-router-dom';
import './footer.css'
import { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';

const Footer = () => {

  const { state } = useContext(SearchContext);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);


  const handleItemClick = (selectedType: string) => {
    dispatch({ type: "SET_TYPE", payload: selectedType });
  
    const query = new URLSearchParams(params);
  
  const setQuery = (key: string, value: string | null) => {
    if (value === null || value === undefined || value === "") return query.delete(key);
    query.set(key, value);
  }
  
  setQuery("type", selectedType);
  
    navigate(`/houses?${query.toString()}`);
  }
  

    return (
        <div className="footer">
          <div className="fLists">
            <ul className="fList">
              <div className="fListItem" onClick={() => handleItemClick("")}> <li>Popularne</li></div>
              <div className="fListItem" onClick={() => handleItemClick("house")}><li>Domy</li></div>
              <div className="fListItem" onClick={() => handleItemClick("flat")}><li>Mieszkania</li></div>
              <div className="fListItem" onClick={() => handleItemClick("city")}><li>W Mieście</li></div>
              <div className="fListItem" onClick={() => handleItemClick("village")}> <li>Na Wśi</li></div>
            </ul>
            <ul className="fList">
              <Link to={'#'} className="fListItem"><li>Wyjątkowe miejsca pobytu</li></Link>
              <Link to={'#'} className="fListItem"><li>Wszystkie lokalizacje wynajmu</li></Link>
              <Link to={'#'} className="fListItem"><li>Odkrywaj</li></Link>
              <Link to={'#'} className="fListItem"><li>Opinie</li></Link>
              <Link to={'#'} className="fListItem"><li>Oferty sezonowe</li></Link>
            </ul>
            <ul className="fList">
            <Link to={'#'} className="fListItem"><li>O nas</li></Link>
            <Link to={'#'} className="fListItem"><li>Obsługa Klienta</li></Link>
            <Link to={'#'} className="fListItem"><li>Centrum pomocy</li></Link>
            <Link to={'#'} className="fListItem"><li>Warunki</li></Link>
            <Link to={'#'} className="fListItem"><li>Oświadczenie o ochronie prywatności i plikach cookies</li></Link>
            </ul>
          </div>
          <div className="fText">Copyright © 2023 HouseHold</div>
        </div>
      );  
}

export default Footer