import * as utilities from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';
import { buildUrlWithParams } from './shareFunctions';

// Mock the utilities module
jest.mock('../utils/utilities');

describe('shareGroup', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.resetAllMocks();
    });

    it('contains all expected share types', () => {
        const expectedKeys = [
            'print',
            'email',
            'facebook',
            'twitter',
            'whatsapp',
            'pinterest',
            'linkedin',
            'telegram',
            'reddit',
            'tumblr',
            'hackernews',
            'buffer',
            'medium',
            'pocket',
        ];
        expect(Object.keys(shareGroup)).toEqual(expectedKeys);
    });

    it('has correct properties for basic share types', () => {
        // Default to desktop for this test
        jest.spyOn(utilities, 'isMobile').mockReturnValue(false);

        // Re-import to get a fresh instance with the new mock
        jest.isolateModules(() => {
            const { shareGroup } = require('./shareConfig');

            expect(shareGroup.print).toEqual({ shareType: 'print', url: 'nothing' });
            expect(shareGroup.email).toEqual({ shareType: 'email', url: 'mailto:' });
            expect(shareGroup.facebook).toEqual({ shareType: 'link', url: 'http://www.facebook.com/share.php?u=' });
            expect(shareGroup.twitter).toEqual({ shareType: 'link', url: 'https://twitter.com/share?url=' });
            expect(shareGroup.whatsapp).toEqual({ shareType: 'link', url: 'https://web.whatsapp.com/send?text=' });
            expect(shareGroup.pinterest).toEqual({ shareType: 'link', url: 'http://pinterest.com/pin/create/link/?url=' });
            expect(shareGroup.linkedin).toEqual({ shareType: 'link', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' });
            expect(shareGroup.telegram).toEqual({ shareType: 'link', url: 'https://telegram.me/share/?url=' });
        });
    });

    it('has correct properties for advanced share types with paramMap', () => {
        expect(shareGroup.reddit).toHaveProperty('paramMap');
        expect(shareGroup.reddit.paramMap).toEqual({ url: 'url', title: 'title' });

        expect(shareGroup.tumblr).toHaveProperty('paramMap');
        expect(shareGroup.tumblr.paramMap).toEqual({ url: 'url', title: 'name', text: 'description' });

        expect(shareGroup.hackernews).toHaveProperty('paramMap');
        expect(shareGroup.hackernews.paramMap).toEqual({ url: 'u', title: 't' });
    });

    it('constructs the correct WhatsApp URL for mobile devices', () => {
        // Re-import the module to get fresh instances with the new mock
        jest.isolateModules(() => {
            // Mock isMobile to return true (mobile)
            jest.spyOn(utilities, 'isMobile').mockReturnValue(true);

            // Import the module again to get a fresh instance with the new mock
            const { shareGroup } = require('./shareConfig');

            // Verify the WhatsApp URL is correct for mobile
            expect(shareGroup.whatsapp.url).toBe('https://api.whatsapp.com/send?text=');
        });
    });

    it('constructs the correct WhatsApp URL for desktop devices', () => {
        // Re-import the module to get fresh instances with the new mock
        jest.isolateModules(() => {
            // Mock isMobile to return false (desktop)
            jest.spyOn(utilities, 'isMobile').mockReturnValue(false);

            // Import the module again to get a fresh instance with the new mock
            const { shareGroup } = require('./shareConfig');

            // Verify the WhatsApp URL is correct for desktop
            expect(shareGroup.whatsapp.url).toBe('https://web.whatsapp.com/send?text=');
        });
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

    it('can be extended with custom share options including paramMap', () => {
        // Test that we can add a custom share option with paramMap
        extendShare.custom = {
            shareType: 'link',
            url: 'https://custom-share.com/',
            paramMap: { url: 'u', title: 't' },
        };

        expect(extendShare.custom).toEqual({
            shareType: 'link',
            url: 'https://custom-share.com/',
            paramMap: { url: 'u', title: 't' },
        });

        // Clean up after test
        delete extendShare.custom;
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
});
