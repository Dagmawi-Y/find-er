<script lang="ts">
  export let label: any;
  export let value: string;
</script>

<div class="flex flex-col mt-5">
  <span>{label}</span>
  <input
    type="text"
    placeholder="Type here"
    class="input input-bordered w-full"
    bind:value
  />
</div>
