import React from "react";
import axios from "axios";

function App() {

  // State HOME
  const [homeTeam, selectHomeTeam] = React.useState( () => {
    return {
      "Name": "AFC Bournemouth",
      "ATT": 73,
      "MID": 75,
      "DEF": 73,
      "OVR": 74
    }
  });

  // State AWAY
  const [awayTeam, selectAwayTeam] = React.useState( () => {
    return {
      "Name": "Arsenal",
      "ATT": 81,
      "MID": 80,
      "DEF": 78,
      "OVR": 80
    }
  });

  // State RESULTS
  const [results, setResults] = React.useState( async () => {
    let r = await axios.post('/predict', {
      homeTeam: homeTeam,
      awayTeam: awayTeam
    })
  
    console.log(r.data)
    return r.data
  });

  const predictResults = async () => {

    let r = await axios.post('/predict', {
      homeTeam: homeTeam,
      awayTeam: awayTeam
    })
  
    setResults(r.data)
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>{"Loading..."}</p>
      </header>
    </div>
  );
}

export default App;
