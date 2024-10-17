<script lang="ts">
  import "../app.css";
  import "unfonts.css";
  import { links } from "unplugin-fonts/head";

  // Props
  const { children } = $props();
</script>

<svelte:head>
  {#each links as link}
    <link {...link?.attrs || {}} />
  {/each}
</svelte:head>

{@render children()}
