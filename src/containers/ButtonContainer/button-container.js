import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ButtonComponent from '../../components/Button/button-component';
import { 
  updatePointsAction,
  drawCardAction,
  startGame
} from '../../modules/actions';

import './button-container.css';

class ButtonContainer extends Component{

  startButtonClicked () {
    this.props.startGame();
  }

  drawButtonClicked () {
    this.props.drawCardAction();
  }

  resetButtonClicked() {
    this.props.startGame();
  }

  render() {
    const { cardsRemaining } = this.props;
    const cardsLength = cardsRemaining.length;
    return (
      <div className="action-layer-container">
        {
          cardsLength
            ? (<ButtonComponent onClick={ this.drawButtonClicked.bind(this) } text="Draw" />)
            : (<ButtonComponent onClick={ this.startButtonClicked.bind(this) } text="Start" />)
        }
        <span className="separator-line" />
        { cardsLength ? (<ButtonComponent onClick={this.resetButtonClicked.bind(this)} text="Reset" />) : '' }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cardsRemaining: state.cardsRemaining
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updatePointsAction,
  drawCardAction,
  startGame
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonContainer);