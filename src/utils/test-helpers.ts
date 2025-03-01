/**
 * Test helpers for React Quick Share
 */

/**
 * Helper function to test social media button domains
 * @param button The button component to test
 * @param domain The expected domain
 * @param url The test URL
 * @param children The button children
 * @param additionalProps Any additional props to pass to the button
 */
export const testSocialButtonDomain = (
    button: any,
    domain: string,
    url: string = 'http://www.example.com',
    children: string = 'Share',
    additionalProps: Record<string, any> = {}
) => {
    const buttonElement = button({ url, children, ...additionalProps });
    expect(buttonElement.props.domain).toBe(domain);
    return buttonElement;
};

/**
 * Helper function to test URL parameters
 * @param baseUrl The base URL
 * @param mainUrl The main URL to share
 * @param paramMap The parameter mapping
 * @param urlParams The URL parameters
 * @param expectedUrl The expected URL
 */
export const testUrlWithParams = (
    baseUrl: string,
    mainUrl: string,
    paramMap: Record<string, string> | undefined,
    urlParams: Record<string, string> | undefined,
    expectedUrl: string
) => {
    const buildUrlWithParams = require('../config/shareFunctions').buildUrlWithParams;
    const result = buildUrlWithParams(baseUrl, mainUrl, paramMap, urlParams);
    expect(result).toBe(expectedUrl);
    return result;
};
