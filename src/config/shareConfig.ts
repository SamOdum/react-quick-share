import { IShareGroupProps } from '../types';
import { isMobile } from '../utils/utilities';

/**
 * A record of URLs and their types for sharing functionalities.
 * @typedef {Object} IShareGroupProps
 * @property {Object} print Information for printing.
 * @property {Object} email Information for email sharing.
 * @property {Object} facebook Information for Facebook sharing.
 * @property {Object} twitter Information for Twitter sharing.
 * @property {Object} whatsapp Information for WhatsApp sharing.
 * @property {Object} pinterest Information for Pinterest sharing.
 * @property {Object} linkedin Information for LinkedIn sharing.
 * @property {Object} telegram Information for Telegram sharing.
 */
export const shareGroup: IShareGroupProps = {
    print: { shareType: 'print', url: 'nothing' },
    email: { shareType: 'email', url: 'mailto:' },
    facebook: { shareType: 'link', url: 'http://www.facebook.com/share.php?u=' },
    twitter: { shareType: 'link', url: 'https://twitter.com/share?url=' },
    whatsapp: { shareType: 'link', url: `https://${isMobile() ? 'api' : 'web'}.whatsapp.com/send?text=` },
    pinterest: { shareType: 'link', url: 'http://pinterest.com/pin/create/link/?url=' },
    linkedin: { shareType: 'link', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' },
    telegram: { shareType: 'link', url: 'https://telegram.me/share/?url=' },
};

/**
 * A record for extending share capabilities with custom URLs.
 * @type {Record<string, { shareType: 'link'; url: string }>}
 */
export const extendShare: Record<string, { shareType: 'link'; url: string }> = {};
