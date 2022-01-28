import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { PostgrestClient } from "https://cdn.skypack.dev/@supabase/postgrest-js";

const SERVICE_KEY = Deno.env.get("SERVICE_KEY");

// todo: why is schema and fetch required
const postgrest = new PostgrestClient(
  "https://uhaiolqyxqbapxpxerzj.supabase.co/rest/v1/",
  {
    headers: {
      apiKey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    schema: "public",
    fetch,
  }
);

serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname !== "/todos") {
    return new Response("Not Found", { status: 404 });
  }

  try {
    switch (req.method) {
      case "GET": {
        // await Promise.resolve();
        // @ts-expect-error: deno doenst like that POstgrestfilterbuilder doesn't return a promise
        const { error, data } = await postgrest.from("todos").select();
        if (error) {
          console.error(error);
          return new Response(error.message, { status: 500 });
        }
        console.log(data);

        // Return the result as JSON
        return new Response(JSON.stringify(data), {
          headers: { "content-type": "application/json" },
        });
      }
      case "POST": {
        // Return a 201 Created response
        return new Response("", { status: 201 });
      }
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (err) {
    console.error(err);
    return new Response(`Internal Server Error\n\n${err.message}`, {
      status: 500,
    });
  }
});
