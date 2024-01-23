import { IHouse } from "../../interfaces";
import "./searchItem.css";
import { Link } from "react-router-dom";


interface SearchItemProps {
item: IHouse ;
}

const SearchItem = ({ item }: SearchItemProps) => {
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m od centrum</span>
       
        <span className="siSubtitle">
        Apartament z klimatyzacją
        </span>
        <span className="siFeatures">
        {item.desc}
        </span>
        <span className="siCancelOp">Darmowa rezygnacja</span>
        <span className="siCancelOpSubtitle">
        Możesz anulować później, więc zablokuj tę świetną cenę już dziś!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Wybitny</span>
          <button>{item.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice} PLN</span>
          <span className="siTaxOp">Obejmuje podatki i opłaty</span>
          <Link to={`/houses/${item._id}`}>
          <button className="siCheckButton">Zobacz ofertę</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;