import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const SERVICE_KEY = Deno.env.get("SERVICE_KEY");

const supabase = createClient(
  "https://uhaiolqyxqbapxpxerzj.supabase.co/",
  SERVICE_KEY,
  {
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
        // @ts-expect-error: deno doenst like that Postgrestfilterbuilder doesn't return a promise
        const { error, data } = await supabase.from("todos").select();
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
        const todo = await req.json();

        // @ts-expect-error: deno doenst like that Postgrestfilterbuilder doesn't return a promise
        const { error } = await supabase
          .from("todos")
          .insert({ title: todo.title });
        if (error) {
          console.error(error);
          return new Response(error.message, { status: 500 });
        }

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
