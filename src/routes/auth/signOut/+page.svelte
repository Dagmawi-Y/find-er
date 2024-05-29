<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function confirmLogout() {
    dispatch("confirm");
  }

  function cancelLogout() {
    dispatch("cancel");
  }
</script>

<div
  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
>
  <div class="bg-white p-5 rounded shadow-lg">
    <h2 class="text-lg font-bold mb-4">Are you sure you want to sign out?</h2>
    <div class="flex justify-end">
      <button class="btn mr-2" on:click={cancelLogout}>Cancel</button>
      <button class="btn bg-red-500 text-white" on:click={confirmLogout}
        >Sign Out</button
      >
    </div>
  </div>
</div>

<style>
  /* Add your styles here */
</style>
