import React from "react";
import {Link} from "react-router-dom";

type Props = {
    watchlist:{
        Data?:Array<String>,
        Error?:String
    }
};
export const WatchListIcon:React.FC<Props>=({watchlist})=>{
  return (
    <div className="my-plants-icon">
      <p>
        <Link className="link" to="/my-plants">My Plants&nbsp;</Link>
        <i className="fas fa-bookmark" />
        &nbsp;
        {watchlist.Data ? (
          watchlist.Data.length !== 0 ? (
            <sup>{watchlist.Data.length}</sup>
          ) : null
        ) : null}
      </p>
    </div>
  );
}