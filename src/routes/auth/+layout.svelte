<script lang="ts">
  import type { LayoutData } from "./$types";
  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";

  export let data: LayoutData;
</script>

<div class="wrapper">
  <div class="background"></div>
  <div class="overlay"></div>
  <NavBar />
  <main>
    <slot />
  </main>
  <Footer />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex-grow: 1;
  }

  .background {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("https://images.unsplash.com/photo-1624314138470-5a2f24623f10");
    background-size: cover;
    background-position: center;
    filter: blur(3px); /* Adjust the blur intensity as needed */
    z-index: -1;
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25); /* Adjust the opacity here */
    z-index: -1;
  }
</style>
