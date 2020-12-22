import React from "react";
import "./style.css";
import Gallery from "./layout/gallery";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Gallery}/>
          <Route exact path="*" component={Gallery}/>
        </Switch>
      </Router>
    </>
  );
}
