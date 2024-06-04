<script lang="ts">
  // import type { LayoutData } from "./$types";

  // export let data: LayoutData;

  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";
</script>

<div class="layout-container">
  <NavBar />
  <main class="content">
    <slot />
  </main>
  <Footer />
</div>

<style>
  .layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .content {
    flex: 1;
  }
</style>
