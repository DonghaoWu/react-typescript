1. project

2. library

```bash
$ npx creat-react-app redux-app --template typescript

$ npm i react-redux @types/react-redux axios  redux redux-thunk
```

3. redux store design

4. reducer

- ./src/state/repoReducer.ts

```ts
import {ActionType} from '../action-types';
import {Action} from '../actions';

interface RepoState{
    loading:boolean;
    error:string:null;
    data:string[];
}

const reducer = (state:RepoState, action: Action):RepoState => {
    switch(action.type){
        default:
            return state;
        case ActionType.SEARCH_REPOS:
            return {loading:true, error: null, data:[]};
        case ActionType.SEARCH_REPOS_SUCCESS:
            return {loading:false, error:null, data:action.payload};
        case ActionType.SEARCH_REPOS_ERROR:
            return {
                loading:false, error:action.payload,data:[]
            };
    }
};

export default reducer;
```

5. actions

- ./src/actions/index.ts

```ts
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
```

6. action types.

- ./src/action-types/index.ts

```ts
export enum ActionType {
  SEARCH_REPOS = 'search_repos',
  SEARCH_REPOS_SUCCESS = 'search_repos_success',
  SEARCH_REPOS_ERROR = 'search_repos_error',
}
```

7. action creators

- ./src/action-creators/index.ts

```ts
import axios from 'axios';
import {Dispatch} from 'redux';
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
            text: term,
          },
        }
      );

      const names = data.objects.map((res: any) => {
        return res.package.name;
      });

      dispatch({
          type:type: ActionType.SEARCH_REPOS_SUCCESS,
          payload:names
      })
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_REPOS_ERROR,
        payload: err.message,
      });
    }
  };
};
```
