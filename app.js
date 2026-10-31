import { join, resolve, sep } from "path";

const dir = import.meta.dir;
const publicDir = join(dir, "public");

const routes = {
  "/": "meg.html",
  "/meg": "meg.html",
  "/kode": "kode.html",
  "/jobb": "jobb.html",
  "/skole": "skole.html",
  "/kamera": "kamera.html",
};

export default async function dilettant(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (routes[pathname]) {
    return new Response(Bun.file(join(dir, routes[pathname])));
  }

  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (decoded.includes("\0")) return new Response("Bad request", { status: 400 });
  const file = resolve(publicDir, "." + decoded);
  if (file.startsWith(publicDir + sep)) {
    const f = Bun.file(file);
    if (await f.exists()) return new Response(f);
  }

  return new Response("Not found", { status: 404 });
}
