import { download } from "$lib/storage";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { path } }) => {
  const file = await download(path);
  return new Response(file);
};
