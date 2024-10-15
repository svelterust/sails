import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ locals: { user, session } }) => {
  return {
    user,
    session,
  };
};
