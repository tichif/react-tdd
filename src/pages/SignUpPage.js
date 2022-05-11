import { Component } from 'react';
import axios from 'axios';

class SignUpPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  onChangeHandler = (e) => {
    const { value, id } = e.target;
    this.setState({
      [id]: value,
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
            onChange={this.onChangeHandler}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Email'
            id='email'
            onChange={this.onChangeHandler}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            onChange={this.onChangeHandler}
          />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm Password'
            id='confirmPassword'
            onChange={this.onChangeHandler}
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
