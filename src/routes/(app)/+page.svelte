<script lang="ts">
  // Props
  const { data } = $props();
  const { user, images } = $derived(data);
  $inspect(images);
</script>

{#if user}
  <p>You are currently logged in as {user.email}</p>
{:else}
  <p>Create a new account or login to get started.</p>
{/if}

<div class="mt-4 grid gap-4 md:grid-cols-3">
  {#each Object.values(images) as { avif, regular }}
    <picture>
      <source srcset={avif} type="image/avif" />
      <img class="rounded" src={regular} width="640" height="480" />
    </picture>
  {/each}
</div>
