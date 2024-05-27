<script>
  import { MapPinAltSolid } from "flowbite-svelte-icons";
  import { Li, List, Heading } from "flowbite-svelte";
  import { LabelSolid } from "flowbite-svelte-icons";

  export let imageUrl =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa";
  export let title = "IdeaSpring Angel Network";
  export let location = "Addis Ababa, Ethiopia";
  export let description =
    "Go Zero are unifying Electric Vehicle (EV) charging at a disruptive scale. Unique sales angles and massive market potential. Integrated software solution for destinations, workplaces & homes...100% not 'another' EV charging company. EIS investment.";
  export let highlights = [
    "We are running 800+ live EV chargers across homes and destinations",
    "We are running 800+ live EV chargers across homes and destinations",
    "We are running 800+ live EV chargers across homes and destinations",
  ];
  export let totalRequired = 1000000;
  export let minPerInvestor = 50000;
  export let currencySymbol = "Birr";
</script>

<div
  class="card w-96 bg-base-100 shadow-xl mt-0 mb-10 hover:glow-primary hover:scale-105 transition-all duration-300 mx-3"
>
  <figure class="  max-h-32 object-cover">
    <img src={imageUrl} alt="Shoes" />
  </figure>
  <div class="card-body py-4 px-5">
    <h2 class="card-title">{title}</h2>
    <div class=" flex">
      <MapPinAltSolid class=" text-primary size-5" />
      <p>{location}</p>
    </div>
    <div class="divider bg-primary p-0 m-0 h-1/6 border-primary my-1"></div>
    <p class=" font-normal">{description.slice(0, 100) + "..."}</p>
    <List tag="ol" class="space-y-2 text-xs  my-3  font-bold">
      {#each highlights as highlight}
        <Li>
          <div class=" flex">
            <LabelSolid />
            <p>{highlight}</p>
          </div>
        </Li>
      {/each}
    </List>
    <div class=" flex justify-between mr-10">
      <div>
        <h1 class=" font-bold">{currencySymbol} {totalRequired}</h1>
        <p>Total Required</p>
      </div>
      <div>
        <h1 class=" font-bold">{currencySymbol} {minPerInvestor}</h1>
        <p>Min. Per Investor</p>
      </div>
    </div>
    <div class="card-actions justify-start">
      <button class=" btn btn-primary h-8 my-3">Find out more</button>
    </div>
  </div>
</div>
