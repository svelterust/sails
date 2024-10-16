import type { PageServerLoad } from "./$types";
import { list, urlFor } from "$lib/storage";

export const load: PageServerLoad = async () => {
  const files = await list();
  const urls = files.map((file) => urlFor(file));
  return {
    urls,
  };
};
