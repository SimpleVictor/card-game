export const NEW_DECK_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
export const GET_CARD_URL = (deckID, count) => `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${count}`;
export const TURN_ON_LOADER = 'TURN_ON_LOADER';
export const TURN_OFF_LOADER = 'TURN_OFF_LOADER';
export const UPDATE_PLAYERS_HAND = 'UPDATE_PLAYERS_HAND';
export const UPDATE_REMAINING_CARDS = 'UPDATE_REMAINING_CARDS';
export const CARDS_RETRIEVED = 'CARDS_RETRIEVED';
export const CARD_CLICKED = 'CARD_CLICKED';

export const TurnOffLoader = () => dispatch => dispatch({type: TURN_OFF_LOADER});
export const TurnOnLoader = () => dispatch => dispatch({type: TURN_ON_LOADER});

export const startGame = () => dispatch => {
  TurnOnLoader()(dispatch);
  fetch(NEW_DECK_URL)
    .then((r1) => r1.json(), (err) => errorHandler(dispatch, err))
    .then(({ deck_id }) => {
      const initialCardAmount = 52;
      const url = GET_CARD_URL(deck_id, initialCardAmount);
      fetch(url)
        .then((r2) => r2.json(), (err) => errorHandler(dispatch, err))
        .then(({ cards }) => {
          setTimeout(() => { /* Timeout is used to show off loading animation, please excuse  */
            TurnOffLoader()(dispatch);
            dispatch({ type: CARDS_RETRIEVED, payload: cards });
            dispatch({type: UPDATE_PLAYERS_HAND, payload: { player: [], opponent: [] }});
          }, 1500);
        }, (err) => errorHandler(dispatch, err))
    }, (err) => errorHandler(dispatch, err))
};

export const drawCardAction = () => (dispatch, getState) => {
  const { cardsRemaining, cards } = getState();
  const player = [...cards.player];
  const opponent = [...cards.opponent];
  player.push(reformatCardObject(cardsRemaining[cardsRemaining.length - 1], false));
  opponent.push(reformatCardObject(cardsRemaining[cardsRemaining.length - 2], true));
  const cardLeft = cardsRemaining.slice(0, -2);
  dispatch({type: UPDATE_REMAINING_CARDS, payload: cardLeft});
  dispatch({type: UPDATE_PLAYERS_HAND, payload: { player, opponent }});
}

export const cardClickedAction = (idx, isOpponent) => (dispatch, getState) => {
  const { cards } = getState();
  if (isOpponent) {
    const newOpponentCards = cards.opponent.map((card, i) => {
      if (idx === i) {
        return { ...card, hidden: !card.hidden }
      }
      return card;
    })
    dispatch({type: CARD_CLICKED, payload: {
      player: cards.player,
      opponent: newOpponentCards
    }})
  } else {
    const newPlayerCards = cards.player.map((card, i) => {
      if (idx === i) {
        return { ...card, hidden: !card.hidden }
      }
      return card;
    })
    dispatch({type: CARD_CLICKED, payload: {
      player: newPlayerCards,
      opponent: cards.opponent
    }})
  };
}

export const updatePointsAction = (payload) => dispatch => dispatch({
  type: payload.type,
  payload: payload.payload
});

export const errorHandler = (dispatch, err) => {
  TurnOffLoader()(dispatch);
  alert(err + '. Check your connection');
  throw err;
}

function reformatCardObject(card, isOpponentCard) {
  const originalValue = {
    value: card.value,
    code: card.code,
    suit: card.suit
  };
  return { ...originalValue, hidden: isOpponentCard }
}