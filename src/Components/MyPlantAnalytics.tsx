import { useEffect, useState } from "react";
import { loaderAnimation } from "./loaderAnimation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
import { searchPlantDailyReport, apiPlantDailyReportResults } from "../Utils/apiCalls";
import { Chart } from "react-google-charts";

export default function MyPlantAnalytics() {


  const [currentState, setCurrentState] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(true);
  const location = useLocation()
  // console.log(location.state);
  const plantName = location.state.plantName;

  async function LoadFromApiCall() {
    let search_results_detail: Array<apiPlantDailyReportResults> = await searchPlantDailyReport(plantName);


    var data = [];

    if (search_results_detail.length > 0) {
      data.push(['Time', 'Avg. Temperature', 'Avg. Light', 'Avg. Humidity', 'Avg. Moisture', 'Is Water On']);
    }
    for (var i = 0; i < search_results_detail.length; i++) {
      let avgTemperature = search_results_detail[i].avgTemperature;
      let avgLight = search_results_detail[i].avgLight;
      let avgHumidity = search_results_detail[i].avgHumidity;
      let avgMoisture = search_results_detail[i].avgMoisture;
      let dailyHour = search_results_detail[i].dailyHour;
      let isWaterOn = search_results_detail[i].isWaterOn;
      data.push([dailyHour, avgTemperature, avgLight, avgHumidity, avgMoisture, isWaterOn]);
    }
    setCurrentState(data);
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
        {currentState.length !== 0 ?
          (<div className="chart-container">
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
                series: { 5: { type: 'scatter' } },
              }}
            />
          </div>

          )
          :
          (
            <div className="err">
              <div>
                Sorry, We <span>couldn't find</span> what you're{" "}
                <span>looking for...</span>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

