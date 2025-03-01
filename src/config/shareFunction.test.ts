import { openTarget } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';
import { printPage, sendEmail, shareLink, buildUrlWithParams } from './shareFunctions';

const testURL = 'http://example.com';

jest.mock('../utils/utilities', () => ({
    openTarget: jest.fn(),
}));

jest.mock('./shareConfig', () => ({
    shareGroup: {
        email: { url: 'mailto:' },
        facebook: { shareType: 'link', url: 'http://www.facebook.com/share.php?u=' },
        twitter: { shareType: 'link', url: 'https://twitter.com/share?url=' },
        reddit: {
            shareType: 'link',
            url: 'https://www.reddit.com/submit',
            paramMap: { url: 'url', title: 'title' },
        },
        noUrlParam: {
            shareType: 'link',
            url: 'https://example.com/share',
            paramMap: { title: 'title' },
        },
    },
    extendShare: {
        custom: { shareType: 'link', url: 'https://custom.share/link?url=' },
        customWithParams: {
            shareType: 'link',
            url: 'https://custom.share/advanced',
            paramMap: { url: 'u', title: 't', text: 'txt' },
        },
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

    it('opens a share link with urlParams for a domain with paramMap', () => {
        const domain = 'reddit';
        const url = testURL;
        const urlParams = { title: 'Test Title' };
        shareLink(domain, url, urlParams);

        // Create expected URL
        const expectedUrl = new URL('https://www.reddit.com/submit');
        expectedUrl.searchParams.append('url', url);
        expectedUrl.searchParams.append('title', 'Test Title');

        expect(openTarget).toHaveBeenCalledWith(expectedUrl.toString());
    });

    it('opens a share link with urlParams for a custom domain with paramMap', () => {
        const domain = 'customWithParams';
        const url = testURL;
        const urlParams = { title: 'Test Title', text: 'Test Description' };
        shareLink(domain, url, urlParams);

        // Create expected URL
        const expectedUrl = new URL('https://custom.share/advanced');
        expectedUrl.searchParams.append('u', url);
        expectedUrl.searchParams.append('t', 'Test Title');
        expectedUrl.searchParams.append('txt', 'Test Description');

        expect(openTarget).toHaveBeenCalledWith(expectedUrl.toString());
    });

    it('opens a share link for a domain with paramMap but no url param mapping', () => {
        const domain = 'noUrlParam';
        const url = testURL;
        const urlParams = { title: 'Test Title' };
        shareLink(domain, url, urlParams);

        // Should fall back to appending the URL directly
        expect(openTarget).toHaveBeenCalledWith(`https://example.com/share${encodeURIComponent(url)}`);
    });
});

describe('buildUrlWithParams', () => {
    it('builds a URL with just the main URL when no paramMap is provided', () => {
        const baseUrl = 'https://example.com/';
        const mainUrl = 'https://mysite.com/';

        const result = buildUrlWithParams(baseUrl, mainUrl);
        expect(result).toBe(`${baseUrl}${encodeURIComponent(mainUrl)}`);
    });

    it('builds a URL with parameters mapped correctly', () => {
        const baseUrl = 'https://example.com/';
        const mainUrl = 'https://mysite.com/';
        const paramMap = { url: 'u', title: 't' };
        const urlParams = { title: 'My Title' };

        const result = buildUrlWithParams(baseUrl, mainUrl, paramMap, urlParams);

        // Create expected URL for comparison
        const expectedUrl = new URL(baseUrl);
        expectedUrl.searchParams.append('u', mainUrl);
        expectedUrl.searchParams.append('t', 'My Title');

        expect(result).toBe(expectedUrl.toString());
    });

    it('ignores parameters not in the paramMap', () => {
        const baseUrl = 'https://example.com/';
        const mainUrl = 'https://mysite.com/';
        const paramMap = { url: 'u', title: 't' };
        const urlParams = { title: 'My Title', unknown: 'Should be ignored' };

        const result = buildUrlWithParams(baseUrl, mainUrl, paramMap, urlParams);

        // Create expected URL for comparison
        const expectedUrl = new URL(baseUrl);
        expectedUrl.searchParams.append('u', mainUrl);
        expectedUrl.searchParams.append('t', 'My Title');

        expect(result).toBe(expectedUrl.toString());
        // Verify the unknown param is not included
        expect(result).not.toContain('Should be ignored');
    });

    it('falls back to appending the URL directly when paramMap exists but has no url mapping', () => {
        const baseUrl = 'https://example.com/';
        const mainUrl = 'https://mysite.com/';
        const paramMap = { title: 't' }; // No 'url' mapping
        const urlParams = { title: 'My Title' };

        const result = buildUrlWithParams(baseUrl, mainUrl, paramMap, urlParams);

        // Should fall back to appending the URL directly without adding other parameters
        // This is the current implementation behavior
        expect(result).toBe(`${baseUrl}${encodeURIComponent(mainUrl)}`);
    });
});
