import React, { Component } from 'react';
import twoOfClubs from '../assets/cards/2_of_clubs.png'; // Assurez-vous que le chemin est correct




export class WinamaxCalc extends Component {
  static displayName = WinamaxCalc.name;

  render() {
    return (
      <div>
        <h1>WinamaxCalc</h1>
         {/* Button that is also the image at  assets\cards\2_of_clubs.png with a small relative size*/}
        <button type="button" class="btn btn-primary">
          <img src='2_of_clubs.png' alt="2 of clubs" width="58" height="80" />
        </button>
        </div>
    );
  }
}
