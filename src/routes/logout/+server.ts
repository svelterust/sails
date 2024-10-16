import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";
import { logout } from "$lib/session";

export const GET: RequestHandler = async ({ cookies, locals: { session } }) => {
  // Logout
  if (session) {
    logout(session.id, cookies);
  }
  return redirect(303, "/");
};
