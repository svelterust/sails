<script lang="ts">
  // Props
  const { data } = $props();
  const { user, files } = $derived(data);
</script>

{#if user}
  <p>You are currently logged in as {user.email}</p>

  {#if files.length > 0}
    <h2>Images uploaded</h2>

    <div class="grid grid-cols-3 gap-4">
      {#each files as { path, url }}
        <div>
          <img src={url} alt="Thumbnail" width="640" height="480" />
          <a class="mt-2 w-full" href={`/remove/${path}`} role="button">Remove</a>
        </div>
      {/each}
    </div>
  {/if}
{:else}
  <p>Create a new account or login to get started.</p>
{/if}
