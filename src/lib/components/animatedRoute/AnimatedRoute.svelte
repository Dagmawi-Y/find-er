<script>
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";
  import { key } from "@svelteuidev/core";
</script>

{#key $page.url}
  <div in:fly={{ x: "-100%", duration: 1000 }}>
    <slot />
  </div>
{/key}
