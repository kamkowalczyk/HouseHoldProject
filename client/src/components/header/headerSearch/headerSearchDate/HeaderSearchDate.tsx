import React, { useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { addDays, format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IItem } from "../../../../interfaces";

interface IProps {
  date: IItem[];
  setDate: React.Dispatch<React.SetStateAction<IItem[]>>;
  setOpenDate: React.Dispatch<React.SetStateAction<boolean>>;
  openDate: boolean;
}

const HeaderSearchDate = ({ date, setDate, setOpenDate, openDate }: IProps) => {
  const ref = useRef<HTMLDivElement | null>(null); // Fix the ref definition

  const handleDate = (item: IItem) => {
    if (item.endDate.getTime() === item.startDate.getTime()) {
      item.endDate = addDays(item.endDate, 1);
    }
    setDate([item]);
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
    <div className="headerSearchItem" ref={ref}>
      <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
      <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
        {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
          date[0].endDate,
          "MM/dd/yyyy"
        )}`}
      </span>
      {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => handleDate(item.selection as IItem)}
            moveRangeOnFirstSelection={false}
            ranges={date}
            className="date"
            minDate={new Date()}
          />
      )}
    </div>
  );
};

export default HeaderSearchDate;
