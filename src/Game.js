import React, {Component} from 'react';
import './App.css';

class Game extends Component {

    state = {
        players: [],
        dice1: 0,
        dice2: 0,
        turns: 0,
        round: 0,
        currentPlayer: 0,
        winner: false,
        formValue: '',
        start: false,
    }

    rollDice = (e) => {
           const {players} = this.state;
           const { id } = e.target; 
           const dice1 = Math.ceil(Math.random() * 6);
           const dice2 = Math.ceil(Math.random() * 6);
           this.setState({dice1});
           this.setState({dice2});
  
           if (dice1 === 1 && dice2 === 1) {
               players[id].total = 0;
               this.setState({players});
           }
       }
   
       addToTotal = (e) => {
           const {dice1, dice2, players, turns} = this.state;
           const { id } = e.target;  

            if (dice1 !== 1 && dice2 !== 1){
                players[id].total = this.state.players[id].total + dice1 + dice2;
            }
            this.setState({ dice1: 0 });
            this.setState({ dice2: 0 });
            
            players[id].turn = true;
            this.setState({ players });
            this.setState(prevState => ({turns: prevState.turns+1}));

            if((turns % players.length) === 0 ){
                this.setState(prevState => ({round: prevState.round+1}));
            }

            this.setState(prevState => ({currentPlayer: prevState.currentPlayer+1}));
            if (players[id].total >= 100){this.setState({winner: players[id].name})}
       }

       AddPlayer = (e) => {
           e.preventDefault();
            const {players, formValue} = this.state
           let player = formValue;
           console.log(player)
           this.setState({players: [...players,{name:player, total:0 }]})
       }

       handleChange = (e) => {
            const player = e.target.value
            this.setState({formValue: player});
       }

       startGame = () => {
        this.setState({start: true});
       }

       restart = () => {
            window.location.reload();
       }

    render() {
        const { players, dice1, dice2, round, currentPlayer, winner, formValue, start} = this.state;

        if(!start) {
            return(
            <div className="menu">
                <h2> Pig Dice Game</h2>
                <form  onSubmit={this.AddPlayer}>
                    <input value={formValue} type="text" onChange={this.handleChange}/>
                    <button type="submit"> Add Player</button > 
                </form>
                {players.map((player, i) => (
                    <div className="playername" key={i}> Player {i+1}: {player.name}</div>
                ))
                }
                <button className="start" onClick={this.startGame}> Start Game</button>
            </div>
            )
        } else {

        return (
            <div className="App">
                <h2 >Pig Dice Game </h2>
                <h4 className="round"> Round: {round} </h4>
                    <div className="dice">dice1: {dice1} </div>
                    <div className="dice">dice2: {dice2} </div>
                { winner ? 
                <div>
                    <h1> Winner is: {winner} </h1>
                    <button className="restart"onClick={this.restart}>Restart Game</button>
                </div>
                : 
                <div className="game">
                {
                players.map((player, i) => {
                        const {name, total} = player;
                        let isCurrentPlayer = i !== (currentPlayer % players.length);
                        return (
                            <div className="Player" key={i}>
                                <h4 className="playername">{name}</h4>
                                <div className="total">total:{total} </div>
                                <button id={i} className="roll-dice" onClick={this.rollDice}>roll dice</button>
                                <button id={i} className="addTotal" disabled={isCurrentPlayer} onClick={this.addToTotal}>
                                    Add to total
                                </button>   
                            </div>  
                        )
                    })
                }

                    </div>
                }
                </div>
        )
    }
    }
}

export default Game;