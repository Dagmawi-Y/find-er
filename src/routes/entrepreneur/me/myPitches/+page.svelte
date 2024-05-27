<script>
  import AddCard from "$lib/components/addCard/AddCard.svelte";
  import AddStartupCard from "$lib/components/addCard/AddCard.svelte";
  import StartupCard from "$lib/components/startupCard/StartupCard.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { getUserStartups } from "$lib/api";

  /**
   * @type {any[]}
   */
  let startups = [];

  // Fetch startups when the component is mounted
  async function fetchStartups() {
    try {
      startups = await getUserStartups();
    } catch (error) {
      console.error("Error fetching startups:", error);
    }
  }

  fetchStartups();
</script>

<div class="flex">
  <SimpleGrid
    breakpoints={[
      { maxWidth: 1240, cols: 2, spacing: "md" },
      { maxWidth: 980, cols: 2, spacing: "md" },
      { maxWidth: 755, cols: 1, spacing: "sm" },
      { maxWidth: 600, cols: 1, spacing: "sm" },
    ]}
    cols={3}
  >
    <AddCard link="/entrepreneur/addPitch/companyInfo" />
    {#each startups as startup}
      <StartupCard
        imageUrl={startup.images_videos?.find(
          (media) => media.image_url !== null,
        )?.image_url}
        title={startup.pitch_title}
        location={startup.location}
        description={startup.pitch_deal?.short_summary}
        highlights={startup.pitch_deal?.highlights?.split(", ")}
        totalRequired={startup.total_raising_amount}
        minPerInvestor={startup.minimum_investment}
        currencySymbol="Birr"
      />
    {/each}
  </SimpleGrid>
</div>
