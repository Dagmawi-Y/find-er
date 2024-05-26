<script lang="ts">
  import { page } from "$app/stores";
  export let title: string;
  export let route: string;
  export let content: any; // Content can be a Svelte component or any other content

  let checked = $page.route.id === route;
</script>

<input
  type="radio"
  name="my_tabs"
  role="tab"
  class="tab font-bold"
  aria-label={title}
  {checked}
/>
<div
  role="tabpanel"
  class="tab-content bg-base-100 border-base-300 rounded-box p-6 pt-10"
>
  {#if $page.route.id === route}
    {content}
  {/if}
</div>

<style>
  .tabs :is(input.tab) {
    margin-right: 5rem;
    height: 50px;
    width: 300px;
  }
  .tab-content {
    min-height: 200px; /* Adjust as needed */
  }
</style>
