<!-- +layout.svelte -->
<script lang="ts">
  import { page } from "$app/stores";
  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";
  import MyPortfolio from "../portfolio/[id]/+page.svelte";
  import MyMatches from "./myMatches/+page.svelte";
  import Explore from "./explore/+page.svelte";
  import Search from "./search/+page.svelte";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

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
        href="/investor/me/myPortfolio"
        class="tab tab-lifted"
        class:tab-active={$page.route.id === "/investor/me/myPortfolio"}
        aria-label="My Pitches"
      >
        My Portfolio
      </a>
      <a
        href="/investor/me/myMatches"
        class="tab tab-lifted"
        class:tab-active={$page.route.id === "/investor/me/myMatches"}
        aria-label="My Investors"
      >
        My Matches
      </a>
      <a
        href="/investor/me/explore"
        class="tab tab-lifted"
        class:tab-active={$page.route.id === "/investor/me/explore"}
        aria-label="Investor Search"
      >
        Explore
      </a>
      <a
        href="/investor/me/search"
        class="tab tab-lifted"
        class:tab-active={$page.route.id === "/investor/me/search"}
        aria-label="Investor Search"
      >
        Search
      </a>
    </div>
    <div class="bg-base-100 border-base-300 rounded-box py-5 px-5">
      {#if $page.route.id === "/investor/me/myPortfolio"}
        <div transition:slide={{ duration: 300 }} bind:this={tabContent}>
          <MyPortfolio />
        </div>
      {:else if $page.route.id === "/investor/me/myMatches"}
        <div transition:slide={{ duration: 300 }} bind:this={tabContent}>
          <MyMatches />
        </div>
      {:else if $page.route.id === "/investor/me/explore"}
        <div transition:slide={{ duration: 300 }} bind:this={tabContent}>
          <Explore />
        </div>
      {:else if $page.route.id === "/investor/me/search"}
        <div transition:slide={{ duration: 300 }} bind:this={tabContent}>
          <Search />
        </div>
      {/if}
    </div>
    <slot />
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
