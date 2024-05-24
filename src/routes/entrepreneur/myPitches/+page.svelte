<script>
  import AddCard from "$lib/components/addCard/AddCard.svelte";
  import AddStartupCard from "$lib/components/addCard/AddCard.svelte";
  import StartupCard from "$lib/components/startupCard/StartupCard.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
</script>

<div class=" flex">
  <SimpleGrid
    breakpoints={[
      { maxWidth: 1240, cols: 2, spacing: "md" },
      { maxWidth: 980, cols: 2, spacing: "md" },
      { maxWidth: 755, cols: 1, spacing: "sm" },
      { maxWidth: 600, cols: 1, spacing: "sm" },
    ]}
    cols={3}
  >
    <AddCard />
    <StartupCard />
    <StartupCard />
    <StartupCard />
    <StartupCard />
    <StartupCard />
    <StartupCard />
    <StartupCard />
    <StartupCard />
  </SimpleGrid>
</div>
