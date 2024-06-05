<script lang="ts">
  import TextInputWithLabel from "$lib/components/txtInputWLabel/TextInputWithLabel.svelte";
  import { writable } from "svelte/store";
  import { changeUserPassword } from "$lib/api";
  import { Toaster, toast } from "svelte-sonner";

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

  async function handleFormSubmit() {
    console.log("Old Password:", oldPasswordValue);
    console.log("New Password:", newPasswordValue);
    console.log("Confirm New Password:", confirmPasswordValue);

    if (newPasswordValue !== confirmPasswordValue) {
      toast.warning("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await changeUserPassword(
        oldPasswordValue,
        newPasswordValue,
      );
      toast.success("Password changed successfully.");
      // Optionally, clear the input fields
      oldPassword.set("");
      newPassword.set("");
      confirmPassword.set("");
    } catch (error) {
      console.error("Failed to change password:", error);
      toast.error("Failed to change password. Please try again.");
    }
  }
</script>

<div role="tabpanel" class="tab-content mb-4">
  <Toaster richColors position="top-center" />

  <div>
    <TextInputWithLabel label="Old Password" bind:value={$oldPassword} />
    <TextInputWithLabel label="New Password" bind:value={$newPassword} />
    <TextInputWithLabel
      label="Confirm Password"
      bind:value={$confirmPassword}
    />
    <button
      class="btn glass bg-primary-light w-full mt-5"
      on:click={handleFormSubmit}>Change Password</button
    >
  </div>
</div>
