<script lang="ts">
  import {
    searchStartups,
    getAllStartups,
    searchInvestors,
    getAllInvestors,
  } from "$lib/api";
  import StartupCard from "$lib/components/startupCard/StartupCard.svelte";
  import InvestorCard from "$lib/components/investorCard/InvestorCard.svelte";
  import { onMount } from "svelte";
  import { Circle } from "svelte-loading-spinners";
  import { Toaster, toast } from "svelte-sonner";

  let isSearching = false;
  let searchQuery = "";
  let searchResults: any[] = [];
  let allInvestors: any[] = [];
  let debounceTimeout: NodeJS.Timeout;

  async function fetchAllInvestors() {
    try {
      allInvestors = (await getAllInvestors()).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    } catch (error) {
      console.error("Error fetching all investors:", error);
    }
  }

  async function handleSearch() {
    if (
      isSearching ||
      (searchQuery.trim() === "" && searchResults.length === 0)
    ) {
      return;
    }

    try {
      isSearching = true;
      searchResults = (await searchInvestors(searchQuery)).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      console.log({ searchResults });
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Error searching for investors:", error);
    } finally {
      isSearching = false;
    }
  }

  function debounceSearch() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (searchQuery.length >= 3) {
        handleSearch();
      } else {
        searchResults = []; // Clear search results if input is less than 3 characters
      }
    }, 2000);
  }

  // Clear search results when the input is cleared
  $: if (searchQuery === "") {
    searchResults = [];
  }

  onMount(() => {
    fetchAllInvestors();
  });
</script>

<!-- ... (rest of the code remains the same) -->

<Toaster richColors position="top-center" />

<div class=" flex justify-end">
  <div class="  w-2/5">
    <div class="flex gap-3">
      <label class="input input-bordered flex items-center gap-2 flex-grow">
        <input
          type="text"
          class="w-full"
          placeholder="Search Investors"
          bind:value={searchQuery}
          on:input={debounceSearch}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      {#if isSearching}
        <button class="btn btn-primary" disabled>
          <Circle size="30" color="#B3E2F5" unit="px" duration="1s" />
        </button>
      {:else}
        <button class="btn btn-primary" on:click={handleSearch}>Search</button>
      {/if}
    </div>
  </div>
</div>

{#if searchQuery.trim() === ""}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-7">
    {#each allInvestors as investor}
      <InvestorCard
        investor={{
          id: investor.id,
          name: `${investor.investorProfile.first_name} ${investor.investorProfile.last_name}`,
          location: `${investor.investorProfile.town_city}, ${investor.investorProfile.country}`,
          profilePicture: investor.investorProfile.profile_image_url,
          investmentRange: `${investor.investorProfile.minimum_investment} - ${investor.investorProfile.maximum_investment}`,
          bio: investor.investorProfile.about_me,
          areasOfExpertise: [investor.investorInterests.areas_of_expertise],
          minimumInvestment: investor.investorProfile.minimum_investment,
          maximumInvestment: investor.investorProfile.maximum_investment,
        }}
      />
    {/each}
  </div>
{:else if searchResults.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-7">
    {#each searchResults as investor}
      <InvestorCard
        investor={{
          name: `${investor.investorProfile.first_name} ${investor.investorProfile.last_name}`,
          location: `${investor.investorProfile.town_city}, ${investor.investorProfile.country}`,
          profilePicture: investor.investorProfile.profile_image_url,
          investmentRange: `${investor.investorProfile.minimum_investment} - ${investor.investorProfile.maximum_investment}`,
          bio: investor.investorProfile.about_me,
          areasOfExpertise: [investor.investorInterests.areas_of_expertise],
          minimumInvestment: investor.investorProfile.minimum_investment,
          maximumInvestment: investor.investorProfile.maximum_investment,
        }}
      />
    {/each}
  </div>
{/if}
