


interface IProps {
    data: {
      title: string,
      desc: string,
      cheapestPrice: number
    },
    days: number,
    handleClick: () => void
  }

const HouseDetails = ({ data, days, handleClick }: IProps) => {
    return (
      <div className="houseDetails">
        <div className="houseDetailsTexts">
          <h1 className="houseTitle">{data.title}</h1>
          <p className="houseDesc">{data.desc}</p>
        </div>
        <div className="houseDetailsPrice">
          <h1>Rezerwacje na {days} nocy</h1>
          <span>Położona w samym sercu Krakowa, ta nieruchomość ma doskonałą ocenę lokalizacji 9,8!</span>
          <h2><b>{days * data.cheapestPrice} zł</b> ({days} nocy)</h2>
          <button onClick={handleClick}>Zarezerwuj teraz!</button>
        </div>
      </div>
    );
  };

  export default HouseDetails;