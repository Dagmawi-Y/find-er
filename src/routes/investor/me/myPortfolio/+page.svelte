<!-- UserOverview.svelte -->
<script>
  import { onMount } from "svelte";
  import { getInvestorById } from "$lib/api";

  let investor = null;
  let activeTab = "interested";

  const handleTabClick = (tab) => {
    activeTab = tab;
  };

  onMount(async () => {
    // Replace 'investorId' with the actual investor ID you want to fetch
    const investorId = "1";
    investor = await getInvestorById(investorId);
  });
</script>

{#if investor}
  <div class="bg-base-200 p-8 rounded-lg">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <img
          src={investor.investorProfile.profile_image_url}
          alt="Profile"
          class="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 class="text-xl font-bold">
            {investor.investorProfile.first_name}
            {investor.investorProfile.last_name}
          </h2>
          <p class="text-sm text-gray-600">
            Welcome to your investment overview
          </p>
        </div>
      </div>
      <button class="btn btn-sm btn-ghost">Edit My Profile</button>
    </div>

    <div class="flex justify-between mb-4">
      <div class="tabs">
        <a
          class="tab tab-lifted"
          class:tab-active={activeTab === "interested"}
          on:click={() => handleTabClick("interested")}
        >
          Interested
          <span class="badge badge-primary ml-2">
            {investor.user.Interest.length}
          </span>
        </a>
        <a
          class="tab tab-lifted"
          class:tab-active={activeTab === "shortlisted"}
          on:click={() => handleTabClick("shortlisted")}
        >
          Shortlisted
          <span class="badge badge-primary ml-2">0</span>
        </a>
      </div>
    </div>

    {#if activeTab === "interested"}
      <div>
        <!-- Render interested data -->
        {#each investor.user.Interest as item}
          <div class="card shadow-lg compact bg-base-100 mb-4">
            <div class="card-body">
              <h3 class="card-title">{item.startup.pitch_title}</h3>
              <p>{item.startup.location}</p>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div>
        <!-- Render shortlisted data -->
        <p>No shortlisted startups yet.</p>
      </div>
    {/if}
  </div>
{/if}
