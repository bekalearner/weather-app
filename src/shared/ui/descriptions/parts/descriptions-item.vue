<script setup>
  const props = defineProps({
    label: String,
    value: String,
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
  })
</script>

<template>
  <div
    class="description-item"
    :class="{
      'text-lg': props.size === 'small',
      'text-xl': props.size === 'medium',
      'text-2xl': props.size === 'large',
    }"
  >
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<style scoped>
.description-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.description-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border-color: rgba(14, 165, 233, 0.3);
  transform: translateX(4px);
}

.label {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95em;
}

.value {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1em;
}
</style>
