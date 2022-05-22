<template>
  <section class="tiny text--center">
    <h1>Story</h1>
    <div
      class="mb-4"
      v-for="prompt, idx in $store.getters['values']('prompts.available')"
      :key="idx"
    >
      <p
        v-for="(row, idx2) in prompt.text"
        :key="idx2"
        class="my-0"
      >
        <i>
          {{ row }}
        </i>
      </p>
    </div>
  </section>
</template>

<script>

export default {}
</script>
