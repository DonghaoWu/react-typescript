import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { actionCreators } from '../redux';

const RepositoriesList = () => {
  const [term, setTerm] = useState('');

  const { data, error, loading } = useSelector((state) => state.repos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actionCreators.searchRepos(term));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((el) => <li key={el}>{el}</li>)}
    </div>
  );
};

export default RepositoriesList;
