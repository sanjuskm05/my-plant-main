import { useEffect, useState } from "react";
import { useForm } from "../Utils/useForm";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"
import { searchPlantThreshold, apiPlantThresholdResults, submitPlantThreshold } from "../Utils/apiCalls";

export default function MyPlantThreshold() {
  const location = useLocation()
  // defining the initial state for the form
let initialState: apiPlantThresholdResults = {};


  const [currentState, setCurrentState] = useState<apiPlantThresholdResults>();
  const [loading, setloading] = useState<boolean>(true);

  console.log(location.state);
  const plantName = location.state.plantName;
  
  async function LoadFromApiCall() {
    let res: apiPlantThresholdResults = await searchPlantThreshold(plantName);
    setCurrentState(res);
    setloading(false);
  }

  useEffect(() => {
    LoadFromApiCall();
  }, []);

  // getting the event handlers from our custom hook
  const { onChange, onSubmit, values } = useForm(
    userCallback,
    initialState
  );
  // a submit function that will execute upon form submission
  async function userCallback(values: any) {
    console.log("how areyou in userCallback");
    console.log(values);
    // send "values" to database
    submitPlantThreshold(plantName, values.minTemperature, values.maxTemperature,
      values.minMoisture, values.maxMoisture, values.minHumidity, values.maxHumidity,
      values.minLight, values.maxLight, "water", initialState.maxHumidity !== "");//hardcoding the action to 'water' , limiting the scope of the project

  }

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

        <form onSubmit={onSubmit}>
          <div className="rule-box">
            <div className="rule-box-container">
              <div className="rule-box-title">Plant Name: {plantName}</div>

              <div className="rule-box-field">
                <label>Min. Temperature</label>
                <input
                  name='minTemperature'
                  id='min-temperature'
                  type="number" step="any" min="0" max="100"
                  placeholder='min-temperature'
                  onChange={onChange}
                  required
                />
               <div className="rule-box-title">Current Min. Temperature : {currentState?.minTemperature}</div>
              </div>
              <div className="rule-box-field">
                <label>Max. Temperature</label>
                <input
                  name='maxTemperature'
                  id='max-temperature'
                  type="number" step="any" min="0" max="100"
                  placeholder='max-temperature'
                  onChange={onChange}
                  required
                />
                 <div className="rule-box-title">Current Max. Temperature : {currentState?.maxTemperature}</div>

              </div>
              <div className="rule-box-field">
                <label>Min. Humidity</label>
                <input
                  name='minHumidity'
                  id='min-humidity'
                  type="number" step="any" min="0" max="100"
                  placeholder='min-humidity'
                  onChange={onChange}
                  required
                />
                <div className="rule-box-title">Current Min. Humidity : {currentState?.minHumidity}</div>
              </div>
              <div className="rule-box-field">
                <label>Max Humidity</label>
                <input
                  name='maxHumidity'
                  id='max-humidity'
                  type="number" step="any" min="0" max="100"
                  placeholder='max-humidity'
                  onChange={onChange}
                  required
                />
                <div className="rule-box-title">Current Max. Humidity : {currentState?.maxHumidity}</div>
              </div>
              <div className="rule-box-field">
                <label>Min Light</label>
                <input
                  name='minLight'
                  id='min-light'
                  type="number" step="any" min="0" max="255"
                  placeholder='min-light'
                  onChange={onChange}
                  required
                />
                <div className="rule-box-title">Current Min. Light : {currentState?.minLight}</div>
              </div>
              <div className="rule-box-field">
                <label>Max Light</label>
                <input
                  name='maxLight'
                  id='max-light'
                  type="number" step="any" min="0" max="255"
                  placeholder='max-light'
                  onChange={onChange}
                  required
                />
                <div className="rule-box-title">Current Max. Light : {currentState?.maxLight}</div>
              </div>
              <div className="rule-box-field">
                <label>Min Moisture</label>
                <input
                  name='minMoisture'
                  id='min-moisture'
                  type="number" step="any" min="0" max="100"
                  placeholder='min-moisture'
                  onChange={onChange}
                  required
                />
                <div className="rule-box-title">Current Min. Moisture : {currentState?.minMoisture}</div>
              </div>
              <div className="rule-box-field">
                <label htmlFor="max-moisture" >Max Moisture</label>
                <input
                  name='maxMoisture'
                  id='max-moisture'
                  type="number" step="any" min="0" max="100"
                  placeholder='max-moisture'
                  onChange={onChange}
                  required
                />
                <div className="rule-box-title">Current Max. Moisture : {currentState?.maxMoisture}</div>
              </div>
              <button type='submit'>Save</button>
            </div>

          </div>

        </form>
      </div>

    </div>
  );
}
