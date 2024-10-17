<script lang="ts">
  // Props
  const { data } = $props();
  const { user } = $derived(data);
</script>

{#if user}
  <p>You are currently logged in as {user.email}</p>
{:else}
  <p>Create a new account or login to get started.</p>
{/if}
