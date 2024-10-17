import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { redirect } from "@sveltejs/kit";
import { upload } from "$lib/storage";
import sharp from "sharp";

const schema = z.object({
  image: z.instanceof(File),
});

export const load: PageServerLoad = async () => {
  // Initialize form
  return {
    form: await superValidate(zod(schema)),
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { image } = form.data;

    // Get image data
    const buffer = await image.arrayBuffer();
    const format = image.name.endsWith(".png") ? "png" : "jpg";
    const name = image.name.substring(0, image.name.lastIndexOf("."));

    // Optimize images
    const input = sharp(buffer).resize(640, 480, { fit: "fill" });
    const regular = await input.clone().toFormat(format).toBuffer();
    const optimized = await input.toFormat("avif").toBuffer();

    // Upload images
    const [regularUrl, optimizedUrl] = await Promise.all([
      upload(name + "." + format, regular),
      upload(name + ".avif", optimized),
    ]);
    if (regularUrl && optimizedUrl) {
      return redirect(303, "/");
    }
  },
};
