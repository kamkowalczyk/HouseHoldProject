import  { useContext, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {  useNavigate, useParams } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {useFetch} from "../../hooks/useFetch";
import MailList from "../../components/mailList/MailList";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import HouseDetails from "../../components/houseDetails/HouseDetails";
import { IHouse } from '../../interfaces';
import "./house.css";
import MapModal from '../../components/mapModal/MapModal';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

function dayDifference(date1: Date, date2: Date) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}




const House = () => {
  const { id } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useFetch<IHouse>(`/api/houses/find/${id}`);
  const { state: authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const { state } = useContext(SearchContext);
  const { date } = state;
  const days = dayDifference(new Date(date[0].endDate), new Date(date[0].startDate));
  const handleOpen = (i: number) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleClick = () => {
    if (authState.user) {
      setOpenModal(true);
    } else {
      navigate("/Login");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Header type="list" />
        <div>Trwa ładowanie...</div>
      </div>
    );
  }

  return (
  <>
  {data && (<div>
      <Header type="list" />
      <div className="houseContainer">
        {open && <ImageSlider photos={data.photos} slideNumber={slideNumber} setSlideNumber={setSlideNumber} setOpen={setOpen} />}
        <div className="houseWrapper">
          <h1 className="houseTitle">{data?.name}</h1>
          <div className="houseAddress" onClick={() => {setOpenMap(true)}}>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address} &nbsp; <FontAwesomeIcon icon={faArrowLeft} /> {"Zobacz na mapie"}</span>
          </div>
          <span className="houseDistance">Doskonała lokalizacja – {data.distance}m od centrum</span>
          <div className="houseImages">
            {data.photos?.slice(0, 6).map((photo: string, i: number) => (
              <div className="hotelImgWrapper" key={i}>
                <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
            {data.photos?.length > 6 && (
              <div className="moreImages">
                <button onClick={() => setOpen(true)}>Zobacz więcej zdjęć</button>
              </div>
            )}
          </div>
          <HouseDetails data={data} days={days} handleClick={handleClick} />
        </div>
        <MailList />
        <Footer />
      </div>
      <MapModal openMap={openMap} setOpenMap={setOpenMap} data={data} />
      {openModal && id && <Reserve setOpen={setOpenModal} houseId={id} data={data} days={days} />}
    </div>)
  }
  </>
  );
}

export default House;
