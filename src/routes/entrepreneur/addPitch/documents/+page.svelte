<script lang="ts">
  import type { PageData } from "./$types";
  import { addStartupFormData } from "$lib/stores/addStartupFormData";
  import { get } from "svelte/store";
  import { Stretch } from "svelte-loading-spinners";
  import { Toaster, toast } from "svelte-sonner";

  import {
    createStartup,
    updateStartupPitchDeal,
    addTeamMemberWithImage,
    uploadStartupImage,
    uploadStartupVideo,
    uploadStartupDocument,
  } from "$lib/api";
  import { goto } from "$app/navigation";

  let isLoading = false;

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
    isLoading = true;
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
      const response = await createStartup(formattedData);
      console.log("Startup created successfully:", response);

      const startupId = response.startup_id;

      try {
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

        const pitchDealResponse = await updateStartupPitchDeal(
          startupId,
          pitchDealData,
        );
        console.log(
          "Startup pitch deal updated successfully:",
          pitchDealResponse,
        );

        const { teamOverview } = step3;
        const { teamMembers } = get(addStartupFormData);

        try {
          for (const member of teamMembers) {
            const teamMemberData = {
              startupId,
              name: member.name,
              linkedin: member.linkedin,
              position: member.position,
              bio: member.bio,
              image: member.image,
            };

            const teamMemberResponse =
              await addTeamMemberWithImage(teamMemberData);
            console.log("Team member added successfully:", teamMemberResponse);
          }
        } catch (error) {
          toast.error(
            "An error occurred while adding a team member. Please try again.",
          );
          throw error; // Re-throw the error to stop further execution
        }

        const { step4 } = get(addStartupFormData);
        const { bannerImage, logo, otherImages, video } = step4;

        try {
          const videoUploadResponse = await uploadStartupVideo(
            startupId,
            video,
          );
          console.log(
            "Startup video uploaded successfully:",
            videoUploadResponse,
          );
        } catch (error) {
          toast.error(
            "An error occurred while uploading the startup video. Please try again.",
          );
          throw error;
        }

        try {
          const logoUploadResponse = await uploadStartupImage(
            startupId,
            "logo",
            logo,
          );
          console.log(
            "Startup logo uploaded successfully:",
            logoUploadResponse,
          );
        } catch (error) {
          toast.error(
            "An error occurred while uploading the logo. Please try again.",
          );
          throw error;
        }

        try {
          const bannerImageUploadResponse = await uploadStartupImage(
            startupId,
            "bannerImage",
            bannerImage,
          );
          console.log(
            "Startup banner image uploaded successfully:",
            bannerImageUploadResponse,
          );
        } catch (error) {
          toast.error(
            "An error occurred while uploading the banner image. Please try again.",
          );
          throw error;
        }

        try {
          for (const otherImage of otherImages) {
            const otherImageUploadResponse = await uploadStartupImage(
              startupId,
              "otherImages",
              otherImage,
            );
            console.log(
              "Startup other image uploaded successfully:",
              otherImageUploadResponse,
            );
          }
        } catch (error) {
          toast.error(
            "An error occurred while uploading other images. Please try again.",
          );
          throw error;
        }

        const documents = [
          { file: businessPlan, type: "business-plan" },
          { file: financials, type: "financials" },
          { file: pitchDeck, type: "pitch-deck" },
          { file: executiveSummary, type: "executive-summary" },
          { file: additionalDocument, type: "additional-document" },
        ];

        try {
          for (const { file, type } of documents) {
            if (file) {
              const formData = new FormData();
              formData.append("document", file);
              const documentUploadResponse = await uploadStartupDocument(
                startupId,
                type,
                formData,
              );
              console.log(
                `Startup ${type} uploaded successfully:`,
                documentUploadResponse,
              );
            }
          }
        } catch (error) {
          toast.error(
            "An error occurred while uploading a document. Please try again.",
          );
          throw error;
        }

        goto("/entrepreneur/me/myPitches");
      } catch (error) {
        // Errors from inner try-catch blocks will be caught here if they are re-thrown
        console.error("Error during submission:", error);
      }
    } catch (error) {
      toast.error(
        "An error occurred while creating the startup. Please try again.",
      );
      console.error("Error during startup creation:", error);
    } finally {
      isLoading = false;
    }

    // Log the updated store data for debugging purposes
    console.log(get(addStartupFormData));
  }
</script>

<Toaster richColors />

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
    disabled={isLoading}
  >
    {#if isLoading}
      <Stretch size="30" color="#fff" unit="px" />
    {:else}
      Submit Startup
    {/if}
  </button>
</div>
