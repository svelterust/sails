<script lang="ts">
  import * as Form from "$ui/form";
  import { Input } from "$ui/input";
  import { superForm } from "sveltekit-superforms";
  import Loader from "lucide-svelte/icons/loader";

  // Props
  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, delayed, submitting, enhance } = form;
</script>

<div class="flex h-screen items-center justify-center px-4">
  <div class="max-w-sm flex-grow">
    <h1 class="mb-2 text-2xl font-bold">Login</h1>

    <form class="grid gap-2" method="post" use:enhance>
      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email</Form.Label>
          <Input {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input {...attrs} bind:value={$formData.password} type="password" />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Button disabled={$submitting}>
        {#if $delayed}
          <Loader class="animate-spin" />
        {:else}
          Login
        {/if}
      </Form.Button>
    </form>

    <p class="mt-4 text-center">
      Don't have an account? <a class="underline" href="/register">Register</a>
    </p>
  </div>
</div>
