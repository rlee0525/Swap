import * as SearchAPI from './utils';

export interface Action<T> {
  type: string;
  result: object;
  payload: T;
}
//
// interface ActionCreator<T> {
//   type: string,
//   (payload: T): Action<T>
// };

export const RECEIVE_SEARCH: string = 'RECEIVE_SEARCH';

export const receiveSearch = (result: object []) => ({
  type: RECEIVE_SEARCH,
  result
});

export const search = (query: string) => (dispatch: any) => {
  return SearchAPI.search(query).then(
    (res: object[]) => dispatch(receiveSearch(res))
  );
}