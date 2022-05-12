import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import SignUpPage from './SignUpPage';

describe('Sign Up page', () => {
  describe('Layout', () => {
    it('has header', () => {
      render(<SignUpPage />);
      const header = screen.queryByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('has username input', () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText('Username');
      expect(input).toBeInTheDocument();
    });

    it('has username label text', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });

    it('has email input', () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText('Email');
      expect(input).toBeInTheDocument();
    });

    it('has email type for email input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Email');
      expect(input.type).toBe('email');
    });

    it('has password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Password');
      expect(input.type).toBe('password');
    });

    it('has confirm password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Confirm Password');
      expect(input).toBeInTheDocument();
    });

    it('has password type for confirm password input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Confirm Password');
      expect(input.type).toBe('password');
    });

    it('has sign up button', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
    });

    it('disabled the button initially', () => {
      render(<SignUpPage />);
      const button = screen.queryByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    let button;

    const setup = () => {
      render(<SignUpPage />);
      const inputPassword = screen.getByLabelText('Password');
      const inputConfirmPassword = screen.getByLabelText('Confirm Password');
      const inputEmail = screen.getByLabelText('Email');
      const inputUsername = screen.getByLabelText('Username');

      userEvent.type(inputPassword, 'Pass@@1234');
      userEvent.type(inputConfirmPassword, 'Pass@@1234');
      userEvent.type(inputEmail, 'test@test.com');
      userEvent.type(inputUsername, 'Tichif');

      button = screen.queryByRole('button', { name: 'Sign Up' });
    };

    it('enables the button when password and confirmPassword has the same value', () => {
      setup();
      expect(button).toBeEnabled();
    });

    it('send infos to backend after clicking button', async () => {
      // create a fake server
      let requestBody;
      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          requestBody = req.body;
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();

      // Simulate a http request

      userEvent.click(button);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      );

      expect(requestBody).toEqual({
        username: 'Tichif',
        email: 'test@test.com',
        password: 'Pass@@1234',
      });
    });

    it('disables button when the form is submitting', async () => {
      // create a fake server
      let counter = 0;
      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          counter++;
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();

      // Simulate a http request

      userEvent.click(button);
      userEvent.click(button);

      await screen.findByText(
        'Please check your e-mail to activate your account'
      );

      expect(counter).toBe(1);
    });

    it('display Spinner when the form is submitting', async () => {
      // create a fake server

      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();

      // use queryByRole() instead of getByRole() when the element is not in the document yet
      let spinner = screen.queryByRole('status');

      expect(spinner).not.toBeInTheDocument();

      userEvent.click(button);

      spinner = screen.getByRole('status');

      expect(spinner).toBeInTheDocument();
      await screen.findByText(
        'Please check your e-mail to activate your account'
      );
    });

    it('displays account creation notification after successful sign up', async () => {
      // create a fake server

      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();

      const message = 'Please check your e-mail to activate your account';

      expect(screen.queryByText(message)).not.toBeInTheDocument();

      userEvent.click(button);

      const text = await screen.findByText(message);
      expect(text).toBeInTheDocument();
    });

    it('hides sign up form after successful sign up request', async () => {
      // create a fake server
      const server = setupServer(
        rest.post('/api/1.0/users', (req, res, ctx) => {
          return res(ctx.status(200));
        })
      );
      server.listen();

      setup();

      const form = screen.getByTestId('form-sign-up');
      userEvent.click(button);

      // first way
      // await waitFor(() => {
      //   expect(form).not.toBeInTheDocument();
      // });

      // second way
      await waitForElementToBeRemoved(form);
    });
  });
});
