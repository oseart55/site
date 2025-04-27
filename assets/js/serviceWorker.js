importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

if (workbox) {
    // Normal Workbox stuff
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

} else {
    console.log(`Workbox didn't load 😬`);
}
