import ReactDOM from 'react-dom';
import './styles.css';
import Parent from './Components/FC_parent-child/Parent';
import GuestList from './Components/FC_react-hook/GuestList';
import UserSearch from './Components/FC_react-hook/UserSearch';

const App = () => {
    return (
        <div>
            <h1> Simple React typeScript demos</h1>
            <div className='demo-content'>
                <h4>Functional component: Parent to Child</h4>
                <Parent />
            </div>
            <div className='demo-content'>
                <h4>Functional component: React hooks</h4>
                <GuestList />
                <UserSearch />
            </div>
        </div>
    )
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)