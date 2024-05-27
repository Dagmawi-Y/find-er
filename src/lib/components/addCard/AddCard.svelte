<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { CirclePlusSolid } from "flowbite-svelte-icons";

  export let text = "Welcome mate, Click the big + to get your ideas noticed";
  export let link = "";
  export let height = "500px";
  export let width = "w-96";

  let card: HTMLElement;

  const handleMouseMove = (event: MouseEvent) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const rotateX = -y / 50;
    const rotateY = x / 50;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  onMount(() => {
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }
  });

  onDestroy(() => {
    if (card) {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    }
  });
</script>

<div
  bind:this={card}
  class="card flex flex-col items-center justify-center mr-10 border {width} bg-primary-light"
  style="height: {height};"
>
  <p class="font-bold mb-5 px-5 text-center">{text}</p>
  <a href={link} class="transform transition-transform hover:scale-110">
    <CirclePlusSolid class="w-16 h-16 text-primary" />
  </a>
</div>

<style>
  .card {
    transition: transform 0.2s ease;
  }
</style>
