import { render, screen } from '@testing-library/react';
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
    it('enables the button when password and confirmPassword has the same value', () => {
      render(<SignUpPage />);
      const inputPassword = screen.getByLabelText('Password');
      const inputConfirmPassword = screen.getByLabelText('Confirm Password');

      userEvent.type(inputPassword, 'Pass@@1234');
      userEvent.type(inputConfirmPassword, 'Pass@@1234');

      const button = screen.queryByRole('button', { name: 'Sign Up' });
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

      render(<SignUpPage />);
      const inputPassword = screen.getByLabelText('Password');
      const inputConfirmPassword = screen.getByLabelText('Confirm Password');
      const inputEmail = screen.getByLabelText('Email');
      const inputUsername = screen.getByLabelText('Username');

      userEvent.type(inputPassword, 'Pass@@1234');
      userEvent.type(inputConfirmPassword, 'Pass@@1234');
      userEvent.type(inputEmail, 'test@test.com');
      userEvent.type(inputUsername, 'Tichif');

      const button = screen.queryByRole('button', { name: 'Sign Up' });

      // Simulate a http request

      userEvent.click(button);

      await new Promise((resolve) => setTimeout(resolve, 500));

      expect(requestBody).toEqual({
        username: 'Tichif',
        email: 'test@test.com',
        password: 'Pass@@1234',
      });
    });
  });
});
