import { merge } from 'lodash';
import { CHECK_RECEIPT } from "./actions";

let _defaultState = {
  receipt: false
};

const chatReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHECK_RECEIPT:
      console.log(state);
      return { receipt: state.receipt };
    default:
      return state;
  }
};

export default chatReducer;