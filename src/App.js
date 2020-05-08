import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.js";
import LogIn from "./components/LogIn";
import AllTrips from "./components/AllTrips/AllTrips";
import NewUser from "./components/NewUser/NewUser";
import Calculator from "./components/Calculator";
import Countries from "./components/Countries";
import VisaInfo from "./components/VisaInfo";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Route exact path='/' component={LogIn} />
        <Route exact path='/signup' component={NewUser} />
        <Route exact path='/all-trips' component={AllTrips} />
        <Route exact path='/calculator' component={Calculator} />
        <Route exact path='/visa-info' component={VisaInfo} />
        <Route exact path='/countries/:country' component={Countries} />
      </Router>
    </div>
  );
}

export default App;
