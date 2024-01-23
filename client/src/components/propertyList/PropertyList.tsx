import './propertyList.css'
import {useFetch} from "../../hooks/useFetch";
import { IPlaces } from '../../interfaces/index'
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";


const PropertyList = () => {
  const { data, isLoading } = useFetch<IPlaces[]>("/api/houses/countByType");
  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);

  const handleItemClick = (propertyType: string) => {
    dispatch({ type: "SET_TYPE", payload: propertyType });
    navigate(`/houses?type=${propertyType}`);
  };

  const images= [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80.jpg",
    "https://img.wprost.pl/img/przytulne-i-kolorowe-mieszkanie-dla-rodziny/be/38/37d29cee5297a1eca58bbd32e62d.jpeg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
    "https://cdn.pixabay.com/photo/2016/11/13/12/52/kuala-lumpur-1820944__340.jpg",
    "https://offloadmedia.feverup.com/secretnyc.co/wp-content/uploads/2022/09/25090036/serhant4-1024x767.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/ville-di-lusso-piu-belle-del-mondo-oggetto-editoriale-800x600-1528889075.jpg"
  ]

  return (
    <div className="pList">
      {isLoading ? (
        "loading"
      ) : (
        <>
          {data &&
            data.map((place: IPlaces, ind: number) => (
              <div className="pListItem" key={ind} onClick={() => handleItemClick(place.type)}>
                <img src={images[ind]} className="pListImg" />
                <div className="pListTitles">
                  <h1>{place.type}</h1>
                  <h2>{place.count} Nieruchomości</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList

