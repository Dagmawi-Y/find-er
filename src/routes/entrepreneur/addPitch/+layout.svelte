<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/animatedRoute/AnimatedRoute.svelte";
</script>

<div class="background"></div>
<div class="overlay"></div>

<nav class="flex justify-center my-6">
  <ul class="steps text-slate-200">
    <a href="/entrepreneur/addPitch/companyInfo" class="step step-primary"
      >Company Info</a
    >
    <a
      href="/entrepreneur/addPitch/pitchDeal"
      class="step"
      class:step-primary={$page.route.id ===
        "/entrepreneur/addPitch/pitchDeal" ||
        $page.route.id === "/entrepreneur/addPitch/team" ||
        $page.route.id === "/entrepreneur/addPitch/imagesVideos" ||
        $page.route.id === "/entrepreneur/addPitch/documents"}
    >
      Pitch & Deal
    </a>
    <a
      href="/entrepreneur/addPitch/team"
      class="step"
      class:step-primary={$page.route.id === "/entrepreneur/addPitch/team" ||
        $page.route.id === "/entrepreneur/addPitch/imagesVideos" ||
        $page.route.id === "/entrepreneur/addPitch/documents"}
    >
      Team
    </a>
    <a
      href="/entrepreneur/addPitch/imagesVideos"
      class="step"
      class:step-primary={$page.route.id ===
        "/entrepreneur/addPitch/imagesVideos" ||
        $page.route.id === "/entrepreneur/addPitch/documents"}
    >
      Images & Videos
    </a>
    <a
      href="/entrepreneur/addPitch/documents"
      class="step"
      class:step-primary={$page.route.id === "/entrepreneur/addPitch/documents"}
    >
      Documents
    </a>
  </ul>
</nav>

<AnimatedRoute>
  <main
    class="card text-neutral-content mx-auto bg-slate-100 w-full md:w-1/2 overflow-y-scroll overflow-visible no-scrollbar p-0 shadow-md"
    style="max-height: 500px;"
  >
    <div class="card-body items-center text-center py-5">
      <slot />
    </div>
  </main>
</AnimatedRoute>

<style>
  .background {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url(https://images.unsplash.com/photo-1624314138470-5a2f24623f10);
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
