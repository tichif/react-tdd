import { render, screen } from '@testing-library/react';

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
});
