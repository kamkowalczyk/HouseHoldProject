import "./featured.css";
import {useFetch} from "../../hooks/useFetch";
import FeaturedItem from "./featuredItem/FeaturedItem";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { useContext } from "react";


const Featured = () => {
  const { isLoading } = useFetch("/api/houses/countByCity?cities=Krakow,Katowice,Warszawa");
  const navigate = useNavigate();
  const { dispatch, state} = useContext(SearchContext);

  const handleItemClick = (cityName : string) => {
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        ...state,
        city: cityName
      }
    });
    navigate(`/houses?city=${cityName}`);
  };

  return (
    <>
      {isLoading ? (
        "Loading please wait..."
      ) : (
        <div className="featured">
          <FeaturedItem
            numberOfBooks={"1"}
            featuredName={"Krakow"}
            photoURL="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            onItemClick={handleItemClick}
          />

          <FeaturedItem
            numberOfBooks={"1"}
            featuredName={"Warszawa"}
            photoURL="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
            onItemClick={handleItemClick}
          />

          <FeaturedItem
            numberOfBooks={"1"}
            featuredName={"Katowice"}
            photoURL="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
            onItemClick={handleItemClick}
          />
        </div>
      )}
    </>
  );
};

export default Featured;
