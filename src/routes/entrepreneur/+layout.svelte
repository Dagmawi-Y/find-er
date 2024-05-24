<!-- +layout.svelte -->
<script lang="ts">
  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";
</script>

<NavBar />
<div class="flex flex-col min-h-screen mx-2">
  <div class="flex-grow">
    <slot />
  </div>
</div>
<Footer />
