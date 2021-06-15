import { ActionType } from '../action-types';

interface SearchReposAction {
  type: ActionType.SEARCH_REPOS;
}

interface SearchReposSuccessAction {
  type: ActionType.SEARCH_REPOS_SUCCESS;
  payload: string[];
}

interface SearchReposErrorAction {
  type: ActionType.SEARCH_REPOS_ERROR;
  payload: string;
}

export type Action =
  | SearchReposAction
  | SearchReposSuccessAction
  | SearchReposErrorAction;
