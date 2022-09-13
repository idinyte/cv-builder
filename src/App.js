import React, { Component } from "react";
import { General } from "./components/general";
import { Study } from "./components/study";
import './styles/app.css'

class App extends Component {
  render() {
    return <div class='cv-container'>
      <General />
      <Study />
    </div>;
  }
}

export default App;