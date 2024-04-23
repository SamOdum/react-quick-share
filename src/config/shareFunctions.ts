import { openTarget } from '../utils/utilities';
import { extendShare, shareGroup } from './shareConfig';
import { ExtendShareGroupKey, ShareGroupKey } from '../types';

export const printPage = () => window.print();

export const sendEmail = (url: string, subject: string) => {
    const base = shareGroup.email.url;
    openTarget(`${base}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`);
};

export const shareLink = (domain: ShareGroupKey | ExtendShareGroupKey, url: string) => {
    const base = shareGroup[domain]?.url || extendShare[domain]?.url;
    if (base) {
        openTarget(`${base}${encodeURIComponent(url)}`);
    }
};
