import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MyPlants from "./Components/MyPlants";
import MyPlantThreshold from "./Components/MyPlantThreshold";
import MyPlantAnalytics from "./Components/MyPlantAnalytics";

const App=()=>{
  return(
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/my-plants" element={<MyPlants/>} />
        <Route path="/my-plants/home" element={<HomePage/>}/>
        <Route path="/my-plants/threshold" element={<MyPlantThreshold/>}/>
        <Route path="/my-plants/analytics" element={<MyPlantAnalytics/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;