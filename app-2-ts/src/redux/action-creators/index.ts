import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

export const searchRepos = (terms: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOS,
    });

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: terms,
          },
        }
      );

      const names = data.objects.map((res: any) => {
        return res.package.name;
      });

      dispatch({
        type: ActionType.SEARCH_REPOS_SUCCESS,
        payload: names,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOS_ERROR,
        payload: err.message,
      });
    }
  };
};
