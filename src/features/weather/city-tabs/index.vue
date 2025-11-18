<script setup lang="ts">
import { Plus, X, MapPin } from 'lucide-vue-next'
import type { CityTab } from '@/entities/weather/model/model'

interface Props {
  tabs: CityTab[]
  activeTabId: string
}

interface Emits {
  (e: 'switch', tabId: string): void
  (e: 'remove', tabId: string): void
  (e: 'add'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="city-tabs">
    <div class="tabs-scroll">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ 'tab-active': tab.id === activeTabId }"
        @click="emit('switch', tab.id)"
      >
        <div class="tab-content">
          <MapPin :size="16" :stroke-width="2" class="tab-icon" />
          <div class="tab-info">
            <div class="tab-name">{{ tab.name }}</div>
            <div class="tab-country">{{ tab.country }}</div>
          </div>
        </div>
        <button
          v-if="tabs.length > 1"
          class="remove-btn"
          @click.stop="emit('remove', tab.id)"
        >
          <X :size="16" :stroke-width="2" />
        </button>
      </div>

      <button class="add-tab-btn" @click="emit('add')">
        <Plus :size="20" :stroke-width="2" />
        <span>Добавить город</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.city-tabs {
  width: 100%;
  margin-bottom: 32px;
}

.tabs-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(14, 165, 233, 0.3) rgba(255, 255, 255, 0.1);
}

.tabs-scroll::-webkit-scrollbar {
  height: 6px;
}

.tabs-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.tabs-scroll::-webkit-scrollbar-thumb {
  background: rgba(14, 165, 233, 0.3);
  border-radius: 3px;
}

.tabs-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(14, 165, 233, 0.5);
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 200px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.tab-item:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  border-color: rgba(14, 165, 233, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.tab-active {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.35) 0%, rgba(59, 130, 246, 0.35) 100%);
  border-color: rgba(14, 165, 233, 0.6);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.4);
}

.tab-active:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(59, 130, 246, 0.4) 100%);
}

.tab-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.tab-icon {
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.8);
}

.tab-active .tab-icon {
  color: #0ea5e9;
}

.tab-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.tab-name {
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.95);
}

.tab-active .tab-name {
  color: #fff;
}

.tab-country {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-active .tab-country {
  color: rgba(255, 255, 255, 0.8);
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 6px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  opacity: 0.7;
}

.tab-item:hover .remove-btn {
  opacity: 1;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.4);
  border-color: rgba(239, 68, 68, 0.6);
  transform: scale(1.1);
}

.add-tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
  border: 2px dashed rgba(16, 185, 129, 0.4);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  white-space: nowrap;
}

.add-tab-btn:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.3) 100%);
  border-color: rgba(16, 185, 129, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

@media (max-width: 768px) {
  .tab-item {
    min-width: 180px;
  }

  .add-tab-btn span {
    display: none;
  }

  .add-tab-btn {
    padding: 12px;
  }
}
</style>

