<!-- routes/myMatches/+page.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { matchInvestor } from "$lib/api";
  import StartupCard from "$lib/components/startupCard/StartupCard.svelte";

  let matches = [];

  onMount(async () => {
    // Replace 'investorId' with the actual investor ID you want to fetch matches for
    const investorId = "1";
    matches = await matchInvestor(investorId);
  });
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">My Matches</h1>

  {#if matches.length === 0}
    <p>No matches found.</p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each matches as match}
        <StartupCard
          id={match.id}
          upvotes={match.upvotes.length}
          imageUrl="https://via.placeholder.com/300x200"
          title={match.pitch_title}
          location={match.location}
          description={match.description || "No description provided."}
          highlights={[match.industry_1, match.industry_2, match.stage]}
          totalRequired={match.total_raising_amount.toString()}
          minPerInvestor={match.minimum_investment.toString()}
          currencySymbol="ETB"
          ownerId={match.user_id}
        />
      {/each}
    </div>
  {/if}
</div>
