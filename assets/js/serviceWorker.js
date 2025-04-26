importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
    // Normal Workbox stuff
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

} else {
    console.log(`Workbox didn't load 😬`);
}

self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};

    const title = data.title || 'Test Notification';
    const options = {
        body: data.body || 'This is a test notification.'
    };

    // event.waitUntil((async () => {
    //     // Send a message to all open pages
    //     const clientsList = await self.clients.matchAll({ includeUncontrolled: true });
    //     for (const client of clientsList) {
    //         client.postMessage({
    //             type: 'PUSH_RECEIVED',
    //             title: title,
    //             body: options.body
    //         });
    //     }

    //     // Show the notification
    //     await self.registration.showNotification(title, options);
    // })());
});
