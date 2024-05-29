<script lang="ts">
  import { onMount } from "svelte";
  import { getStartupById } from "$lib/api";
  import { page } from "$app/stores";
  import SveltePlayer from "svelte-player";

  let startup: any;
  let bannerImage: string;
  let id;

  id = Number($page.params.id);

  onMount(async () => {
    startup = await getStartupById(id);
    bannerImage = getBannerImage(startup.images_videos);
    console.log(startup);
  });

  const getBannerImage = (images) => {
    const bannerImage = images.find(
      (image) => image.image_type === "bannerImage",
    );
    return bannerImage ? bannerImage.image_url : "";
  };

  const getLogo = (images) => {
    const logo = images.find((image) => image.image_type === "logo");
    return logo ? logo.image_url : "";
  };
</script>

{#if startup !== undefined}
  <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <!-- Banner Section -->
    <div
      class="bg-cover bg-center mb-8"
      style="background-image: url('{bannerImage}');"
    >
      <div
        class="bg-gradient-to-r from-primary to-secondary text-white py-20 flex justify-center items-center"
      >
        <h1 class="text-4xl font-bold">{startup.pitch_title}</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8">
        <div class="bg-white rounded-lg shadow-md p-8">
          <img
            src={getLogo(startup.images_videos)}
            alt="Startup Logo"
            class=" w-28 h-28 mr-4 object-contain"
          />
          <div class="flex items-center mb-8">
            <p class="text-gray-600">{startup.pitch_deal.short_summary}</p>
          </div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-secondary">
              Company Details
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-600 mb-2">
                  <strong>Location:</strong>
                  {startup.location}
                </p>
                <p class="text-gray-600 mb-2">
                  <strong>Industries:</strong>
                  {startup.industry_1},
                  {startup.industry_2}
                </p>
                <p class="text-gray-600 mb-2">
                  <strong>Stage:</strong>
                  {startup.stage}
                </p>
              </div>
              <div>
                <p class="text-gray-600 mb-2">
                  <strong>Raising Amount:</strong>
                  {startup.total_raising_amount}
                </p>
                <p class="text-gray-600 mb-2">
                  <strong>Minimum Investment:</strong>
                  {startup.minimum_investment}
                </p>
                <p class="text-gray-600 mb-2">
                  <strong>Ideal Investor Role:</strong>
                  {startup.ideal_investor_role}
                </p>
              </div>
            </div>
          </div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-secondary">
              Deal Overview
            </h2>
            <p class="text-gray-600 mb-2">
              <strong>Deal Type:</strong>
              {startup.pitch_deal.deal_type}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Deal Description:</strong>
              {startup.pitch_deal.deal_description}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Business Description:</strong>
              {startup.pitch_deal.business_description}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {#each startup.images_videos.filter((media) => media.image_type === "otherImages") as image}
                <div class="rounded-lg overflow-hidden">
                  <img
                    src={image.image_url}
                    alt="Business Image"
                    class="w-full object-cover"
                  />
                </div>
              {/each}
            </div>
            <p class="text-gray-600 mb-2">
              <strong>Market Description:</strong>
              {startup.pitch_deal.market_description}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {#each startup.images_videos.filter((media) => media.image_type === "otherImages") as image}
                <div class="rounded-lg overflow-hidden">
                  <img
                    src={image.image_url}
                    alt="Market Image"
                    class="w-full object-cover"
                  />
                </div>
              {/each}
            </div>
            <div class="mb-8">
              <h2 class="text-2xl font-bold mb-4 text-secondary">Highlights</h2>
              <ul class="list-disc pl-4">
                {#each startup.pitch_deal.highlights.split(",") as highlight}
                  <li class="text-gray-600 mb-2">
                    <strong>{highlight.trim()}</strong>
                  </li>
                {/each}
              </ul>
            </div>

            <p class="text-gray-600 mb-2">
              <strong>Progress Proof:</strong>
              {startup.pitch_deal.progress_proof}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Objectives & Future:</strong>
              {startup.pitch_deal.objectives_future}
            </p>
          </div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-secondary">
              Images & Videos
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#each startup.images_videos.filter((media) => media.image_type !== "logo" && media.image_type !== "bannerImage" && media.image_type !== "otherImages") as media}
                {#if media.video_url}
                  <div class="rounded-lg overflow-hidden">
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <SveltePlayer url={media.video_url} />
                  </div>
                {:else if media.image_url}
                  <div class="rounded-lg overflow-hidden">
                    <img
                      src={media.image_url}
                      alt={media.image_description}
                      class="w-full object-cover"
                    />
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-4">
        <div class="bg-white rounded-lg shadow-md p-8">
          <h2 class="text-2xl font-bold mb-4 text-secondary">Overview</h2>
          <div class="mb-4">
            <p class="text-gray-600 mb-2">
              <strong>Target:</strong>
              {startup.total_raising_amount}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Minimum:</strong>
              {startup.minimum_investment}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Investment Raised:</strong>
              {startup.raised_amount}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Previous Rounds:</strong>
              {startup.previous_round_amount}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Stage:</strong>
              {startup.stage}
            </p>
            <p class="text-gray-600 mb-2">
              <strong>Investor Role:</strong>
              {startup.ideal_investor_role}
            </p>
          </div>
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-secondary">Highlights</h2>
            <ul class="list-disc pl-4">
              {#each startup.pitch_deal.highlights.split(",") as highlight}
                <li class="text-gray-600 mb-2">
                  <strong>{highlight.trim()}</strong>
                </li>
              {/each}
            </ul>
          </div>

          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-secondary">Documents</h2>
            <div class="grid grid-cols-1 gap-4">
              {#each startup.documents as document}
                <a
                  href={document.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
                >
                  <div>
                    <p class="text-gray-600 font-bold text-primary">
                      {document.document_type}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
  .text-primary {
    color: #0077b6; /* Blue color */
  }
  .text-secondary {
    color: #ff8c00; /* Orange color */
  }
  .from-primary {
    --tw-gradient-from: #0077b6;
    --tw-gradient-to: rgb(0 119 182 / 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }
  .to-secondary {
    --tw-gradient-to: #ff8c00;
  }
</style>
