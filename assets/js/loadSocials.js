const _urls = [
    "https://mastodon.social/@matthewpetagara.rss",
    "https://bsky.app/profile/did:plc:alk7v47qxsarop6op3mipvv3/rss"
];

// Handle JSONP callback
const simpleRSSPlugin = {
    handleJSON: async function (response) {
        const container = document.getElementById("social-posts");
        if (response.feed.url === "https://mastodon.social/@matthewpetagara.rss") {

            for (let i = 0; i < response.items.length; i++) {
                const item = response.items[i];
                const post = document.createElement("li");
                // 1. Create the Mastodon embed block
                const postHTML = `
            <blockquote
              class="mastodon-embed"
              data-embed-url="${item.guid}/embed"
              style="background: #FCF8FF; border-radius: 8px; border: 1px solid #C9C4DA; margin: 0; max-width: 540px; min-width: 270px; overflow: hidden; padding: 0;">
              <a href="${item.guid}" target="_blank"
                style="align-items: center; color: #1C1A25; display: flex; flex-direction: column; font-family: system-ui, sans-serif; font-size: 14px; justify-content: center; letter-spacing: 0.25px; line-height: 20px; padding: 24px; text-decoration: none;">
                <div style="color: #787588; margin-top: 16px;">Post by @matthewpetagara@mastodon.social</div>
                <div style="font-weight: 500;">View on Mastodon</div>
              </a>
            </blockquote>`;
                post.innerHTML = postHTML;
                container.append(post);
            }

            // 2. Load the embed script
            const script = document.createElement("script");
            script.src = "https://mastodon.social/embed.js";
            script.async = true;

            // 3. Once script is loaded, try to reprocess embeds
            script.onload = () => {
                if (typeof MastodonEmbed !== "undefined") {
                    MastodonEmbed.process();
                }
            };

            document.body.appendChild(script);
        }
        if (response.feed.url === "https://bsky.app/profile/did:plc:alk7v47qxsarop6op3mipvv3/rss") {
            for (let i = 0; i < response.items.length; i++) {
                const item = response.items[i];
                console.log(item)
                const post = document.createElement("li");
                const postHTML = `<blockquote class="bluesky-embed" data-bluesky-uri="${item.guid}" data-bluesky-cid="bafyreigowwg7ybtdwkao6qwb3fbvxrhphv22estpbqx3hu6hvhzpypmfqu" data-bluesky-embed-color-mode="system"><p lang="en">${item.content}<br><br><a href="${item.link}?ref_src=embed">[image or embed]</a></p>&mdash; MattP (<a href="https://bsky.app/profile/did:plc:alk7v47qxsarop6op3mipvv3?ref_src=embed">@matthewpetagara.bsky.social</a>) <a href="https://bsky.app/profile/did:plc:alk7v47qxsarop6op3mipvv3/post/3klqhdv7i6i2r?ref_src=embed">February 18, 2024 at 7:02 PM</a></blockquote>`
                post.innerHTML = postHTML;
                container.append(post);
            }


            if (!document.getElementById("bluesky-embed-script")) {
                const script = document.createElement("script");
                script.id = "bluesky-embed-script";
                script.src = "https://embed.bsky.app/static/embed.js";
                script.async = true;
                script.charset = "utf-8";
                document.body.appendChild(script);
            }
        }

    }
};

// Load each RSS feed via rss2json JSONP
for (let index = 0; index < _urls.length; index++) {
    const element = _urls[index];
    const script = document.createElement('script');
    script.src = `https://api.rss2json.com/v1/api.json?callback=simpleRSSPlugin.handleJSON&rss_url=${encodeURIComponent(element)}`;
    document.querySelector('head').appendChild(script);
}