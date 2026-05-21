import { join } from "path";

const dir = import.meta.dir;

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

  for (const base of ["public", "."]) {
    const file = Bun.file(join(dir, base, pathname));
    if (await file.exists()) return new Response(file);
  }

  return new Response("Not found", { status: 404 });
}
