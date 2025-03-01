import React from 'react';
import { Reddit, Twitter, Tumblr } from '../src/components/Button';

const AdvancedSharingExample = () => {
    const pageUrl = 'https://example.com/my-awesome-article';
    const pageTitle = 'Check out this awesome article!';
    const pageDescription = 'This is a detailed description of the article content.';

    return (
        <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
            {/* Basic sharing with just URL */}
            <Twitter>Share on Twitter</Twitter>

            {/* Advanced sharing with URL parameters */}
            <Reddit
                url={pageUrl}
                urlParams={{
                    title: pageTitle,
                }}
            >
                Share on Reddit with Title
            </Reddit>

            {/* More advanced sharing with multiple parameters */}
            <Tumblr
                url={pageUrl}
                urlParams={{
                    title: pageTitle,
                    text: pageDescription,
                }}
            >
                Share on Tumblr with Title and Description
            </Tumblr>
        </div>
    );
};

export default AdvancedSharingExample;
