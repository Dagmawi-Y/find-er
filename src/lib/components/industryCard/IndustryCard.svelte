<!-- Card.svelte -->
<script>
  export let imageSrc;
  export let industryName;

  let isHovered = false;

  function handleMouseEnter() {
    isHovered = true;
  }

  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="card rounded-md bg-base-100 shadow-xl relative w-80 h-60 overflow-hidden cursor-pointer"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <figure class="relative h-full">
    <img
      src={imageSrc}
      alt={industryName}
      class="w-full h-full object-cover transition-all duration-300 ease-in-out"
      class:blur={isHovered}
    />
    <div
      class="card-body absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-black/50 transition-opacity duration-300 ease-in-out"
      class:opacity-100={isHovered}
      class:opacity-0={!isHovered}
    >
      <h2 class="card-title text-white">{industryName}</h2>
    </div>
  </figure>
</div>

<style>
  .blur {
    filter: blur(5px);
  }
</style>
