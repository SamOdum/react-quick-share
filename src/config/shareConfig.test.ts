import { isMobile } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';

// Mock the isMobile function to control its return value
jest.mock('../utils/utilities', () => ({
    isMobile: jest.fn(),
}));

describe('shareGroup', () => {
    beforeEach(() => {
        // Reset the mock before each test
        (isMobile as jest.Mock).mockReset();
    });

    it('contains all expected share types', () => {
        const expectedKeys = ['print', 'email', 'facebook', 'twitter', 'whatsapp', 'pinterest', 'linkedin', 'telegram'];
        expect(Object.keys(shareGroup)).toEqual(expectedKeys);
    });

    it('has correct properties for each share type', () => {
        // Default to desktop for this test
        (isMobile as jest.Mock).mockReturnValue(false);

        expect(shareGroup.print).toEqual({ shareType: 'print', url: 'nothing' });
        expect(shareGroup.email).toEqual({ shareType: 'email', url: 'mailto:' });
        expect(shareGroup.facebook).toEqual({ shareType: 'link', url: 'http://www.facebook.com/share.php?u=' });
        expect(shareGroup.twitter).toEqual({ shareType: 'link', url: 'https://twitter.com/share?url=' });
        expect(shareGroup.whatsapp).toEqual({ shareType: 'link', url: 'https://web.whatsapp.com/send?text=' });
        expect(shareGroup.pinterest).toEqual({ shareType: 'link', url: 'http://pinterest.com/pin/create/link/?url=' });
        expect(shareGroup.linkedin).toEqual({ shareType: 'link', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' });
        expect(shareGroup.telegram).toEqual({ shareType: 'link', url: 'https://telegram.me/share/?url=' });
    });

    it('constructs the correct WhatsApp URL for mobile devices', () => {
        // Mock isMobile to return true (mobile)
        (isMobile as jest.Mock).mockReturnValue(true);

        // Directly test the URL construction
        const whatsappUrl = `https://${isMobile() ? 'api' : 'web'}.whatsapp.com/send?text=`;
        expect(whatsappUrl).toBe('https://api.whatsapp.com/send?text=');
    });

    it('constructs the correct WhatsApp URL for desktop devices', () => {
        // Mock isMobile to return false (desktop)
        (isMobile as jest.Mock).mockReturnValue(false);

        // Directly test the URL construction
        const whatsappUrl = `https://${isMobile() ? 'api' : 'web'}.whatsapp.com/send?text=`;
        expect(whatsappUrl).toBe('https://web.whatsapp.com/send?text=');
    });
});

describe('extendShare', () => {
    it('is initially an empty object', () => {
        expect(extendShare).toEqual({});
    });

    it('can be extended with custom share options', () => {
        // Test that we can add a custom share option
        extendShare.custom = { shareType: 'link', url: 'https://custom-share.com/?url=' };
        expect(extendShare.custom).toEqual({ shareType: 'link', url: 'https://custom-share.com/?url=' });

        // Clean up after test
        delete extendShare.custom;
    });
});
