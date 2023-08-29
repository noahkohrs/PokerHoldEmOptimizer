import React, { Component } from "react";
import { Hand } from "./Hand.js";
import { MyHand } from "./MyHand.js";
import { CardChooser } from "./CardChooser.js";

export class WinamaxCalc extends Component {
  static displayName = WinamaxCalc.name;
  constructor(props) {
    super(props);
    this.state = {
      myHand: new MyHand(),
      evaluation: "AAAAAA",
      stats : new StatsHolder(),
    };
  }
  resetHand() {
    this.state.myHand.reset();
    this.setState({ slotsAreFull: false }); // Reload the page
    // Change the text of the button to Currently reset
    document.getElementById("resetButton").innerHTML = "Currently reset";
  }

  componentDidMount() {
    this.resetHand();
  }

  async EvaluateCards() {
    const apiUrl = 'http://localhost:5246/api/poker/evaluate';  // URL mise à jour avec le bon port
    const cardData = {
      Card1:this.state.myHand.card1,
      Card2:this.state.myHand.card2,
    };
    console.log(cardData);
    this.setState({ evaluation: "Loading..." });
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({ 
        evaluation: data.score,
        stats : data, 
      });
    } else {
      this.setState({ evaluation: "Error" });
    }

  }

  addCard(card) {
    const handFull = this.state.myHand.addCard(card);
    if (handFull) {
      this.EvaluateCards();
    }
    document.getElementById("resetButton").innerHTML = "Reset";
    this.setState({});
    // Reload the page
  }
  toPercent(number) {
   const  n = (number/this.state.stats.numberOfHands)*100;
    if (n < 0.01) {
      return n.toFixed(4) + "%";
    } else if (n < 0.1) {
      return n.toFixed(3) + "%";
    }
    else {
      return n.toFixed(2) + "%";
    }
  }

  render() {
    return (
      <div>
        <h1>WinamaxCalc</h1>
        {/* Button that is also the image at  assets\cards\2_of_clubs.png with a small relative size*/}
        <Hand choosenHand={this.state.myHand}></Hand>
        {/* Button that call the reset function of the Hand */}
        <button
          type="button"
          class="btn"
          onClick={() => this.resetHand()}
          id="resetButton"
        >
          {" "}
          Reset{" "}
        </button>
        <p>{this.state.evaluation}</p>
        <p>Paire : {this.toPercent(this.state.stats.pair)}</p>
        <p>Double pair : {this.toPercent(this.state.stats.doublePair)}</p>
        <p>Brelan : {this.toPercent(this.state.stats.brelan)}</p>
        <p>Suite : {this.toPercent(this.state.stats.straight)}</p>
        <p>Couleur : {this.toPercent(this.state.stats.flush)}</p>
        <p>Full : {this.toPercent(this.state.stats.full)}</p>
        <p>Carré : {this.toPercent(this.state.stats.carre)}</p>
        <p>Quinte flush : {this.toPercent(this.state.stats.quinteFlush)}</p>
        <p>Quinte flush royale : {this.toPercent(this.state.stats.quinteFlushRoyale)}</p>
        <p>Total : {this.state.stats.numberOfHands}</p>
        <CardChooser onCardClick={(card) => this.addCard(card)}></CardChooser>
      </div>
    );
  }
}
class StatsHolder {
  pair = 0;
  doublePair = 0;
  brelan = 0;
  straight = 0;
  flush = 0;
  full = 0;
  carre = 0;
  quinteFlush = 0;
  quinteFlushRoyale = 0;
  numberOfHands = 0;
}
