import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

export type ShareType = 'print' | 'email' | 'link';

export interface IShareGroupProps {
    [key: string]: {
        shareType: ShareType;
        url: string;
    };
}

export type ShareGroupKey = Extract<keyof typeof import('./config/shareConfig').shareGroup, string>;

export type ExtendShareGroupKey = keyof typeof import('./config/shareConfig').extendShare;

export interface IShareButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    domain: ShareGroupKey;
    url?: string;
    subject?: string;
}

export interface ISocialShareButtonProps {
    children?: ReactNode;
    url?: string;
    subject?: string;
}
