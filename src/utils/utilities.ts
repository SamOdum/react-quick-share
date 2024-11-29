import UAParser from 'ua-parser-js';

export const isMobile = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
        return false; // Default to desktop for SSR
    }

    try {
        const result = new UAParser().getResult();
        const deviceType = result.device.type;
        return deviceType === 'mobile' || deviceType === 'tablet' || window.innerWidth <= 768;
    } catch (error) {
        console.error('Error detecting device type:', error);
        return false; // Fallback to desktop on error
    }
};

export const openTarget = (url: string) => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
        window.open(encodeURI(url));
    } else {
        console.warn('Cannot open URL in non-browser environment');
    }
};
