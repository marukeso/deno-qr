import { log, qrcode, serve } from "./deps.ts";
import { isUrl } from "./validator/mod.ts";

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const targetUrl = url.searchParams.get("url") || "";
  const qrCode = await qrcode(targetUrl);

  if (!isUrl(targetUrl)) {
    const body = JSON.stringify({ message: "Not Found" });
    return new Response(body, {
      status: 404,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  return new Response(
    `<html>
        <head>
        </head>
        <body>
          <h1>QR Code Generator</h1>
          <img src="${qrCode}">
        </body>
      </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}

const PORT = parseInt(Deno.env.get("PORT") ?? "8000");
log.info(`🦕  Starting server on port ${PORT}....`);

serve(handler, {
  port: PORT,
});
