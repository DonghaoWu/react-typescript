import { ActionType } from '../action-types';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case ActionType.SEARCH_REPOS:
      return { loading: true, error: null, data: [] };
    case ActionType.SEARCH_REPOS_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_REPOS_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [],
      };
  }
};

export default reducer;
