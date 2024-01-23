import { useContext, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { IHouse } from "../../interfaces";
import SearchItem from "../searchItem/SearchItem";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const { state } = useContext(SearchContext);
  const { city, options, type } = state;

  const query = new URLSearchParams();

  const setQuery = (key: string, value: string | number | boolean | null) => {
    if (value === null || value === undefined || value === "") return;
    query.set(key, value.toString());
  }

  if(options?.showPopular || type === "") {
    setQuery("showPopular", "true");
  }

  setQuery("city", city);
  setQuery("type", type);
  setQuery("minimum", options?.minimum?.toString() || "");
  setQuery("maximum", options?.maximum?.toString() || "");



  const { data, isLoading } = useFetch<IHouse[]>(
    `/api/houses?${query}`
  );

  if (isLoading) {
    return <div>Trwa ładowanie...</div>;
  }

  else if (!data?.length && !isLoading) {
    return <div>Nie znaleziono żadnych wyników</div>;
  }

  return (
    <>
      {data?.map((item) => (
        <SearchItem key={item._id} item={item} />
      ))}
    </>
  );
};

export default List;
