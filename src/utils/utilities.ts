import UAParser from 'ua-parser-js';

export const isMobile = () => {
    const result = new UAParser().getResult();
    const deviceType = result.device.type;
    return deviceType === 'mobile' || deviceType === 'tablet' || window.innerWidth <= 768;
};

export const openTarget = (url: string) => window?.open(encodeURI(url));
