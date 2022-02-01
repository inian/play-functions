// does not work
// cos it requires the dns module which is not present in the cloudflare environment

const { Client } = require("pg");
const client = new Client();

async function generateResponse() {
  await client.connect();
  return new Response("Hello miniflare");
}

addEventListener("fetch", (event) => {
  event.respondWith(generateResponse());
});
