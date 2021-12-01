import Cookies from "js-cookie";
import { apiSearchResults } from "../Components/HomePage";
export async function RemoveFromWatchList(res: apiSearchResults) {
  if (res.plantId) {
    const Data = await Cookies.get("my-plants");
    if (Data !== undefined) {
      const Updated = Data.split(",").filter((value: string) => {
        return res.plantId !== value;
      });
      if(Updated.length>0)
        Cookies.set("my-plants", Updated.join(","));
      else
        Cookies.remove("my-plants");
    }
  }
}
