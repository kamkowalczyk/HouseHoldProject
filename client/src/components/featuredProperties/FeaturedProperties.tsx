import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from "../../hooks/useFetch";
import FeaturedPropertiesItem from './featuredPropertiesItem/FeaturedPropertiesItem';
import { IHouse } from '../../interfaces';
import './featuredProperties.css';

const FeaturedProperties = () => {
  const { data, isLoading, isError } = useFetch<IHouse[]>(`/api/houses?featured=true&limit=4`);
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/houses/${id}`);
  };

  return (
    <div className="fp">
      {isLoading ? (
        "Loading"
      ) : isError ? (
        "Error loading data"
      ) : (
        <>
          {data && data.map((item: IHouse) => (
            <FeaturedPropertiesItem key={item._id} item={item} onItemClick={handleItemClick} />
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
