import { IShareGroupProps, ShareConfig } from '../types';
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

    // New domains with parameter mappings
    reddit: {
        shareType: 'link',
        url: 'https://www.reddit.com/submit',
        paramMap: { url: 'url', title: 'title' },
    },
    tumblr: {
        shareType: 'link',
        url: 'https://www.tumblr.com/share/link',
        paramMap: { url: 'url', title: 'name', text: 'description' },
    },
    hackernews: {
        shareType: 'link',
        url: 'https://news.ycombinator.com/submitlink',
        paramMap: { url: 'u', title: 't' },
    },
    buffer: {
        shareType: 'link',
        url: 'https://buffer.com/add',
        paramMap: { url: 'url', title: 'text' },
    },
    medium: {
        shareType: 'link',
        url: 'https://medium.com/share',
        paramMap: { url: 'url' },
    },
    pocket: {
        shareType: 'link',
        url: 'https://getpocket.com/edit',
        paramMap: { url: 'url', title: 'title' },
    },
};

export const extendShare: Record<string, ShareConfig> = {};
