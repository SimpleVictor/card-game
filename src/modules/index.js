import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { 
  LoaderReducer,
  CardReducer,
  CardsRemainingReducer
} from './reducers';

export default combineReducers({
  cardsRemaining: CardsRemainingReducer,
  cards: CardReducer,
  isLoaderOn: LoaderReducer,
  router: routerReducer,
});
