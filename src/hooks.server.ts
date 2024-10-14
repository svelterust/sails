import { db } from "$lib/db";
import { type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    // Attach database to locals
    event.locals.db = db;

    // Return response
    return await resolve(event);
};
