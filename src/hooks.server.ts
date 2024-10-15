import { type Handle } from "@sveltejs/kit";
import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from "$lib/auth";

export const handle: Handle = async ({ event, resolve }) => {
  // Check session cookie
  const token = event.cookies.get("session");
  if (!token) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  // Validate token
  const { user, session } = await validateSessionToken(token);
  if (user && session) {
    setSessionTokenCookie(event, token, session.expiresAt);
    event.locals.user = user;
    event.locals.session = session;
  } else {
    deleteSessionTokenCookie(event);
  }
  return resolve(event);
};
