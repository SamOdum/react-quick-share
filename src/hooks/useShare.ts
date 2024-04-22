import { shareGroup } from '../config/shareConfig';
import { printPage, sendEmail, shareLink } from '../config/shareFunctions';
import { ShareGroupKey } from '../types';

/**
 * Custom hook to handle different types of social share operations based on the domain.
 * @returns {Object} Returns an object with a 'target' function that handles the sharing logic.
 */
export const useShare = () => {
    const target = (domain: ShareGroupKey, url: string, subject?: string) => {
        if (shareGroup[domain]?.shareType === 'print') return printPage();
        if (shareGroup[domain]?.shareType === 'email') return sendEmail(url, subject || '');

        return shareLink(domain, url);
    };

    return { target };
};
