import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialLogin from  './social_login';

describe('social login rendering', () => {
    render(<SocialLogin />);

    test('Form should render button', () => {
        expect(screen.getByTestId('social-button')).toBeInTheDocument()
    });
});