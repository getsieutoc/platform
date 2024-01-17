import React from 'react';

class ChatwootWidget extends React.Component {
  componentDidMount() {
    // Add Chatwoot Settings
    // @ts-expect-error this is special for Chatwoot
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right', // This can be left or right
      locale: 'en', // Language to be set
      type: 'standard', // [standard, expanded_bubble]
    };

    // Paste the script from inbox settings except the <script> tag
    (function (d, t) {
      const BASE_URL = process.env.NEXT_PUBLIC_CHATWOOT_URL;

      // eslint-disable-next-line
      var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      // @ts-expect-error this is special for Chatwoot
      g.src = BASE_URL + '/packs/js/sdk.js';
      // @ts-expect-error this is special for Chatwoot
      s.parentNode.insertBefore(g, s);
      // @ts-expect-error this is special for Chatwoot
      g.async = !0;
      g.onload = function () {
        // @ts-expect-error this is special for Chatwoot
        window.chatwootSDK.run({
          websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_TOKEN,
          baseUrl: BASE_URL,
        });
      };
    })(document, 'script');
  }

  render() {
    return null;
  }
}

export { ChatwootWidget };
