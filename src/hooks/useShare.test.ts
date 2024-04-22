import { act } from '@testing-library/react-hooks';
import { renderHook } from '@testing-library/react';
import { useShare } from './useShare';
import * as shareFunctionsModule from '../config/shareFunctions';

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

describe('useShare hook', () => {
    it('should call printPage when shareType is "print"', () => {
        const { result } = renderHook(useShare);
        const { target } = result.current;

        act(() => {
            target('print', 'https://example.com');
        });

        expect(shareFunctionsModule.printPage).toHaveBeenCalled();
    });

    it('should call sendEmail when shareType is "email"', () => {
        const { result } = renderHook(useShare);
        const { target } = result.current;

        act(() => {
            target('email', 'https://example.com', 'Test Subject');
        });

        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith('https://example.com', 'Test Subject');
    });

    it('should call shareLink when shareType is not "print" or "email"', () => {
        const { result } = renderHook(useShare);
        const { target } = result.current;

        act(() => {
            target('link', 'https://example.com');
        });

        expect(shareFunctionsModule.shareLink).toHaveBeenCalledWith('link', 'https://example.com');
    });

    it('should call sendEmail with a default subject when subject is not provided', () => {
        const { result } = renderHook(useShare);
        const { target } = result.current;

        act(() => {
            target('email', 'https://example.com');
        });

        expect(shareFunctionsModule.sendEmail).toHaveBeenCalledWith('https://example.com', '');
    });
});
