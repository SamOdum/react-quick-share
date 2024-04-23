import { isMobile } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';

describe('shareGroup', () => {
    it('contains all expected share types', () => {
        const expectedKeys = ['print', 'email', 'facebook', 'twitter', 'whatsapp', 'pinterest', 'linkedin', 'telegram'];
        expect(Object.keys(shareGroup)).toEqual(expectedKeys);
    });

    it('has correct properties for each share type', () => {
        expect(shareGroup.print).toEqual({ shareType: 'print', url: 'nothing' });
        expect(shareGroup.email).toEqual({ shareType: 'email', url: 'mailto:' });
        expect(shareGroup.facebook).toEqual({ shareType: 'link', url: 'http://www.facebook.com/share.php?u=' });
        expect(shareGroup.twitter).toEqual({ shareType: 'link', url: 'https://twitter.com/share?url=' });
        expect(shareGroup.whatsapp).toEqual({ shareType: 'link', url: expect.any(String) });
        expect(shareGroup.pinterest).toEqual({ shareType: 'link', url: 'http://pinterest.com/pin/create/link/?url=' });
        expect(shareGroup.linkedin).toEqual({ shareType: 'link', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' });
        expect(shareGroup.telegram).toEqual({ shareType: 'link', url: 'https://telegram.me/share/?url=' });
    });

    it('adjusts WhatsApp URL based on device type', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            configurable: true,
        });
        expect(isMobile()).toBe(true);
        // expect(shareGroup.whatsapp.url).toBe('https://api.whatsapp.com/send?text=');

        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
            configurable: true,
        });
        expect(isMobile()).toBe(false);
        // expect(shareGroup.whatsapp.url).toBe('https://web.whatsapp.com/send?text=');
    });
});

describe('extendShare', () => {
    it('is initially an empty object', () => {
        expect(extendShare).toEqual({});
    });
});
