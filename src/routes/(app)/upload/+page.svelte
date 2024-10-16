<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { Field, Control, Label, FieldErrors } from "formsnap";

  // Props
  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, delayed, submitting, enhance } = form;
</script>

<h1>Upload</h1>

<form method="POST" enctype="multipart/form-data" use:enhance>
  <Field {form} name="file">
    <Control let:attrs>
      <Label>File</Label>
      <input {...attrs} bind:value={$formData.file} type="file" accept="image/jpeg" />
    </Control>
    <small><FieldErrors /></small>
  </Field>

  <button type="submit" aria-busy={$delayed} disabled={$submitting}>Upload</button>
</form>
