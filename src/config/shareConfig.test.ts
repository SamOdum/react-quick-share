import { shareGroup, extendShare } from './shareConfig';
import { isMobile } from '../utils/utilities';

const userAgent = {
    iPhone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
    macBook: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
};

describe('shareGroup', () => {
    it('should have the correct properties', () => {
        expect(Object.keys(shareGroup)).toEqual(['print', 'email', 'facebook', 'twitter', 'whatsapp', 'pinterest', 'linkedin', 'telegram']);
    });

    it('should have the correct properties for each share type', () => {
        expect(shareGroup.print).toEqual({ shareType: 'print', url: 'nothing' });
        expect(shareGroup.email).toEqual({ shareType: 'email', url: 'mailto:' });
        expect(shareGroup.facebook).toEqual({ shareType: 'link', url: 'http://www.facebook.com/share.php?u=' });
        expect(shareGroup.twitter).toEqual({ shareType: 'link', url: 'https://twitter.com/share?url=' });
        expect(shareGroup.whatsapp.shareType).toBe('link');
        expect(shareGroup.pinterest).toEqual({ shareType: 'link', url: 'http://pinterest.com/pin/create/link/?url=' });
        expect(shareGroup.linkedin).toEqual({ shareType: 'link', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' });
        expect(shareGroup.telegram).toEqual({ shareType: 'link', url: 'https://telegram.me/share/?url=' });
    });

    it('should use the correct WhatsApp URL based on isMobile', () => {
        jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(userAgent.iPhone);
        expect(isMobile()).toBe(true);

        jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(userAgent.macBook);
        expect(shareGroup.whatsapp.url).toBe('https://web.whatsapp.com/send?text=');
    });
});

describe('extendShare', () => {
    it('should be an empty object', () => {
        expect(extendShare).toEqual({});
    });
});
