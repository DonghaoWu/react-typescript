import axios from 'axios';
import { ActionType } from '../action-types';

export const searchRepos = (terms) => {
  return async (dispatch) => {
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

      const names = data.objects.map((res) => {
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
