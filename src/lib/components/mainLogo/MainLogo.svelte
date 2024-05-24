<!-- MainLogo.svelte -->
<script>
  export let imageSource;
  export let showText = true;
</script>

<div class="h-12 w-12 flex items-center">
  <a href="/" class="flex items-center">
    <img class="object-fit m-0 p-0" src={imageSource} alt="logo" />
    {#if showText}
      <span class="btn btn-ghost text-m p-1 text-md text-left space-y-20"
        >IdeaSpring <br /> Angel <br /> Network</span
      >
    {/if}
  </a>
</div>
