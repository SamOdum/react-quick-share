import '@testing-library/jest-dom';
import { isMobile, openTarget } from './utilities';

const userAgent = {
    iPhone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    iPad: 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1',
    macBook: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
};

const testURL = 'http://www.example.com';

describe('Utilities', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('isMobile', () => {
        const testCases = [
            {
                userAgent: userAgent.iPhone,
                expected: true,
            },
            {
                userAgent: userAgent.iPad,
                expected: true,
            },
            {
                userAgent: userAgent.macBook,
                expected: false,
            },
        ];

        testCases.forEach(({ userAgent, expected }) => {
            it(`returns ${expected} for user agent ${userAgent}`, () => {
                jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(userAgent);
                expect(isMobile()).toBe(expected);
            });
        });
    });

    describe('openTarget', () => {
        it('opens a new window with the given URL', () => {
            const mockOpen = jest.fn();
            window.open = mockOpen;
            openTarget(testURL);
            expect(mockOpen).toHaveBeenCalledWith(testURL);
        });

        it('handles cases where window is undefined', () => {
            const originalWindow = { ...window };
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (global as any).window;

            // Function should not throw, but should log a warning
            expect(() => openTarget(testURL)).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith('Cannot open URL in non-browser environment');

            // Cleanup
            global.window = originalWindow;
            consoleSpy.mockRestore();
        });
    });
});
