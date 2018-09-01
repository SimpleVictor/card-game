import {
  TURN_ON_LOADER,
  TURN_OFF_LOADER,
  CARDS_RETRIEVED,
  UPDATE_PLAYERS_HAND,
  UPDATE_REMAINING_CARDS,
  CARD_CLICKED
} from './actions';

export const CardsRemainingReducer = (state = [], action) => {
  switch(action.type) {
    case CARDS_RETRIEVED:
    case UPDATE_REMAINING_CARDS:
      return action.payload;
    default:
      return state;
  }
}

export const LoaderReducer = (state = false, action) => {
  switch (action.type) {
    case TURN_ON_LOADER:
      return true;
    case TURN_OFF_LOADER:
      return false;
    default:
      return state;
  }
};

const initialCardState = {
  player: [],
  opponent: []
}
export const CardReducer = (state = initialCardState, action) => {
  const { payload } = action;
  const { player, opponent } = splitCardsUp(payload);
  switch (action.type) {
    case UPDATE_PLAYERS_HAND:
    case CARD_CLICKED: 
      return {
        player: payload.player,
        opponent: payload.opponent 
      }
    default: 
      return state;
  }
}

function splitCardsUp(cards) {
  if (!cards || !cards.length) return initialCardState;
  const initialAccumulator = { player: [], opponent: [] };
  return cards.reduce((accumulator, { code, value, suit }, idx) => {
    (idx % 2)
      ? accumulator.player.push({code, value, suit})
      : accumulator.opponent.push({code, value, suit})
    return accumulator;
  }, initialAccumulator)
}