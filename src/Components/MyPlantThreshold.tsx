import { useEffect, useState } from "react";
import { apiCall } from "../Utils/apiCalls";
import { useForm } from "../Utils/useForm";
import { loaderAnimation } from "./loaderAnimation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router"

export default function MyPlantThreshold() {
  const location = useLocation()
  // defining the initial state for the form
  const initialState = {
    minTemperature: 3,
    maxTemperature: 4,
  };



  console.log(location.state);
  const plantName = location.state.plantName;

  // getting the event handlers from our custom hook
  const { onChange, handleSubmit , values } = useForm(
    userCallback,
    initialState
  );

  const onSubmit = data => console.log(data);

  // a submit function that will execute upon form submission
  async function userCallback() {
    console.log("how areyou in userCallback");
    // send "values" to database
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
        
        <form onSubmit={onSubmit(handleSubmit)}>
          <div className="rule-box">
            <div className="container">
            <div className="title">Plant Name: {plantName}</div>
              <input
                name='Min. temperature'
                id='min-temperature'
                type="number" step="any" min="0" max="100"
                placeholder='min-temperature'
                value={initialState.minTemperature}
                onChange={onChange}
                required
              />

              <input
                name='Max. temperature'
                id='max-temperature'
                type="number" step="any" min="0" max="100"
                placeholder='max-temperature'
                value={initialState.maxTemperature}
                onChange={onChange}
                required
              />
              <input
                name='Min. humidity'
                id='min-humidity'
                type="number" step="any" min="0" max="100"
                placeholder='min-humidity'
                onChange={onChange}
                required
              />

              <input
                name='Max. humidity'
                id='max-humidity'
                type="number" step="any" min="0" max="100"
                placeholder='max-humidity'
                onChange={onChange}
                required
              />
              <input
                name='Min. Light'
                id='min-light'
                type="number" step="any" min="0" max="100"
                placeholder='min-light'
                onChange={onChange}
                required
              />

              <input
                name='Max. Light'
                id='max-light'
                type="number" step="any" min="0" max="100"
                placeholder='max-light'
                onChange={onChange}
                required
              />
              <input
                name='Min. moisture'
                id='min-moisture'
                type="number" step="any" min="0" max="100"
                placeholder='min-moisture'
                onChange={onChange}
                required
              />

              <input
                name='Max. moisture'
                id='max-moisture'
                type="number" step="any" min="0" max="100"
                placeholder='max-moisture'
                onChange={onChange}
                required
              />

              <button type='submit'>Save</button>
            </div>

          </div>

        </form>
      </div>

    </div>
  );
}
