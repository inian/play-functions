import { Application } from "https://deno.land/x/oak@v9.0.0/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World! ini1";
  console.log(ctx);
});

await app.listen({ port: 8000 });
