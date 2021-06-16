import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import RepositoriesList from './Components/RespositoriesList';
import ClassicRepo from './Components/ClassicRepo';

import './styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className='main'>
        <h1> Seach For a Package</h1>
        <div className="content-container">
          <div>
            <h3>Reudx hook</h3>
            <RepositoriesList />
          </div>
          <div>
            <h3>Old fashion Redux</h3>
            <ClassicRepo />
          </div>
        </div>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
