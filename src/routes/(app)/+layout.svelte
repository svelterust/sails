<script lang="ts">
  // Props
  const { data, children } = $props();
  const { user } = $derived(data);
</script>

<nav class="mb-4 bg-slate-100">
  <div class="container flex items-center justify-between p-4">
    <a class="no-underline" href="/">
      <h1 class="mb-0">Sails</h1>
    </a>

    <div class="flex items-center gap-4">
      {#if user}
        <a href="/upload" role="button">Upload</a>
        <a href="/logout" role="button">Logout</a>
      {:else}
        <a href="/login" role="button">Login</a>
        <a href="/register" role="button">Register</a>
      {/if}
    </div>
  </div>
</nav>

<main class="container px-4">
  {@render children()}
</main>
