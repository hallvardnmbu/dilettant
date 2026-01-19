import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { readFileSync } from "fs";
import { dirname, join } from "path";

let __dirname = dirname(new URL(import.meta.url).pathname);
__dirname =
  __dirname.startsWith("/") && __dirname.includes(":")
    ? __dirname.replace(/^\/([A-Z]):/, "$1:\\").replace(/\//g, "\\")
    : __dirname;

const dilettant = new Elysia()
  .use(
    staticPlugin({
      assets: join(__dirname, "."),
      prefix: "/",
    }),
  )
  .use(
    staticPlugin({
      assets: join(__dirname, "public"),
      prefix: "/",
    }),
  )
  .get("/", () => {
    return new Response(readFileSync(join(__dirname, "meg.html"), "utf-8"), {
      headers: { "Content-Type": "text/html" },
    });
  })
  .get("/meg", () => {
    return new Response(readFileSync(join(__dirname, "meg.html"), "utf-8"), {
      headers: { "Content-Type": "text/html" },
    });
  })
  .get("/kode", () => {
    return new Response(readFileSync(join(__dirname, "kode.html"), "utf-8"), {
      headers: { "Content-Type": "text/html" },
    });
  })
  .get("/jobb", () => {
    return new Response(readFileSync(join(__dirname, "jobb.html"), "utf-8"), {
      headers: { "Content-Type": "text/html" },
    });
  })
  .get("/skole", () => {
    return new Response(readFileSync(join(__dirname, "skole.html"), "utf-8"), {
      headers: { "Content-Type": "text/html" },
    });
  })
  .get("/kamera", () => {
    return new Response(readFileSync(join(__dirname, "kamera.html"), "utf-8"), {
      headers: { "Content-Type": "text/html" },
    });
  });

export default dilettant;

if (import.meta.main) {
  dilettant.listen(8080);
  console.log(`http://${dilettant.server?.hostname}:${dilettant.server?.port}`);
}
