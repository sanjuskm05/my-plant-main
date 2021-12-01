import { useEffect, useState } from "react";
import { SearchResults } from "./CardComponent";
import { apiCall } from "../Utils/apiCalls";
import { apiSearchResults } from "./HomePage";
import { loaderAnimation } from "./loaderAnimation";
import { Link } from "react-router-dom";

export default function MyPlants() {
  const [loading, setloading] = useState<boolean>(true);
  const [result, setResult] = useState<Array<apiSearchResults>>([]);

  async function LoadFromApiCall() {
      setResult(await apiCall());
      setloading(false);
  }

  useEffect(() => {
    LoadFromApiCall();
  }, []);

  return (
    <div className="main">
      <div className="main-container">
        <div className="homepage-icon">
          <Link to="/my-plants">
            <button>
              <i className="fas fa-chevron-left class1" />
              <i className="fas fa-chevron-left class2" />
              <i className="fas fa-chevron-left class3" />
              &nbsp;&nbsp;Go Back To HomePage
            </button>
          </Link>
        </div>
        <div className="search-result">
          {loaderAnimation(loading)}
          <SearchResults
            result={result}
          />
        </div>
      </div>
    </div>
  );
}
