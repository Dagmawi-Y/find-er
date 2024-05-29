<script lang="ts">
  import { Grid } from "@svelteuidev/core";
  import { SimpleGrid } from "@svelteuidev/core";
  import { Center } from "@svelteuidev/core";
  import Typewriter from "svelte-typewriter";
  import { CaretDownSolid } from "flowbite-svelte-icons";
  import NavBar from "$lib/components/navBar/NavBar.svelte";
  import StartupCard from "$lib/components/startupCard/StartupCard.svelte";
  import InvestorCard from "$lib/components/investorCard/InvestorCard.svelte";
  import FeaturedSectionImage from "$lib/components/featuredSectionImage/FeaturedSectionImage.svelte";
  import TestimonialsSlider from "$lib/components/testimonialsSlider/TestimonialsSlider.svelte";
  import IndustryCard from "$lib/components/industryCard/IndustryCard.svelte";
  import Footer from "$lib/components/footer/Footer.svelte";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import { getIndustries, getAllStartups, getAllInvestors } from "$lib/api";
  import { onMount } from "svelte";
  import { TypewriterEffectSmooth } from "$lib/components/ui/TypewriterEffect/index";
  import AddCard from "$lib/components/addCard/AddCard.svelte";

  import { get } from "svelte/store";
  import { goto } from "$app/navigation";
  import { userStore } from "$lib/stores/userStore"; // Adjust this import based on your project structure
  // other imports...

  let user: any;

  userStore.subscribe((value) => {
    user = value.user;
  });

  // const words = [
  //   {
  //     text: "Build",
  //   },
  //   {
  //     text: "awesome",
  //   },
  //   {
  //     text: "apps",
  //   },
  //   {
  //     text: "with",
  //   },
  //   {
  //     text: "Aceternity.",
  //     className: "text-blue-500 dark:text-blue-500",
  //   },
  // ];

  /**
   * @type {any[]}
   */
  let startups: any = [];

  let investors = [];
  async function fetchInvestors() {
    try {
      investors = await getAllInvestors();
      console.log(investors);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  }

  // Fetch startups when the component is mounted
  async function fetchStartups() {
    try {
      startups = await getAllStartups();
      console.log("Fetched startups:", startups); // Log the fetched startups
    } catch (error) {
      console.error("Error fetching startups:", error);
    }
  }

  let selectedOption = "Invest";
  let showAllIndustries = false;

  let industries: any = [];

  const handleOptionChange = (option: any) => {
    selectedOption = option;
  };

  const toggleIndustries = () => {
    showAllIndustries = !showAllIndustries;
  };

  onMount(async () => {
    try {
      const data = await getIndustries();
      industries = data;
      fetchStartups();
      fetchInvestors();
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  });
  console.log({ startups });
</script>

<div>
  <NavBar />
  <div
    class="hero h-screen"
    style="background-image: url(https://images.unsplash.com/photo-1624314138470-5a2f24623f10);"
  >
    <div class="hero-overlay bg-opacity-78"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">
          <div class="text-primary mb-2">
            <Typewriter mode="loop" interval={50} class="custom-typewriter">
              <span>Invest In</span>
              <span>Fundraise With</span>
              <span>Help Build</span>
            </Typewriter>
          </div>
          The<span
            class="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary animate-gradient-x"
          >
            {" "}New</span
          > Ethiopian Startup Ecosystem
        </h1>
        <p class="mb-2 font-semibold">
          Where extraordinary ventures connect with exceptional individuals. Our
          platform facilitates the union of businesses in search of investment
          with investors equipped with the capital, connections, and expertise
          to foster their success.
        </p>
        <div class="flex items-center justify-center mb-4">
          {#if !user?.isAuthenticated || (user?.role !== "entrepreneur" && user?.role !== "investor" && user?.role !== "engager")}
            <h2>I'm looking to</h2>
            <div class="dropdown dropdown-hover">
              <div
                tabindex="0"
                role="button"
                class="btn custom-btn mx-2 bg-secondary border-none my-2"
              >
                {selectedOption}<CaretDownSolid />
              </div>
              <ul
                tabindex="-1"
                class="dropdown-content z-[1] menu py-2 px-1 shadow bg-secondary rounded-md w-52 ml-2 text-black"
              >
                <li>
                  <a href="/" on:click={() => handleOptionChange("Invest")}
                    >Invest</a
                  >
                </li>
                <div class="divider my-0"></div>
                <li>
                  <a href="/" on:click={() => handleOptionChange("Fundraise")}
                    >Fundraise</a
                  >
                </li>
              </ul>
            </div>
          {/if}
        </div>
        <button
          class="btn btn-primary p-0 px-10 hover:glow-primary hover:scale-105 transition-all duration-300 hover:text-white"
          on:click={() =>
            goto(
              user?.isAuthenticated
                ? user?.role === "entrepreneur"
                  ? "/entrepreneur/me/myPitches"
                  : user?.role === "investor"
                    ? "/investor/me/myPortfolio"
                    : user?.role === "engager"
                      ? "/engager/me/explore"
                      : "#"
                : "#",
            )}
        >
          {user?.isAuthenticated
            ? user?.role === "entrepreneur"
              ? "Get Funded"
              : user?.role === "investor"
                ? "Invest"
                : user?.role === "engager"
                  ? "Explore"
                  : "Get Started"
            : "Get Started"}
        </button>
      </div>
    </div>
  </div>

  <div class="bg-slate-200">
    <Center>
      <div class=" text-center">
        <h2 class=" font-semibold text-2xl mt-20">
          Looking for investment opportunities?
        </h2>
        <p>
          Browse our latest exciting startup pitches and connect with
          entrepreneurs to discuss further.
        </p>
      </div>
    </Center>
    <div class=" mt-10">
      <Center>
        <SimpleGrid
          breakpoints={[
            { maxWidth: 1240, cols: 2, spacing: "md" },
            { maxWidth: 980, cols: 2, spacing: "md" },
            { maxWidth: 755, cols: 1, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
          cols={3}
        >
          {#each startups as startup}
            <StartupCard
              id={startup.id}
              ownerId={startup.user_id}
              upvotes={startup.upvotes.length}
              imageUrl={startup.images_videos?.find(
                (media) => media.image_url !== null,
              )?.image_url}
              title={startup.pitch_title}
              location={startup.location}
              description={startup.pitch_deal?.short_summary}
              highlights={startup.pitch_deal?.highlights?.split(", ")}
              totalRequired={startup.total_raising_amount}
              minPerInvestor={startup.minimum_investment}
              currencySymbol="Birr"
            />
          {/each}
        </SimpleGrid>
      </Center>
      <div class=" text-center">
        <p class=" text-lg font-semibold">
          Browse business ideas, startups and larger companies from all over the
          country
        </p>
        <div class=" text-primary my-5 pb-10">
          <a href="http://">View latest startups</a>
        </div>
      </div>
    </div>
  </div>

  <div class="  mb-16">
    <Center><h1 class=" font-bold text-3xl my-14">Featured In</h1></Center>
    <Center
      ><Grid spacing={50} cols={5} grow={true}>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/chapa-logo.png" />
        </Grid.Col>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/dashen-logo.png" />
        </Grid.Col>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/gasha-logo.png" />
        </Grid.Col>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/inno-logo.png" />
        </Grid.Col>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/kacha-logo.png" />
        </Grid.Col>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/ride-logo.png" />
        </Grid.Col>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/telebirr-logo.png" />
        </Grid.Col>
        <Grid.Col span={1}>
          <FeaturedSectionImage imagePath="images/zemen-logo.png" />
        </Grid.Col>
      </Grid></Center
    >
  </div>

  <div class="bg-slate-200">
    <Center>
      <div class=" text-center">
        <h2 class=" font-semibold text-2xl mt-20 mb-5">
          Join our growing community of entrepreneurs and investors
        </h2>
        <p>
          We help investors and entrepreneurs build lasting and profitable
          relationships to build better businesses and brighter futures.
        </p>
      </div>
    </Center>
    <div class=" mt-10">
      <Center>
        <SimpleGrid
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
          cols={3}
        >
          {#if investors.length === 0}
            <p>Loading...</p>
          {:else}
            {#each investors as investor}
              <InvestorCard
                investor={{
                  name:
                    investor.investorProfile.first_name +
                    " " +
                    investor.investorProfile.last_name,
                  location: investor.investorProfile.town_city,
                  profilePicture: investor.investorProfile.profile_image_url,
                  investmentRange:
                    investor.investorInterests.investment_criteria,
                  bio: investor.investorProfile.about_me,
                  areasOfExpertise:
                    investor.investorInterests.areas_of_expertise,
                  minimumInvestment:
                    investor.investorProfile.minimum_investment,
                  maximumInvestment:
                    investor.investorProfile.maximum_investment,
                }}
              />
            {/each}
          {/if}
        </SimpleGrid>
      </Center>
    </div>
  </div>
  <Center>
    <div class="text-center mt-7">
      <h1 class="font-bold text-2xl mb-4">Our Industries</h1>
      <p class="font-semibold mb-5">
        We connect investors with startups and businesses from all sectors to
        ensure the relationship is valuable to both parties.
      </p>
    </div>
  </Center>
  <Center>
    <SimpleGrid
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "md" },
        { maxWidth: 755, cols: 2, spacing: "sm" },
        { maxWidth: 600, cols: 1, spacing: "sm" },
      ]}
      cols={3}
    >
      {#each industries.slice(0, showAllIndustries ? industries.length : 6) as industry, index (industry.id)}
        <div
          class="transition-all duration-500 ease-in-out"
          class:opacity-0={!showAllIndustries && index >= 6}
          class:opacity-100={showAllIndustries || index < 6}
          class:scale-0={!showAllIndustries && index >= 6}
          class:scale-100={showAllIndustries || index < 6}
        >
          <IndustryCard
            imageSrc={industry.industry_image_url}
            industryName={industry.industry_name}
          />
        </div>
      {/each}
    </SimpleGrid>
  </Center>
  <Center>
    <button
      class="btn btn-primary mt-6 transition-all duration-300 hover:scale-105 my-4"
      on:click={toggleIndustries}
    >
      {showAllIndustries ? "Show Less" : "See More Industries"}
    </button>
  </Center>

  <div class=" bg-slate-200 py-10">
    <Center>
      <div class=" text-center">
        <h1 class=" text-3xl font-bold mt-20 mb-5">What our customers say</h1>
        <p>
          Over the past 15 years we’ve raised funding for thousands of
          businesses who have been kind enough to recognise our support:
        </p>
      </div>
    </Center>
    <div class=" mx-auto w-2/3 my-10">
      <Splide
        options={{
          type: "loop",
          gap: "1rem",
          rewindSpeed: 100,
          autoplay: true,
          interval: 3000,
        }}
      >
        <SplideSlide>
          <TestimonialsSlider />
        </SplideSlide>
        <SplideSlide>
          <TestimonialsSlider />
        </SplideSlide>
      </Splide>
    </div>
    <div class="flex items-center justify-center my-7">
      <h2>I'm looking to</h2>
      <div class="dropdown dropdown-hover">
        <div
          tabindex="0"
          role="button"
          class="btn custom-btn mx-2 bg-secondary border-none my-2"
        >
          {selectedOption}<CaretDownSolid />
        </div>
        <ul
          tabindex="-1"
          class="dropdown-content z-[1] menu py-2 px-1 shadow bg-secondary rounded-md w-52 ml-2 text-black"
        >
          <li>
            <a href="/" on:click={() => handleOptionChange("Invest")}>Invest</a>
          </li>
          <div class=" divider my-0"></div>
          <li>
            <a href="/" on:click={() => handleOptionChange("Fundraise")}
              >Fundraise</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Footer />
</div>

<style>
  .custom-typewriter {
    --cursor-width: 1px; /* Adjust the value as needed */
  }
  body {
    background-color: rgb(242, 242, 242);
  }
  @keyframes gradient-x {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient-x {
    animation: gradient-x 1s ease infinite;
  }
</style>
