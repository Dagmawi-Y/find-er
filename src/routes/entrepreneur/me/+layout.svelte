<!-- +layout.svelte -->
<script lang="ts">
  import { page } from "$app/stores";
  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";
  import MyPitches from "./myPitches/+page.svelte";
  import MyInvestors from "./myInvestors/+page.svelte";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import InvestorSearch from "./investorSearch/+page.svelte";

  let activeTab;
  let tabContent;

  onMount(() => {
    if (typeof document !== "undefined") {
      activeTab = document.querySelector(".tab-active");
      if (activeTab) {
        activeTab.classList.add("animate");
      }
    }
  });
</script>

<NavBar />

<div class="flex flex-col min-h-screen mx-10">
  <div class="flex-grow">
    <div
      role="tablist"
      class="tabs tabs-boxed mt-7 mb-10 font-bold border-t-2 border-primary-light"
    >
      <a
        href="/entrepreneur/me/myPitches"
        class="tab tab-lifted"
        class:tab-active={$page.route.id === "/entrepreneur/me/myPitches"}
        aria-label="My Pitches"
      >
        My Pitches
      </a>
      <a
        href="/entrepreneur/me/myInvestors"
        class="tab tab-lifted"
        class:tab-active={$page.route.id === "/entrepreneur/me/myInvestors"}
        aria-label="My Investors"
      >
        My Investors
      </a>
      <a
        href="/entrepreneur/me/investorSearch"
        class="tab tab-lifted"
        class:tab-active={$page.route.id === "/entrepreneur/me/investorSearch"}
        aria-label="Investor Search"
      >
        Investor Search
      </a>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box py-5 px-5">
      {#if $page.route.id === "/entrepreneur/me/myPitches"}
        <div transition:slide={{ duration: 300 }} bind:this={tabContent}>
          <MyPitches />
        </div>
      {:else if $page.route.id === "/entrepreneur/me/myInvestors"}
        <div transition:slide={{ duration: 300 }} bind:this={tabContent}>
          <MyInvestors />
        </div>
      {:else if $page.route.id === "/entrepreneur/me/investorSearch"}
        <div transition:slide={{ duration: 300 }} bind:this={tabContent}>
          <InvestorSearch />
        </div>
      {/if}
    </div>
    <!-- <slot /> -->
  </div>
</div>

<Footer />

<style>
  .tabs.tabs-boxed {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  /* .bg-image {
    background-image: url("https://images.unsplash.com/photo-1624314138470-5a2f24623f10");
    background-size: contain;
    background-position: center;
  } */

  .tabs.tabs-boxed :is(a.tab) {
    flex: 1; /* This will make all tabs take equal width */
    margin-right: 0; /* Remove the right margin */
    height: 50px;
    width: auto; /* Let the tab take the available width */
    transition: all 0.3s ease-in-out;
    text-align: center; /* Center the text within the tab */
  }
  .tabs.tabs-boxed :is(a.tab) {
    margin-right: 0.2rem;
    height: 50px;
    width: 300px;
    transition: all 0.3s ease-in-out;
  }

  .tabs.tabs-boxed a.tab {
    position: relative;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }

  .tabs.tabs-boxed a.tab::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px; /* Adjust the height as desired */
    background-color: rgba(242, 159, 5, 1);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
  }

  .tabs.tabs-boxed a.tab:hover::after {
    transform: scaleX(1);
  }

  .tabs.tabs-boxed :is(a.tab:not(.tab-active)):hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .tab-active {
    position: relative;
    overflow: hidden;
  }

  .tab-active::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: var(--color-primary);
    transition: all 0.5s ease-in-out;
    z-index: -1;
  }
</style>
