import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HandComponent from './components/Hand/hand-component';
import LoadingComponent from './components/Loader/loader-component';
import LogoComponent from './components/Logo/logo-component';
import ButtonContainer from './containers/ButtonContainer/button-container';
import { cardClickedAction } from './modules/actions';
import { 
  CARD_VALUE 
} from './components/Card/card-component-constant';

class App extends Component {
  getPoints(cards) {
    if(!cards.length) return 0;
    return cards
      .filter(({ hidden }) => !hidden)
      .reduce((accumulator, { code }) => {
        const value = code[0].toLowerCase();
        if (!CARD_VALUE[value]) return accumulator; /* If we receive an unknown character code */
        accumulator += CARD_VALUE[value];
        return accumulator;
      }, 0)  
  }

  render() {
    const {
      cardsRemaining,
      cards,
      cardClickedAction
    } = this.props;
    const playersPoints = this.getPoints(cards.player);
    const opponentsPoints = this.getPoints(cards.opponent);
    return (
      <div className="main-app-container">
        <span className="remaining-card-container">Remaining Cards: { cardsRemaining.length }</span>
        <LoadingComponent />
        <LogoComponent />
        <div className="opponent_container"><HandComponent onCardClicked={cardClickedAction.bind(this)} cards={cards.opponent} opponent={true}/></div>
        <div className="opponent_score_container">{opponentsPoints}</div>
        <div className="start_button_container"><ButtonContainer /></div>
        <div className="player_score_container">{playersPoints}</div>
        <div className="player_container"><HandComponent onCardClicked={cardClickedAction.bind(this)} cards={cards.player}/></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
  cardsRemaining: state.cardsRemaining
});

const mapDispatchToProps = dispatch => bindActionCreators({
  cardClickedAction
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);