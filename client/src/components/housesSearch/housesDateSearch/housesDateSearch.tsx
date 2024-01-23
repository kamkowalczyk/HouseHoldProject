import { addDays, format } from "date-fns";
import { useContext, useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import { IItem } from "../../../interfaces";
import { SearchContext } from "../../../context/SearchContext";

interface IProps {
  dateRef: any;
}

const HousesDateSearch = ({ dateRef }: IProps) => {
  const [openDate, setOpenDate] = useState(false);
  const { state, dispatch } = useContext(SearchContext);
  const [date, setDate] = useState<IItem[]>(state.date);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setOpenDate(!openDate);
  };

  const handleChange = (item: IItem) => {
    setDate([item as IItem]);

    if (item.endDate.getTime() == item.startDate.getTime()) {
      item.endDate = addDays(item.endDate, 1);
    }

    dispatch({ type: "CHANGE_DATE", payload: [item as IItem] });
    dateRef.current = [item];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDate(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return (
    <div className="housesSearchItem" ref={ref}>
      <label>Data</label>
      <span onClick={handleClick}>
        {date[0].startDate && date[0].endDate
          ? `${format(date[0].startDate, "dd/MM/yyyy")} - ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`
          : "Wybierz datę"}
      </span>
      {openDate && (
        <DateRange
          editableDateInputs={true}
          ranges={date}
          moveRangeOnFirstSelection={false}
          onChange={(item) => handleChange(item.selection as IItem)}
          minDate={new Date()}
          rangeColors={["#2ecc71"]}
        />
      )}
    </div>
  );
};

export default HousesDateSearch;
