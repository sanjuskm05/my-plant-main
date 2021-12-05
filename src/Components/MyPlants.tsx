import { useEffect, useState } from "react";
import { SearchResults } from "./CardComponent";
import { apiCall, apiSearchResults } from "../Utils/apiCalls";
import { loaderAnimation } from "./loaderAnimation";

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
