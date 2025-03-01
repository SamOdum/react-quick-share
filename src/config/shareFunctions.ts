import { openTarget } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';
import { ExtendShareGroupKey, ShareGroupKey, UrlParams } from '../types';

export const printPage = () => window.print();

export const sendEmail = (url: string, subject: string) => {
    const base = shareGroup.email.url;
    openTarget(`${base}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`);
};

export const buildUrlWithParams = (baseUrl: string, mainUrl: string, paramMap?: Record<string, string>, urlParams?: UrlParams): string => {
    // Start with the base URL
    const url = new URL(baseUrl);

    // If there's no parameter mapping or additional parameters, just append the URL
    if (!paramMap) {
        return `${baseUrl}${encodeURIComponent(mainUrl)}`;
    }

    // Add the main URL to the appropriate parameter if specified in the paramMap
    if (paramMap['url']) {
        url.searchParams.append(paramMap['url'], mainUrl);
    } else {
        // If no URL parameter is mapped, append it to the base URL (backward compatibility)
        return `${baseUrl}${encodeURIComponent(mainUrl)}`;
    }

    // Add additional parameters if provided
    if (urlParams) {
        Object.entries(urlParams).forEach(([key, value]) => {
            const paramKey = paramMap[key];
            if (paramKey) {
                url.searchParams.append(paramKey, value);
            }
        });
    }

    return url.toString();
};

export const shareLink = (domain: ShareGroupKey | ExtendShareGroupKey, url: string, urlParams?: UrlParams) => {
    const config = shareGroup[domain] || extendShare[domain];

    if (config) {
        const shareUrl = buildUrlWithParams(config.url, url, config.paramMap, urlParams);
        openTarget(shareUrl);
    }
};
