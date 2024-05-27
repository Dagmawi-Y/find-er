<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div
  class="flex flex-col items-start w-full max-w-2xl mx-auto justify-between p-0 transition-all duration-1000 text-black"
>
  <h1 class="self-center text-lg font-bold text-primary-dark">5. Documents</h1>
  <div class="divider my-0 py-0" />
  <div class=" text-left font-semibold w-3/5 flex flex-col gap-1">
    <div>
      <span>Business Plan</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
      />
    </div>
    <div class="divider my-0 py-0" />
    <div>
      <span>Financials</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
      />
    </div>
    <div class="divider my-0 py-0" />
    <div>
      <span>Pitch Deck</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
      />
    </div>
    <div class="divider my-0 py-0" />
    <div>
      <span>Executive Summary</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
      />
    </div>
    <div class="divider my-0 py-0" />
    <div>
      <span>Additional Document</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
      />
    </div>
  </div>
</div>
