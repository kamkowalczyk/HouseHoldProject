import './featuredPropertiesItem.css'
import { IHouse } from '../../../interfaces/index'

interface Props {
    item: IHouse;
    onItemClick: (id: string) => void;
}

const featuredPropertiesItem: React.FC<Props> = ({ item, onItemClick }) => {
  return (
    <div className="featuredPropertyItem" onClick={() => onItemClick(item._id)}>
              {item.photos.length > 0 && (
                <img src={item.photos[0]} alt="" className="fpImg" />
              )}
              <div className="fpInfo">
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Cena {item.cheapestPrice} PLN</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Wspaniały</span>
                </div>
              )}
              </div>
            </div>
  )
}

export default featuredPropertiesItem