import Cookies from "js-cookie";
import { apiSearchResults } from "../Components/HomePage";
export async function AddToWatchList(res: apiSearchResults) {
  if (res.plantId) {
    const Data=await Cookies.get("my-plants");
    if(Data === undefined){
      Cookies.set("my-plants",res.plantId,{expires:365});
    }else{
      Cookies.set("my-plants",(Data+","+res.plantId),{expires:365});
    }
  }
}
