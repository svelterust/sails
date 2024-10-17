import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { zod } from "sveltekit-superforms/adapters";
import { fail, setError, superValidate } from "sveltekit-superforms";
import { login, register } from "$lib/session";
import { redirect } from "@sveltejs/kit";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be minimum 8 characters long" }),
});

export const load: PageServerLoad = async () => {
  // Initialize form
  return {
    form: await superValidate(zod(schema)),
  };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    // Validate form
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    const { email, password } = form.data;

    // Register then login user
    try {
      await register(email, password);
      await login(email, password, cookies);
    } catch (error) {
      return setError(form, "password", "Failed to create account");
    }
    return redirect(303, "/");
  },
};
