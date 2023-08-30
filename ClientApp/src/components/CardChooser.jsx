import React, { Component } from "react";
import { Card } from "../models/Card";
import { Value, Suit } from "../models/CardEnum";
import { MyHand } from "../models/MyHand.js";

export class CardChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      diamonds: [],
      hearts: [],
      spades: [],
    };

    const suits = ['clubs', 'diamonds', 'hearts', 'spades'];

    for (let suitKey of suits) {
      for (let i = 2; i < 15; i++) {
        this.state[suitKey].push(new Card(Suit[suitKey.toUpperCase()], i));
      }
    }
  }

  handleCardClick(card) {
    if (this.cardCanBeChosen(card)) {
      this.props.onCardClick(card);
    } else {
      this.giggleCard(card);
    }
  }

  giggleCard(card) {
    var suit = '';
    switch (card.suit) {
      case Suit.CLUBS:
        suit = 'clubs';
        break;
      case Suit.DIAMONDS:
        suit = 'diamonds';
        break;
      case Suit.HEARTS:
        suit = 'hearts';
        break;
      case Suit.SPADES:
        suit = 'spades';
        break;
      default:
        return;
    }
    const index = this.state[suit].findIndex(c => c.equals(card));  // Assuming you have an 'equals' method in Card.

    if (index !== -1) {
      let updatedSuit = [...this.state[suit]];
      updatedSuit[index].giggle = true;
      this.setState({ [suit]: updatedSuit });

      // Remove the giggle animation after a certain time
      setTimeout(() => {
        updatedSuit[index].giggle = false;
        this.setState({ [suit]: updatedSuit });
      }, 1000);  // assuming the animation lasts 1 second.
    }
  }

  cardCanBeChosen(card) {
    // Remarque: cette fonction doit être mise à jour en fonction de la logique de votre jeu.
    // Pour cet exemple, je suppose que vous ne pouvez pas choisir une carte déjà présente dans MyHand.
    const myHand = this.props.myHand  // You would typically get this from your props or state.
    console.log(myHand);
    return !myHand.contains(card) && !myHand.isFull();  // Assuming you have a method 'contains' in MyHand.
  }

  renderASuit(suit) {
    return (
      <>
        {this.state[suit].map(card => (
            <img
              src={process.env.PUBLIC_URL + card.getImage()}
              alt={`${card}`}
              onClick={() => this.handleCardClick(card)}
              width="40"
              height="55"
              className={`pointer ${card.giggle ? 'wiggle-effect' : ''}`}
            />
        ))}
        <br />
      </>
    );
  }
  render() {
    return (
      <div className="card-chooser">
        <div className="card-chooser-suit">{this.renderASuit("clubs")}</div>
        <div className="card-chooser-suit">{this.renderASuit("diamonds")}</div>
        <div className="card-chooser-suit">{this.renderASuit("hearts")}</div>
        <div className="card-chooser-suit">{this.renderASuit("spades")}</div>
      </div>
    );
  }
}
