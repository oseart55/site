var simpleRSSPlugin = (function() {
	// get all the feed containers
	var feedsNodes = document.querySelectorAll('[data-rss-feed]');
	// Convert to array
	var feeds = [].slice.call(feedsNodes);
	for (var i = 0; i < feeds.length; i++) {
		var container = feedsNodes[i];
		
		// get feed URL
		var url = container.getAttribute('data-rss-feed');
		// get whether to link titles
		var addLink = container.getAttribute('data-rss-link-titles') || 'true';
		
		// get title wrapper element
		var titleWrapper = container.getAttribute('data-rss-title-wrapper') || 'h2';
		// Max outputs
		var max = container.getAttribute('data-rss-max') || 10;
		// Get data - append as script with callback to avoid CORS
		var script = document.createElement('script');
		script.src = document.location.protocol + '//api.rss2json.com/v1/api.json?callback=simpleRSSPlugin.handleJSON&rss_url=' + encodeURIComponent(url);
		document.querySelector('head').appendChild(script);
		
		// Remove script
		script.parentNode.removeChild(script);
	}
	// Callback function
	var loops = 0;
	function handleJSON(data) {
        if (data.feed && data.items) {
            var docFrag = document.createDocumentFragment();
            for (var i = 0; i < data.items.length; i++) {
                var e = data.items[i];
                console.log(e);
    
                if (i < max) {
                    const guid = e.guid;
                    const link = e.link;
                    const content = e.content;
                    const pubDate = new Date(e.pubDate).toLocaleString();
    
                    const blockquote = document.createElement('blockquote');
                    blockquote.className = "bluesky-embed";
                    blockquote.setAttribute("data-bluesky-uri", guid);
                    // You may not have `cid` unless your feed includes it.
                    // For now we leave it out or optionally include it if available:
                    // blockquote.setAttribute("data-bluesky-cid", e.cid);
                    blockquote.setAttribute("data-bluesky-embed-color-mode", "system");
    
                    blockquote.innerHTML = `
                        <p lang="en">${content}<br><br>
                        <a href="${link}?ref_src=embed">[view post]</a></p>
                        &mdash; <a href="${link}?ref_src=embed">${pubDate}</a>
                    `;
    
                    docFrag.appendChild(blockquote);
                }
            }
    
            container = feedsNodes[loops];
            container.appendChild(docFrag);
    
            // Inject the BlueSky embed script only once
            if (!document.getElementById("bluesky-embed-script")) {
                const script = document.createElement("script");
                script.id = "bluesky-embed-script";
                script.src = "https://embed.bsky.app/static/embed.js";
                script.async = true;
                script.charset = "utf-8";
                document.body.appendChild(script);
            }
    
            loops++;
        }
    }
    
	// Return function for use in global scope
	return {
		handleJSON:handleJSON
	}
})();