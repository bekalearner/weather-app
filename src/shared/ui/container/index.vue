<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
  .container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 10px;
    }
  }
</style>
