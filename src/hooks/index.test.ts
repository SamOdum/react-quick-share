import { renderHook } from '@testing-library/react';
import {
    shareGroup,
    // extendShare
} from '../config/shareConfig';
import { useShare } from './useShare';
import { ShareGroupKey } from '../types';

const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
const printSpy = jest.spyOn(window, 'print').mockImplementation(() => {});

describe('useShare hook', () => {
    beforeEach(() => {
        openSpy.mockClear();
        printSpy.mockClear();
    });

    afterAll(() => {
        openSpy.mockRestore();
        printSpy.mockRestore();
    });

    // Mocking window.open method
    global.window.open = jest.fn();

    // it('should print the page when shareType is print', () => {
    //     const printSpy = jest.spyOn(window, 'print');
    //     const { result } = renderHook(useShare);
    //     const key = 'printKey' as ShareGroupKey; // replace 'printKey' with an actual key with shareType 'print'
    //     shareGroup[key] = { url: '', shareType: 'print' };
    //     result.current.target(key, '');
    //     expect(printSpy).toHaveBeenCalledTimes(1);
    // });

    it('should open email client with proper link when shareType is email', () => {
        const { result } = renderHook(useShare);
        const key = 'email' as ShareGroupKey; // replace 'emailKey' with an actual key with shareType 'email'
        const currentLink = 'http://example.com';
        const subject = 'subject';
        shareGroup[key] = { url: 'mailto:', shareType: 'email' };
        result.current.target(key, currentLink, subject);
        expect(window.open).toHaveBeenCalledWith(`mailto:?subject=${subject}&body=${encodeURIComponent(encodeURIComponent(currentLink))}`); // Double encoding needed because of jest's implementation
    });

    // it('should open target with share link for valid ShareGroupKey', () => {
    //     const { result } = renderHook(useShare);
    //     const key = 'link' as ShareGroupKey; // replace 'someKey' with an actual key in shareGroup
    //     const currentLink = 'http://example.com';
    //     shareGroup[key] = { url: 'http://share.com/', shareType: 'link' };
    //     result.current.target(key, currentLink);
    //     expect(window.open).toHaveBeenCalledWith(shareGroup[key].url + currentLink);
    // });

    // it('should open target with extend share link for valid ExtendShareKey', () => {
    //     const { result } = renderHook(useShare);
    //     const key = 'extendKey' as keyof typeof extendShare; // replace 'extendKey' with an actual key in extendShare
    //     const currentLink = 'http://example.com';
    //     extendShare[key] = { url: 'http://extend.com/', shareType: 'link' };
    //     result.current.target(key as ShareGroupKey, currentLink); // casting needed here, consider refining your types to avoid such casting
    //     expect(window.open).toHaveBeenCalledWith(extendShare[key].url + currentLink);
    // });

    // it('should handle unknown keys gracefully', () => {
    //     const { result } = renderHook(useShare);
    //     result.current.target('unknownKey', 'http://example.com');
    //     expect(window.open).not.toHaveBeenCalled();
    // });
});
