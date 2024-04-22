![GitHub](https://img.shields.io/github/license/SamOdum/react-quick-share)

# quick-share

A simple but robust social media share module that facilitates sharing content on some of the world's most popular social networks.

## Demo

[Demo Incoming](https://).

## Features

-   **Ease of Use**: Simple API for integrating social sharing buttons.
-   **Customizable**: Extensible styles and properties.
-   **Support for Multiple Platforms**: Includes support for multiple platforms.
-   **Mobile Support**: Detects mobile devices to optimize sharing links.

This module includes components for sharing via:

-   Facebook
-   WhatsApp
-   Twitter
-   LinkedIn
-   Pinterest
-   Telegram
-   Email
-   Print

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
look. The child node could be a simple text - as in the examples used here -, an icon component, or a custom component. You only need to pass in the
`url` you want to share. If you do not pass this prop though, the component will share the url of the page where you render it. Also, in some rare
cases you may want to style these base components to achieve certain stylistic goals. All you need do is create and pass in your styles object as a
`style` prop.

```js
import { Facebook, Twitter, Whatsapp } from ' quick-share';

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

If you prefer, you can also style your buttons directly either by passing in a `style` property, or a `className` property.

## Extending Usage

If you need to share to a social media platform not already supported out-of-the-box, you will need the `extendShare` object and the
`createSocialShareButton` function. The `extendShare` variable accepts a key of the name of the new platform, and an object value that contains
`shareType` set to `link`, and `url` set to the new platform's share endpoint.

The `createSocialShareButton` component takes the usual `url` prop and an additional `domain` prop.

```js
import { extendShare, createSocialShareButton } from 'react-quick-share';

extendShare.newPlatform = {
    shareType: 'link',
    url: 'https://www.newPlatform.com/sharing/?url=',
};

const MyCustomShareButton = createSocialShareButton('newPlatform');

export const SocialMediaShare = () => {
    const url = 'www.the-url-you-want-to-share.com';

    return <MyCustomShareButton url={url}>Share on My Platform</MyCustomShareButton>;
};
```

## Props

Each share button component accepts the following props along with regular ButtonHTMLAttributes:

| Prop       | Type     | Description                                  | Default                |
| ---------- | -------- | -------------------------------------------- | ---------------------- |
| `url`      | `string` | The URL to be shared.                        | `window.location.href` |
| `domain`   | `string` | The social media platform.                   | None                   |
| `subject`  | `string` | Subject for the sharing link (email only).   | ""                     |
| `style`    | `object` | Custom styles to apply to the button.        | `{}`                   |
| `children` | `node`   | Custom label or element to render as button. | None                   |

## Custom Styles

These share components provide a style prop that can be used to pass custom styles such as border radii and box shadow.

```js
import { Facebook, Twitter } from ' quick-share';

const style = {
    borderRadius: '4px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

export const SocialMediaShare = () => {
    const url = 'www.the-url-you-want-to-share.com';

    return (
        <Facebook url={url} style={style}>
            <span className="up-to-you">Facebook</span>
        </Facebook>
    );
};
```

## Contributing

Feel free to contribute or suggest improvements via issues or pull requests.

## License

MIT
