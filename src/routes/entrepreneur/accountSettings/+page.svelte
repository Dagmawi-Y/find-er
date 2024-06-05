<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { Center } from "@svelteuidev/core";
  import ContactInfo from "$lib/components/contactInfoForm/ContactInfo.svelte";
  import PasswordChange from "$lib/components/pwChange/PWChange.svelte";
  import { deleteUserProfile } from "$lib/api";

  let showDeleteConfirmation = false;

  async function handleDelete() {
    showDeleteConfirmation = true;
  }

  async function confirmDelete() {
    try {
      const response = await deleteUserProfile();
      if (response.message === "User profile deleted successfully") {
        // Clear sessionStorage, localStorage, and cookies
        sessionStorage.clear();
        localStorage.clear();
        document.cookie = "";
        // Navigate to "/"
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to delete user profile:", error);
    }
  }
</script>

<!-- Background Overlay -->
{#if showDeleteConfirmation}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    transition:fade={{ duration: 200 }}
  />
{/if}

<!-- Overlay Popup -->
{#if showDeleteConfirmation}
  <div
    class="fixed z-50 inset-0 overflow-y-auto"
    transition:fade={{ duration: 200 }}
  >
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        transition:scale={{ duration: 200 }}
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Delete Account
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              on:click={confirmDelete}
            >
              Delete
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              on:click={() => (showDeleteConfirmation = false)}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
{/if}

<div class={showDeleteConfirmation ? "blur-sm" : ""}>
  <div class="bg-gray-200 mx-5 my-5 rounded-md py-14 text-center">
    <h1 class="text-2xl font-bold">Account Settings</h1>
  </div>
  <div class="flex items-center justify-center">
    <div role="tablist" class="tabs tabs-bordered">
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab"
        aria-label="Contact info"
        checked
      />
      <ContactInfo />
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab"
        aria-label="Password"
      />
      <PasswordChange />
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab"
        aria-label="Delete Account"
      />
      <div role="tabpanel" class="tab-content">
        <div
          class=" mt-5 rounded-md p-3 flex flex-col group hover:bg-red-400 bg-red-100 pb-7"
        >
          <span class=" text-red-500 group-hover:text-white mb-3"
            >Danger Zone</span
          >
          <button
            class="btn btn-outline transform transition duration-200 group-hover:bg-red-500 group-hover:text-white text-red-500"
            on:click={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .tab {
    font-weight: 400;
    font-size: large;
    margin-right: 30px;
  }
</style>
