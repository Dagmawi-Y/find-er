<script lang="ts">
  import TextInputWithLabel from "$lib/components/txtInputWLabel/TextInputWithLabel.svelte";
  import { writable } from "svelte/store";

  // Create writable stores for each input value
  const firstName = writable("");
  const lastName = writable("");
  const email = writable("");

  let firstNameValue = "";
  let lastNameValue = "";
  let emailValue = "";

  firstName.subscribe((value) => (firstNameValue = value));
  lastName.subscribe((value) => (lastNameValue = value));
  email.subscribe((value) => (emailValue = value));

  function handleFormSubmit() {
    console.log("First Name:", firstNameValue);
    console.log("Last Name:", lastNameValue);
    console.log("Email:", emailValue);
  }
</script>

<div role="tabpanel" class="tab-content mb-4">
  <div>
    <TextInputWithLabel label="First Name" bind:value={$firstName} />
    <TextInputWithLabel label="Last Name" bind:value={$lastName} />
    <TextInputWithLabel label="Email" bind:value={$email} />
    <button
      class=" btn glass bg-primary-light w-full mt-5"
      on:click={handleFormSubmit}>Update</button
    >
  </div>
</div>
