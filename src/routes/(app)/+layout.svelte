<script lang="ts">
  import { Button } from "$ui/button";

  // Props
  const { data, children } = $props();
  const { user } = $derived(data);
</script>

<nav class="border-b">
  <div class="container flex items-center justify-between p-4">
    <a href="/">
      <h1 class="text-xl font-bold">Sails</h1>
    </a>

    <div class="flex items-center gap-2">
      {#if user}
        <Button href="/upload">Upload</Button>
        <Button href="/logout">Logout</Button>
      {:else}
        <Button href="/login">Login</Button>
        <Button href="/register">Register</Button>
      {/if}
    </div>
  </div>
</nav>

<main class="container mt-4 px-4">
  {@render children()}
</main>
