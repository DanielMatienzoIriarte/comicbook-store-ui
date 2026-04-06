import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from  './input_field';

describe('input field txt type rendering', () => {
    beforeEach(() => {
        render(<InputField placeholder={"input"} type={ 'text' } icon={'icon'} />);
    });

    test('input field should be render', () => {
        expect(screen.getByTestId('input-field')).toBeInTheDocument()
    });
});

describe('input field password type rendering', () => {
    beforeEach(() => {
        render(<InputField placeholder={"input"} type={ 'password' } icon={'icon'} />);
    });

    test('input field should be render', () => {
        expect(screen.getByTestId('input-field')).toBeInTheDocument()
    });

    test('eye-icon clicked enables content visibility', () => {
        const roundedEyeIcon = screen.getByTestId('eye-icon');
        fireEvent.click(roundedEyeIcon)
        expect(roundedEyeIcon).toHaveTextContent('visibility')
    });
});