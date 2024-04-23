import { act, renderHook } from '@testing-library/react';
import * as shareFunctionsModule from '../config/shareFunctions';
import { useShare } from './useShare';

const subject = 'Test Subject';
const testURL = 'http://example.com';

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

describe('useShare hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        openSpy.mockRestore();
        printSpy.mockRestore();
    });

    it('should handle different share types correctly', () => {
        const { result } = renderHook(useShare);
        const { target } = result.current;

        act(() => target('print', testURL));
        expect(shareFunctionsModule.printPage).toHaveBeenCalled();

        act(() => target('email', testURL, 'Test Subject'));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(testURL, subject);

        act(() => target('link', testURL));
        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('link', testURL);

        act(() => target('email', testURL));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(testURL, '');

        const currentLink = 'http://example.com';

        act(() => target('email', currentLink, subject));
        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith(currentLink, subject);
        // expect(window.open).toHaveBeenCalledWith(`mailto:?subject=${subject}&body=${encodeURIComponent(encodeURIComponent(currentLink))}`);
    });
});
