import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import MyPlants from "./Components/MyPlants";

const App=()=>{
  return(
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/my-plants" element={<MyPlants/>} />
        <Route path="/my-plants/home" element={<HomePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;