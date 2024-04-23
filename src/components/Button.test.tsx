import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useShare } from '../hooks/useShare';
import { Email, Print, ShareButton } from './Button';

const testURL = 'http://www.example.com';

jest.mock('../hooks/useShare', () => ({
    useShare: jest.fn(() => ({ target: jest.fn() })),
}));

describe('ShareButton component', () => {
    it('displays the button with expected text', () => {
        const { getByRole } = render(
            <ShareButton domain="facebook" url={testURL}>
                Share on Facebook
            </ShareButton>
        );
        expect(getByRole('button').textContent).toBe('Share on Facebook');
    });

    it('renders child elements and assigns correct class', () => {
        const { getByText } = render(
            <ShareButton domain="facebook" url={testURL}>
                <span className="test_span">Share on Facebook</span>
            </ShareButton>
        );
        expect(getByText('Share on Facebook').className).toBe('test_span');
    });

    it('triggers the target function on click', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });
        const { getByText } = render(
            <ShareButton domain="facebook" url={testURL}>
                Share on Facebook
            </ShareButton>
        );
        fireEvent.click(getByText('Share on Facebook'));
        expect(targetMock).toHaveBeenCalledWith('facebook', testURL, undefined);
    });
});

describe('Print component', () => {
    it('renders and triggers target function with "print" domain on click', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });
        const { getByText } = render(<Print url={testURL}>Print</Print>);
        fireEvent.click(getByText('Print'));
        expect(targetMock).toHaveBeenCalledWith('print', testURL, undefined);
    });

    it('uses current window URL if none provided', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });
        const { getByRole } = render(<Print>Print</Print>);
        fireEvent.click(getByRole('button'));
        expect(targetMock).toHaveBeenCalledWith('print', window.location.href, undefined);
    });
});

describe('Email component', () => {
    it('renders and calls target function with "email" domain on click', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });
        const { getByText } = render(<Email url={testURL}>Email</Email>);
        fireEvent.click(getByText('Email'));
        expect(targetMock).toHaveBeenCalledWith('email', testURL, undefined);
    });

    it('defaults to current window URL if no URL provided', () => {
        const targetMock = jest.fn();
        jest.mocked(useShare).mockReturnValue({ target: targetMock });
        const { getByRole } = render(<Email>Email</Email>);
        fireEvent.click(getByRole('button'));
        expect(targetMock).toHaveBeenCalledWith('email', window.location.href, undefined);
    });
});
