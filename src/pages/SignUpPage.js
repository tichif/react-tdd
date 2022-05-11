import { Component } from 'react';

class SignUpPage extends Component {
  render() {
    return (
      <>
        <h1>Sign Up</h1>
        <label htmlFor='username'>Username</label>
        <input placeholder='Username' id='username' />
        <label htmlFor='email'>Email</label>
        <input type='email' placeholder='Email' id='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' placeholder='Password' id='password' />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          placeholder='Confirm Password'
          id='confirmPassword'
        />
        <button disabled>Sign Up</button>
      </>
    );
  }
}

export default SignUpPage;
