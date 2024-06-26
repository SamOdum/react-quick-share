import { IShareGroupProps } from '../types';
import { isMobile } from '../utils/utilities';

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

export const extendShare: Record<string, { shareType: 'link'; url: string }> = {};
