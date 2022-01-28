import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

serve(async (req: Request) => {
  // Parse the URL and check that the requested endpoint is /todos. If it is
  // not, return a 404 response.
  const url = new URL(req.url);
  if (url.pathname !== "/todos") {
    return new Response("Not Found", { status: 404 });
  }

  try {
    switch (req.method) {
      case "GET": {
        // This is a GET request. Return a list of all todos.

        // Encode the result as JSON
        const body = JSON.stringify(localStorage.getItem("title"), null, 2);

        // Return the result as JSON
        return new Response(body, {
          headers: { "content-type": "application/json" },
        });
      }
      case "POST": {
        // This is a POST request. Create a new todo.
        // Parse the request body as JSON. If the request body fails to parse,
        // is not a string, or is longer than 256 chars, return a 400 response.
        const title = (await req.json().catch(() => null)).title;
        console.log(title);
        // if (typeof title !== "string" || title.length > 256) {
        //   return new Response("Bad Request", { status: 400 });
        // }

        localStorage.setItem("title", title);

        // Return a 201 Created response
        return new Response("", { status: 201 });
      }
      default:
        // If this is neither a POST, or a GET return a 405 response.
        return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (err) {
    console.error(err);
    // If an error occurs, return a 500 response
    return new Response(`Internal Server Error\n\n${err.message}`, {
      status: 500,
    });
  }
});
