import { ShareButton, createSocialShareButton } from '../components/Button';
import * as useShareModule from '../hooks/useShare';

const testURL = 'http://www.example.com';

// Mock the useShare hook
jest.mock('../hooks/useShare', () => ({
    useShare: jest.fn().mockReturnValue({
        target: jest.fn(),
    }),
}));

describe('ShareButton', () => {
    let mockTarget: jest.Mock;

    beforeEach(() => {
        mockTarget = jest.fn();
        (useShareModule.useShare as jest.Mock).mockReturnValue({ target: mockTarget });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should pass the domain, url and subject to the target function', () => {
        // Create a mock React element without rendering
        const button = ShareButton({
            domain: 'facebook',
            url: testURL,
            subject: 'Test Subject',
            children: 'Share',
        });

        // Simulate a click by calling the onClick handler directly
        button.props.onClick();

        // Verify the target function was called with the correct arguments
        expect(mockTarget).toHaveBeenCalledWith('facebook', testURL, 'Test Subject');
    });

    it('should use window.location.href when url is not provided', () => {
        // Save original location
        const originalHref = window.location.href;
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: 'http://current-page.com' },
        });

        // Create a mock React element without rendering
        const button = ShareButton({
            domain: 'facebook',
            children: 'Share',
        });

        // Simulate a click
        button.props.onClick();

        // Verify target was called with the current URL
        expect(mockTarget).toHaveBeenCalledWith('facebook', 'http://current-page.com', undefined);

        // Restore original location
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: originalHref },
        });
    });

    it('should handle case when window is undefined', () => {
        const originalWindow = { ...window };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (global as any).window;

        // This should not throw an error
        const button = ShareButton({
            domain: 'facebook',
            url: testURL,
            children: 'Share',
        });

        // Simulate a click
        button.props.onClick();

        // Verify target was called with the provided URL
        expect(mockTarget).toHaveBeenCalledWith('facebook', testURL, undefined);

        // Restore window
        global.window = originalWindow;
    });

    it('should apply custom styles to the button', () => {
        const customStyle = { backgroundColor: 'red', color: 'white' };

        // Create a mock React element without rendering
        const button = ShareButton({
            domain: 'facebook',
            url: testURL,
            style: customStyle,
            children: 'Share',
        });

        // Check that the style was merged with the default style
        expect(button.props.style).toEqual(
            expect.objectContaining({
                backgroundColor: 'red',
                color: 'white',
            })
        );
    });
});

describe('createSocialShareButton', () => {
    it('should create a component with the correct display name', () => {
        const CustomButton = createSocialShareButton('custom');
        expect(CustomButton.displayName).toBe('CustomShareButton');
    });

    it('should create a component that passes props to ShareButton', () => {
        // Create a custom button
        const CustomButton = createSocialShareButton('custom');

        // Create an instance of the custom button
        const button = CustomButton({
            url: testURL,
            subject: 'Test Subject',
            children: 'Custom',
        });

        // Verify it has the correct domain
        expect(button.props.domain).toBe('custom');
        expect(button.props.url).toBe(testURL);
        expect(button.props.subject).toBe('Test Subject');
        expect(button.props.children).toBe('Custom');
    });
});

// Test the pre-defined social buttons
describe('Social Share Buttons', () => {
    // Import all buttons here to avoid React rendering issues
    const { Email, Facebook, Linkedin, Pinterest, Print, Telegram, Twitter, Whatsapp } = require('../components/Button');
    let mockTarget: jest.Mock;

    beforeEach(() => {
        mockTarget = jest.fn();
        (useShareModule.useShare as jest.Mock).mockReturnValue({ target: mockTarget });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create Print button with correct domain', () => {
        const button = Print({ url: testURL, children: 'Print' });
        expect(button.props.domain).toBe('print');
    });

    it('should create Email button with correct domain', () => {
        const button = Email({ url: testURL, subject: 'Test Subject', children: 'Email' });
        expect(button.props.domain).toBe('email');
        expect(button.props.subject).toBe('Test Subject');
    });

    it('should create Whatsapp button with correct domain', () => {
        const button = Whatsapp({ url: testURL, children: 'Whatsapp' });
        expect(button.props.domain).toBe('whatsapp');
    });

    it('should create Twitter button with correct domain', () => {
        const button = Twitter({ url: testURL, children: 'Twitter' });
        expect(button.props.domain).toBe('twitter');
    });

    it('should create Facebook button with correct domain', () => {
        const button = Facebook({ url: testURL, children: 'Facebook' });
        expect(button.props.domain).toBe('facebook');
    });

    it('should create Pinterest button with correct domain', () => {
        const button = Pinterest({ url: testURL, children: 'Pinterest' });
        expect(button.props.domain).toBe('pinterest');
    });

    it('should create Linkedin button with correct domain', () => {
        const button = Linkedin({ url: testURL, children: 'Linkedin' });
        expect(button.props.domain).toBe('linkedin');
    });

    it('should create Telegram button with correct domain', () => {
        const button = Telegram({ url: testURL, children: 'Telegram' });
        expect(button.props.domain).toBe('telegram');
    });
});
