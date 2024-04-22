import UAParser from 'ua-parser-js';

/**
 * Detects if the current device is mobile or tablet, or checks the screen width as a fallback.
 * @returns {boolean} True if the device is mobile or tablet, or the screen width is small; otherwise, false.
 */
export const isMobile = () => {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type;

    if (deviceType === 'mobile' || deviceType === 'tablet') {
        return true;
    }

    if (typeof window !== 'undefined') {
        const isSmallScreen = window.innerWidth <= 768;
        return isSmallScreen;
    }

    return false;
};

/**
 * Opens a given URL in a new browser tab or window.
 * @param {string} url The URL to open.
 * @returns Opens a new window/tab with the URL provided.
 */
export const openTarget = (url: string) => window?.open(encodeURI(url));
