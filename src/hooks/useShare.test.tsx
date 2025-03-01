import { fireEvent, render, screen } from '@testing-library/react';
import { Email, ShareButton } from '../components/Button';
import * as shareFunctionsModule from '../config/shareFunctions';

const testURL = 'http://www.example.com';
const subject = 'Test Subject';
const { getByText } = screen;

jest.mock('../config/shareConfig', () => ({
    shareGroup: {
        print: { shareType: 'print' },
        email: { shareType: 'email' },
        link: { shareType: 'link' },
    },
}));

jest.mock('../config/shareFunctions', () => ({
    printPage: jest.fn(),
    sendEmail: jest.fn(),
    shareLink: jest.fn(),
}));

const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});

describe('UseShare Hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        openSpy.mockRestore();
        printSpy.mockRestore();
    });

    it('should handle different share types correctly', () => {
        render(
            <ShareButton domain="print" url={testURL}>
                Print One
            </ShareButton>
        );
        fireEvent.click(getByText('Print One'));
        expect(shareFunctionsModule.printPage).toHaveBeenCalled();

        render(
            <ShareButton domain="email" url={testURL} subject="Test Subject">
                Email One
            </ShareButton>
        );
        fireEvent.click(getByText('Email One'));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(testURL, 'Test Subject');

        render(
            <ShareButton domain="link" url={testURL}>
                Link One
            </ShareButton>
        );
        fireEvent.click(getByText('Link One'));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('link', testURL, undefined);

        render(
            <ShareButton domain="email" url={testURL}>
                Email Two
            </ShareButton>
        );
        fireEvent.click(getByText('Email Two'));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(testURL, '');

        render(
            <ShareButton domain="email" url={testURL} subject="Test Subject">
                Email Three
            </ShareButton>
        );
        fireEvent.click(getByText('Email Three'));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(testURL, 'Test Subject');
        // expect(window.open).toHaveBeenCalledWith(`mailto:?subject=Test Subject&body=${encodeURIComponent(encodeURIComponent(testUrl))}`);
    });
});

describe('Email component', () => {
    it('renders and calls target function with "email" domain on click', () => {
        render(
            <Email url={testURL} subject={subject}>
                Email Three
            </Email>
        );
        fireEvent.click(getByText('Email Three'));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(testURL, subject);
    });

    it('defaults to current window URL if no URL provided', () => {
        render(<Email>Email Four</Email>);
        fireEvent.click(getByText('Email Four'));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith('http://localhost/', '');
    });
});
