import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from "vitest";
import {LoginForm} from  './login_form';
import { LoginFormProps } from '../../../utils/interfaces';

const mockSubmitHandler = vi.fn<LoginFormProps['submitHandler']>();

const renderComponent = () => {
  render(
    <BrowserRouter>
      <LoginForm submitHandler={mockSubmitHandler} />
    </BrowserRouter>
  );
};

describe('LoginForm rendering', () => {
  beforeEach(() => {
    mockSubmitHandler.mockClear();
    renderComponent();
  });

  test('Form should render social login', () => {
    expect(screen.getByTestId('social-login')).toBeInTheDocument();
  });

  test('Form should render login form', () => {
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });

  test('Form should render sign-up text', () => {
    expect(screen.getByTestId('signup-text')).toBeInTheDocument();
  });

  test('Form should render sign-up link', () => {
    const signUpLink = screen.getByRole('link', { name: /sign-up/i });
    expect(signUpLink).toBeInTheDocument();
  });
});

describe('LoginForm functionallity', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('updates input values on change', async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    await userEvent.type(emailInput, 'aaa@aaaa.aaa');
    await userEvent.type(passwordInput, 'aaa');

    expect(emailInput).toHaveValue('aaa@aaaa.aaa');
    expect(passwordInput).toHaveValue('aaa');
  });

  test('toggles password visibility when eye icon is clicked', async () => {
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const toggleIcon = screen.getByText('visibility_off');

    // Initial state: type="password"
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    await userEvent.click(toggleIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByText('visibility')).toBeInTheDocument();

    // Click again to hide
    await userEvent.click(screen.getByText('visibility'));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test("shows validation errors when fields are empty and submitted", async () => {
    userEvent.click(screen.getByRole("button", { name: /Log In/i }));

    const emailErrorMessage = await screen.findByText(/Email is required/i);
    const passwordErrorMessage = await screen.findByText(/Password is required/i);

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });

  test("shows error for invalid email format", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    
    userEvent.type(emailInput, "bad.email@fake");
    userEvent.click(screen.getByRole("button", { name: /Log In/i }));

    const errorMessage = await screen.findByText(/invalid email address/i);

    expect(errorMessage).toBeInTheDocument();
    expect(mockSubmitHandler).not.toHaveBeenCalled();
  });

  test("shows validation errors and does not call submitHandler on invalid input", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const submitButton = screen.getByRole("button", { name: /Log In/i });

    fireEvent.change(emailInput, { target: { value: "invalid-email@fake" } });
    fireEvent.click(submitButton);

    const error = await screen.findByText(/Invalid email address/i);

    expect(error).toBeInTheDocument();
    expect(mockSubmitHandler).not.toHaveBeenCalled();
  });

  test("calls submitHandler with correct data when form is valid", async () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Log In/i });

    fireEvent.change(emailInput, { target: { value: "test@aaa.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
      expect(mockSubmitHandler).toHaveBeenCalledWith({
        email: "test@aaa.com",
        password: "password123",
      });
    });
  });
});
