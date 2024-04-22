import { openTarget } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';
import { ExtendShareGroupKey, ShareGroupKey } from '../types';

/**
 * Triggers the print dialog in the browser.
 */
export const printPage = () => window.print();

/**
 * Constructs a mailto URL with subject and body, and opens it in a new tab/window.
 * @param {string} url The URL to be included in the email body.
 * @param {string} subject The subject of the email.
 * @returns Opens a new mail target with the composed mailto link.
 */
export const sendEmail = (url: string, subject: string) => {
    const base = shareGroup.email.url;
    return openTarget(`${base}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`);
};

/**
 * Opens a sharing link based on the domain specified, encoding the provided URL.
 * @param {ShareGroupKey | ExtendShareGroupKey} domain The domain key to fetch the sharing URL.
 * @param {string} url The URL to share.
 * @returns Opens a new target with the constructed URL if a base URL is found; otherwise does nothing.
 */
export const shareLink = (domain: ShareGroupKey | ExtendShareGroupKey, url: string) => {
    const base = shareGroup[domain]?.url || extendShare[domain]?.url;
    return base && openTarget(`${base}${encodeURIComponent(url)}`);
};
