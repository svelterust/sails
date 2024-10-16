import type { PageServerLoad } from "./$types";
import { list, urlFor } from "$lib/storage";

export const load: PageServerLoad = async () => {
  const paths = await list();
  const files = paths.map(path => {
    return { path, url: urlFor(path) }
  });
  return { files };
};
