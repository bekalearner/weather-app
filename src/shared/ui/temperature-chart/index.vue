<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { HourWeather } from '@/shared/api/weatherAPI/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  hourlyData: HourWeather[]
}

const props = defineProps<Props>()

const chartData = computed(() => {
  const labels = props.hourlyData.map((hour) => {
    const date = new Date(hour.time)
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  })

  return {
    labels,
    datasets: [
      {
        label: 'Температура (°C)',
        data: props.hourlyData.map((hour) => hour.temp_c),
        borderColor: '#f59e0b',
        backgroundColor: createGradient('#f59e0b', '#fbbf24'),
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#f59e0b',
        pointHoverBorderColor: '#fff',
        borderWidth: 3,
      },
      {
        label: 'Ощущается как (°C)',
        data: props.hourlyData.map((hour) => hour.feelslike_c),
        borderColor: '#06b6d4',
        backgroundColor: createGradient('#06b6d4', '#22d3ee'),
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#06b6d4',
        pointHoverBorderColor: '#fff',
        borderWidth: 3,
      },
    ],
  }
})

// Функция для создания градиента
const createGradient = (color1: string, color2: string) => {
  return (context: any) => {
    const chart = context.chart
    const { ctx, chartArea } = chart
    if (!chartArea) return color1
    
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
    gradient.addColorStop(0, `${color1}40`)
    gradient.addColorStop(1, `${color2}10`)
    return gradient
  }
}

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      labels: {
        color: '#fff',
        font: {
          size: 13,
          weight: 'bold' as const,
        },
        padding: 15,
        usePointStyle: true,
        pointStyle: 'circle' as const,
      },
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(30, 27, 75, 0.95)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#6366f1',
      borderWidth: 2,
      padding: 12,
      cornerRadius: 8,
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 13,
      },
      callbacks: {
        label: (context: any) => {
          const value = context.parsed?.y ?? 0
          return `${context.dataset.label}: ${value.toFixed(1)}°C`
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.08)',
        drawBorder: false,
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 11,
          weight: 'normal' as const,
        },
        maxRotation: 45,
        minRotation: 45,
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.08)',
        drawBorder: false,
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 12,
          weight: 'normal' as const,
        },
        callback: (value: any) => `${value}°`,
        padding: 8,
      },
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
}))
</script>

<template>
  <div class="temperature-chart">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.temperature-chart {
  width: 100%;
  height: 320px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.18) 0%, rgba(59, 130, 246, 0.18) 100%);
  border-radius: 16px;
  border: 1px solid rgba(14, 165, 233, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
</style>

