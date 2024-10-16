import { remove } from "$lib/storage";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { path } }) => {
  await remove(path);
  return redirect(303, "/");
};
