import { Application, Context } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();

app.use(oakCors());

app.use((ctx: Context) => {
  ctx.response.body = Deno.env.toObject();
  console.log(ctx);
});

await app.listen({ port: 8083 });
