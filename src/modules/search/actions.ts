import * as SearchAPI from './utils';

export interface Action<T> {
  type: string;
  user: object;
  payload: T;
}

export const RECEIVE_SEARCH: string = 'RECEIVE_SEARCH';

export const receiveSearch = (result: object []) => ({
  type: RECEIVE_SEARCH,
  result
});

export const search = (query: string) => dispatch => {
  return SearchAPI.search(query).then(
    res => dispatch(receiveSearch(res))
  );
}
