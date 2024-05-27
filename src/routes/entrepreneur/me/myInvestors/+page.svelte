<script lang="ts">
  import { Tabs } from "@svelteuidev/core";
  import AddCard from "$lib/components/addCard/AddCard.svelte";
  import { SimpleGrid } from "@svelteuidev/core";
  import { Heart, Bookmark, MagicWand } from "radix-icons-svelte";
  import InvestorCard from "$lib/components/investorCard/InvestorCard.svelte";
</script>

<div class="flex pt-5">
  <Tabs color="#BA6E00">
    <Tabs.Tab label="Interested" icon={Heart}>
      <div class="flex mt-4">
        <SimpleGrid
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
          cols={3}
        >
          <AddCard
            height="445px"
            width=" w-96"
            text="You don't have any investors interested yet. Make sure your pitch is well filled in.
      Then search the investors and get nudging!"
          />
          <InvestorCard />
        </SimpleGrid>
      </div>
    </Tabs.Tab>
    <Tabs.Tab label="Shortlisted" icon={Bookmark}
      ><SimpleGrid
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
        cols={3}
      >
        <AddCard
          height="445px"
          width=" w-96"
          text="You don't have any investors interested yet. Make sure your pitch is well filled in.
  Then search the investors and get nudging!"
        />
        <InvestorCard />
      </SimpleGrid></Tabs.Tab
    >
    <Tabs.Tab label="Nudged" icon={MagicWand}
      ><SimpleGrid
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
        cols={3}
      >
        <AddCard
          height="445px"
          width=" w-96"
          text="You don't have any investors interested yet. Make sure your pitch is well filled in.
  Then search the investors and get nudging!"
        />
        <InvestorCard />
      </SimpleGrid></Tabs.Tab
    >
  </Tabs>
</div>
