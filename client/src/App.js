import React from "react";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import GameGrid from './lib/GameGrid';

function App() {

  ////////////////////////////
  // State homeTeam, awayTeam
  ////////////////////////////
  const loadTeams = async () => {
    const res = await axios.get('/teams')
    return res.data
  }

  const [homeTeam, setHomeTeam] = React.useState('')
  const handleHomeChange = (selectedOption) => {
    setHomeTeam(selectedOption);
    predictResults()
  };

  const [awayTeam, setAwayTeam] = React.useState('')
  const handleAwayChange = (selectedOption) => {
    setAwayTeam(selectedOption);
    predictResults()
  };

  ////////////////////////////
  // State results
  ////////////////////////////
  const [results, setResults] = React.useState( async () => {

    let res = await axios.post('/predict', {
      homeTeam: homeTeam,
      awayTeam: awayTeam
    })
  
    return res.data

  });

  const predictResults = async () => {

    let res = await axios.post('/predict', {
      homeTeam: homeTeam,
      awayTeam: awayTeam
    })
    
    setResults(res.data)
    console.log(res.data)
  }

  ////////////////////////////
  // UI
  ////////////////////////////
  return (
    <div className="App">
      <header className="App-header"></header>
      <AsyncSelect
        onChange={handleHomeChange}
        value={homeTeam}
        loadOptions={loadTeams}
        defaultOptions
        getOptionLabel={(t) => t.Name}
        getOptionValue={(t) => t}
      />
      <AsyncSelect
        onChange={handleAwayChange}
        value={awayTeam}
        loadOptions={loadTeams}
        defaultOptions
        getOptionLabel={(t) => t.Name}
        getOptionValue={(t) => t}
      />
      <GameGrid 
        data={ {scores: [
          {
              "home": "0",
              "away": "0",
              "result": "DRAW",
              "probability": 0.06659846573877168
          },
          {
              "home": "0",
              "away": "1",
              "result": "AWAY",
              "probability": 0.12626091758350685
          },
          {
              "home": "0",
              "away": "2",
              "result": "AWAY",
              "probability": 0.11968608534887201
          },
          {
              "home": "0",
              "away": "3",
              "result": "AWAY",
              "probability": 0.07563575121685784
          },
          {
              "home": "0",
              "away": "4",
              "result": "AWAY",
              "probability": 0.03584857115258843
          },
          {
              "home": "1",
              "away": "0",
              "result": "HOME",
              "probability": 0.054159236984216055
          },
          {
              "home": "1",
              "away": "1",
              "result": "DRAW",
              "probability": 0.10267796534641073
          },
          {
              "home": "1",
              "away": "2",
              "result": "AWAY",
              "probability": 0.09733117705065952
          },
          {
              "home": "1",
              "away": "3",
              "result": "AWAY",
              "probability": 0.06150854271479444
          },
          {
              "home": "1",
              "away": "4",
              "result": "AWAY",
              "probability": 0.029152792621591365
          },
          {
              "home": "2",
              "away": "0",
              "result": "HOME",
              "probability": 0.022021700636602203
          },
          {
              "home": "2",
              "away": "1",
              "result": "HOME",
              "probability": 0.04174991267866366
          },
          {
              "home": "2",
              "away": "2",
              "result": "DRAW",
              "probability": 0.03957585377804369
          },
          {
              "home": "2",
              "away": "3",
              "result": "AWAY",
              "probability": 0.025010003642658755
          },
          {
              "home": "2",
              "away": "4",
              "result": "AWAY",
              "probability": 0.011853824159685458
          },
          {
              "home": "3",
              "away": "0",
              "result": "HOME",
              "probability": 0.005969499398837039
          },
          {
              "home": "3",
              "away": "1",
              "result": "HOME",
              "probability": 0.011317294824294529
          },
          {
              "home": "3",
              "away": "2",
              "result": "HOME",
              "probability": 0.010727965075677547
          },
          {
              "home": "3",
              "away": "3",
              "result": "DRAW",
              "probability": 0.006779549144429708
          },
          {
              "home": "3",
              "away": "4",
              "result": "AWAY",
              "probability": 0.003213257566382045
          },
          {
              "home": "4",
              "away": "0",
              "result": "HOME",
              "probability": 0.0012136298075052078
          },
          {
              "home": "4",
              "away": "1",
              "result": "HOME",
              "probability": 0.0023008640124436677
          },
          {
              "home": "4",
              "away": "2",
              "result": "HOME",
              "probability": 0.0021810502556133277
          },
          {
              "home": "4",
              "away": "3",
              "result": "HOME",
              "probability": 0.0013783170703944205
          },
          {
              "home": "4",
              "away": "4",
              "result": "DRAW",
              "probability": 0.0006532717236746222
          },
          {
              "home": "0",
              "away": "5+",
              "result": "AWAY",
              "probability": 0.019397918403765722
          },
          {
              "home": "1",
              "away": "5+",
              "result": "AWAY",
              "probability": 0.015774784721781045
          },
          {
              "home": "2",
              "away": "5+",
              "result": "AWAY",
              "probability": 0.00641418908562448
          },
          {
              "home": "3",
              "away": "5+",
              "result": "AWAY",
              "probability": 0.0017387166650981343
          },
          {
              "home": "4",
              "away": "5+",
              "result": "AWAY",
              "probability": 0.0003534900048704654
          },
          {
              "home": "5+",
              "away": "0",
              "result": "HOME",
              "probability": 0.00022759836256332571
          },
          {
              "home": "5+",
              "away": "1",
              "result": "HOME",
              "probability": 0.00043149309490803285
          },
          {
              "home": "5+",
              "away": "2",
              "result": "HOME",
              "probability": 0.0004090237927382039
          },
          {
              "home": "5+",
              "away": "3",
              "result": "HOME",
              "probability": 0.00025848302865905354
          },
          {
              "home": "5+",
              "away": "4",
              "result": "HOME",
              "probability": 0.00012251147235985087
          },
          {
              "home": "5+",
              "away": "5+",
              "result": "DRAW",
              "probability": 0.00006629183445683846
          }]
        }
      } />
    </div>
  );
}

export default App;
