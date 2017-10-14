import React, { Component } from 'react';
import './App.css';
import Row from './components/Row';
import TableHead from './components/TableHead';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [], 
      rows: []
    }
  }

  fetchData() {

    const Token = 'b7d52e61c66f4a0194be725042ad4359',
      URL = 'http://api.football-data.org/v1/soccerseasons/445/leagueTable';

    fetch(URL, { headers: { 'X-Auth-Token': Token } })
      .then((response) => response.json())
      .then((responseJson) => {
        const rows = [];
        responseJson.standing.map(
          (item, index) => {
            const {position, crestURI, teamName, playedGames, wins, draws, losses, goals, goalsAgainst, goalDifference, points} = item;
            return(
              rows.push(
                <Row key={index} position={position} crestURI={crestURI} teamName={teamName} playedGames={playedGames} wins={wins} draws={draws} losses={losses} goalsFor={goals} goalsAgainst={goalsAgainst} goalDifference={goalDifference} points={points} />
              )
            )
          }
        )
        this.setState({
          data: responseJson,
          rows: rows
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {leagueCaption,matchday} = this.state.data;
    return (
      <div className="app">
        <h1 className="title">{leagueCaption}</h1>
        <span>Matchday {matchday} <br /></span>
        <span className="subtitle">Standings</span>
        <table className="standings">
          <tbody>
            <TableHead />
            {this.state.rows}
          </tbody>
        </table>
      </div>
    );
  }

}

export default App;


