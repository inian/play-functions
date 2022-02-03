import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { createClient } from "https://cdn.skypack.dev/@supabase/supabase-js";
import { randomInt } from "https://deno.land/x/vegas@v1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_KEY = Deno.env.get("SERVICE_KEY");

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  fetch,
});

const handleTodo = async (req: Request) => {
  switch (req.method) {
    case "GET": {
      // @ts-expect-error: deno doenst like that Postgrestfilterbuilder doesn't return a promise
      const { error, data } = await supabase
        .from("stats")
        .select()
        .order("id")
        .range(0, randomInt(0, 100));
      if (error) {
        throw error;
      }
      return data.length;
    }
    case "POST": {
      // @ts-expect-error: deno doenst like that Postgrestfilterbuilder doesn't return a promise
      const { error } = await supabase.from("messages").insert({
        message: `haha ${randomInt(0, 100)}`,
        user_id: "8d0fd2b3-9ca7-4d9e-a95f-9e13dded323e",
        channel_id: 1,
      });
      if (error) {
        throw error;
      }

      return 1;
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
      let count = 0;
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      count += await handleTodo(req);
      return new Response(JSON.stringify(count), {
        headers: { "content-type": "application/json" },
      });
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
