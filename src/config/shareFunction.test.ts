import { openTarget } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';
import { printPage, sendEmail, shareLink } from './shareFunctions';

const testURL = 'http://example.com';

jest.mock('../utils/utilities', () => ({
    openTarget: jest.fn(),
}));

jest.mock('./shareConfig', () => ({
    shareGroup: {
        email: { url: 'mailto:' },
        facebook: { shareType: 'link', url: 'http://www.facebook.com/share.php?u=' },
        twitter: { shareType: 'link', url: 'https://twitter.com/share?url=' },
    },
    extendShare: {
        custom: { shareType: 'link', url: 'https://custom.share/link?url=' },
    },
}));

describe('Share Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls window.print when printPage is invoked', () => {
        const mockPrint = jest.fn();
        window.print = mockPrint;
        printPage();
        expect(mockPrint).toHaveBeenCalled();
    });

    it('constructs and opens mailto URL for sendEmail', () => {
        const url = testURL;
        const subject = 'Test Subject';
        sendEmail(url, subject);
        expect(openTarget).toHaveBeenCalledWith(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`);
    });

    it('opens a share link for specified domain using shareGroup configuration', () => {
        const domain = 'facebook';
        const url = testURL;
        shareLink(domain, url);
        expect(openTarget).toHaveBeenCalledWith(`${shareGroup[domain].url}${encodeURIComponent(url)}`);
    });

    it('opens a share link for specified domain using extendShare when not in shareGroup', () => {
        const domain = 'custom';
        const url = testURL;
        shareLink(domain, url);
        expect(openTarget).toHaveBeenCalledWith(`${extendShare[domain].url}${encodeURIComponent(url)}`);
    });

    it('returns undefined and does not open a target if domain is not recognized', () => {
        const domain = 'unknown';
        const url = testURL;
        const result = shareLink(domain, url);
        expect(result).toBeUndefined();
        expect(openTarget).not.toHaveBeenCalled();
    });
});
