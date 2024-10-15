import { type Handle } from "@sveltejs/kit";
import { getUserAndSession } from "$lib/auth";

export const handle: Handle = async ({ event, resolve }) => {
  // Extract user and session from cookies
  const { user, session } = await getUserAndSession(event.cookies);
  event.locals.user = user;
  event.locals.session = session;
  console.log(event.locals);
  return resolve(event);
};
