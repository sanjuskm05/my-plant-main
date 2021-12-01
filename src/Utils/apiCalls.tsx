import axios from "axios";
import { apiSearchResults } from "../Components/HomePage";

export async function apiCall() {
  let plantNames: Array<string> = [];

  await axios
    .get(`http://192.168.86.164:8081/plant/all`)
    .then((res) => {
      if (res.data.Error) {
        return [{ error: res.data.Error }];
      }
      plantNames = res.data.map((id: { name: string }) => {
        return id.name;
      });
    })
    .catch((err) => {
      return [{ error: "Connection Failed" }];
    });
  return await searchByNames(plantNames);
}

export async function searchByNames(plantNames: Array<string>) {
  let search_results_detail: Array<apiSearchResults> = [];
  await Promise.all(
    plantNames.map(async (name) => {
      await axios
        .get(`http://192.168.86.164:8081/plant-data/plant?name=${name}`)
        .then((res2) => {
          search_results_detail.push({
            name: name,
            temperature: res2.data.temperature,
            lastUpdated: res2.data.lastUpdatedDate,
            humidity: res2.data.humidity,
            moisture: res2.data.moisture,
            light: res2.data.light,
          });
        })
        .catch((err) => {
          return [{ error: "Connected Failed" }];
        });
    })
  );
  if (search_results_detail.length === 0) return [{ error: "Movie Not Found" }];
  return search_results_detail;
}
