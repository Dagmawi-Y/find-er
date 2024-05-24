<script>
  import { Center } from "@svelteuidev/core";
  import MainLogo from "$lib/components/mainLogo/MainLogo.svelte";
  import { Radio } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { registerUser } from "$lib/api";

  let first_name = "";
  let last_name = "";
  let email = "";
  let password = "";
  let confirm_password = "";
  let role = "Entrepreneur"; // Default user type
  let form_submitted = false;

  let first_name_error = false;
  let last_name_error = false;
  let email_error = false;
  let password_error = false;
  let confirm_password_error = false;

  onMount(() => {
    // Focus on the first input field on page load
    document.querySelector("input").focus();
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    first_name_error = first_name.trim() === "";
    last_name_error = last_name.trim() === "";
    email_error = !validateEmail(email);
    password_error = password.trim() === "";
    confirm_password_error = password !== confirm_password;

    if (
      first_name_error ||
      last_name_error ||
      email_error ||
      password_error ||
      confirm_password_error
    ) {
      return; // Don't submit if there are errors
    }

    form_submitted = true;

    console.log(
      "Form submitted:",
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      role.toLocaleLowerCase(),
    );

    // Assuming you have a backend endpoint to handle signup
    try {
      const response = await registerUser({
        first_name,
        last_name,
        email,
        password,
        role,
      });

      if (response.statusCode == 200) {
        goto("/auth/signIn");
      } else {
        // Handle signup errors
        console.error("Signup failed:", response);
        // You could display an error message to the user here
      }
    } catch (error) {
      // Handle network errors
      console.error("Signup error:", error);
    } finally {
      form_submitted = false; // Reset form submitted flag
    }
  };
</script>

<section class="bg-gray-50">
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <MainLogo imageSource="../../images/logo.png" showText={false} />

    <div
      class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 max-h-full overflow-y-auto mb-10"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Create an account
        </h1>
        <form class="space-y-4 md:space-y-6" on:submit={handleSubmit}>
          <div class="flex space-x-4">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-2">Entrepreneur</span>
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-primary"
                  checked
                  bind:group={role}
                  value="entrepreneur"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-2">Investor</span>
                <input
                  type="radio"
                  name="radio-10"
                  class="radio checked:bg-secondary"
                  bind:group={role}
                  value="investor"
                />
              </label>
            </div>
          </div>

          <div>
            <label
              for="firstName"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="First Name"
              bind:value={first_name}
              required={true}
              class:error={first_name_error}
            />
            {#if first_name_error}
              <p class="text-red-500 text-xs">First name is required</p>
            {/if}
          </div>

          <div>
            <label
              for="lastName"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Last Name"
              bind:value={last_name}
              required={true}
              class:error={last_name_error}
            />
            {#if last_name_error}
              <p class="text-red-500 text-xs">Last name is required</p>
            {/if}
          </div>

          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              bind:value={email}
              required={true}
              class:error={email_error}
            />
            {#if email_error}
              <p class="text-red-500 text-xs">
                Please enter a valid email address
              </p>
            {/if}
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              bind:value={password}
              required={true}
              class:error={password_error}
            />
            {#if password_error}
              <p class="text-red-500 text-xs">Password is required</p>
            {/if}
          </div>
          <div>
            <label
              for="confirm-password"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              bind:value={confirm_password}
              required={true}
              class:error={confirm_password_error}
            />
            {#if confirm_password_error}
              <p class="text-red-500 text-xs">Passwords don't match</p>
            {/if}
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                required={true}
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500"
                >I accept the <a
                  class="font-medium text-primary-600 hover:underline"
                  href="/">Terms and Conditions</a
                ></label
              >
            </div>
          </div>
          <button
            type="submit"
            class="w-full text-black bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={form_submitted}
          >
            {#if form_submitted}
              <span class="spinner-border spinner-border-sm" role="status"
              ></span>
              <span class="sr-only">Loading...</span>
            {:else}
              Create an account
            {/if}
          </button>
          <p class="text-sm font-light text-gray-500">
            Already have an account? <a
              href="/auth/signIn"
              class="font-medium text-primary-600 hover:underline">Login here</a
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
