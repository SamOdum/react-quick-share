import React from 'react';
import { useShare } from '../hooks/useShare';
import { ExtendShareGroupKey, IShareButtonProps, ISocialShareButtonProps, ShareGroupKey } from '../types';

export const ShareButton = ({ children, domain, url = window.location.href, subject, style, ...rest }: IShareButtonProps) => {
    const { target } = useShare();
    const buttonStyle = { border: 'none', margin: '0', padding: '0', ...style };

    return (
        <button {...rest} style={buttonStyle} onClick={() => target(domain, url, subject)}>
            {children}
        </button>
    );
};

export const createSocialShareButton = (domain: ShareGroupKey | ExtendShareGroupKey) => {
    const SocialShareButton = ({ children, ...props }: ISocialShareButtonProps) => (
        <ShareButton domain={domain} {...props}>
            {children}
        </ShareButton>
    );
    SocialShareButton.displayName = `${domain.charAt(0).toUpperCase()}${domain.slice(1)}ShareButton`;
    return SocialShareButton;
};

export const Print = createSocialShareButton('print');
export const Email = createSocialShareButton('email');
export const Whatsapp = createSocialShareButton('whatsapp');
export const Twitter = createSocialShareButton('twitter');
export const Facebook = createSocialShareButton('facebook');
export const Pinterest = createSocialShareButton('pinterest');
export const Linkedin = createSocialShareButton('linkedin');
export const Telegram = createSocialShareButton('telegram');
