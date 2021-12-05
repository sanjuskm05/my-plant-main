import { useEffect, useState, useRef, MutableRefObject } from "react";
import { apiCall } from "../Utils/apiCalls";
import { loaderAnimation } from "./loaderAnimation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
import { searchPlantThreshold, apiPlantThresholdResults, submitPlantThreshold } from "../Utils/apiCalls";
import { Chart } from "react-google-charts";

export default function MyPlantAnalytics() {


  const [currentState, setCurrentState] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(true);
  const location = useLocation()
  console.log(location.state);
  const plantName = location.state.plantName;
  const myData = location.state.myData;

  async function LoadFromApiCall() {
    let res: apiPlantThresholdResults = await searchPlantThreshold(plantName);
   
    var jsonData = [
      {
          "avgTemperature": 20.466667,
          "avgLight": 7.06,
          "avgHumidity": 62.2,
          "avgMoisture": 32.875,
          "dailyHour": 19,
          "isWaterOn": 1
      },
      {
          "avgTemperature": 20.603563,
          "avgLight": 7.2158012,
          "avgHumidity": 60.867813,
          "avgMoisture": 33.001286,
          "dailyHour": 20,
          "isWaterOn": null
      },
      {
          "avgTemperature": 21.040678,
          "avgLight": 7.0005083,
          "avgHumidity": 57.02034,
          "avgMoisture": 32.94034,
          "dailyHour": 21,
          "isWaterOn": 1
      },
      {
          "avgTemperature": 20.8,
          "avgLight": 6.67,
          "avgHumidity": 56.8,
          "avgMoisture": 33.33,
          "dailyHour": 22,
          "isWaterOn": null
      }
  ];
  
  var testData = [];
  testData.push(['Time', 'Avg. Temperature', 'Avg. Light', 'Avg. Humidity', 'Avg. Moisture', 'Is Water On']);
  for (var i = 0; i < jsonData.length; i++) {
    let avgTemperature = jsonData[i].avgTemperature;
    let avgLight = jsonData[i].avgLight;
    let avgHumidity = jsonData[i].avgHumidity;
    let avgMoisture = jsonData[i].avgMoisture;
    let dailyHour = jsonData[i].dailyHour;
    let isWaterOn = jsonData[i].isWaterOn;
    testData.push([dailyHour, avgTemperature, avgLight, avgHumidity, avgMoisture, isWaterOn]);
}

    setCurrentState(testData);
    setloading(false);

  }


  useEffect(() => {
    LoadFromApiCall();
  }, []);


  return (
    <div className="main">
      {loaderAnimation(loading)}
      <div className="chart-container">
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
     
          <div className="chart-container">
          <Chart
            width={'750px'}
            height={'400px'}
            chartType="ComboChart"
            loader={<div>Loading Chart</div>}
            data={currentState}
            options={{
              title: 'Daily Plant Data',
              vAxis: { title: 'Plant Data' },
              hAxis: { title: 'Time' },
              seriesType: 'line',
              series: { 5: {type: 'scatter'} },
            }}
          />
        </div>
      </div>


    </div>
  );
}

