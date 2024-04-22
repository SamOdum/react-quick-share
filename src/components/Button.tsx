import React from 'react';
import { useShare } from '../hooks/useShare';
import { ExtendShareGroupKey, IShareButtonProps, ISocialShareButtonProps, ShareGroupKey } from '../types';

/**
 * Represents a button that triggers a sharing action.
 * @param {IShareButtonProps} props The properties for the share button, including children, domain, url, subject, style, and other button properties.
 * @returns {JSX.Element} A button element that, on click, performs a share action based on the specified domain.
 */
export const ShareButton = ({ children, domain, url = window.location.href, subject, style, ...rest }: IShareButtonProps) => {
    const { target } = useShare();
    const buttonStyle = { border: 'none', margin: '0px', padding: '0px', ...style };

    return (
        <button {...rest} style={buttonStyle} onClick={() => target(domain, url, subject)}>
            {children}
        </button>
    );
};

/**
 * Factory function to create a social share button specific to a social media platform.
 * @param {ShareGroupKey} domain The domain key identifying the social media platform.
 * @returns {Function} Returns a React component tailored for sharing to a specific social media platform.
 */
export const createSocialShareButton = (domain: ShareGroupKey | ExtendShareGroupKey) => {
    const SocialShareButton = ({ children, ...props }: ISocialShareButtonProps) => (
        <ShareButton domain={domain} {...props}>
            {children}
        </ShareButton>
    );

    SocialShareButton.displayName = `${domain.charAt(0).toUpperCase()}${domain.slice(1)}ShareButton`;

    return SocialShareButton;
};

/**
 * Creates a specific instance of a social share button designed for printing. This button
 * is initialized using a utility function `createSocialShareButton` which configures
 * the button specifically for the print functionality.
 *
 * Using this constant across the application ensures consistency in the behavior and
 * appearance of print buttons. This approach encapsulates the print button configuration
 * in a single place, making maintenance and updates easier by centralizing the button's
 * setup.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Print = createSocialShareButton('print');

/**
 * Creates a specific instance of a social share button designed for sharing via email.
 * This button is initialized using the `createSocialShareButton` function, which configures
 * the button specifically for email sharing.
 *
 * Using this constant ensures a uniform implementation of email sharing functionality
 * across the application, promoting reuse and consistency.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Email = createSocialShareButton('email');

/**
 * Creates a social share button for sharing content on WhatsApp. It is configured
 * through the `createSocialShareButton` utility, setting up the necessary properties
 * for WhatsApp integration.
 *
 * This promotes a consistent and reusable approach for WhatsApp sharing across different
 * parts of the application.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Whatsapp = createSocialShareButton('whatsapp');

/**
 * Initializes a social share button specifically for Twitter. This configuration
 * is done using the `createSocialShareButton` function, ensuring the button is
 * tailored for sharing on Twitter.
 *
 * It provides a standardized way to incorporate Twitter sharing functionality, enhancing
 * the application's social media integration.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Twitter = createSocialShareButton('twitter');

/**
 * Configures a social share button for Facebook. This button is set up through
 * the `createSocialShareButton` function to align with Facebook's sharing requirements.
 *
 * This constant allows for consistent Facebook sharing capabilities across the application,
 * simplifying social media interactions.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Facebook = createSocialShareButton('facebook');

/**
 * Sets up a Pinterest-specific social share button using the `createSocialShareButton`
 * function. This setup ensures the button is optimized for sharing content on Pinterest.
 *
 * The use of this constant across the application ensures a unified approach to
 * Pinterest sharing.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Pinterest = createSocialShareButton('pinterest');

/**
 * Establishes a social share button for LinkedIn via the `createSocialShareButton`
 * function. This button is specifically tailored for sharing professional content
 * on LinkedIn.
 *
 * Utilizing this constant ensures that LinkedIn sharing is handled consistently,
 * facilitating professional networking and content distribution.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Linkedin = createSocialShareButton('linkedin');

/**
 * Creates a social share button for Telegram, configured through the `createSocialShareButton`
 * utility. This configuration is tailored to meet the sharing requirements specific to
 * Telegram.
 *
 * This constant facilitates consistent implementation of Telegram sharing functionality,
 * enhancing the application's capabilities in instant messaging contexts.
 *
 * @constant {React.ComponentType<ISocialShareButtonProps>}
 */
export const Telegram = createSocialShareButton('telegram');
