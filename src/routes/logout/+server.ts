import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { logout } from "$lib/auth";

export const GET: RequestHandler = async ({ cookies, locals: { session } }) => {
  // Logout
  if (session) {
    logout(session.id, cookies);
  }
  return redirect(303, "/");
};
