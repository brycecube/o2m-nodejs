import * as actionTypes from '../constants';

export default function search(state = { hasResults: false }, action) {
  const { type, results, query } = action;

  switch (type) {
  case actionTypes.RECEIVE_SEARCH_RESULTS:
    return {...state, results, query, hasResults: results.length ? true : false};
  default:
    return state;
  }
}
