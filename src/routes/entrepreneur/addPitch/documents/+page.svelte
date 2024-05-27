<script lang="ts">
  import type { PageData } from "./$types";
  import { addStartupFormData } from "$lib/stores/addStartupFormData";
  import { get } from "svelte/store";
  import {
    createStartup,
    updateStartupPitchDeal,
    addTeamMemberWithImage,
    uploadStartupImage,
    uploadStartupVideo,
    uploadStartupDocument,
  } from "$lib/api";

  // Declare file variables
  let businessPlan: File | null = null;
  let financials: File | null = null;
  let pitchDeck: File | null = null;
  let executiveSummary: File | null = null;
  let additionalDocument: File | null = null;

  export let data: PageData;

  // Function to handle file input changes
  function handleFileChange(event: Event, fileType: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      switch (fileType) {
        case "businessPlan":
          businessPlan = file;
          break;
        case "financials":
          financials = file;
          break;
        case "pitchDeck":
          pitchDeck = file;
          break;
        case "executiveSummary":
          executiveSummary = file;
          break;
        case "additionalDocument":
          additionalDocument = file;
          break;
      }
    }
  }

  // Function to handle form submission
  // Function to handle form submission
  async function handleSubmit() {
    addStartupFormData.update((currentData) => {
      return {
        ...currentData,
        step5: {
          businessPlan,
          financials,
          pitchDeck,
          executiveSummary,
          additionalDocument,
        },
      };
    });

    // Extract step1, step2, and step3 data from the store
    const { step1, step2, step3 } = get(addStartupFormData);

    // Format the step1 data as required by the backend API
    const formattedData = {
      pitchTitle: step1.pitchTitle, // This should be dynamically set if available
      website: step1.website,
      location: step1.companyLocation,
      mobileNumber: step1.phoneNumber,
      industry1: step1.industry1,
      industry2: step1.industry2,
      stage: step1.companyStage,
      idealInvestorRole: step1.investorRole,
      previousRoundAmount: parseInt(step1.previousRound.replace(/,/g, "")),
      totalRaisingAmount: parseInt(step1.totalRaising.replace(/,/g, "")),
      raisedAmount: parseInt(step1.raisedTillNow.replace(/,/g, "")),
      minimumInvestment: parseInt(step1.minimumInvestment.replace(/,/g, "")),
      taxRelief: step1.taxRelief.taxHoliday ? "tax-holiday" : "no-tax-holiday",
    };

    try {
      // Call the createStartup function with the formatted data
      const response = await createStartup(formattedData);
      console.log("Startup created successfully:", response);

      const startupId = response.startup_id;

      // Format the step2 data as required by the backend API
      const pitchDealData = {
        short_summary: step2.shortSummary,
        business_description: step2.theBusiness,
        market_description: step2.theMarket,
        progress_proof: step2.progressProof,
        objectives_future: step2.objectivesFuture,
        highlights: step2.highlights,
        deal_type: step2.dealType.loan ? "Loan" : "Equity Investment",
        deal_description: step2.dealDescription,
      };

      // Call the updateStartupPitchDeal function with the formatted data
      const pitchDealResponse = await updateStartupPitchDeal(
        startupId,
        pitchDealData,
      );
      console.log(
        "Startup pitch deal updated successfully:",
        pitchDealResponse,
      );

      // Extract the team members data
      const { teamOverview } = step3;
      const { teamMembers } = get(addStartupFormData);

      // Add each team member
      for (const member of teamMembers) {
        const teamMemberData = {
          startupId,
          name: member.name,
          linkedin: member.linkedin,
          position: member.position,
          bio: member.bio,
          image: member.image,
        };

        const teamMemberResponse = await addTeamMemberWithImage(teamMemberData);
        console.log("Team member added successfully:", teamMemberResponse);
      }

      // Continue to the next steps as required
    } catch (error) {
      console.error("Error during submission:", error);
    }

    // Log the updated store data for debugging purposes
    console.log(get(addStartupFormData));
  }
</script>

<div
  class="flex flex-col items-start w-full max-w-2xl mx-auto justify-between p-0 transition-all duration-1000 text-black"
>
  <h1 class="self-center text-lg font-bold text-primary-dark">5. Documents</h1>
  <div class="divider my-0 py-0"></div>
  <div class="text-left font-semibold w-3/5 flex flex-col gap-1">
    <div>
      <span>Business Plan</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
        on:change={(event) => handleFileChange(event, "businessPlan")}
      />
    </div>
    <div class="divider my-0 py-0"></div>
    <div>
      <span>Financials</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
        on:change={(event) => handleFileChange(event, "financials")}
      />
    </div>
    <div class="divider my-0 py-0"></div>
    <div>
      <span>Pitch Deck</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
        on:change={(event) => handleFileChange(event, "pitchDeck")}
      />
    </div>
    <div class="divider my-0 py-0"></div>
    <div>
      <span>Executive Summary</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
        on:change={(event) => handleFileChange(event, "executiveSummary")}
      />
    </div>
    <div class="divider my-0 py-0"></div>
    <div>
      <span>Additional Document</span>
      <input
        type="file"
        accept=".pdf,.ppt,.pptx"
        class="file-input file-input-primary file-input-sm w-full bg-primary-light"
        on:change={(event) => handleFileChange(event, "additionalDocument")}
      />
    </div>
  </div>
  <div class="divider my-0 py-0 mt-3"></div>
  <button
    type="submit"
    class="btn glass bg-primary w-1/2 mx-auto"
    on:click={handleSubmit}
  >
    Submit Startup
  </button>
</div>
