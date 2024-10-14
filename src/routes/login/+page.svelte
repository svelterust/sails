<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import { Field, Control, Label, FieldErrors } from "formsnap";

    // Props
    const { data } = $props();
    const form = superForm(data.form);
    const { form: formData, submitting, enhance } = form;
</script>

<div class="flex h-screen items-center justify-center">
    <div class="max-w-sm flex-grow">
        <h1>Login</h1>

        <form method="POST" use:enhance>
            <Field {form} name="email">
                <Control let:attrs>
                    <Label>Email</Label>
                    <input {...attrs} bind:value={$formData.email} />
                </Control>
                <small><FieldErrors /></small>
            </Field>

            <Field {form} name="password">
                <Control let:attrs>
                    <Label>Password</Label>
                    <input {...attrs} bind:value={$formData.password} />
                </Control>
                <small><FieldErrors /></small>
            </Field>

            <button type="submit" aria-busy={$submitting} disabled={$submitting}>Login</button>
        </form>

        <p class="text-center">
            Don't have an account? <a href="/register">Register</a>
        </p>
    </div>
</div>
