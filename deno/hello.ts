addEventListener("fetch", (event) => {
  event.respondWith(new Response("Hello from subhosting"));
});
