import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import UserForm from './UserForm';
import { Link } from 'react-router-dom';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(slideIndex) {
    this.setState({ slideIndex });
  }

  render() {
    const { slideIndex } = this.state;
    const { user, path, history } = this.props;
    const { onChange } = this;
    return (
      <div className='card login-modal' >
        {!user.id &&
          (<div className='card-header btn-group'>
            <button className='btn btn-secondary' onClick={() => onChange(0)}>Login</button>
            <button className='btn btn-secondary' onClick={() => onChange(1)}>Sign Up</button>
          </div>
          )}
        <div className='card-body'>
          <div>
            {slideIndex === 1 && !user.id ? <UserForm /> : <LoginForm path={path} history={history} />}
            {user.id && <Link to='/user'>Account</Link>}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(LoginModal);
