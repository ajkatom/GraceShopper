import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      <div className='text'>
        <h1>Welcome</h1>
        <h3>Look, feel, and smell like a gentleman.</h3>
        <Link to='/products' ><button className='btn btn-outline-secondary'>Shop All</button></Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Home);
