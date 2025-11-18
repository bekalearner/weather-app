<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input, Button } from '@/shared'
import { MapPin, Search } from 'lucide-vue-next'
import type { SearchLocation } from '@/shared/api/weatherAPI/types'

interface Props {
  searchResults: SearchLocation[]
  isSearching?: boolean
  isLoading?: boolean
}

interface Emits {
  (e: 'search', query: string): void
  (e: 'select', location: SearchLocation): void
  (e: 'clear'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const query = ref('')
const showResults = ref(false)
let searchTimeout: NodeJS.Timeout | null = null

watch(query, (newQuery) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (newQuery.length >= 2) {
    searchTimeout = setTimeout(() => {
      emit('search', newQuery)
      showResults.value = true
    }, 300)
  } else {
    emit('clear')
    showResults.value = false
  }
})

const selectLocation = (location: SearchLocation) => {
  query.value = location.name
  showResults.value = false
  emit('select', location)
  emit('clear')
}

const handleBlur = () => {
  // Delay to allow click on results
  setTimeout(() => {
    showResults.value = false
  }, 200)
}
</script>

<template>
  <div class="location-search">
    <div class="search-input-wrapper">
      <div class="input-container">
        <Search :size="20" class="search-icon" />
        <input
          v-model="query"
          type="text"
          placeholder="Поиск города или страны..."
          class="search-input"
          @focus="showResults = query.length >= 2"
          @blur="handleBlur"
        />
      </div>
    </div>

    <div 
      v-if="showResults && (searchResults.length > 0 || isSearching)" 
      class="search-results"
    >
      <div v-if="isSearching" class="loading">
        Поиск...
      </div>
      
      <div
        v-for="location in searchResults"
        :key="location.id"
        class="result-item"
        @click="selectLocation(location)"
      >
        <MapPin :size="18" class="location-icon" />
        <div class="location-info">
          <div class="location-name">{{ location.name }}</div>
          <div class="location-details">
            {{ location.region }}, {{ location.country }}
          </div>
        </div>
      </div>

      <div v-if="!isSearching && searchResults.length === 0" class="no-results">
        Ничего не найдено
      </div>
    </div>
  </div>
</template>

<style scoped>
.location-search {
  position: relative;
  width: 100%;
}

.search-input-wrapper {
  width: 100%;
}

.input-container {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 16px 18px 16px 52px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  border-color: rgba(14, 165, 233, 0.6);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
  transform: translateY(-2px);
}

.search-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.search-results::-webkit-scrollbar {
  width: 8px;
}

.search-results::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.search-results::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.loading,
.no-results {
  padding: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.result-item:last-child {
  border-bottom: none;
}

.result-item:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%);
  padding-left: 24px;
}

.location-icon {
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
}

.location-info {
  flex: 1;
  min-width: 0;
}

.location-name {
  font-size: 15px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.location-details {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

