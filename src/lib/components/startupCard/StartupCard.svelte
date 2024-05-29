<script lang="ts">
  import { MapPinAltSolid } from "flowbite-svelte-icons";
  import { Li, List, Heading } from "flowbite-svelte";
  import { LabelSolid } from "flowbite-svelte-icons";
  import { ArrowUpOutline } from "flowbite-svelte-icons";
  import {
    upvoteStartup,
    getStartupUpvotes,
    commentOnStartup,
    getCommentsForStartup,
  } from "$lib/api";
  import { goto } from "$app/navigation";
  import { Drawer } from "vaul-svelte";
  import { MessageCircleCode } from "lucide-svelte";
  import { onMount } from "svelte";

  import { getContext } from "svelte";
  import { userStore } from "$lib/stores/userStore"; // Import the user store

  export let id: number; // Add ID prop
  export let upvotes: number;
  export let imageUrl =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa";
  export let title = "[Test data]";
  export let location = "[Test data]";
  export let description = "[Test data]";
  export let highlights = ["[Test data]", "[Test data]", "[Test data]"];
  export let totalRequired = "fake 10";
  export let minPerInvestor = "fake 100";
  export let currencySymbol = "Birr";
  export let ownerId: number;

  let comments = []; // Initialize comments array
  let newComment = ""; // New comment input
  let isCommentsLoading = false; // Flag to track if comments are being loaded
  let isSubmitting = false; // Flag to track if comments are being loaded

  // Function to fetch comments for the startup
  async function fetchComments() {
    try {
      isCommentsLoading = true;
      comments = await getCommentsForStartup(id.toString());
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      isCommentsLoading = false;
    }
  }

  // Function to add a new comment
  async function addComment() {
    if (newComment.trim() !== "") {
      try {
        isSubmitting = true; // Set the submitting flag to true
        const response = await commentOnStartup(id.toString(), {
          comment: newComment,
        });
        if (response.error) {
          console.error(response.error);
        } else {
          comments = [response, ...comments]; // Add new comment to the top of the list
          newComment = ""; // Clear the input field
        }
      } catch (error) {
        console.error("Failed to add comment:", error);
      } finally {
        isSubmitting = false; // Set the submitting flag back to false
      }
    }
  }

  // Fetch comments when the component is mounted
  let isOwner = false;
  let isAuthenticated = false;
  const unsubscribe = userStore.subscribe((value) => {
    isAuthenticated = value.user?.isAuthenticated || false;
    isOwner = value.user?.id === ownerId;
  });

  onMount(() => {
    fetchComments();
    return () => {
      unsubscribe();
    };
  });

  function findMore() {
    goto(`/startup/${id}`); // Redirect to the detail page with the startup ID
  }

  let userHasUpvoted = false; // Track if the user has upvoted or not

  async function handleUpvote() {
    try {
      const response = await upvoteStartup(id.toString());
      if (response.message === "Upvote added") {
        userHasUpvoted = true;
        upvotes += 1; // Increment the upvote count
      } else if (response.message === "Upvote removed") {
        userHasUpvoted = false;
        upvotes -= 1; // Decrement the upvote count
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
    }
  }
</script>

<div
  class="card w-96 bg-base-100 shadow-xl mt-0 mb-10 hover:glow-primary hover:scale-105 transition-all duration-300 mx-3"
>
  <figure class="max-h-32 object-cover">
    <img src={imageUrl} alt="Startup Image" />
  </figure>
  <div class="card-body py-4 px-5">
    <div class=" flex justify-between items-center">
      <h2 class="card-title">{title}</h2>
      <div class=" flex gap-1 items-center">
        <!-- Upvote button -->
        {#if isAuthenticated && !isOwner}
          <button
            class="upvotes p-1 bg-primary-light hover:bg-primary h-8 rounded-md flex transition-all duration-300 font-semibold items-center justify-center"
            on:click={handleUpvote}
          >
            <ArrowUpOutline />{upvotes}
          </button>
        {:else}
          <div
            class="upvotes p-1 bg-primary-light h-8 rounded-md flex transition-all duration-300 font-semibold items-center justify-center"
          >
            <ArrowUpOutline />{upvotes}
          </div>
        {/if}

        <!-- Comment button -->
        <Drawer.Root>
          <Drawer.Trigger
            class="py-1 px-3 rounded-md h-8 items-center hover:bg-primary bg-primary-light flex justify-start"
          >
            <MessageCircleCode />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay class="fixed inset-0 bg-black/40" />
            <div class="flex justify-center">
              <Drawer.Content
                class="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 sm:w-1/2 h-3/4"
              >
                <div class="p-4 bg-white rounded-t-[10px] flex-1">
                  <div
                    class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-primary mb-8"
                  />
                  <div class="max-w-md mx-auto">
                    <Drawer.Title class="font-medium text-primary-dark"
                      >Comments on this startup...</Drawer.Title
                    >
                    <div class="divider my-0 py-0" />
                    {#if isAuthenticated && !isOwner}
                      <p class="font-semibold mb-2">Comment</p>
                      <input
                        type="text"
                        class="rounded-md max-w-xs h-8 px-3 py-2 bg-primary-light mb-3 border-none focus:outline-none no-focus-border"
                        bind:value={newComment}
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        class="px-2 py-1 bg-slate-100 rounded-md hover:bg-slate-400 glass mt-3"
                        on:click={addComment}
                        disabled={isSubmitting}
                      >
                        {#if isSubmitting}
                          <span>Submitting...</span>
                        {:else}
                          <span>Add Comment</span>
                        {/if}
                      </button>
                    {/if}
                  </div>
                </div>
                <div
                  class="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto overflow-y-auto"
                >
                  {#if isCommentsLoading}
                    <div class="text-center">Loading comments...</div>
                  {:else if comments.length === 0}
                    <div class="text-center">No comments yet.</div>
                  {:else}
                    <div class="flex flex-col gap-4">
                      {#each comments as comment}
                        <div class="bg-white p-4 rounded-md shadow-md">
                          <div class="flex items-center justify-between mb-2">
                            <div class="font-bold">
                              {comment.user.first_name}
                              {comment.user.last_name}
                            </div>
                            <div class="text-sm text-gray-500">
                              {new Date(comment.created_at).toLocaleString()}
                            </div>
                          </div>
                          <p>{comment.comment}</p>
                          {#if comment.replies.length > 0}
                            <div
                              class="mt-4 ml-4 border-l-2 border-gray-300 pl-2"
                            >
                              {#each comment.replies as reply}
                                <div class="bg-gray-100 p-2 rounded-md mb-2">
                                  <div class="font-bold">
                                    {reply.user.first_name}
                                    {reply.user.last_name}
                                  </div>
                                  <p>{reply.comment}</p>
                                </div>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              </Drawer.Content>
            </div>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
    <div class="flex">
      <MapPinAltSolid class="text-primary size-5" />
      <p>{location}</p>
    </div>
    <div class="divider bg-primary p-0 m-0 h-0.5 border-primary my-1"></div>
    <p class="font-normal">
      {description.length > 100
        ? `${description.slice(0, 200)}...`
        : description}
    </p>

    <List tag="ol" class="space-y-2 text-xs my-3 font-bold">
      {#each highlights as highlight}
        <Li>
          <div class="flex">
            <LabelSolid />
            <p>{highlight}</p>
          </div>
        </Li>
      {/each}
    </List>
    <div class="flex justify-between mr-10">
      <div>
        <h1 class="font-bold">{currencySymbol} {totalRequired}</h1>
        <p>Total Required</p>
      </div>
      <div>
        <h1 class="font-bold">{currencySymbol} {minPerInvestor}</h1>
        <p>Min. Per Investor</p>
      </div>
    </div>
    <div class="card-actions justify-between items-center mx-1">
      <button
        class="bg-primary px-3 py-2 text-center btn-primary rounded-md text-white text-sm font-bold"
        on:click={findMore}>Find out more</button
      >
    </div>
  </div>
</div>
