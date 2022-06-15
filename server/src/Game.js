//////////////////////////
// Local Functions
//////////////////////////
const factorial = (n) => {
    if(n === 0){
        return 1;
    }
    return (n != 1) ? n * factorial(n - 1) : 1;
};

const gameOutcome = (homeGoals, awayGoals) => {
    if(homeGoals > awayGoals){
        return 'HOME'
    } else if( homeGoals === awayGoals ){
        return 'DRAW'
    } else{
        return 'AWAY'
    };
};

const computeLambdas = (homeTeam, awayTeam) => {
    let M = {
        intercept: 0.113983,
        is_home: 0.229118,
        AvD: 0.024168,
        MvM: 0.035651
    };

    return {
        home: Math.exp( ( (M.intercept) + (M.is_home)*1 + (M.AvD)*(homeTeam.ATT - awayTeam.DEF) + (M.MvM)*(homeTeam.MID - awayTeam.MID)) ),
        away: Math.exp( ( (M.intercept) + (M.is_home)*0 + (M.AvD)*(awayTeam.ATT - homeTeam.DEF) + (M.MvM)*(awayTeam.MID - homeTeam.MID)) )
    }
};


const poissonPDF = (N, lambda) => {
    return ( (Math.exp(-lambda) * Math.pow(lambda, N))/factorial(N) );
};

const poissonCDF = (N, lambda) => {
    let probs = []
    for(let i = 0; i <= N; i++){
        probs.push(poissonPDF(i, lambda))
    };
    return probs.reduce( (accumulator, current) => accumulator + current );
};


//////////////////////////
// Exported Functions
//////////////////////////
const predictScores = (homeTeam, awayTeam) => {

    const lambda = computeLambdas(homeTeam, awayTeam)
    let scores = [];

    // HOME, AWAY 0-4 goals
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            scores.push({
                home: (i).toString(),
                away: (j).toString(),
                result: gameOutcome(i,j),
                probability: poissonPDF(i, lambda.home) * poissonPDF(j, lambda.away),
            })
        }
    }

    //// HOME with AWAY = 5+
    for(let i = 0; i < 5; i++){
        scores.push({
            home: (i).toString(),
            away: '5+',
            result: 'AWAY',
            probability: poissonPDF(i, lambda.home) * ( 1 - poissonCDF(4, lambda.away) ),
        })
    }

    // AWAY with HOME = 5+
    for(let j = 0; j < 5; j++){
        scores.push({
            home: '5+',
            away: (j).toString(),
            result: 'HOME',
            probability: poissonPDF(j, lambda.away) * ( 1 - poissonCDF(4, lambda.home) ),
        })
    }
    
    // HOME & AWAY 5+
    scores.push({
        home: '5+',
        away: '5+',
        result: 'DRAW',
        probability: ( 1 - poissonCDF(4, lambda.home) ) * ( 1 - poissonCDF(4, lambda.away) ),
    })

    let resultHome = scores.filter( (score) => {return score.result == 'HOME'} ).reduce((acc, value) => acc + value.probability, 0);
    let resultAway = scores.filter( (score) => {return score.result == 'AWAY'} ).reduce((acc, value) => acc + value.probability, 0);
    let resultDraw = scores.filter( (score) => {return score.result == 'DRAW'} ).reduce((acc, value) => acc + value.probability, 0);
    let resultBothToScore = scores.filter( (score) => {return score.home != "0" && score.away != "0"} ).reduce((acc, value) => acc + value.probability, 0);

    return {
        scores,
        resultHome,
        resultAway,
        resultDraw,
        resultBothToScore
    }
}

module.exports = { predictScores }