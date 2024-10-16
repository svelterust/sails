import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { redirect } from "@sveltejs/kit";
import { upload } from "$lib/storage";
import sharp from "sharp";

const schema = z.object({
  file: z.instanceof(File),
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
    const { file } = form.data;

    // Resize image
    const buffer = await file.arrayBuffer();
    const resizedImage = await sharp(buffer).resize(640, 480, { fit: "fill" }).webp().toBuffer();
    const path = file.name.substring(0, file.name.lastIndexOf(".")) + ".webp";

    // Upload file
    const url = await upload(path, resizedImage);
    if (url) {
      return redirect(303, "/");
    }
  },
};
