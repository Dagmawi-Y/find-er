<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/animatedRoute/AnimatedRoute.svelte";
</script>

<nav class="flex justify-center my-6">
  <ul class="steps">
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
  <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
    <div class="card-body items-center text-center">
      <slot />
    </div>
  </main>
</AnimatedRoute>
