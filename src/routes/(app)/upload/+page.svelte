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

<h1 class="mb-4 text-3xl font-bold">Upload</h1>

<form class="flex gap-2" method="post" enctype="multipart/form-data" use:enhance>
  <Form.Field {form} name="image">
    <Form.Control let:attrs>
      <Input {...attrs} bind:value={$formData.image} type="file" accept="image/jpeg,image/png" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button type="submit" disabled={$submitting}>
    {#if $delayed}
      <Loader class="animate-spin" />
    {:else}
      Upload
    {/if}
  </Form.Button>
</form>
