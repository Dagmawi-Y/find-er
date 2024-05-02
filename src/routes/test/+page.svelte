<script lang="ts">
  import { writable } from 'svelte/store';
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
  let timer = 5;
  let seconds = writable(timer);
  function timeout() {
    const interval = setInterval(function () {
      timer--;
      seconds.set(timer);
      if (timer === 0) {
        clearInterval(interval);
        goto('/');
      }
    }, 1000);
  }

  timeout();
</script>

<h1>In test route</h1>
<p>Going back in {$seconds} seconds</p>
