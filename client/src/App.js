import './App.css';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
import CreateDog from './components/CreateDog/CreateDog';
import DogDetail from './components/DogDetail/DogDetail';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios'
axios.defaults.baseURL = "https://pi-dogs-production-9e5b.up.railway.app/"

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/dog" component={CreateDog}/>
      <Route exact path="/dogs/:id" component={DogDetail}/>
      <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
