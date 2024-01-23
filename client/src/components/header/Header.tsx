import "./header.css";

import { useContext } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import HeaderList from "./headerList/HeaderList";
import HeaderSearch from "./headerSearch/HeaderSearch";


type IProps = {
  type?: "list" | undefined;
};

const Header = ({ type }: IProps) => {
  //Date picker

  const authContext = useContext(AuthContext);
  const { user } = authContext.state;


  return (
    //headerNav
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <HeaderList/>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Szukasz idealnego miejsca do zamieszkania?
            </h1>
            <p className="headerDesc">
              Z nami to proste jak nigdy dotąd! Nasza aplikacja oferuje szeroki
              wybór mieszkań, a my jesteśmy tu, by Ci pomóc znaleźć to, czego
              szukasz. Wynajmij swoje wymarzone mieszkanie już dziś!
            </p>
            {!user && (
              <Link to="/login" className="headerBtn">
                Logowanie / Rejestracja
              </Link>
            )}
            <HeaderSearch />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
