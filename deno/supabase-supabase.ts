import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_KEY = Deno.env.get("SERVICE_KEY");

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  fetch,
});

const handleTodo = async (req: Request) => {
  switch (req.method) {
    case "GET": {
      // @ts-expect-error: deno doenst like that Postgrestfilterbuilder doesn't return a promise
      const { error, data } = await supabase.from("todos").select();
      if (error) {
        throw error;
      }

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
        throw error;
      }

      return new Response("", { status: 201 });
    }
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
};

const handleStorage = async (req: Request) => {
  switch (req.method) {
    case "GET": {
      const { error, data } = await supabase.storage
        .from("assets")
        .download("meme.jpeg");
      if (error) throw error;

      return new Response(data, { status: 200 });
    }
    case "POST": {
      throw new Error("Not implemented");
    }
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
};

serve(async (req) => {
  try {
    const url = new URL(req.url);
    if (url.pathname === "/todos") {
      return await handleTodo(req);
    } else if (url.pathname === "/storage") {
      return await handleStorage(req);
    } else {
      return new Response("Not Found", { status: 404 });
    }
  } catch (err) {
    console.error(err);
    return new Response(`Internal Server Error\n\n${err.message}`, {
      status: 500,
    });
  }
});
