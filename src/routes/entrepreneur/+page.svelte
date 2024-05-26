<!-- <script lang="ts">
  import type { PageData } from "./$types";
  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import MyPitches from "../entrepreneur/myPitches/+page.svelte";
  import MyInvestors from "../entrepreneur/myInvestors/+page.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";

  export let data: PageData;
</script>

<div class="flex flex-col min-h-screen mx-2">
  <div class="flex-grow">
    <div role="tablist" class="tabs tabs-lifted mt-7">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab font-bold"
        aria-label="My Pitches"
        checked
      />
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6 pt-10"
      >
        <div class="flex">
          <MyPitches />
        </div>
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab font-bold"
        aria-label="My Investors"
      />
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <MyInvestors />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        class="tab font-bold"
        aria-label="Investor Search"
      />
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        Investor Search
      </div>
    </div>
  </div>
</div>

<style>
  .tabs.tabs-lifted :is(input.tab) {
    margin-right: 5rem;
    height: 50px;
    width: 300px;
  }
  .tab-content {
    min-height: 200px; /* Adjust as needed */
  }
</style> -->
