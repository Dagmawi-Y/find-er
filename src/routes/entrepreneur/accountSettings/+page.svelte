<script lang="ts">
  import { Center } from "@svelteuidev/core";
  import ContactInfo from "$lib/components/contactInfoForm/ContactInfo.svelte";
  import PasswordChange from "$lib/components/pwChange/PWChange.svelte";
</script>

<div>
  <div class="bg-slate-200 mx-5 my-5 rounded-md py-14">
    <center>
      <h1 class="text-2xl font-bold">Account Settings</h1>
    </center>
  </div>
  <div class=" flex items-center justify-center">
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
      <div role="tabpanel" class="tab-content">Delete Account</div>
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
