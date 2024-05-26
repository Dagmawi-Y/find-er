<script lang="ts">
  import { Tooltip } from "flowbite-svelte";
  import HighlightInput from "$lib/components/highlightsInput/HighlightInput.svelte";
  import type { PageData } from "./$types";
  import TagInput from "$lib/components/tagInput/TagInput.svelte";

  export let data: PageData;

  let form: HTMLFormElement;

  let shortSummary = "";
  let theBusiness = "";
  let theMarket = "";
  let progressProof = "";
  let objectivesFuture = "";
  let highlights = "";
  let dealType = "";
  let dealDescription = "";

  const calculateRemainingChars = (value: string, maxLength: number) => {
    return maxLength - value.length;
  };

  const handleSubmit = () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
</script>

<div
  class="flex flex-col items-start w-full max-w-2xl mx-auto justify-between p-0 transition-all duration-1000"
>
  <h1 class="self-center text-lg font-bold text-primary-dark">
    2. Pitch & Deal
  </h1>
  <div class=" divider my-0 py-0"></div>
  <div class="w-full px-4 mt-0">
    <form
      bind:this={form}
      novalidate
      on:submit|preventDefault={handleSubmit}
      class="text-black"
    >
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">Short Summary</span>
          <span class="label-text-alt text-xs">
            {calculateRemainingChars(shortSummary, 450)} characters remaining
          </span>
        </div>
        <textarea
          placeholder="Short Summary"
          class="input input-bordered w-full border-none h-24 text-top whitespace-pre-wrap p-2 min-h-20"
          maxlength="450"
          bind:value={shortSummary}
          required
        ></textarea>
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-56 text-left "
          trigger="click"
          placement="bottom-end"
        >
          How would you sell your idea in a couple of sentences? Grab investor's
          attention and make your self stand out with a snappy introduction.
        </Tooltip>
      </label>
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">The Business</span>
          <span class="label-text-alt text-xs">
            {calculateRemainingChars(theBusiness, 100)} characters remaining
          </span>
        </div>
        <textarea
          placeholder="The Business"
          class="input input-bordered w-full border-none h-24 text-top whitespace-pre-wrap p-2 min-h-20"
          maxlength="450"
          bind:value={theBusiness}
          required
        ></textarea>
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-56 text-left"
          trigger="click"
          placement="bottom-end"
        >
          This section is for you to explain your business. Here are some
          questions to consider answering: What does your business do? What
          product or service do you provide? Does it solve a problem? How does
          it work? How is it beneficial for its users/customers?
        </Tooltip>
      </label>
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">The Market</span>
          <span class="label-text-alt text-xs">
            {calculateRemainingChars(theMarket, 450)} characters remaining
          </span>
        </div>
        <textarea
          placeholder="The Business"
          class="input input-bordered w-full border-none h-24 text-top whitespace-pre-wrap p-2 min-h-20"
          maxlength="450"
          bind:value={theMarket}
          required
        ></textarea>
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-80 text-left"
          trigger="click"
          placement="bottom-end"
        >
          “Next up, talk about the state of the market your business is in.
          Again see how many of these you can answer, but don’t worry if they’re
          not all relevant to you… <br />How big is the market and the
          opportunity? Is the market growing? What are the trends? Who are your
          target customers? Who are your competitors (direct and indirect)? Do
          you have any unique selling points (USP) or competitive advantages?”
        </Tooltip>
      </label>
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">Progress/Proof</span>
          <span class="label-text-alt text-xs">
            {calculateRemainingChars(progressProof, 450)} characters remaining
          </span>
        </div>
        <textarea
          placeholder="The Business"
          class="input input-bordered w-full border-none h-24 text-top whitespace-pre-wrap p-2 min-h-20"
          maxlength="450"
          bind:value={progressProof}
          required
        ></textarea>
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-80 text-left"
          trigger="click"
          placement="bottom-end"
        >
          “Okay so we know about the business and the market. We now need to
          know about your progress – how’s it actually going so far?<br />
          Do you have a prototype, finished product or website? Have you received
          any positive feedback from users or industry experts? What research have
          you done? Do you have any pre-orders or potential clients lined up? Do
          you already have any confirmed clients or users? Do you have any social
          media followers? Have you been featured in the press? Have you won any
          awards? Do you have patents? Are you generating any revenues yet? Are you
          profitable? Show the investors how great your company is already!”
        </Tooltip>
      </label>
      <label class="form-control w-full mt-3">
        <div class="label">
          <span class="label-text font-bold">Objectives/Future</span>
          <span class="label-text-alt text-xs">
            {calculateRemainingChars(objectivesFuture, 450)} characters remaining
          </span>
        </div>
        <textarea
          placeholder="The Business"
          class="input input-bordered w-full border-none h-24 text-top whitespace-pre-wrap p-2 min-h-20"
          maxlength="450"
          bind:value={objectivesFuture}
          required
        ></textarea>
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-80 text-left"
          trigger="click"
          placement="bottom-end"
        >
          “Here’s the exciting bit, where is your company heading? What are your
          short-term goals? Where do you see the business in 3-5 years’ time?
          What’s your go-to-market or expansion strategy? Who do you need to
          hire to achieve this?”
        </Tooltip>
      </label>
      <div class=" flex flex-col text-left mt-4">
        <span class=" font-semibold">Highlights</span>
        <HighlightInput number="1" />
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-80 text-left"
          trigger="click"
          placement="bottom-end"
        >
          “Here’s where you really sell it. What are the best bits about your
          business? What proves that your company is awesome? What would
          convince you to invest if you were an investor?<br />
          e.g. <br />
          • We have a working testable prototype. <br />
          • Beta website launched<br />
          • Very positive feedback from potential customers<br />
          • In contact with a large retail chain<br />
          • Excellent experienced team assembled <br />
          • We have sold 50,000 units and are selling in top high street chains<br
          />
          • Our membership is growing at 10% per month<br />
          • We have high profile clients such as Apple <br />
          • Profitable for 6 months<br />
          Remember, investors will look at this section first when deciding whether
          to give your pitch more attention. Make it count!”<br />
        </Tooltip>
        <HighlightInput number="2" />
        <HighlightInput number="3" />
        <HighlightInput number="4" />
        <HighlightInput number="5" />
      </div>

      <label class="form-control w-full mt-3">
        <div class="label">
          <div class=" flex flex-col text-left">
            <span class="label-text font-bold mb-2">The Deal</span>
            <div class=" flex gap-3">
              <label class=" label"
                ><input type="checkbox" checked="checked" class="checkbox" />
                <span class="label-text font-semibold mr-1">Equity</span></label
              >
              <label class="label">
                <input type="checkbox" checked="checked" class="checkbox" />
                <span class="label-text font-semibold mr-1">Loan</span></label
              >
            </div>
          </div>

          <span class="label-text-alt text-xs">
            {calculateRemainingChars(objectivesFuture, 450)} characters remaining
          </span>
        </div>
        <textarea
          placeholder="Some details about the deal here"
          class="input input-bordered w-full border-none h-24 text-top whitespace-pre-wrap p-2 min-h-20"
          maxlength="450"
          bind:value={objectivesFuture}
          required
        ></textarea>
        <Tooltip
          class="bg-primary-light text-black duration-500 max-w-80 text-left"
          trigger="click"
          placement="bottom-end"
        >
          “Very simply, what equity percentage are you willing to give away in
          return for the investment? Or if you want a loan, what terms are you
          offering? You might also like to go into more detail about what you’re
          going to use the funding for…”
        </Tooltip>
      </label>
      <TagInput />
      <Tooltip
        class="bg-primary-light text-black duration-500 max-w-80 text-left"
        trigger="click"
        placement="bottom-end"
      >
        Enter 5 to 10 relevant keywords. These are really important to help
        investors find your pitch in our search engine. We always suggest using
        short and obvious tags that you think investors would actually search
        for. - (Press the Return key after each keyword to enter it)
      </Tooltip>
      <div class=" divider my-0 py-0"></div>
      <button
        type="button"
        class="btn glass bg-primary w-1/2 mt-3"
        on:click={handleSubmit}>Save & Continue</button
      >
    </form>
  </div>
</div>
