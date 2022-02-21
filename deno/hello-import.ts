import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
function handleRequest(): Response {
  try {
    return new Response("Hello world!");
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
}
serve(handleRequest, { addr: ":8082" });
