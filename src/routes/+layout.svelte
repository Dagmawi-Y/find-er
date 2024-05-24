<script lang="ts">
  import "../app.css";

  import "nprogress/nprogress.css";
  import NProgress from "nprogress";
  import { navigating, updated } from "$app/stores";

  NProgress.configure({ minimum: 0.16, showSpinner: false });

  $: {
    $navigating ? NProgress.start() : NProgress.done();
    if ($updated) window.location.reload();
  }
</script>

<main data-sveltekit-reload={$updated ? "" : "off"}>
  <slot />
</main>

<style>
  :global(#nprogress .bar) {
    background: #f29f05;
    height: 4px;
  }

  :global(#nprogress .peg) {
    box-shadow:
      0 0 10px #f29f05,
      0 0 5px #f29f05;
  }
</style>
