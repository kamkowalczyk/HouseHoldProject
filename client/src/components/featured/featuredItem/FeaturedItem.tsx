import "./featuredItem.css"


interface Props {
    numberOfBooks: string;
    featuredName: string;
    photoURL: string;
    onItemClick: (cityName: string) => void;
}


const FeateuredItem = ({numberOfBooks, featuredName, photoURL, onItemClick } : Props) => {


  return (
    <div className="featuredItem" onClick={() => onItemClick(featuredName)}>
            <img
              src={photoURL}
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{featuredName}</h1>
              <h2>{numberOfBooks} nieruchomości</h2>
            </div>
          </div>
  )
}

export default FeateuredItem