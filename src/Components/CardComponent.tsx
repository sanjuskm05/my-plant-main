import React, { useEffect, useState } from "react";
import { apiSearchResults } from "../Utils/apiCalls";
import PosterNotFound from "../images/poster-not-found.png";
import MyPlant from "../images/plant.png";
import { Link } from "react-router-dom";


async function RemoveFromPlantFunction(res: apiSearchResults) {
  return (<Link to="/my-plants/thresold">

  </Link>);
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
          <Link to="/my-plants/analytics"
            state={{ plantName: res.name, myData: [
              [
                'Month',
                'Bolivia',
                'Ecuador',
                'Madagascar',
                'Papua New Guinea',
                'Rwanda',
                'Average',
              ],
              ['2004/05', 165, 938, 522, 998, 450, 614.6],
              ['2005/06', 135, 1120, 599, 1268, 288, 682],
              ['2006/07', 157, 1167, 587, 807, null, 623],
              ['2007/08', 139, 1110, 615, 968, 215, 609.4],
              ['2008/09', 136, 691, 629, 1026, 366, 569.6],
            ]
           }}>
            <div className="container">
              {posterComponent("")}
              <div className="plot">
                <p>{res.description}</p>
              </div>
            </div>
          </Link>
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
          <Link to="/my-plants/threshold"
            state={{ plantName: res.name }}>
            <button
              className="plant-rule-button"
            >
              Rules&emsp;
            </button>
          </Link>

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

