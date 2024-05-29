<!-- UserOverview.svelte -->
<script>
  let activeTab = "invested";

  const handleTabClick = (tab) => {
    activeTab = tab;
  };

  // tabData.js
  const tabData = {
    invested: [
      {
        title: "Investment 1",
        description: "This is a description of Investment 1.",
      },
      {
        title: "Investment 2",
        description: "This is a description of Investment 2.",
      },
    ],
    interested: [
      {
        title: "Interested Investment 1",
        description: "This is a description of Interested Investment 1.",
      },
      {
        title: "Interested Investment 2",
        description: "This is a description of Interested Investment 2.",
      },
    ],
    shortlisted: [
      {
        title: "Shortlisted Investment 1",
        description: "This is a description of Shortlisted Investment 1.",
      },
      {
        title: "Shortlisted Investment 2",
        description: "This is a description of Shortlisted Investment 2.",
      },
    ],
  };
</script>

<div class="bg-base-200 p-8 rounded-lg">
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center">
      <img
        src="https://via.placeholder.com/48"
        alt="Profile"
        class="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h2 class="text-xl font-bold">Sam Rutter</h2>
        <p class="text-sm text-gray-600">Welcome to your investment overview</p>
      </div>
    </div>
    <button class="btn btn-sm btn-ghost">Edit My Profile</button>
  </div>

  <div class="flex justify-between mb-4">
    <div class="tabs">
      <a
        class="tab tab-lifted"
        class:tab-active={activeTab === "invested"}
        on:click={() => handleTabClick("invested")}
      >
        Invested
        <span class="badge badge-primary ml-2">
          {tabData.invested.length}
        </span>
      </a>
      <a
        class="tab tab-lifted"
        class:tab-active={activeTab === "interested"}
        on:click={() => handleTabClick("interested")}
      >
        Interested
        <span class="badge badge-primary ml-2">
          {tabData.interested.length}
        </span>
      </a>
      <a
        class="tab tab-lifted"
        class:tab-active={activeTab === "shortlisted"}
        on:click={() => handleTabClick("shortlisted")}
      >
        Shortlisted
        <span class="badge badge-primary ml-2">
          {tabData.shortlisted.length}
        </span>
      </a>
    </div>
  </div>

  {#if activeTab === "invested"}
    <div>
      <!-- Render invested data -->
      {#each tabData.invested as item}
        <div class="card shadow-lg compact bg-base-100 mb-4">
          <div class="card-body">
            <h3 class="card-title">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  {:else if activeTab === "interested"}
    <div>
      <!-- Render interested data -->
      {#each tabData.interested as item}
        <div class="card shadow-lg compact bg-base-100 mb-4">
          <div class="card-body">
            <h3 class="card-title">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div>
      <!-- Render shortlisted data -->
      {#each tabData.shortlisted as item}
        <div class="card shadow-lg compact bg-base-100 mb-4">
          <div class="card-body">
            <h3 class="card-title">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
