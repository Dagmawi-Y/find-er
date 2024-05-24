<script lang="ts">
  import MainLogo from "$lib/components/mainLogo/MainLogo.svelte";
  import { fly } from "svelte/transition";
  let isSticky = true;

  function handleScroll() {
    const scrollPosition = window.pageYOffset;
    isSticky = scrollPosition >= 0; // Change this line
  }
</script>

<svelte:window on:scroll={handleScroll} />

{#if isSticky}
  <nav
    transition:fly={{ y: -50, duration: 200 }}
    class="sticky top-0 z-10 navbar bg-base-100 mb-0 h-8 py-7 bg-slate-200 shadow-md"
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
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            /></svg
          >
        </div>
        <ul
          tabIndex={0}
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><a>Invest</a></li>
          <li>
            <a>Fundraise</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Help</a></li>
        </ul>
      </div>
      <MainLogo imageSource="images/logo.png" showText={true} />
    </div>
    <div class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <details>
            <summary>Invest</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Fundraise</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li>
          <details>
            <summary>Help</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
      <a href="auth/signIn" class="btn mr-2">Login</a>
      <a href="auth/signUp" class="btn bg-primary">Signup</a>
    </div>
  </nav>
{/if}