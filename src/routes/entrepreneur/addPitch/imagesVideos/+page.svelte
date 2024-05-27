<script lang="ts">
  import type { PageData } from "./$types";
  import ColorPicker from "svelte-awesome-color-picker";
  import { addStartupFormData } from "$lib/stores/addStartupFormData";
  import { goto } from "$app/navigation";

  export let data: PageData;

  let hex = "";
  let logoInput: any;
  let bannerImageInput: any;
  let otherImagesInput: any;
  let videoInput: any;
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

  let uploadedLogos: any[] = [];
  let uploadedBannerImages: any[] = [];
  let uploadedOtherImages: any[] = [];

  const handleLogoUpload = () => {
    const file = logoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        uploadedLogos = [reader.result];
        addStartupFormData.update((data) => {
          data.step4 = { ...data.step4, logo: reader.result };
          return data;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageUpload = () => {
    const file = bannerImageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        uploadedBannerImages = [reader.result];
        addStartupFormData.update((data) => {
          data.step4 = { ...data.step4, bannerImage: reader.result };
          return data;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOtherImagesUpload = () => {
    const files = otherImagesInput.files;
    const filePromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then((base64Images) => {
        uploadedOtherImages = [...uploadedOtherImages, ...base64Images];
        addStartupFormData.update((data) => {
          data.step4 = {
            ...data.step4,
            otherImages: [...(data.step4.otherImages || []), ...base64Images],
          };
          return data;
        });
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const handleVideoUpload = () => {
    const file = videoInput.files[0];
    if (file) {
      if (file.size > MAX_VIDEO_SIZE) {
        alert(
          `Video size should not exceed ${MAX_VIDEO_SIZE / (1024 * 1024)}MB.`,
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        addStartupFormData.update((data) => {
          data.step4 = { ...data.step4, video: reader.result };
          return data;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleYoutubeVideoIdInput = (event: { target: { value: any } }) => {
    addStartupFormData.update((data) => {
      data.step4 = { ...data.step4, youtubeVideoId: event.target.value };
      return data;
    });
  };
  const handleSubmit = () => {
    // Store form data in the store
    addStartupFormData.update((data) => {
      return data;
    });

    // Log the form data
    console.log($addStartupFormData);

    // Navigate to the next form
    goto("documents");
  };
</script>

<div
  class="flex flex-col items-start w-full max-w-2xl mx-auto justify-between p-0 transition-all duration-1000 text-black"
>
  <h1 class="self-center text-lg font-bold text-primary-dark">
    4. Images and Videos
  </h1>
  <div class="divider my-0 py-0" />
  <div class="text-left">
    <p class="font-semibold mb-2">Logo</p>
    <input
      type="file"
      accept="image/*"
      class="file-input file-input-primary file-input-sm w-full bg-primary-light mb-3"
      bind:this={logoInput}
      on:change={handleLogoUpload}
    />
    <p class="text-sm text-gray-500">Maximum file size: 10MB</p>
    {#if uploadedLogos.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {#each uploadedLogos as logo}
          <div class="card bg-base-100 shadow">
            <figure class="px-4 pt-4">
              <img src={logo} alt="Uploaded Logo" class="w-full h-auto" />
            </figure>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div class="text-left my-2 w-full mb-8">
    <p class="font-semibold mb-2">Banner Image</p>
    <div role="tablist" class="tabs tabs-lifted">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab"
        aria-label="Upload image"
        checked
      />
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <input
          type="file"
          accept="image/*"
          class="file-input file-input-primary file-input-sm w-fit bg-primary-light mb-3"
          bind:this={bannerImageInput}
          on:change={handleBannerImageUpload}
        />
        <p class="text-sm text-gray-500">Maximum file size: 10MB</p>
        {#if uploadedBannerImages.length > 0}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {#each uploadedBannerImages as bannerImage}
              <div class="card bg-base-100 shadow">
                <figure class="px-4 pt-4">
                  <img
                    src={bannerImage}
                    alt="Uploaded Banner Image"
                    class="w-full h-auto"
                  />
                </figure>
              </div>
            {/each}
          </div>
        {/if}
      </div>
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab"
        aria-label="Choose banner color"
      />
      <div
        role="tabpanel"
        class="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <div class="z-50">
          <ColorPicker
            bind:hex
            on:change={() =>
              addStartupFormData.update((data) => {
                data.step4 = { ...data.step4, bannerColor: hex };
                return data;
              })}
          />
        </div>
      </div>
    </div>
  </div>
  <div class="text-left">
    <p class="font-semibold mb-2">Other Images</p>
    <input
      type="file"
      accept="image/*"
      class="file-input file-input-primary file-input-sm w-full bg-primary-light mb-3"
      bind:this={otherImagesInput}
      on:change={handleOtherImagesUpload}
      multiple
    />
    <p class="text-sm text-gray-500">Maximum file size: 10MB per image</p>
    {#if uploadedOtherImages.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {#each uploadedOtherImages as otherImage}
          <div class="card bg-base-100 shadow">
            <figure class="px-4 pt-4">
              <img
                src={otherImage}
                alt="Uploaded Other Image"
                class="w-full h-auto"
              />
            </figure>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div class="divider my-0 py-0" />
  <button
    type="submit"
    class="btn glass bg-primary w-1/2 mt-3 mx-auto"
    on:click={handleSubmit}
  >
    Save & Continue
  </button>
</div>
