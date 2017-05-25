import { merge } from 'lodash';
import { RECEIVE_QUERY } from "./actions";

let _defaultState: object = { query: "", category: "All", sort_by: "updated_at", polarity: 1, page_idx: 1 };

const queryReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_QUERY:
      return action.query;
    default:
      return state;
  }
};

export default queryReducer;
