import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { createOrUpdateUser } from './redux/user';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        email: props.user.email || '',
        password: props.user.password || ''
      },
      edited: false,
      error: '',
      strength: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setError = this.setError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { firstName, lastName, email, password } = user;
    if (user.firstName !== this.state.user) {
      this.setState({
        user: { firstName, lastName, email, password }
      });
    }
  }

  onChange(ev) {
    const { name, value } = ev.target;
    let { user } = this.state;
    user = Object.assign({}, user, { [name]: value });
    this.setState({ user, error: '', edited: true });
    if (name === 'password') {
      this.testPassword();
    }
  }

  onSubmit(id) {
    const user = Object.assign({}, { id }, this.state.user);
    this.props.createOrUpdateUser(user).catch(err => {
      this.setError(err.response.data);
    });
    this.setState({ user, edited: false, strength: '' });
  }

  setError(error) {
    this.setState({ error });
  }

  testPassword() {
    const { password } = this.state.user;
    const mediumStrength = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    const highStrength = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    let strength;
    if (!mediumStrength.test(password)) {
      strength = `Password is very weak`;
    } else if (!highStrength.test(password)) {
      strength = `Password could be stronger`;
    } else {
      strength = '';
    }
    this.setState({ strength });
  }

  render() {
    const { user } = this.props;
    const { error, edited, strength } = this.state;
    const { firstName, lastName, email, password } = this.state.user;
    const { onChange, onSubmit } = this;
    const fields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'E-mail',
      password: 'Password'
    };
    const empty = Object.keys(fields).filter(field => !this.state.user[field]);
    return (
      <div className='form-inline'>
        <div>
          <input
            className='form-control'
            name='firstName'
            placeholder='First Name'
            value={firstName || ''}
            onChange={onChange}
          />
          <input
            className='form-control'
            name='lastName'
            placeholder='Last Name'
            value={lastName || ''}
            onChange={onChange}
          />
          <input
            className='form-control'
            name='email'
            placeholder='E-mail'
            value={email || ''}
            onChange={onChange}
          />
          {!user.id && (
            <input
              className='form-control'
              type='password'
              name='password'
              placeholder='Password'
              value={password || ''}
              onChange={onChange}
            />
          )}
          {!!error && <Alert color='info'>{error}</Alert>}
          {strength &&
            !!password.length && <Alert color='info'>{strength}</Alert>}
          <button
            type='submit'
            className='btn btn-success'
            style={{ width: '100%' }}
            onClick={() => onSubmit(user.id)}
            disabled={!edited || empty.length}
          >
            {user.id ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  user = user || {};
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateUser: user => dispatch(createOrUpdateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
