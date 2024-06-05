<script lang="ts">
  import { onMount } from "svelte";
  import { Tabs } from "@svelteuidev/core";
  import AddCard from "$lib/components/addCard/AddCard.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { Heart, Bookmark, MagicWand } from "radix-icons-svelte";
  import InvestorCard from "$lib/components/investorCard/InvestorCard.svelte";
  import { getShortlistedInvestors, getAllInvestors } from "$lib/api";
  let investors = [];
  async function fetchInvestors() {
    try {
      investors = await getShortlistedInvestors();
      console.log(investors);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  }
  onMount(() => {
    fetchInvestors();
  });
</script>

<div class="flex pt-5">
  <Tabs color="#BA6E00">
    <Tabs.Tab label="Shortlisted" icon={Bookmark}>
      <SimpleGrid
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
        cols={3}
      >
        {#if investors.length === 0}
          <AddCard
            height="445px"
            width=" w-96"
            text="You don't have any shortlisted investors yet."
          />
        {:else}
          {#each investors as investor}
            <InvestorCard
              investor={{
                id: investor.id,
                name:
                  investor.investorProfile.first_name +
                  " " +
                  investor.investorProfile.last_name,
                location: investor.investorProfile.town_city,
                profilePicture: investor.investorProfile.profile_image_url,
                investmentRange: investor.investorInterests.investment_criteria,
                bio: investor.investorProfile.about_me,
                areasOfExpertise: investor.investorInterests.areas_of_expertise,
                minimumInvestment: investor.investorProfile.minimum_investment,
                maximumInvestment: investor.investorProfile.maximum_investment,
              }}
            />
          {/each}
        {/if}
      </SimpleGrid>
    </Tabs.Tab>
  </Tabs>
</div>
