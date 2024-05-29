<script lang="ts">
  import MainLogo from "$lib/components/mainLogo/MainLogo.svelte";
  import Icon from "@iconify/svelte";
  import { fly } from "svelte/transition";
  import { userStore } from "$lib/stores/userStore";
  import { logoutUser } from "$lib/api";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";

  let isSticky = true;
  let isAuthenticated = false;
  let userRole = "";
  let showLogoutConfirm = false;
  let loading = true;

  // Subscribe to user store to get the latest authentication status and role
  userStore.subscribe((state) => {
    isAuthenticated = state.user.isAuthenticated;
    userRole = state.user.role;
    loading = state.loading;
  });

  function handleScroll() {
    const scrollPosition = window.pageYOffset;
    isSticky = scrollPosition >= 0;
  }

  function showLogoutPopup() {
    showLogoutConfirm = true;
  }

  function hideLogoutPopup() {
    showLogoutConfirm = false;
  }

  async function handleLogout() {
    try {
      await logoutUser();
      userStore.set({
        user: { isAuthenticated: false, role: "", id: 0 },
        loading: false,
      });
      // Clear the user from localStorage if typeof sessionStorage !== "undefined"
      if (typeof sessionStorage !== "undefined") {
        localStorage.removeItem("user");
      }
      showLogoutConfirm = false;
      goto("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
</script>

<svelte:window on:scroll={handleScroll} />

{#if isSticky}
  <nav
    transition:fly={{ y: -50, duration: 200 }}
    class="sticky top-0 z-10 navbar mb-0 h-8 py-7 bg-slate-200 shadow-md px-1 sm:px-20"
  >
    <div class="navbar-start">
      <div class="dropdown">
        <div tabIndex={0} role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {#if userRole !== "entrepreneur"}
            <li><a>Invest</a></li>
          {/if}
          {#if userRole !== "investor"}
            <li>
              <a>Fundraise</a>
              <ul class="p-2">
                <li><a href="/entrepreneur/me/myPitches">My Startups</a></li>
                <li><a href="/entrepreneur/me/myInvestors">My Investors</a></li>
                <li>
                  <a href="/entrepreneur/me/investorSearch">Investor Search</a>
                </li>
                <li><a href="/entrepreneur/addPitch">Add Startup</a></li>
              </ul>
            </li>
          {/if}
          <li><a>Help</a></li>
        </ul>
      </div>
      <MainLogo
        imageSource="https://i.ibb.co/bBVsZTy/logo.png"
        showText={true}
      />
    </div>
    <div class="navbar-end hidden lg:flex w-full">
      {#if !loading}
        <ul class="menu menu-horizontal px-1">
          {#if userRole !== "entrepreneur"}
            <li>
              <details>
                <summary>
                  Invest
                  <Icon
                    icon="noto:money-bag"
                    font-size="22"
                    class="text-secondary"
                  />
                </summary>
                <ul class="p-2">
                  <li><a>Explore</a></li>
                  <hr />
                  <li><a>Search</a></li>
                  <hr />
                  <li><a>Investor App</a></li>
                </ul>
              </details>
            </li>
          {/if}
          {#if userRole !== "investor"}
            <li>
              <details>
                <summary>
                  Fundraise
                  <Icon
                    icon="ri:funds-box-fill"
                    font-size="22"
                    class="text-secondary"
                  />
                </summary>
                <ul class="p-2">
                  <li><a href="/entrepreneur/me/myPitches">My Startups</a></li>
                  <li>
                    <a href="/entrepreneur/me/myInvestors">My Investors</a>
                  </li>
                  <li>
                    <a href="/entrepreneur/me/investorSearch">Investor Search</a
                    >
                  </li>
                  <li>
                    <a href="/entrepreneur/addPitch/companyInfo">Add Startup</a>
                  </li>
                </ul>
              </details>
            </li>
          {/if}
          <li>
            <details>
              <summary>
                Help
                <Icon
                  icon="material-symbols:contact-support"
                  font-size="22"
                  class="text-primary-dark"
                />
              </summary>
              <ul class="p-2">
                <li><a>How it works?</a></li>
                <hr />
                <li><a>FAQs</a></li>
                <hr />
                <li><a>Learn</a></li>
              </ul>
            </details>
          </li>
        </ul>
        {#if isAuthenticated}
          <details class="dropdown">
            <summary
              class="m-1 btn p-0 bg-transparent border-none outline-none"
            >
              <div class="avatar">
                <div class="w-9 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
            </summary>
            <ul
              class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-fit"
            >
              <li><a>Account Settings</a></li>
              <li><a>Alerts</a></li>
              <li>
                <button class="" on:click={showLogoutPopup}>Logout</button>
              </li>
            </ul>
          </details>
        {:else}
          <a href="/auth/signIn" class="btn mr-2">Login</a>
          <a href="/auth/signUp" class="btn bg-primary">Signup</a>
          <a
            href="/auth/register-engager"
            class="btn btn-outline btn-primary bounce mt-2 ml-2">Explore</a
          >
        {/if}
      {/if}
    </div>
  </nav>
{/if}

{#if showLogoutConfirm}
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <p>Are you sure you want to sign out?</p>
      <div class="mt-4 flex justify-end">
        <button class="btn mr-2" on:click={handleLogout}>Yes</button>
        <button class="btn" on:click={hideLogoutPopup}>No</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .bounce {
    animation: bounce 2s infinite;
    width: 150px;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
</style>
