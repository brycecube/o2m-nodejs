import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';
import { RECEIVE_SEARCH_RESULTS } from 'constants';

function receiveSearchResults(results, query) {
  hashHistory.push(`search=${query}`);
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results: results,
    query: query
  };
}

export function fetchSearchResults(query) {
  return function (dispatch) {
    if (query) {
      const reqUrl = `/search?str=${query}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveSearchResults(response, query));
        });
    }
  };
}
