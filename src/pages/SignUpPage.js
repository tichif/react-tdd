import { Component } from 'react';
import axios from 'axios';

class SignUpPage extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    success: false,
  };

  onChangeHandler = (e) => {
    const { value, id } = e.target;
    this.setState({
      [id]: value,
    });
  };

  clickHandler = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    this.setState({ loading: true });
    try {
      await axios.post('/api/1.0/users', {
        username,
        email,
        password,
      });
      this.setState({ success: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let disabled = true;
    const { password, confirmPassword, loading, success } = this.state;
    if (password && confirmPassword) {
      disabled = password !== confirmPassword;
    }

    return (
      <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2'>
        {!success && (
          <form className='card mt-5' data-testid='form-sign-up'>
            <div className='card-header'>
              <h1 className='text-center'>Sign Up</h1>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <label htmlFor='username' className='form-label'>
                  Username
                </label>
                <input
                  placeholder='Username'
                  id='username'
                  onChange={this.onChangeHandler}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  placeholder='Email'
                  id='email'
                  onChange={this.onChangeHandler}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  placeholder='Password'
                  id='password'
                  onChange={this.onChangeHandler}
                  className='form-control'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='confirmPassword' className='form-label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  placeholder='Confirm Password'
                  id='confirmPassword'
                  onChange={this.onChangeHandler}
                  className='form-control'
                />
              </div>
              <div className='text-center'>
                <button
                  disabled={disabled || loading}
                  onClick={this.clickHandler}
                  className='btn btn-primary'
                >
                  {loading ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm'
                        role='status'
                      ></span>
                      Loading...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
        {success && (
          <div className='alert alert-success mt-3'>
            Please check your e-mail to activate your account
          </div>
        )}
      </div>
    );
  }
}

export default SignUpPage;
