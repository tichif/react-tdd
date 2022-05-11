import { Component } from 'react';

class SignUpPage extends Component {
  state = {};

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

  render() {
    let disabled = true;
    const { password, confirmPassword } = this.state;
    if (password && confirmPassword) {
      disabled = password !== confirmPassword;
    }

    return (
      <>
        <h1>Sign Up</h1>
        <label htmlFor='username'>Username</label>
        <input placeholder='Username' id='username' />
        <label htmlFor='email'>Email</label>
        <input type='email' placeholder='Email' id='email' />
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
        <button disabled={disabled}>Sign Up</button>
      </>
    );
  }
}

export default SignUpPage;
