import "./houses.css";
import Header from "../../components/header/Header";
import List from "../../components/list/List";
import HousesSearch from "../../components/housesSearch/HousesSearch";

const Houses = () => {


  return (
    <div>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <HousesSearch />
          <div className="listResult">
            <List />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Houses;
