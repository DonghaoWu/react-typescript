import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actionCreators } from '../redux';

const ClassicRepo = ({ searchRepos, searchResult }) => {
  const [term, setTerm] = useState('');

  const { data, error, loading } = searchResult;

  const handleSubmit = (e) => {
    e.preventDefault();
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
      {!error && !loading && data.map((el) => <li key={el}>{el}</li>)}
    </div>
  );
};

ClassicRepo.propTypes = {
  searchRepos: PropTypes.func.isRequired,
  searchResult: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  searchResult: state.repos,
});

const mapDispatchToProps = (dispatch) => ({
  searchRepos: (term) => dispatch(actionCreators.searchRepos(term)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassicRepo);
