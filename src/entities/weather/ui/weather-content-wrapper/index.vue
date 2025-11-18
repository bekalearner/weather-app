<script setup>
  // import { getWeatherCategory } from '@/shared/index.js'
  // import { computed, ref, watch } from 'vue'
  //
  // const props = defineProps({
  //   code: {
  //     type: Number,
  //   },
  // })
  //
  // const videoRef = ref(null)
  //
  // const weatherCategory = computed(() => {
  //   return getWeatherCategory(props.code)
  // })
  //
  // watch(weatherCategory, () => {
  //   videoRef.value.load()
  // })
</script>

<template>
  <div class="content-wrapper">
    <div class="content-overlay">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .content-wrapper {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background: linear-gradient(135deg, 
      #0f172a 0%, 
      #1e293b 25%, 
      #334155 50%, 
      #475569 75%, 
      #64748b 100%
    );
  }

  .content-wrapper::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(96, 165, 250, 0.1) 0%, transparent 50%);
    z-index: 0;
    pointer-events: none;
  }

  .content-overlay {
    position: relative;
    z-index: 1;
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    .content-overlay {
      padding: 20px 10px;
    }
  }
</style>
