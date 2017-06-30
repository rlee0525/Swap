import { merge } from 'lodash';

import { SearchAction, RECEIVE_SEARCH } from "./actions";

let _defaultState: any = { posts: null, max_pages: 1 };

const searchResultReducer = (state = _defaultState, action: SearchAction<any>) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SEARCH:
      return action.result;
    default:
      return state;
  }
};

export default searchResultReducer;
