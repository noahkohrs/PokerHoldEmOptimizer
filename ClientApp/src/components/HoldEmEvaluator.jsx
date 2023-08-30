import React, { Component } from "react";
import { Hand } from "./Hand";
import { MyHand } from "../models/MyHand";
import { CardChooser } from "./CardChooser";

export class HoldEmEvaluator extends Component {
  static displayName = HoldEmEvaluator.name;
  constructor(props) {
    super(props);
    this.state = {
      myHand: new MyHand(),
      evaluation: "AAAAAA",
      stats: new StatsHolder(),
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
    const apiUrl = "http://localhost:5246/api/poker/evaluate"; // URL mise à jour avec le bon port
    const cardData = {
      Card1: this.state.myHand.card1,
      Card2: this.state.myHand.card2,
    };
    console.log(cardData);
    this.setState({ 
      evaluation: "Loading...",
      stats: new StatsHolder(true),
     });
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({
        evaluation: data.score,
        stats: data,
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
    if (number === "Calculating...") {
      return number;
    } else if (number === "Waiting for cards...") {
      return number;
    }
    const n = (number / this.state.stats.numberOfHands) * 100;
    if (n < 0.01) {
      return n.toFixed(4) + "%";
    } else if (n < 0.1) {
      return n.toFixed(3) + "%";
    } else {
      return n.toFixed(2) + "%";
    }
  }

  render() {
    return (
      <div>
        <h1>HoldEmEvaluator</h1>

        {/* Flex container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side: Hand and reset button */}
          <div>
            <Hand choosenHand={this.state.myHand}></Hand>
            <button
              type="button"
              class="btn"
              onClick={() => this.resetHand()}
              id="resetButton"
            >
              Reset
            </button>
          </div>

          {/* Right side: Stats */}
          <div>
            <p>Score : {this.state.evaluation}</p>
            <p>Paire : {this.toPercent(this.state.stats.pair)}</p>
            <p>Double pair : {this.toPercent(this.state.stats.doublePair)}</p>
            <p>Brelan : {this.toPercent(this.state.stats.brelan)}</p>
            <p>Suite : {this.toPercent(this.state.stats.straight)}</p>
          </div>
          <div>
            <p>Couleur : {this.toPercent(this.state.stats.flush)}</p>
            <p>Full : {this.toPercent(this.state.stats.full)}</p>
            <p>Carré : {this.toPercent(this.state.stats.carre)}</p>
            <p>Quinte flush : {this.toPercent(this.state.stats.quinteFlush)}</p>
            <p>
              Quinte flush royale :{" "}
              {this.toPercent(this.state.stats.quinteFlushRoyale)}
            </p>
          </div>
        </div>

        {/* CardChooser */}
        <CardChooser onCardClick={(card) => this.addCard(card)}></CardChooser>
      </div>
    );
  }
}
class StatsHolder {
  pair = "Calculating...";
  doublePair = "Calculating...";
  brelan = "Calculating...";
  straight = "Calculating...";
  flush = "Calculating...";
  full = "Calculating...";
  carre = "Calculating...";
  quinteFlush = "Calculating...";
  quinteFlushRoyale = "Calculating...";
  numberOfHands = "Calculating...";
  constructor (cardSelected) {
    if (cardSelected) {
      this.pair = "Calculating...";
      this.doublePair = "Calculating...";
      this.brelan = "Calculating...";
      this.straight = "Calculating...";
      this.flush = "Calculating...";
      this.full = "Calculating...";
      this.carre = "Calculating...";
      this.quinteFlush = "Calculating...";
      this.quinteFlushRoyale = "Calculating...";
      this.numberOfHands = "Calculating...";
    }
    else {
      this.pair = "Waiting for cards...";
      this.doublePair = "Waiting for cards...";
      this.brelan = "Waiting for cards...";
      this.straight = "Waiting for cards...";
      this.flush = "Waiting for cards...";
      this.full = "Waiting for cards...";
      this.carre = "Waiting for cards...";
      this.quinteFlush = "Waiting for cards...";
      this.quinteFlushRoyale = "Waiting for cards...";
      this.numberOfHands = "Waiting for cards...";
    }
  }
}
