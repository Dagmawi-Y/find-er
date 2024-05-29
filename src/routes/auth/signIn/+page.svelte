<script lang="ts">
  import { Center } from "@svelteuidev/core";
  import MainLogo from "$lib/components/mainLogo/MainLogo.svelte";
  import { loginUser } from "$lib/api";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";
  import { jwtDecode } from "jwt-decode";
  import { Toaster, toast } from "svelte-sonner";
  import { userStore } from "$lib/stores/userStore"; // Import userStore from the correct path

  let email = "";
  let password = "";
  let emailError = false;
  let passwordError = false;
  let formSubmitted = false;

  let isLoading = false;

  // Subscribe to userStore
  let user;
  userStore.subscribe((value) => {
    user = value.user;
  });

  const validateEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    emailError = !validateEmail(email);
    passwordError = password.trim() === "";

    if (emailError || passwordError) {
      // Display error messages as toasts
      if (emailError) toast.error("Please enter a valid email address");
      if (passwordError) toast.error("Password is required");
      return; // Don't submit if there are errors
    }

    formSubmitted = true;
    isLoading = true;

    try {
      const response = await loginUser({ email, password });

      if (response.access_token) {
        document.cookie = `access_token=${response.access_token}; path=/`;

        const decodedToken = jwtDecode(response.access_token);
        // @ts-ignore
        const userRole = decodedToken.role;

        const id = decodedToken.sub;

        // Set the user state
        userStore.set({
          user: { isAuthenticated: true, role: userRole, id: id },
          loading: false,
        });

        // Redirect based on user role
        if (userRole === "entrepreneur") {
          goto("/entrepreneur/me/myPitches");
        } else if (userRole === "investor") {
          goto("/investor/me/myPortfolio");
        } else {
          goto("/");
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      formSubmitted = false;
      isLoading = false;
    }
  };
</script>

<Toaster />

<div
  class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
>
  <MainLogo imageSource="../../images/logo.png" showText={false} />
  <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
      >
        Sign in to your account
      </h1>
      <form class="space-y-4 md:space-y-6" on:submit={handleSubmit}>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="name@company.com"
            required={true}
            bind:value={email}
            class:error={emailError}
          />
          {#if emailError}
            <p class="text-red-500 text-xs">
              Please enter a valid email address
            </p>
          {/if}
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900">Password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            required={true}
            bind:value={password}
            class:error={passwordError}
          />
          {#if passwordError}
            <p class="text-red-500 text-xs">Password is required</p>
          {/if}
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                required={false}
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="remember" class="text-gray-500">Remember me</label>
            </div>
          </div>
          <a
            href="#"
            class="text-sm font-medium text-primary-600 hover:underline"
            >Forgot password?</a
          >
        </div>
        <button
          type="submit"
          class="w-full text-black bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          disabled={formSubmitted}
        >
          {#if formSubmitted}
            <span class="spinner-border spinner-border-sm" role="status"></span>
            <span class="loading loading-spinner text-secondary"></span>
          {:else}
            Sign In
          {/if}
        </button>
        <p class="text-sm font-light text-gray-500">
          Don't have an account yet?
          <a
            href="/auth/signUp"
            class="font-medium text-primary-600 hover:underline">Sign up</a
          >
        </p>
      </form>
    </div>
  </div>
</div>
