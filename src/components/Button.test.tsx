import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Email, Print, ShareButton } from './Button';
import '@testing-library/jest-dom';
import { useShare } from '../hooks/useShare';

jest.mock('../../src/hooks/useShare', () => ({
    useShare: jest.fn(() => ({ target: jest.fn() })),
}));

describe('ShareButton button', () => {
    it('renders button with text', () => {
        const { getByRole } = render(
            <ShareButton domain="facebook" url="https://example.com">
                Share on Facebook
            </ShareButton>
        );
        const button = getByRole('button');
        expect(button.textContent).toEqual('Share on Facebook');
    });

    it('renders children correctly', () => {
        const { getByText } = render(
            <ShareButton domain="facebook" url="https://example.com">
                <span className="test_span">Share on Facebook</span>
            </ShareButton>
        );
        const span = getByText('Share on Facebook');
        expect(span).toBeDefined();
        expect(span.className).toEqual('test_span');
    });

    it('calls the target function when clicked', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });

        const { getByText } = render(
            <ShareButton domain="facebook" url="https://example.com">
                Share on Facebook
            </ShareButton>
        );

        const button = getByText('Share on Facebook');
        fireEvent.click(button);
        expect(targetMock).toHaveBeenCalledWith('facebook', 'https://example.com', undefined);
    });
});

describe('Print button', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Print url="http://example.com">Print</Print>);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('calls the target function with "print" domain when clicked', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });

        const { getByText } = render(<Print url="http://example.com">Print</Print>);
        fireEvent.click(getByText('Print'));
        expect(targetMock).toHaveBeenCalledWith('print', 'http://example.com', undefined);
    });

    it('calls the target function on current window when clicked', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });

        const { getByRole } = render(<Print>Print</Print>);
        fireEvent.click(getByRole('button'));
        expect(targetMock).toHaveBeenCalledWith('print', window.location.href, undefined);
    });
});

describe('Email button', () => {
    it('renders correctly', () => {
        const { getByRole } = render(<Email url="http://example.com">Email</Email>);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('calls the target function with "email" domain when clicked', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });

        const { getByText } = render(<Email url="http://example.com">Email</Email>);
        fireEvent.click(getByText('Email'));
        expect(targetMock).toHaveBeenCalledWith('email', 'http://example.com', undefined);
    });

    it('calls the target function on current window when clicked', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });

        const { getByRole } = render(<Email>Email</Email>);
        fireEvent.click(getByRole('button'));
        expect(targetMock).toHaveBeenCalledWith('email', window.location.href, undefined);
    });
});
