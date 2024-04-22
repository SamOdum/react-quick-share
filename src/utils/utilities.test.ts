import '@testing-library/jest-dom';
import { isMobile, openTarget } from './utilities';

describe('Utilities', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('isMobile', () => {
        it('should return true for mobile devices', () => {
            jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
                'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
            );
            expect(isMobile()).toBe(true);
        });

        it('should return true for tablet devices', () => {
            jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
                'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1'
            );
            expect(isMobile()).toBe(true);
        });

        it('should return false for desktop devices', () => {
            jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
            );
            expect(isMobile()).toBe(false);
        });
    });

    describe('openTarget', () => {
        afterEach(() => {
            jest.restoreAllMocks(); // Reset mocks after each test
        });

        it('should open a new window with the given URL', () => {
            // Mock window.open
            const mockOpen = jest.fn();
            global.window.open = mockOpen; // Replace window.open with the mock function

            openTarget('https://www.example.com');

            expect(mockOpen).toHaveBeenCalledWith('https://www.example.com');
        });

        it('should handle cases where window is undefined', () => {
            const originalWindow = { ...global.window };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (global as any).window; // Simulate an environment where window is undefined

            expect(() => openTarget('https://www.example.com')).toThrow();

            global.window = originalWindow; // Restore window
        });
    });
});
