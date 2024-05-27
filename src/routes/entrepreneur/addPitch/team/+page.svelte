<script lang="ts">
  import type { PageData } from "./$types";
  import { Drawer, Drawer as Root } from "vaul-svelte";
  import { addStartupFormData } from "$lib/stores/addStartupFormData";
  import { goto } from "$app/navigation";

  import { Tooltip } from "flowbite-svelte";
  export let data: PageData;

  let name = "";
  let linkedin = "";
  let position = "";
  let bio = "";
  let image = null;

  let isDrawerOpen = false;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const addTeamMember = () => {
    addStartupFormData.update((data) => {
      data.teamMembers = [
        ...data.teamMembers,
        { name, linkedin, position, bio, image },
      ];
      return data;
    });

    // Clear the form fields
    name = "";
    linkedin = "";
    position = "";
    bio = "";
    image = null;

    // Close the drawer
    isDrawerOpen = false;
  };

  let teamOverview = "";
  let form: HTMLFormElement;
  const handleSubmit = () => {
    if (form.checkValidity()) {
      // Store form data in the store
      addStartupFormData.update((data) => {
        data.step3 = { teamOverview };

        goto("imagesVideos");
        return data;
      });

      // Log the form data
      console.log($addStartupFormData);

      // Navigate to the next form
      // You can use the `goto` function from the `$app/navigation` module
      // or any other method to navigate to the next form
    } else {
      form.reportValidity();
    }
  };

  const calculateRemainingChars = (value: string, maxLength: number) => {
    return maxLength - value.length;
  };
</script>

<div
  class=" flex flex-col items-start w-full max-w-2xl mx-auto justify-between p-0 transition-all duration-1000"
>
  <h1 class="self-center text-lg font-bold text-primary-dark">3. Team</h1>
  <div class=" divider my-0 py-0"></div>
  <div class="w-full px-4 mt-0">
    <form
      bind:this={form}
      on:submit|preventDefault={handleSubmit}
      class="text-black"
    >
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">Team Overview</span>
          <span class="label-text-alt text-xs">
            {calculateRemainingChars(teamOverview, 450)} characters remaining
          </span>
        </div>
        <textarea
          class="input input-bordered w-full border-none h-24 text-top whitespace-pre-wrap p-2 min-h-20"
          maxlength="450"
          bind:value={teamOverview}
          required
        ></textarea>
        <!-- {#if shortSummary}
          <span class="  text-sm text-red-600 text-left"
            >{shortSummary}</span
          >
          {toast.error("Please check all the fields")}
        {/if} -->
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-56 text-left "
          trigger="click"
          placement="bottom-end"
        >
          “Give a general overview of the team responsible for making your
          business a success. How many people? What experience do they have?
          Investors want to know that you’ve got people in place to grow and
          succeed. You can give specific details on the most important members
          below.”
        </Tooltip>
      </label>
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">Team Members</span>
        </div>
      </label>
    </form>
    <div class="mt-4">
      <h2 class="text-lg font-semibold mb-2">Team Members</h2>
      {#if $addStartupFormData.teamMembers.length === 0}
        <p>No team members added yet.</p>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each $addStartupFormData.teamMembers as member, index}
            <div class="card bg-base-100 shadow mb-4">
              <figure class="px-4 pt-4 flex justify-center">
                {#if member.image}
                  <img
                    src={member.image}
                    alt={member.name}
                    class="w-16 h-16 rounded-full"
                  />
                {:else}
                  <div
                    class="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center"
                  >
                    <span class="text-2xl font-bold text-black text-center"
                      >{member.name.slice(0, 1).toUpperCase()}</span
                    >
                  </div>
                {/if}
              </figure>
              <div class="card-body text-center">
                <h2 class="card-title text-black font-bold">{member.name}</h2>
                <p class="text-black font-bold">{member.position}</p>
                <div class="card-actions justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    class="link link-primary text-black font-bold">LinkedIn</a
                  >
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
    <Drawer.Root bind:open={isDrawerOpen}>
      <Drawer.Trigger class=" btn bg-primary-light flex justify-start">
        Add Team Member</Drawer.Trigger
      >
      <Drawer.Portal>
        <Drawer.Overlay class="fixed  inset-0 bg-black/40" />
        <div class=" flex justify-center">
          <Drawer.Content
            class="bg-zinc-100 flex flex-col  rounded-t-[10px] mt-24 fixed bottom-0 sm:w-1/2 h-3/4"
          >
            <div class="p-4 bg-white rounded-t-[10px] flex-1">
              <div
                class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-primary mb-8"
              />
              <div class="max-w-md mx-auto">
                <Drawer.Title class="font-medium text-primary-dark"
                  >Add Team Member</Drawer.Title
                >
                <div class="divider my-0 py-0" />
                <p class="font-semibold mb-2">Upload Photo</p>
                <input
                  type="file"
                  accept="image/*"
                  on:change={handleImageUpload}
                  class="file-input file-input-primary file-input-sm w-full max-w-xs bg-primary-light mb-3"
                />
                <input
                  type="text"
                  placeholder="Name"
                  class="input input-bordered w-full max-w-xs mb-3"
                  bind:value={name}
                />
                <input
                  type="text"
                  placeholder="Linkedin"
                  class="input input-bordered w-full max-w-xs mb-3"
                  bind:value={linkedin}
                />
                <input
                  type="text"
                  placeholder="Position"
                  class="input input-bordered w-full max-w-xs mb-3"
                  bind:value={position}
                />
                <input
                  type="text"
                  placeholder="Bio"
                  class="input input-bordered w-full max-w-xs mb-3"
                  bind:value={bio}
                />
                <button
                  type="button"
                  class="btn glass bg-primary w-1/2 mt-3"
                  on:click={addTeamMember}>Add Member</button
                >
              </div>
            </div>
            <div class="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
              <div class="flex gap-6 justify-end max-w-md mx-auto"></div>
            </div>
          </Drawer.Content>
        </div>
      </Drawer.Portal>
    </Drawer.Root>
    <div class=" divider my-0 py-0"></div>
    <button
      type="submit"
      class="btn glass bg-primary w-1/2 mt-3"
      on:click={handleSubmit}>Save & Continue</button
    >
  </div>
</div>
