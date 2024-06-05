<script>
  import { getShortlistedInvestors, shortlistInvestor } from "$lib/api";
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  export let investor = {
    id: null,
    name: "",
    location: "",
    profilePicture: "",
    investmentRange: "",
    bio: "",
    areasOfExpertise: [],
    minimumInvestment: "...",
    maximumInvestment: "...",
  };
  

  let isShortlisted = false;

  onMount(async () => {
    // Check if the investor is shortlisted on component mount
    const shortlistedInvestors = await getShortlistedInvestors();
    isShortlisted = shortlistedInvestors.some(
      (shortlistedInvestor) => shortlistedInvestor.id === investor.id,
    );
  });

  async function toggleShortlist() {
    try {
      const response = await shortlistInvestor(investor.id);
      isShortlisted = !isShortlisted;
      console.log(response.message);
    } catch (error) {
      console.error(error);
    }
  }

  // Import the necessary functions from $lib/api.ts
</script>

<div class="card w-96 bg-base-100 shadow-xl mb-7">
  <div class="card-body">
    <div class="flex items-center justify-between">
      <figure class="avatar mr-4">
        <div class="w-16 rounded-full">
          <img src={investor.profilePicture} alt="profile" />
        </div>
      </figure>
      <div class="">
        <h2 class="card-title font-bold">{investor.name}</h2>
        <p>{investor.location}</p>
      </div>
      <div>
        <!-- Conditionally render the appropriate icon -->
        <button on:click={toggleShortlist}>
          {#if isShortlisted}
            <Icon icon="f7:square-favorites-fill" font-size={35} />
          {:else}
            <Icon icon="f7:square-favorites" font-size={35} />
          {/if}
        </button>
      </div>
    </div>
    <div class="divider bg-primary p-0 m-0 h-1 border-primary mt-4"></div>
    <div class="mt-4">
      <p class="font-bold">Investment Range</p>
      {investor.minimumInvestment} - {investor.maximumInvestment}
    </div>
    <div class="mt-2">
      <p class="text-sm">{investor.bio}</p>
    </div>
    <div class="mt-4">
      <p class="font-bold">Areas of Expertise</p>
      <p class="text-sm">{investor.areasOfExpertise}</p>
    </div>
    <div class="card-actions mt-4 justify-start">
      <button class="btn btn-primary h-4">More details</button>
    </div>
  </div>
</div>
