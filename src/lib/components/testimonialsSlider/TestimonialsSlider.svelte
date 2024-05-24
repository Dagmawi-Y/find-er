<script>
  export let name = "Tom Ward";
  export let company = "Blackfoot";
  export let imageUrl = "https://via.placeholder.com/80";
</script>

<div class="flex items-center justify-center bg-gray-100 py-12 rounded-md">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <img
          class="h-20 w-20 rounded-full"
          src={imageUrl}
          alt="Testimonial Avatar"
        />
      </div>
      <div class="ml-4">
        <blockquote class="text-lg leading-7 font-medium text-gray-900">
          "The team at AIN are brilliant, an absolute pleasure to work with.
          Great network of investors, met so many good people through them.
          Couldn't have asked for more."
        </blockquote>
        <footer class="mt-3">
          <p class="text-base font-semibold text-gray-600">
            {name} @ {company}
          </p>
        </footer>
      </div>
    </div>
  </div>
</div>
