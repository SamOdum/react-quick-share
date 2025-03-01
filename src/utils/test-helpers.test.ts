import { testSocialButtonDomain, testUrlWithParams } from './test-helpers';

// Mock button component for testing
const mockButton = jest.fn((props) => ({
    props: {
        ...props,
        domain: 'testDomain', // Always return the expected domain
    },
}));

// Mock buildUrlWithParams function
jest.mock('../config/shareFunctions', () => ({
    buildUrlWithParams: jest.fn((baseUrl, mainUrl, paramMap, urlParams) => {
        return `${baseUrl}${encodeURIComponent(mainUrl)}`;
    }),
}));

describe('Test Helpers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('testSocialButtonDomain', () => {
        it('should test button with default parameters', () => {
            testSocialButtonDomain(mockButton, 'testDomain');

            // Verify the mock was called with default parameters
            expect(mockButton).toHaveBeenCalledWith({
                url: 'http://www.example.com',
                children: 'Share',
            });
        });

        it('should test button with custom URL', () => {
            testSocialButtonDomain(mockButton, 'testDomain', 'https://custom.url');

            expect(mockButton).toHaveBeenCalledWith({
                url: 'https://custom.url',
                children: 'Share',
            });
        });

        it('should test button with custom children', () => {
            testSocialButtonDomain(mockButton, 'testDomain', 'http://www.example.com', 'Custom Text');

            expect(mockButton).toHaveBeenCalledWith({
                url: 'http://www.example.com',
                children: 'Custom Text',
            });
        });

        it('should test button with additional props', () => {
            testSocialButtonDomain(mockButton, 'testDomain', 'http://www.example.com', 'Share', { customProp: 'value' });

            expect(mockButton).toHaveBeenCalledWith({
                url: 'http://www.example.com',
                children: 'Share',
                customProp: 'value',
            });
        });
    });

    describe('testUrlWithParams', () => {
        it('should test URL with all parameters', () => {
            const baseUrl = 'https://example.com/';
            const mainUrl = 'https://mysite.com/';
            const paramMap = { url: 'u', title: 't' };
            const urlParams = { title: 'Test Title' };
            const expectedUrl = `${baseUrl}${encodeURIComponent(mainUrl)}`;

            testUrlWithParams(baseUrl, mainUrl, paramMap, urlParams, expectedUrl);

            // Verify buildUrlWithParams was called with correct parameters
            const buildUrlWithParams = require('../config/shareFunctions').buildUrlWithParams;
            expect(buildUrlWithParams).toHaveBeenCalledWith(baseUrl, mainUrl, paramMap, urlParams);
        });

        it('should test URL without paramMap', () => {
            const baseUrl = 'https://example.com/';
            const mainUrl = 'https://mysite.com/';
            const expectedUrl = `${baseUrl}${encodeURIComponent(mainUrl)}`;

            testUrlWithParams(baseUrl, mainUrl, undefined, undefined, expectedUrl);

            const buildUrlWithParams = require('../config/shareFunctions').buildUrlWithParams;
            expect(buildUrlWithParams).toHaveBeenCalledWith(baseUrl, mainUrl, undefined, undefined);
        });

        it('should test URL with paramMap but without urlParams', () => {
            const baseUrl = 'https://example.com/';
            const mainUrl = 'https://mysite.com/';
            const paramMap = { url: 'u', title: 't' };
            const expectedUrl = `${baseUrl}${encodeURIComponent(mainUrl)}`;

            testUrlWithParams(baseUrl, mainUrl, paramMap, undefined, expectedUrl);

            const buildUrlWithParams = require('../config/shareFunctions').buildUrlWithParams;
            expect(buildUrlWithParams).toHaveBeenCalledWith(baseUrl, mainUrl, paramMap, undefined);
        });
    });
});
