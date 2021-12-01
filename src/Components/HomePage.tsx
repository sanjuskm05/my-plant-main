import React, { useState } from "react";
import { SearchResults } from "./CardComponent";
import { apiCall } from "../Utils/apiCalls";
import "../style.css";
import { loaderAnimation } from "./loaderAnimation";
import { WatchListIcon } from "./WatchListIcon";

type Props = {};
export interface apiSearchResults {
  plantId?: string;
  name?: string;
  description?: string;
  temperature?: string;
  light?: string;
  moisture?: string;
  humidity?: string;
  lastUpdated?:string;
  error?:string;
}
export type WatchListResponse = {
  Data?: Array<string>;
  Error?: string;
};
const HomePage: React.FC<Props> = ({}) => {
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<Array<apiSearchResults>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingwatchlist, setLoadingWatchList] = useState<boolean>(true);
  const [watchlist, setwatchlist] = useState<WatchListResponse>({});
  const [home, sethome] = useState<boolean>(true);

  async function initialWatchListLoad() {
 
    setLoadingWatchList(false);
  }

  React.useEffect(() => {
    initialWatchListLoad();
  }, []);

  function handleProps(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value);
  }

  async function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (value) sethome(false);
      else sethome(true);
      setLoading(true);
      setResult(await apiCall());
      setLoading(false);
    }
  }

  async function handleButtonClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (value) sethome(false);
    else sethome(true);
    setLoading(true);
    setResult(await apiCall());
    setLoading(false);
  }

  return (
    <div className="main">
      {loadingwatchlist ? (
        loaderAnimation(loadingwatchlist)
      ) : (
        <div className="main-container">
          <WatchListIcon watchlist={watchlist} />
          <div className="search-box">
            <input
              type="text"
              placeholder="Search Movies, Series"
              value={value}
              onChange={(e) => handleProps(e)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <button onClick={(e) => handleButtonClick(e)}>Search</button>
          </div>
    
          <div className="search-result">
            {loaderAnimation(loading)}
            <SearchResults
              result={result}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
