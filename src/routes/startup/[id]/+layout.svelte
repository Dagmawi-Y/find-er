<script lang="ts">
  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";
</script>

<main>
  <NavBar />
  <div style="flex-grow: 1;">
    <!-- This div will take up all the remaining vertical space -->
    <slot />
  </div>
  <Footer />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Set the minimum height to 100vh (100% of the viewport height) */
  }

  :global(body) {
    margin: 0; /* Remove default body margin */
  }
</style>
