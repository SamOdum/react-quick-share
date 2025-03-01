import { shareGroup } from '../config/shareConfig';
import { printPage, sendEmail, shareLink } from '../config/shareFunctions';
import { ShareGroupKey, UrlParams } from '../types';

export const useShare = () => {
    const target = (domain: ShareGroupKey, url: string, subject?: string, urlParams?: UrlParams) => {
        const shareType = shareGroup[domain]?.shareType;
        if (shareType === 'print') return printPage();
        if (shareType === 'email') return sendEmail(url, subject || '');

        return shareLink(domain, url, urlParams);
    };

    return { target };
};
