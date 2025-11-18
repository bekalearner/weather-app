<template>
  <div class="card-container">
    <slot />
  </div>
</template>

<style scoped>
.card-container {
  padding: 24px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid rgba(14, 165, 233, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
</style>
