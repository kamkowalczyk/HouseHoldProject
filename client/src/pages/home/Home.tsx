import "./home.css";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Wybierz najlepsze miejsce!</h1>
        <PropertyList />
        <h1 className="homeTitle">Nieruchomości, które polecają inni</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Home;
