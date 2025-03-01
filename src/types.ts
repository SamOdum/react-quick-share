import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

export type ShareType = 'print' | 'email' | 'link';

export interface UrlParams {
    [key: string]: string;
}

export interface ShareConfig {
    shareType: ShareType;
    url: string;
    paramMap?: Record<string, string>;
}

export interface IShareGroupProps {
    [key: string]: ShareConfig;
}

export type ShareGroupKey = Extract<keyof typeof import('./config/shareConfig').shareGroup, string>;

export type ExtendShareGroupKey = keyof typeof import('./config/shareConfig').extendShare;

export interface IShareButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    domain: ShareGroupKey;
    url?: string;
    subject?: string;
    urlParams?: UrlParams;
}

export interface ISocialShareButtonProps {
    children?: ReactNode;
    url?: string;
    subject?: string;
    urlParams?: UrlParams;
}
