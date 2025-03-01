[![npm version](https://img.shields.io/npm/v/react-quick-share.svg)](https://www.npmjs.com/package/react-quick-share)
![example workflow](https://github.com/SamOdum/react-quick-share/actions/workflows/build.yml/badge.svg)
![GitHub](https://img.shields.io/github/license/SamOdum/react-quick-share)
[![Maintainability](https://api.codeclimate.com/v1/badges/e49dc83aa20662598bf4/maintainability)](https://codeclimate.com/github/SamOdum/react-quick-share/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/SamOdum/react-quick-share/badge.svg?branch=main)](https://coveralls.io/github/SamOdum/react-quick-share?branch=main)

<!-- [![Dependencies](https://img.shields.io/librariesio/release/npm/react-quick-share)](https://libraries.io/npm/react-quick-share) -->

# React-Quick-Share

A simple but robust social media share module that facilitates sharing content on some of the world's most popular social networks.

## Features

- **Ease of Use**: Simple API for integrating social sharing buttons.
- **Customizable**: Extensible styles and properties.
- **Support for Multiple Platforms**: Includes support for multiple platforms.
- **Mobile Support**: Detects mobile devices to optimize sharing links.
- **Advanced URL Parameters**: Support for platform-specific URL parameters like title, description, etc.
- **React 19 Support**: Compatible with both React 18 and React 19.
- **100% Test Coverage**: Comprehensive test coverage for all code paths.

This module includes components for sharing via:

- Facebook
- WhatsApp
- Twitter
- LinkedIn
- Pinterest
- Telegram
- Reddit
- Tumblr
- Hacker News
- Buffer
- Medium
- Pocket
- Email
- Print

The plan is to expand these components to accommodate other social media platforms. In the meantime, you can also extend the components yourself
through a simple API.

## Install

```js
npm install react-quick-share
```

or if you prefer yarn,

```js
yarn add  react-quick-share
```

## Usage

Simply import the component you want and wrap your child node with it. This gives you the power to decide exactly how your share component should
look. The child node could be a simple text - as in the examples used here, an icon component, or a custom component. You only need to pass in the
`url` you want to share.

> If you do not pass the `url` prop, the component will share the url of the page where you render it.

```js
import { Facebook, Twitter, Whatsapp } from 'react-quick-share';

export const SocialMediaShare = () => {
    const url = 'www.the-url-you-want-to-share.com';

    return (
        <>
            <Facebook url={url}>
                <span className="up-to-you">Facebook</span>
            </Facebook>
            <Twitter url={url}>
                <span className="up-to-you">Twitter</span>
            </Twitter>
            <Whatsapp url={url}>
                <span className="up-to-you">Whatsapp</span>
            </Whatsapp>
        </>
    );
};
```

### Advanced Usage with URL Parameters

Some platforms support additional parameters like title, description, etc. You can pass these parameters using the `urlParams` prop:

```js
import { Reddit, Tumblr } from 'react-quick-share';

export const AdvancedSocialMediaShare = () => {
    const url = 'www.the-url-you-want-to-share.com';
    const title = 'Check out this awesome article!';
    const description = 'This is a detailed description of the article content.';

    return (
        <>
            <Reddit url={url} urlParams={{ title: title }}>
                Share on Reddit with Title
            </Reddit>

            <Tumblr
                url={url}
                urlParams={{
                    title: title,
                    text: description,
                }}
            >
                Share on Tumblr with Title and Description
            </Tumblr>
        </>
    );
};
```

## Extending Usage

If you need to share to a social media domain not already supported out-of-the-box, you will need the `extendShare` object and the
`createSocialShareButton` function. The `extendShare` object accepts a key of the name of the new domain, and an object value that contains
`shareType` set to `link`, and `url` set to the new domain's share endpoint.

The `createSocialShareButton` component takes the `newDomain` string as argument.

### Basic Extension

```js
import { extendShare, createSocialShareButton } from 'react-quick-share';

extendShare.newDomain = {
    shareType: 'link',
    url: 'https://www.newDomain.com/sharing/?url=',
};

const MyCustomShareButton = createSocialShareButton('newDomain');

export const SocialMediaShare = () => {
    const url = 'www.the-url-you-want-to-share.com';

    return <MyCustomShareButton url={url}>Share on My Domain</MyCustomShareButton>;
};
```

### Advanced Extension with Parameter Mapping

For platforms that support additional parameters, you can define a `paramMap` that maps your parameter names to the platform's expected parameter
names:

```js
import { extendShare, createSocialShareButton } from 'react-quick-share';

extendShare.customPlatform = {
    shareType: 'link',
    url: 'https://www.example.com/share',
    paramMap: {
        url: 'u', // maps 'url' to the platform's 'u' parameter
        title: 'title', // maps 'title' to the platform's 'title' parameter
        description: 'desc', // maps 'description' to the platform's 'desc' parameter
    },
};

const CustomPlatformButton = createSocialShareButton('customPlatform');

export const AdvancedSocialMediaShare = () => {
    const url = 'www.the-url-you-want-to-share.com';

    return (
        <CustomPlatformButton
            url={url}
            urlParams={{
                title: 'My Custom Title',
                description: 'My Custom Description',
            }}
        >
            Share on Custom Platform
        </CustomPlatformButton>
    );
};
```

This will generate a URL like:
`https://www.example.com/share?u=www.the-url-you-want-to-share.com&title=My%20Custom%20Title&desc=My%20Custom%20Description`

## Props

Each share button component accepts the following props along with regular ButtonHTMLAttributes:

| Prop        | Type     | Description                                  | Default                |
| ----------- | -------- | -------------------------------------------- | ---------------------- |
| `url`       | `string` | The URL to be shared.                        | `window.location.href` |
| `domain`    | `string` | The social media platform.                   | None                   |
| `subject`   | `string` | Subject for the sharing link (email only).   | ""                     |
| `urlParams` | `object` | Additional parameters for the sharing URL.   | `{}`                   |
| `style`     | `object` | Custom styles to apply to the button.        | `{}`                   |
| `children`  | `node`   | Custom label or element to render as button. | None                   |

## Custom Styles

In some rare cases you may want to style these base components to achieve certain stylistic goals. In that case you will need to create and pass in
your styles object as a `style` prop.

However, it is best to simply wrap the react-quick-share components with your own appropriately styled components. You can also pass your custom
components as children to the react-quick-share components.

```js
import { Facebook, Twitter } from 'react-quick-share';

const style = {
    borderRadius: '4px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

export const SocialMediaShare = () => {
    const url = 'www.the-url-you-want-to-share.com';

    return (
        <>
            {/* wrap the share components with your own component */}
            <span className="up-to-you">
                <Twitter url={url} style={style}>
                    Twitter
                </Twitter>
            </span>

            {/* pass your own components as children */}
            <Facebook url={url} style={style}>
                <span className="up-to-you">Facebook</span>
            </Facebook>
        </>
    );
};
```

## Contributing

You are welcome to contribute or suggest improvements via issues or pull requests.

## Quality Assurance

React Quick Share maintains 100% test coverage across all metrics:

- 100% statement coverage
- 100% branch coverage
- 100% function coverage
- 100% line coverage

This ensures the library functions correctly across different environments and edge cases.

## License

MIT
