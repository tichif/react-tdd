import { Component } from 'react';
import axios from 'axios';

class SignUpPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onChangePassword = (e) => {
    const value = e.target.value;
    this.setState({
      password: value,
    });
  };

  onChangeConfirmPassword = (e) => {
    const value = e.target.value;
    this.setState({
      confirmPassword: value,
    });
  };

  onChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({
      email: value,
    });
  };

  onChangeUsername = (e) => {
    const value = e.target.value;
    this.setState({
      username: value,
    });
  };

  clickHandler = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    axios.post('/api/1.0/users', { username, email, password });
  };

  render() {
    let disabled = true;
    const { password, confirmPassword } = this.state;
    if (password && confirmPassword) {
      disabled = password !== confirmPassword;
    }

    return (
      <>
        <form>
          <h1>Sign Up</h1>
          <label htmlFor='username'>Username</label>
          <input
            placeholder='Username'
            id='username'
            onChange={this.onChangeUsername}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Email'
            id='email'
            onChange={this.onChangeEmail}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            onChange={this.onChangePassword}
          />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm Password'
            id='confirmPassword'
            onChange={this.onChangeConfirmPassword}
          />
          <button disabled={disabled} onClick={this.clickHandler}>
            Sign Up
          </button>
        </form>
      </>
    );
  }
}

export default SignUpPage;
