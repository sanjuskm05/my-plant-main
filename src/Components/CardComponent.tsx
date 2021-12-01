import React, { useEffect, useState } from "react";
import { apiSearchResults } from "./HomePage";
import PosterNotFound from "../images/poster-not-found.png";
import MyPlant from "../images/plant.png";
import { AddToWatchList } from "../Utils/AddToWatchList";
import {RemoveFromWatchList} from "../Utils/RemoveFromWatchList";
import Cookies from "js-cookie";


async function RemoveFromPlantFunction(res:apiSearchResults){
  console.log('Remove');
}
function SearchDetails(
  result: Array<apiSearchResults>
) {
  

  
  function posterComponent(poster?: string) {
    if (poster === "N/A") {
      return <img src={PosterNotFound} />;
    } else {
      return <img src={MyPlant} />;
    }
  }


  
  return result.map((res) => {
    if (res.error) {
      return (
        <div className="err">
            <div>
              Sorry, We <span>couldn't find</span> what you're{" "}
              <span>looking for...</span>
            </div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-child">
          <div className="container">
            {posterComponent("")}
            <div className="plot">
              <p>{res.description}</p>
            </div>
          </div>
        </div>
        <div className="card-child">
          <div className="card-contents">
            <div className="plant-label">Plant Name: {res.name}</div>
      
            <div className="plant-label">Moisture: {res.moisture}</div>
            <div className="plant-label">Light: {res.light}</div>
            <div className="plant-label">Humidity: {res.humidity}</div>
            <div className="plant-label">Temperature: {res.temperature}</div>
            <div className="plant-label">Last Reading: {res.lastUpdated}</div>

          </div>
         
            <button
              className="delete-plant-button"
              onClick={(e) => RemoveFromPlantFunction(res)}
            >
              Delete&emsp;
              <i className="fas fa-trash" />
            </button>
         
        </div>
      </div>
    );
  });
}

type Props = {
  result: Array<apiSearchResults>;
};

export const SearchResults: React.FC<Props> = ({
  result,
}) => {
  if (result.length !== 0) {
    return (
      <div>
        <div className="search-results-heading">
            <div>
              Our <span>Plants:</span>
            </div>
        </div>
        <div className="search-results-disp">
          {SearchDetails(result)}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

