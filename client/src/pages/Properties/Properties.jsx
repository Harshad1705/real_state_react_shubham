import React from "react";
import SearchBar from "../../components/SearchBar/Searchbar.jsx";
import "./Properties.css";
import userProperties from "../../hooks/userProperties.jsx";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard.jsx";

const Properties = () => {
  const { data, isError, isLoading } = userProperties();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching the data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="innerWidth paddings flexCenter properties-container">
        <SearchBar />
        <div className="paddings flexCenter properties">
          {data.map((card, index) => (
            <PropertyCard card={card} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
