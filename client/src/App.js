import React from "react";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import GameGrid from './lib/GameGrid';
import Emoji from './lib/Emoji';

const toepunt =
'   __                               __ \n'+
'  / /_____  ___  ____  __  ______  / /_ \n'+
' / __/ __ \\/ _ \\/ __ \\/ / / / __ \\/ __/\n'+
'/ /_/ /_/ /  __/ /_/ / /_/ / / / / /_ \n'+
'\\__/\\____/\\___/ .___/\\__,_/_/ /_/\\__/\n'+
'             /_/                         \n'

console.log(toepunt);

const genStarCount = (team, att) => {
    switch(att){
        case "DEF":
            return Math.min((Math.floor(team.DEF-60)/5), 5)
        case "MID":
            return Math.min((Math.floor(team.MID-60)/5), 5)
        case "ATT":
            return Math.min((Math.floor(team.ATT-60)/5), 5)
        default:
            return 0
    }
}


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
    predictResults();
  };

  const [awayTeam, setAwayTeam] = React.useState('')

  const handleAwayChange = (selectedOption) => {
    setAwayTeam(selectedOption);
    predictResults();
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

    if(homeTeam && awayTeam){
    
        let res = await axios.post('/predict', {
          homeTeam: homeTeam,
          awayTeam: awayTeam
        })

        setResults(res.data)

    }
  }

  React.useEffect(() => {
    predictResults()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeTeam, awayTeam]);

  ////////////////////////////
  // UI
  ////////////////////////////
  return (
    <div className="App">
        <header className="App-header"></header>

        <AsyncSelect
            onChange={handleHomeChange}
            loadOptions={loadTeams}
            defaultOptions
            getOptionLabel={(t) => t.Name}
            getOptionValue={(t) => t}
        />
        <div>
            <div>Def</div> {homeTeam ? <Emoji symbol="⭐" label="starHomeDef" N={genStarCount(homeTeam, "DEF")}/> : "-"}
            <div>Mid</div> {homeTeam ? <Emoji symbol="⭐" label="starHomeMid" N={genStarCount(homeTeam, "MID")}/> : "-"}
            <div>Att</div> {homeTeam ? <Emoji symbol="⭐" label="starHomeAtt" N={genStarCount(homeTeam, "ATT")}/> : "-"}
        </div>

        <AsyncSelect
            onChange={handleAwayChange}
            loadOptions={loadTeams}
            defaultOptions
            getOptionLabel={(t) => t.Name}
            getOptionValue={(t) => t}
        />
        <div>
            <div>Def</div> {awayTeam ? <Emoji symbol="⭐" label="starAwayDef" N={genStarCount(awayTeam, "DEF")}/> : "-"}
            <div>Mid</div> {awayTeam ? <Emoji symbol="⭐" label="starAwayMid" N={genStarCount(awayTeam, "MID")}/> : "-"}
            <div>Att</div> {awayTeam ? <Emoji symbol="⭐" label="starAwayAtt" N={genStarCount(awayTeam, "ATT")}/> : "-"}
        </div>

        <GameGrid 
            data={ results && results.scores != null ? results : 
                {scores: [
                    {
                        "home": "0",
                        "away": "0",
                        "result": "DRAW",
                        "probability": 0
                    },
                    {
                        "home": "0",
                        "away": "1",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "0",
                        "away": "2",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "0",
                        "away": "3",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "0",
                        "away": "4",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "1",
                        "away": "0",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "1",
                        "away": "1",
                        "result": "DRAW",
                        "probability": 0
                    },
                    {
                        "home": "1",
                        "away": "2",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "1",
                        "away": "3",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "1",
                        "away": "4",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "2",
                        "away": "0",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "2",
                        "away": "1",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "2",
                        "away": "2",
                        "result": "DRAW",
                        "probability": 0
                    },
                    {
                        "home": "2",
                        "away": "3",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "2",
                        "away": "4",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "3",
                        "away": "0",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "3",
                        "away": "1",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "3",
                        "away": "2",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "3",
                        "away": "3",
                        "result": "DRAW",
                        "probability": 0
                    },
                    {
                        "home": "3",
                        "away": "4",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "4",
                        "away": "0",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "4",
                        "away": "1",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "4",
                        "away": "2",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "4",
                        "away": "3",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "4",
                        "away": "4",
                        "result": "DRAW",
                        "probability": 0
                    },
                    {
                        "home": "0",
                        "away": "5+",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "1",
                        "away": "5+",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "2",
                        "away": "5+",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "3",
                        "away": "5+",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "4",
                        "away": "5+",
                        "result": "AWAY",
                        "probability": 0
                    },
                    {
                        "home": "5+",
                        "away": "0",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "5+",
                        "away": "1",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "5+",
                        "away": "2",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "5+",
                        "away": "3",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "5+",
                        "away": "4",
                        "result": "HOME",
                        "probability": 0
                    },
                    {
                        "home": "5+",
                        "away": "5+",
                        "result": "DRAW",
                        "probability": 0
                    }
                ]
            }
        }
        />
    </div>
  );
}

export default App;
