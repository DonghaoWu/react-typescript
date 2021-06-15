import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import RepositoriesList from './Components/RespositoriesList';

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
