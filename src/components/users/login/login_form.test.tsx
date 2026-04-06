import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import LoginForm from  './login_form';
import { login } from "../../../utils/service_managr";

vi.mock("../../../utils/service_managr", () => ({
    login: vi.fn(),
}));

const renderComponent = () => {
    return render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
};

describe('LoginForm rendering', () => {
    beforeEach(() => {
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
        const emailInput = screen.getByPlaceholderText(/email address/i);
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

    test('calls login service with correct data on valid submission', async () => {
        const emailInput = screen.getByPlaceholderText(/email address/i);
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        const submitBtn = screen.getByRole('button', { name: /log in/i });
    
        // Fill valid data
        await userEvent.type(emailInput, 'aaa@aaa.com');
        await userEvent.type(passwordInput, 'securePass123');
        await userEvent.click(submitBtn);
    
        // Wait for the async form submission to trigger the mock
        await waitFor(() => {
          expect(login).toHaveBeenCalledWith({
            email: 'aaa@aaa.com',
            password: 'securePass123',
          });
        });
    });
});
