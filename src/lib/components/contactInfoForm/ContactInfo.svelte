<script lang="ts">
  import TextInputWithLabel from "$lib/components/txtInputWLabel/TextInputWithLabel.svelte";
  import { writable } from "svelte/store";
  import { getUserProfile, updateUserProfile } from "$lib/api";
  import { onMount } from "svelte";
  import { Toaster, toast } from "svelte-sonner";

  // Create writable stores for each input value
  const firstName = writable("");
  const lastName = writable("");
  const email = writable("");
  const profileImage = writable("");
  const bannerImage = writable("");
  const town = writable("");
  const phoneNumber = writable("");
  const mobileNumber = writable("");
  const bio = writable("");

  let profileImageValue = "";
  let bannerImageValue = "";

  let firstNameValue = "";
  let lastNameValue = "";
  let emailValue = "";
  let townValue = "";
  let phoneNumberValue = "";
  let mobileNumberValue = "";
  let bioValue = "";

  profileImage.subscribe((value) => (profileImageValue = value));
  bannerImage.subscribe((value) => (bannerImageValue = value));
  firstName.subscribe((value) => (firstNameValue = value));
  lastName.subscribe((value) => (lastNameValue = value));
  email.subscribe((value) => (emailValue = value));
  town.subscribe((value) => (townValue = value));
  phoneNumber.subscribe((value) => (phoneNumberValue = value));
  mobileNumber.subscribe((value) => (mobileNumberValue = value));
  bio.subscribe((value) => (bioValue = value));

  onMount(async () => {
    const profile = await getUserProfile();
    firstName.set(profile.first_name);
    lastName.set(profile.last_name);
    email.set(profile.email);
    profileImage.set(profile.profile_image_url || "");
    bannerImage.set(profile.banner_image_url || "");
    town.set(profile.town || "");
    phoneNumber.set(profile.phone_number || "");
    mobileNumber.set(profile.mobile_number || "");
    bio.set(profile.bio || "");
  });

  function handleProfileImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const maxSize = 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        toast.warning(
          `File size exceeds the limit of 1MB. Please choose a smaller file.`,
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleBannerImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const maxSize = 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        toast.warning(
          `File size exceeds the limit of 1MB. Please choose a smaller file.`,
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        bannerImage.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleFormSubmit() {
    const userData = {
      first_name: firstNameValue,
      last_name: lastNameValue,
      email: emailValue,
      profile_image_url: profileImageValue,
      banner_image_url: bannerImageValue,
      town: townValue,
      phone_number: phoneNumberValue,
      mobile_number: mobileNumberValue,
      bio: bioValue,
    };
    await updateUserProfile(userData);
    toast.success("Contact Info Updated");
    console.log("Profile updated");
  }
</script>

<div role="tabpanel" class="tab-content mb-4">
  <Toaster richColors position="top-right" />
  <div>
    <TextInputWithLabel label="First Name" bind:value={$firstName} />
    <TextInputWithLabel label="Last Name" bind:value={$lastName} />
    <TextInputWithLabel label="Email" bind:value={$email} />

    <div class="space-y-4 my-4">
      <div class="flex items-center space-x-4">
        <div
          class="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center overflow-hidden"
        >
          {#if profileImageValue}
            <img
              src={profileImageValue}
              alt="Profile"
              class="w-full h-full object-cover"
            />
          {:else}
            <svg
              class="w-12 h-12 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
          {/if}
        </div>

        <label
          for="profileImage"
          class="btn bg-primary text-white hover:bg-primary-dark focus:ring-primary-light"
        >
          Upload Profile Image
          <input
            id="profileImage"
            type="file"
            accept="image/jpeg, image/png"
            on:change={handleProfileImageChange}
            class="hidden"
          />
        </label>
        <p class="text-sm text-gray-500">Max file size: 1MB</p>
      </div>

      <TextInputWithLabel
        label="Profile Image URL"
        bind:value={$profileImage}
      />

      <div class="h-32 bg-secondary-light relative overflow-hidden">
        {#if bannerImageValue}
          <img
            src={bannerImageValue}
            alt="Banner"
            class="w-full h-full object-cover"
          />
        {:else}
          <div class="absolute inset-0 flex items-center justify-center">
            <svg
              class="w-12 h-12 text-secondary"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        {/if}
        <label
          for="bannerImage"
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white hover:bg-opacity-70 focus:ring-secondary-light"
        >
          Upload Banner Image
          <input
            id="bannerImage"
            type="file"
            accept="image/jpeg, image/png"
            on:change={handleBannerImageChange}
            class="hidden"
          />
        </label>
      </div>
      <p class="text-sm text-gray-500">Max file size: 1MB</p>
      <TextInputWithLabel label="Banner Image URL" bind:value={$bannerImage} />
      <TextInputWithLabel label="Town/City" bind:value={$town} />
      <TextInputWithLabel label="Phone Number" bind:value={$phoneNumber} />
      <TextInputWithLabel label="Mobile Number" bind:value={$mobileNumber} />
      <label class="form-control">
        <div class="label">
          <span class="label-text">Bio</span>
        </div>
        <textarea
          class="textarea textarea-bordered h-24"
          placeholder="Bio"
          bind:value={$bio}
        ></textarea>
      </label>
    </div>

    <button
      class="btn glass bg-primary-light w-full mt-5"
      on:click={handleFormSubmit}
    >
      Update
    </button>
  </div>
</div>
