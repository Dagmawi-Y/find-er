<script lang="ts">
  import TextInputWithLabel from "$lib/components/txtInputWLabel/TextInputWithLabel.svelte";
  import { writable } from "svelte/store";

  // Create writable stores for each input value
  const oldPassword = writable("");
  const confirmPassword = writable("");
  const newPassword = writable("");

  let oldPasswordValue = "";
  let newPasswordValue = "";
  let confirmPasswordValue = "";

  oldPassword.subscribe((value) => (oldPasswordValue = value));
  newPassword.subscribe((value) => (newPasswordValue = value));
  confirmPassword.subscribe((value) => (confirmPasswordValue = value));

  function handleFormSubmit() {
    console.log("Old Password:", oldPasswordValue);
    console.log("New Password:", newPasswordValue);
    console.log("Confirm New Password:", confirmPasswordValue);
  }
</script>

<div role="tabpanel" class="tab-content mb-4">
  <div>
    <TextInputWithLabel label="Old Password" bind:value={$oldPassword} />
    <TextInputWithLabel label="New Password" bind:value={$newPassword} />
    <TextInputWithLabel
      label="Confirm Password"
      bind:value={$confirmPassword}
    />
    <button
      class=" btn glass bg-primary-light w-full mt-5"
      on:click={handleFormSubmit}>Change Password</button
    >
  </div>
</div>
