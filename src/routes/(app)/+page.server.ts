import { list, urlFor } from "$lib/storage";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // Get images
  const files = await list();
  const images = files.reduce((output, file) => {
    // Get file data
    const url = urlFor(file);
    const name = file.substring(0, file.lastIndexOf("."));
    const extension = file.split(".").pop();
    if (!output[name])
      output[name] = {};

    // Add to output
    if (extension == "avif") {
      output[name].avif = url;
    } else {
      output[name].regular = url;
    }
    return output;
  }, {});
  return {
    images
  }
};
