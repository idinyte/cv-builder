import React, { Component } from "react";
import { General } from "./components/general";
import { Education } from "./components/education";
import { Experience } from "./components/experience";
import './styles/app.css'

class App extends Component {
  render() {
    return <div class='cv-container'>
      <General />
      <Education />
      <Experience />
    </div>;
  }
}

export default App;