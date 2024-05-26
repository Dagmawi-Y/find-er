<script>
  import { writable } from "svelte/store";

  let inputValue = "";
  let tags = writable([]);

  function addTag() {
    if (inputValue.trim()) {
      // @ts-ignore
      tags.update((currentTags) => [...currentTags, inputValue.trim()]);
      inputValue = "";
    }
  }

  /**
   * @param {number} index
   */
  function removeTag(index) {
    tags.update((currentTags) => currentTags.filter((_, i) => i !== index));
  }
</script>

<div class="max-w-md text-left mt-4 mb-3">
  <label for="tag-input" class="block text-sm font-bold text-gray-700 mb-1"
    >Tags</label
  >
  <div class="flex flex-wrap items-center gap-2 p-2 border rounded bg-white">
    {#each $tags as tag, index}
      <div
        class="relative flex items-center gap-10 bg-gray-200 px-2 py-1 rounded text-sm"
      >
        {tag}
        <button
          on:click={() => removeTag(index)}
          class="absolute top-0 right-0 p-1 text-xs text-red-600"
        >
          x
        </button>
      </div>
    {/each}
    <input
      type="text"
      bind:value={inputValue}
      on:keydown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addTag();
        }
      }}
      class="border-dashed border-2 border-gray-400 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400 h-5 w-28"
      placeholder="Add a tag"
    />
  </div>
</div>