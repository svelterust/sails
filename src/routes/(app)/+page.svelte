<script lang="ts">
  // Props
  const { data } = $props();
  const { user, urls } = $derived(data);
</script>

{#if user}
  <p>You are logged in as {user.email}</p>
{:else}
  <p>Create a new account or login to get started.</p>
{/if}

{#if urls.length > 0}
  <h2>Images uploaded</h2>

  <div class="grid grid-cols-3 gap-8">
    {#each urls as url}
      <img src={url} alt="Image" />
    {/each}
  </div>
{/if}
