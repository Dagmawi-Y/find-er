<script>
  export let investor = {
    name: "",
    location: "",
    profilePicture: "",
    investmentRange: "",
    bio: "",
    areasOfExpertise: [],
    minimumInvestment: "...",
    maximumInvestment: "...",
  };
</script>

<div class="card w-96 bg-base-100 shadow-xl mb-7">
  <div class="card-body">
    <div class="flex items-center">
      <figure class="avatar mr-4">
        <div class="w-16 rounded-full">
          <img src={investor.profilePicture} alt="Profile Picture" />
        </div>
      </figure>
      <div class="">
        <h2 class="card-title font-bold">{investor.name}</h2>
        <p>{investor.location}</p>
      </div>
    </div>
    <div class="divider bg-primary p-0 m-0 h-1 border-primary mt-4"></div>
    <div class="mt-4">
      <p class="font-bold">Investment Range</p>
      {investor.minimumInvestment} - {investor.maximumInvestment}
    </div>
    <div class="mt-2">
      <p class="text-sm">{investor.bio}</p>
    </div>
    <div class="mt-4">
      <p class="font-bold">Areas of Expertise</p>
      <p class="text-sm">{investor.areasOfExpertise}</p>
    </div>
    <div class="card-actions mt-4 justify-start">
      <button class="btn btn-primary h-4">More details</button>
    </div>
  </div>
</div>
