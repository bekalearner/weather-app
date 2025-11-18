<script setup>
  import WeatherIcon from '@/shared/ui/weather-icon/index.vue'
  const emit = defineEmits(['click'])
  const { id } = defineProps({
    id: {
      type: Number,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  })

  function validateCode(code) {
    if (typeof code === 'string') {
      return Number(code)
    }
    return code
  }

  function handleClick() {
    emit('click', id)
  }
</script>

<template>
  <div
    class="card p-24 bg-primary-60 flex flex-col items-center gap-14 rounded-xl"
    @click="handleClick"
  >
    <weather-icon :size="48" :code="validateCode(code)" />
    <div class="capitalize text-lg">
      {{ new Date(date).toLocaleDateString('ru-RU', { weekday: 'short' }) }}
    </div>
    <div class="text-lg font-bold">{{ temperature }} °C</div>
  </div>
</template>

<style scoped>
  .card {
    min-width: 120px;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%);
  }
  
  .card-active {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
    color: #0ea5e9;
    border-color: rgba(14, 165, 233, 0.5);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4);
  }

  .card:hover {
    background: linear-gradient(135deg, rgba(14, 165, 233, 0.5) 0%, rgba(59, 130, 246, 0.5) 100%);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(14, 165, 233, 0.5);
    border-color: rgba(14, 165, 233, 0.5);
  }
  
  .card-active:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 255, 1) 100%);
    transform: translateY(-4px) scale(1.02);
  }
</style>
