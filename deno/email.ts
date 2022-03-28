import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

const client = new SmtpClient();

const { hostname, port, username, password } = Deno.env.toObject();
await client.connect({
  hostname,
  port,
  username,
  password,
});

serve(async (req) => {
  await client.send({
    from: "jonny@supabase.io",
    to: "div@supabase.io",
    subject: "Notifications Ui has launched",
    content: "And this is a notification about that",
  });

  return new Response("Email sent", {
    status: 200,
  });
});
