<template>
  <div
    class="loading-container"
    :class="containerClasses"
  >
    <!-- Overlay para loading de tela cheia -->
    <div
      v-if="overlay"
      class="loading-overlay"
      @click="handleOverlayClick"
    >
      <div class="loading-content">
        <div class="spinner-wrapper">
          <div
            class="spinner"
            :class="spinnerClasses"
          >
            <div class="spinner-inner" />
          </div>
        </div>
        
        <div
          v-if="message"
          class="loading-message"
        >
          <p class="message-text">
            {{ message }}
          </p>
          <div
            v-if="progress !== null"
            class="progress-container"
          >
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${progress}%` }"
              />
            </div>
            <span class="progress-text">{{ progress }}%</span>
          </div>
        </div>
        
        <button 
          v-if="cancellable" 
          class="cancel-button"
          @click="handleCancel"
        >
          Cancelar
        </button>
      </div>
    </div>
    
    <!-- Loading inline -->
    <div
      v-else
      class="inline-loading"
    >
      <div
        class="spinner"
        :class="spinnerClasses"
      >
        <div class="spinner-inner" />
      </div>
      <span
        v-if="message"
        class="inline-message"
      >{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  // Tipo de loading
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'error', 'white'].includes(value)
  },
  
  // Tamanho do spinner
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  
  // Mensagem de loading
  message: {
    type: String,
    default: ''
  },
  
  // Progresso (0-100)
  progress: {
    type: Number,
    default: null,
    validator: (value) => value === null || (value >= 0 && value <= 100)
  },
  
  // Loading de tela cheia com overlay
  overlay: {
    type: Boolean,
    default: false
  },
  
  // Permite cancelar o loading
  cancellable: {
    type: Boolean,
    default: false
  },
  
  // Permite fechar clicando no overlay
  closeOnOverlay: {
    type: Boolean,
    default: false
  },
  
  // Centralizar conteúdo
  centered: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['cancel', 'overlay-click'])

// Computed
const containerClasses = computed(() => {
  return {
    'loading-centered': props.centered && !props.overlay,
    'loading-overlay-active': props.overlay
  }
})

const spinnerClasses = computed(() => {
  return {
    // Variantes
    'spinner-primary': props.variant === 'primary',
    'spinner-secondary': props.variant === 'secondary',
    'spinner-success': props.variant === 'success',
    'spinner-warning': props.variant === 'warning',
    'spinner-error': props.variant === 'error',
    'spinner-white': props.variant === 'white',
    
    // Tamanhos
    'spinner-xs': props.size === 'xs',
    'spinner-sm': props.size === 'sm',
    'spinner-md': props.size === 'md',
    'spinner-lg': props.size === 'lg',
    'spinner-xl': props.size === 'xl'
  }
})

// Methods
const handleCancel = () => {
  emit('cancel')
}

const handleOverlayClick = () => {
  emit('overlay-click')
  if (props.closeOnOverlay) {
    emit('cancel')
  }
}
</script>

<style scoped>
.loading-container {
  @apply relative;
}

.loading-centered {
  @apply flex items-center justify-center min-h-32;
}

.loading-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.loading-content {
  @apply bg-white dark:bg-gray-800 rounded-lg p-8 max-w-sm mx-4 text-center shadow-2xl;
}

.spinner-wrapper {
  @apply mb-6;
}

.spinner {
  @apply inline-block border-4 border-solid rounded-full animate-spin;
  border-top-color: transparent;
  border-right-color: transparent;
}

.spinner-inner {
  @apply sr-only;
}

/* Variantes de cor */
.spinner-primary {
  @apply border-primary-200;
  border-top-color: theme('colors.primary.600');
  border-right-color: theme('colors.primary.600');
}

.spinner-secondary {
  @apply border-gray-200;
  border-top-color: theme('colors.gray.600');
  border-right-color: theme('colors.gray.600');
}

.spinner-success {
  @apply border-green-200;
  border-top-color: theme('colors.green.600');
  border-right-color: theme('colors.green.600');
}

.spinner-warning {
  @apply border-yellow-200;
  border-top-color: theme('colors.yellow.600');
  border-right-color: theme('colors.yellow.600');
}

.spinner-error {
  @apply border-red-200;
  border-top-color: theme('colors.red.600');
  border-right-color: theme('colors.red.600');
}

.spinner-white {
  @apply border-white border-opacity-30;
  border-top-color: white;
  border-right-color: white;
}

/* Tamanhos */
.spinner-xs {
  @apply w-4 h-4 border-2;
}

.spinner-sm {
  @apply w-6 h-6 border-2;
}

.spinner-md {
  @apply w-8 h-8 border-4;
}

.spinner-lg {
  @apply w-12 h-12 border-4;
}

.spinner-xl {
  @apply w-16 h-16 border-4;
}

.loading-message {
  @apply mb-6;
}

.message-text {
  @apply text-gray-700 dark:text-gray-300 mb-4 font-medium;
}

.progress-container {
  @apply space-y-2;
}

.progress-bar {
  @apply w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden;
}

.progress-fill {
  @apply h-full bg-primary-600 rounded-full transition-all duration-300 ease-out;
}

.progress-text {
  @apply text-sm text-gray-600 dark:text-gray-400 font-medium;
}

.cancel-button {
  @apply px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200;
}

.inline-loading {
  @apply flex items-center space-x-3;
}

.inline-message {
  @apply text-gray-600 dark:text-gray-400 font-medium;
}

/* Animações */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Variações para modo escuro */
.dark .loading-content {
  @apply bg-gray-800 border border-gray-700;
}

.dark .spinner-primary {
  @apply border-primary-800;
  border-top-color: theme('colors.primary.400');
  border-right-color: theme('colors.primary.400');
}

.dark .spinner-secondary {
  @apply border-gray-700;
  border-top-color: theme('colors.gray.400');
  border-right-color: theme('colors.gray.400');
}

.dark .spinner-success {
  @apply border-green-800;
  border-top-color: theme('colors.green.400');
  border-right-color: theme('colors.green.400');
}

.dark .spinner-warning {
  @apply border-yellow-800;
  border-top-color: theme('colors.yellow.400');
  border-right-color: theme('colors.yellow.400');
}

.dark .spinner-error {
  @apply border-red-800;
  border-top-color: theme('colors.red.400');
  border-right-color: theme('colors.red.400');
}

/* Estados responsivos */
@media (max-width: 640px) {
  .loading-content {
    @apply p-6;
  }
  
  .spinner-wrapper {
    @apply mb-4;
  }
  
  .loading-message {
    @apply mb-4;
  }
}

/* Acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .animate-spin {
    animation: none;
  }
  
  .spinner {
    @apply border-l-transparent;
  }
}

/* Estados de foco para acessibilidade */
.cancel-button:focus-visible {
  @apply ring-2 ring-primary-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800;
}
</style>