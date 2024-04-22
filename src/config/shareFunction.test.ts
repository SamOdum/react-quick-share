import { printPage, sendEmail, shareLink } from './shareFunctions';
import { openTarget } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';

jest.mock('../utils/utilities', () => ({
    openTarget: jest.fn(),
}));

jest.mock('./shareConfig', () => ({
    shareGroup: {
        email: { url: 'mailto:' },
        facebook: {
            shareType: 'link',
            url: 'http://www.facebook.com/share.php?u=',
        },
        twitter: {
            shareType: 'link',
            url: 'https://twitter.com/share?url=',
        },
    },
    extendShare: {
        custom: {
            shareType: 'link',
            url: 'https://custom.share/link?url=',
        },
    },
}));

describe('Share Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('printPage', () => {
        it('should call window.print', () => {
            const mockPrint = jest.fn();
            window.print = mockPrint;
            printPage();
            expect(mockPrint).toHaveBeenCalled();
        });
    });

    describe('sendEmail', () => {
        it('should call openTarget with mailto URL', () => {
            const url = 'http://example.com';
            const subject = 'Test Subject';
            sendEmail(url, subject);
            expect(openTarget).toHaveBeenCalledWith(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`);
        });
    });

    describe('shareLink', () => {
        it('should call openTarget with share link', () => {
            const domain = 'email';
            const url = 'http://example.com';
            shareLink(domain, url);
            expect(openTarget).toHaveBeenCalledWith(`${shareGroup[domain].url}${encodeURIComponent(url)}`);
        });
    });
});

describe('shareLink', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should use the shareGroup URL if domain is in shareGroup', () => {
        const domain = 'facebook';
        const url = 'https://example.com';
        const expectedUrl = `${shareGroup[domain].url}${encodeURIComponent(url)}`;

        shareLink(domain, url);

        expect(openTarget).toHaveBeenCalledWith(expectedUrl);
    });

    it('should use the extendShare URL if domain is in extendShare', () => {
        const domain = 'custom';
        const url = 'https://example.com';
        const expectedUrl = `${extendShare[domain].url}${encodeURIComponent(url)}`;

        shareLink(domain, url);

        expect(openTarget).toHaveBeenCalledWith(expectedUrl);
    });

    it('should prioritize shareGroup URL over extendShare URL', () => {
        const domain = 'twitter';
        const url = 'https://example.com';
        const expectedUrl = `${shareGroup[domain].url}${encodeURIComponent(url)}`;

        shareLink(domain, url);

        expect(openTarget).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return undefined if domain is not in shareGroup or extendShare', () => {
        const domain = 'unknown';
        const url = 'https://example.com';

        const result = shareLink(domain, url);

        expect(result).toBeUndefined();
        expect(openTarget).not.toHaveBeenCalled();
    });
});
