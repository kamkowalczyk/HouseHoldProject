import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import {useFetch} from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IHouse, IRoom, IRoomNumber } from "../../interfaces";
import { SummaryContext } from "../../context/SummaryContext";

interface iProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  houseId: string;
  data : IHouse;
  days: number;
}



const Reserve = ({ setOpen, houseId, data: houseData, days } : iProps) => {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const { data } = useFetch<IRoom[]>(`/api/houses/room/${houseId}`);
  const navigate = useNavigate();
  const { state } = useContext(SearchContext);
  const { date } = state;
  const { startDate, endDate } = date[0];
  const { dispatch } = useContext(SummaryContext);


  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };


  const alldates = getDatesInRange(startDate, endDate);

  const isAvailable = (roomNumber : IRoomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;
    
    if (checked) {
      setSelectedRooms([...selectedRooms, value]);
    } else {
      setSelectedRooms(selectedRooms.filter((item) => item !== value));
    }

  };


  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) =>
          axios.put(`/api/rooms/availability/${roomId}`, {
            dates: alldates,
          })
        )
      );
      setOpen(false);
      dispatch({
        type: "NEW_SUMMARY",
        payload: {
          price: houseData.cheapestPrice * days,
          days: days,
          product: houseData,
        },
      });
      navigate("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Wybierz pokoje:</span>
        {data?.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Ilość osób: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">Cena za pokój: <b>{item.price}</b></div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Zarezerwuj teraz
        </button>
      </div>
    </div>
  );
};

export default Reserve;
