import { shareGroup } from '../config/shareConfig';
import { printPage, sendEmail, shareLink } from '../config/shareFunctions';
import { ShareGroupKey } from '../types';

export const useShare = () => {
    const target = (domain: ShareGroupKey, url: string, subject?: string) => {
        const shareType = shareGroup[domain]?.shareType;
        if (shareType === 'print') return printPage();
        if (shareType === 'email') return sendEmail(url, subject || '');

        return shareLink(domain, url);
    };

    return { target };
};
