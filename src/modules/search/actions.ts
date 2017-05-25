import * as SearchAPI from './utils';

export interface Action<T> {
  type: string;
  result: object;
  posts: object [];
  payload: T;
}

export const RECEIVE_SEARCH: string = 'RECEIVE_SEARCH';

const receiveSearch = (result: object[]) => ({
  type: RECEIVE_SEARCH,
  result
});

export const search = (query: object) => (dispatch: any) => {
  return SearchAPI.search(query).then(
    (res: object[]) => dispatch(receiveSearch(res))
  );
}

export const RECEIVE_QUERY: string = 'RECEIVE_QUERY';

const receiveQuery = (query: string) => ({
  type: RECEIVE_QUERY,
  query
});

export const saveQuery = (query: string) => (dispatch: any) => {
  dispatch(receiveQuery(query))
}
