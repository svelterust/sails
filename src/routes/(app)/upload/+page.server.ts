import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { redirect } from "@sveltejs/kit";
import { upload } from "$lib/storage";

const schema = z.object({
  path: z.string(),
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
    const { path, file } = form.data;

    // Upload file
    const url = await upload(path, file);
    return redirect(303, url);
  },
};
