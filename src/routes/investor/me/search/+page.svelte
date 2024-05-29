<script lang="ts">
  import { searchStartups, getAllStartups } from "$lib/api";
  import StartupCard from "$lib/components/startupCard/StartupCard.svelte";
  import { onMount } from "svelte";
  import { Circle } from "svelte-loading-spinners";
  import { Toaster, toast } from "svelte-sonner";

  let isSearching = false;
  let searchQuery = "";
  let searchResults: any[] = [];
  let startups: any[] = [];
  let debounceTimeout: NodeJS.Timeout;

  async function handleSearch() {
    if (
      isSearching ||
      (searchQuery.trim() === "" && searchResults.length === 0)
    ) {
      return;
    }

    try {
      isSearching = true;
      searchResults = await searchStartups(searchQuery);
      console.log({ searchResults });
      if (searchQuery.trim() === "" && searchResults.length === 0) {
        // toast.info("Search Here");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Error searching for startups:", error);
    } finally {
      isSearching = false;
    }
  }

  function debounceSearch() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (searchQuery.length >= 3) {
        handleSearch();
      }
    }, 2000);
  }
</script>

<Toaster richColors position="top-center" />

<div class=" flex justify-end">
  <div class="  w-2/5">
    <div class="flex gap-3">
      <label class="input input-bordered flex items-center gap-2 flex-grow">
        <input
          type="text"
          class="w-full"
          placeholder="Search"
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

{#if searchResults.length > 0}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-7">
    {#each searchResults as startup}
      <StartupCard
        id={startup.id}
        upvotes={startup.upvotes.length}
        imageUrl={startup.imageUrl}
        title={startup.pitch_title}
        location={startup.location}
        description={startup.description}
        highlights={startup.highlights}
        totalRequired={startup.total_raising_amount}
        minPerInvestor={startup.minimum_investment}
        currencySymbol={startup.currencySymbol}
      />
    {/each}
  </div>
{:else}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-7"></div>
{/if}
