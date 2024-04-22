import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Defines the types of shares that can be initiated by the user. This type ensures
 * that the share functionality within the application can only be one of the predefined
 * types, helping to maintain consistency and predictability in share operations.
 *
 * @type {ShareType}
 */
export type ShareType = 'print' | 'email' | 'link';

/**
 * Represents the properties for a share group. This interface is used to define
 * a collection of share options, where each key is a string that maps to an object
 * specifying the type of share and the associated URL.
 *
 * This structure allows for dynamic configuration of share options, facilitating
 * various sharing functionalities grouped by specific criteria or use cases.
 *
 * @interface IShareGroupProps
 */
export interface IShareGroupProps {
    /**
     * Index signature to define the properties of the share group. Each property key
     * is a string that maps to an object containing the share type and the URL to be
     * shared. This flexible structure allows adding multiple share configurations under
     * different keys.
     *
     * @param {string} key - The key identifying each share configuration within the group.
     * @returns {Object} An object with `shareType`, specifying the method of sharing,
     *                   and `url`, the link to be shared.
     */
    [key: string]: {
        /**
         * Specifies the method of sharing. This is restricted to the defined `ShareType`
         * to ensure that only valid share methods are used.
         * @type {ShareType}
         */
        shareType: ShareType;

        /**
         * The URL associated with this share type, to be used when the share action is triggered.
         * This URL typically points to the content that needs to be shared.
         * @type {string}
         */
        url: string;
    };
}

/**
 * Defines a type for keys that can be used to identify different share groups
 * within the application. This type is derived by extracting the keys from
 * the `shareGroup` object in the 'shareConfig' module, ensuring that only valid
 * keys that are strings are used as identifiers for share groups.
 *
 * This approach guarantees that the keys used throughout the application for accessing
 * and manipulating share groups are consistent with the predefined keys in the configuration,
 * thus maintaining integrity and preventing errors due to invalid keys.
 *
 * @type {ShareGroupKey}
 */
export type ShareGroupKey = Extract<keyof typeof import('./config/shareConfig').shareGroup, string>;

/**
 * Defines a type for keys that can be used to identify extensions to different share groups
 * within the application. This type is derived by extracting all keys from the `extendShare`
 * object in the 'shareConfig' module.
 *
 * By using this approach, the application ensures that any references to extended share group
 * configurations are strongly typed and align with the actual keys defined in the configuration.
 * This helps to maintain the consistency and reliability of referencing extended share options
 * throughout the application, reducing the likelihood of runtime errors due to key mismatches.
 *
 * @type {ExtendShareGroupKey}
 */
export type ExtendShareGroupKey = keyof typeof import('./config/shareConfig').extendShare;

/**
 * Represents the properties for a share button. This interface extends the
 * properties of a standard HTML button element with additional specific properties
 * for sharing functionality.
 *
 * @interface IShareButtonProps
 * @extends {DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>}
 */
export interface IShareButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    /**
     * Represents the domain or group to which the share button is associated.
     * This is typically used to specify the context or category of the share operation.
     */
    domain: ShareGroupKey;

    /**
     * Optional URL to be shared when the button is clicked. This could be a link to
     * a specific resource or page.
     * @type {?string}
     */
    url?: string;

    /**
     * Optional subject or title for the shared content. This could be used in the
     * context of sharing to email or other platforms where a subject might be necessary.
     * @type {?string}
     */
    subject?: string;
}

/**
 * Properties for a social media share button component. This interface
 * specifies the optional children, URL, and subject that can be used with the button.
 *
 * @interface ISocialShareButtonProps
 */
export interface ISocialShareButtonProps {
    /**
     * Optional children elements to be rendered within the button. This can be used
     * to customize the appearance of the button, such as including icons or additional text.
     * @type {?ReactNode}
     */
    children?: ReactNode;

    /**
     * Optional URL to be shared when the button is clicked. This can point to a page or
     * resource intended to be promoted via social sharing.
     * @type {?string}
     */
    url?: string;

    /**
     * Optional subject or title for the shared content. Similar to `IShareButtonProps`, this is
     * useful in contexts where additional descriptive text is required for the share intent.
     * @type {?string}
     */
    subject?: string;
}
