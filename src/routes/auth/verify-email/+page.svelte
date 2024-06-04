<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { verifyEmail } from "$lib/api";

  let message = "Verifying your email...";

  onMount(async () => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      try {
        const data = { token };
        const response = await verifyEmail(data);

        if (response.message === "Email verified successfully") {
          message =
            "Email verified successfully. Redirecting to your home page...";
          setTimeout(() => {
            goto("/");
          }, 2000);
        } else {
          message = "Email verification failed. Please try again.";
        }
      } catch (error) {
        message = "Email verification failed. Please try again.";
      }
    } else {
      message = "Invalid verification token.";
    }
  });
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="max-w-md p-8 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold text-center mb-4">Email Verification</h1>
    <p class="text-center text-gray-600">{message}</p>
  </div>
</div>
