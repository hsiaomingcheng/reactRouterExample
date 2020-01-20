import React, { Component} from "react";
import {hot} from "react-hot-loader";
import {BrowserRouter, Link} from "react-router-dom";
import Router from "./Router";
import "./App.css";

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <Router />

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>
        </BrowserRouter>
      </div>
    );
  }
}

export default hot(module)(App);