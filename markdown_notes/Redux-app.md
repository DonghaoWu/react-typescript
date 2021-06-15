1. project

2. library

```bash
$ npx create-react-app app-2-ts --template typescript
$ cd app-2-ts
$ npm i react-redux @types/react-redux axios  redux redux-thunk
```

3. redux store design

4. reducer

- ./src/redux/reducers/repoReducer.ts

```js
import { ActionType } from '../action-types';
import { Action } from '../actions';

interface RepoState {
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: RepoState = initialState,
  action: Action
): RepoState => {
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
```

5. actions

- ./src/redux/actions/index.ts

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

- ./src/redux/action-types/index.ts

```ts
export enum ActionType {
  SEARCH_REPOS = 'search_repos',
  SEARCH_REPOS_SUCCESS = 'search_repos_success',
  SEARCH_REPOS_ERROR = 'search_repos_error',
}
```

7. action creators

- ./src/redux/action-creators/index.ts

```ts
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
```

8. set up reducer index file

- ./src/redux/reducers/index.ts

```ts
import { combineReducers } from 'redux';
import reposReducer from './reposReducer';

const reducers = combineReducers({
  repos: reposReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
```

9. store

- ./src/redux/store.ts

```ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const store = createStore(reducers, {}, applyMiddleware(thunk));
```

10. index.ts

- ./src/redux/index.ts

```ts
export * from './store';
export * as actionCreators from './action-creators';
export * from './reducers';
```

6/15: React site

1. App.tsx

- ./src/index.tsx

```ts
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import RepositoriesList from './Components/RepositoriesList';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1> Seach For a Package</h1>
        <RepositoriesList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
```

- ./src/Components/RepositoriesList.tsx

```ts
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { actionCreators } from '../state';
// import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepos } = useActions();

  const { data, error, loading } = useTypedSelector(
    (state: any) => state.repos
  );
  //   const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dispatch(actionCreators.searchRepos(term));
    searchRepos(term);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((el) => <div key={el}>{el}</div>)}
    </div>
  );
};

export default RepositoriesList;
```

- ./src/hooks/useActions.ts

```ts
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators, dispatch);
};
```

- ./src/hooks/useTypedSelector.ts

```ts
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../redux';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
```
