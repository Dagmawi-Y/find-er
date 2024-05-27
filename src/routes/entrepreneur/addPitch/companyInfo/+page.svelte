<script lang="ts">
  import { goto } from "$app/navigation";
  import { addStartupFormData } from "$lib/stores/addStartupFormData";
  import type { PageData } from "./$types";
  // import { tooltip } from "@svelte-plugins/tooltips";
  import { Tooltip } from "flowbite-svelte";

  export let data: PageData;
  let website = "";
  let phoneNumber = "";

  let pitchTitle = "";
  let companyLocation = "";
  let industry1 = "";
  let industry2 = "";
  let companyStage = "";
  let investorRole = "";
  let previousRound = "";
  let totalRaising = "";
  let raisedTillNow = "";
  let minimumInvestment = "";

  let fce = false;
  let taxHoliday = false;

  let form: HTMLFormElement;

  const calculateRemainingChars = (value: string, maxLength: number) => {
    return maxLength - value.length;
  };

  const handleSubmit = () => {
    if (form.checkValidity()) {
      // Store form data in the store
      addStartupFormData.update((data) => {
        data.step1 = {
          pitchTitle,
          website,
          phoneNumber,
          companyLocation,
          industry1,
          industry2,
          companyStage,
          investorRole,
          previousRound,
          totalRaising,
          raisedTillNow,
          minimumInvestment,
          taxRelief: {
            fce,
            taxHoliday,
          },
        };
        goto("pitchDeal");
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
</script>

<div
  class="flex flex-col items-start w-full max-w-2xl mx-auto justify-between p-0"
>
  <h1 class=" self-center text-lg font-bold text-primary-dark">
    1. Company Info
  </h1>
  <div class=" divider my-0 py-0"></div>
  <div class="w-full px-4 mb-7">
    <form
      bind:this={form}
      novalidate
      on:submit|preventDefault={handleSubmit}
      class=" text-black"
    >
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">Pitch Title</span>
          <span class="label-text-alt text-xs">
            {calculateRemainingChars(pitchTitle, 50)} characters remaining
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full border-none"
          required
          maxlength="50"
          bind:value={pitchTitle}
        />
        <Tooltip
          class=" bg-primary-light text-black duration-500"
          trigger="click"
          placement="top-end">Enter your startup business name here...</Tooltip
        >
        <!-- <div class="label">
        <span class="label-text-alt">Bottom Left label</span>
        <span class="label-text-alt">Bottom Right label</span>
      </div> -->
      </label>
      <label class="form-control w-full mt-3">
        <div class="label flex justify-between">
          <span class="label-text font-bold">Website (Optional)</span>
          <span class="label-text-alt text-xs">25 characters remaining</span>
        </div>
        <div class="flex items-center rounded-lg bg-slate-200 mb-7">
          <span class="px-3 text-gray-500 w-20">https://</span>
          <input
            type="text"
            bind:value={website}
            placeholder="Type here"
            class="input input-bordered w-full border-none focus:ring-0"
          />
          <Tooltip
            class=" bg-primary-light text-black duration-500"
            trigger="click"
            placement="top-end"
            >Enter the business's website (if it has any)</Tooltip
          >
        </div>
        <!-- <div class="label">
        <span class="label-text-alt">Bottom Left label</span>
        <span class="label-text-alt">Bottom Right label</span>
      </div> -->
      </label>
      <select
        class="select select-bordered w-full text-black font-bold mb-5"
        bind:value={companyLocation}
        required
      >
        <option value="" disabled selected>Where is your company based?</option>
        <option>Addis Ababa</option>
        <option>Debre Berhan</option>
        <option>Dire Dawa</option>
      </select>
      <Tooltip
        class=" bg-primary-light text-black duration-500"
        trigger="click"
        placement="top-end">Enter the location the business found in</Tooltip
      >
      <label class="form-control w-full">
        <div class="label flex justify-between">
          <span class="label-text font-bold">Mobile Number</span>
          <span class="label-text-alt text-xs">25 characters remaining</span>
        </div>
        <div class="flex items-center rounded-lg bg-slate-200 mb-7">
          <span class="px-3 text-gray-500 w-20">+251</span>
          <input
            type="text"
            bind:value={phoneNumber}
            placeholder="Type here"
            class="input input-bordered w-full border-none focus:ring-0"
            required
          />
          <Tooltip
            class=" bg-primary-light text-black duration-500"
            trigger="click"
            placement="top-end"
            >Enter the business's operating mobile number</Tooltip
          >
        </div>
        <!-- <div class="label">
        <span class="label-text-alt">Bottom Left label</span>
        <span class="label-text-alt">Bottom Right label</span>
      </div> -->
      </label>
      <select
        class="select select-bordered w-full text-black font-bold mb-5"
        bind:value={industry1}
        required
      >
        <option value="" disabled selected>Industry 1</option>
        <option>IT</option>
        <option>Software</option>
        <option>Agriculture</option>
      </select>
      <Tooltip
        class=" bg-primary-light text-black duration-500"
        trigger="click"
        placement="top-end"
        >Enter the sector your business is categorized</Tooltip
      >
      <select
        class="select select-bordered w-full text-black font-bold mb-5"
        bind:value={industry2}
      >
        <option value="" disabled selected>Industry 2 (Optional)</option>
        <option>IT</option>
        <option>Software</option>
        <option>Agriculture</option>
      </select>
      <Tooltip
        class=" bg-primary-light text-black duration-500"
        trigger="click"
        placement="top-end"
        >If there is specialization in a subsector, you can leave this empty.</Tooltip
      >
      <select
        class="select select-bordered w-full text-black font-bold mb-5"
        bind:value={companyStage}
        required
      >
        <option value="" disabled selected>Stage</option>
        <option>MVP</option>
        <option>Pre Startup</option>
        <option>Profit</option>
      </select>
      <Tooltip
        class=" bg-primary-light text-black duration-500"
        trigger="click"
        placement="top-end">In which operating stage are you in?</Tooltip
      >
      <select
        class="select select-bordered w-full text-black font-bold mb-5"
        bind:value={investorRole}
      >
        <option value="" disabled selected>Ideal Investor Role</option>
        <option>None</option>
        <option>Weekly</option>
        <option>Monthly</option>
      </select>
      <Tooltip
        class=" bg-primary-light text-black duration-500"
        trigger="click"
        placement="top-end"
        >How involved do you want the investor to be?</Tooltip
      >
      <div class="flex items-center rounded-lg bg-slate-200 mb-5">
        <img
          src="/images/birr-icon-2.png"
          alt=""
          class="  object-contain size-9 w-20"
        />
        <select
          class="select select-bordered w-full text-black font-bold"
          bind:value={previousRound}
        >
          <option disabled selected value=""
            >If you did previous round, How much did you raise?</option
          >
          <option>100,000</option>
          <option>150,000</option>
          <option>300,000</option>
        </select>
      </div>

      <div class="flex items-center rounded-lg bg-slate-200 mb-5">
        <img
          src="/images/birr-icon-2.png"
          alt=""
          class="  object-contain size-9 w-20"
        />
        <select
          class="select select-bordered w-full text-black font-bold"
          bind:value={totalRaising}
        >
          <option disabled selected value=""
            >How much are you raising in total, in this?</option
          >
          <option>100,000</option>
          <option>150,000</option>
          <option>300,000</option>
        </select>
      </div>

      <div class="flex items-center rounded-lg bg-slate-200 mb-5">
        <img
          src="/images/birr-icon-2.png"
          alt=""
          class="  object-contain size-9 w-20"
        />
        <select
          class="select select-bordered w-full text-black font-bold"
          bind:value={raisedTillNow}
        >
          <option disabled selected value=""
            >How much of this total have you raised till now?</option
          >
          <option>100,000</option>
          <option>150,000</option>
          <option>300,000</option>
        </select>
      </div>

      <div class="flex items-center rounded-lg bg-slate-200 mb-5">
        <img
          src="/images/birr-icon-2.png"
          alt=""
          class="  object-contain size-9 w-20"
        />
        <select
          class="select select-bordered w-full text-black font-bold"
          bind:value={minimumInvestment}
        >
          <option disabled selected value=""
            >What is the minimum investment per investor?</option
          >
          <option>100,000</option>
          <option>150,000</option>
          <option>300,000</option>
        </select>
      </div>

      <div class="flex flex-col text-start mt-7">
        <h2 class="text-black font-bold">
          Do you have any tax relief available in this funding round?
        </h2>
        <div class="flex">
          <div class="form-control flex">
            <label class="label cursor-pointer">
              <span class="label-text font-semibold mr-1">100% FCE</span>
              <input type="checkbox" bind:checked={fce} class="checkbox" />
            </label>
          </div>
          <div class="form-control flex">
            <label class="label cursor-pointer">
              <span class="label-text font-semibold mr-1">Tax Holiday</span>
              <input
                type="checkbox"
                bind:checked={taxHoliday}
                class="checkbox"
              />
            </label>
          </div>
        </div>
      </div>
      <div class=" divider my-0 py-0"></div>
      <button
        type="button"
        class="btn glass bg-primary w-1/2 mt-3"
        on:click={handleSubmit}>Save & Continue</button
      >
    </form>
  </div>
</div>

<style>
  .input-bordered:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
</style>
