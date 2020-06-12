import React from "react";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      {/* 
        Build a PrivateRoute component that will 
        display BubblePage when you're authenticated 
      */}

      <PrivateRoute path = "/bubbles" component = {BubblePage} />
    </div>
  );
}

export default App;
