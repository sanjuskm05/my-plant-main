import axios from "axios";

export interface apiSearchResults {
  plantId?: string;
  name?: string;
  description?: string;
  temperature?: string;
  light?: string;
  moisture?: string;
  humidity?: string;
  lastUpdated?: string;
  error?: string;
}

export interface apiPlantThresholdResults {
  name?: string;
  minTemperature?: string;
  maxTemperature?: string;
  minLight?: string;
  maxLight?: string;
  minMoisture?: string;
  maxMoisture?: string;
  minHumidity?: string;
  maxHumidity?: string;
}

export async function apiCall() {
  let plantNames: Array<string> = [];

  await axios
    .get(`http://localhost:8081/plant/all`)
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
        .get(`http://localhost:8081/plant-data/plant?name=${name}`)
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
  if (search_results_detail.length === 0) return [{ error: "Plant Not Found" }];
  return search_results_detail;
}

export async function searchPlantThreshold(plantName: string) {
  let search_result_detail: apiPlantThresholdResults = {};
  await axios
    .get(`http://localhost:8081/plant-thresold-map/plant?name=${plantName}`)
    .then((res) => {
      search_result_detail = {
        name: plantName,
        minTemperature: res.data.minTemperature,
        maxTemperature: res.data.maxTemperature,
        minLight: res.data.minLight,
        maxLight: res.data.maxTemperature,
        minMoisture: res.data.minMoisture,
        maxMoisture: res.data.maxMoisture,
        minHumidity: res.data.minHumidity,
        maxHumidity: res.data.maxHumidity,
      };
    })
    .catch((err) => {
      return {};
    });
  return search_result_detail;
}

export async function submitPlantThreshold(plantName: string,
  minTemp: string,
  maxTemp: string,
  minMoisture: string,
  maxMoisture: string,
  minHumidity: string,
  maxHumidity: string,
  minLight: string,
  maxLight: string,
  actioName: string,
  isPlantThresholdExists: boolean
) {

  if (isPlantThresholdExists) {
    await axios
      .put(`http://localhost:8081/plant-thresold-map/update?minTemperature=${minTemp}&minMoisture=${minMoisture}&minHumidity=${minHumidity}&minLight=${minLight}&maxTemperature=${maxTemp}&maxMoisture=${maxMoisture}&maxHumidity=${maxHumidity}&maxLight=${maxLight}&actionName=${actioName}&plantName=${plantName}`)
      .catch((err) => {
        return [{ error: "Connection Failed" }];
      });
  } else {
    await axios
      .post(`http://localhost:8081/plant-thresold-map/add?minTemperature=${minTemp}&minMoisture=${minMoisture}&minHumidity=${minHumidity}&minLight=${minLight}&maxTemperature=${maxTemp}&maxMoisture=${maxMoisture}&maxHumidity=${maxHumidity}&maxLight=${maxLight}&actionName=${actioName}&plantName=${plantName}`)
      .catch((err) => {
        return [{ error: "Connection Failed" }];
      });
  }
  return "";
}
