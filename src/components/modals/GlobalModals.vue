<template>
  <div class="global-modals">
    <!-- Modal de Confirmação -->
    <div 
      v-if="confirmModal.show" 
      class="modal-overlay"
      @click="closeConfirmModal"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <div class="modal-header">
          <h3 class="modal-title">
            {{ confirmModal.title }}
          </h3>
          <button 
            class="modal-close"
            @click="closeConfirmModal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <p>{{ confirmModal.message }}</p>
        </div>
        
        <div class="modal-footer">
          <button 
            class="btn btn-secondary"
            @click="closeConfirmModal"
          >
            Cancelar
          </button>
          <button 
            class="btn btn-danger"
            @click="handleConfirm"
          >
            {{ confirmModal.confirmText || 'Confirmar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Alerta -->
    <div 
      v-if="alertModal.show" 
      class="modal-overlay"
      @click="closeAlertModal"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <div class="modal-header">
          <h3 class="modal-title">
            {{ alertModal.title }}
          </h3>
          <button 
            class="modal-close"
            @click="closeAlertModal"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="alert-content">
            <div
              class="alert-icon"
              :class="alertModal.type"
            >
              <svg
                v-if="alertModal.type === 'success'"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <svg
                v-else-if="alertModal.type === 'error'"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <svg
                v-else-if="alertModal.type === 'warning'"
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <svg
                v-else
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p>{{ alertModal.message }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button 
            class="btn btn-primary"
            @click="closeAlertModal"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'GlobalModals',
  setup() {
    const confirmModal = reactive({
      show: false,
      title: '',
      message: '',
      confirmText: 'Confirmar',
      onConfirm: null
    })

    const alertModal = reactive({
      show: false,
      title: '',
      message: '',
      type: 'info' // success, error, warning, info
    })

    const showConfirmModal = (options) => {
      confirmModal.show = true
      confirmModal.title = options.title || 'Confirmação'
      confirmModal.message = options.message || 'Tem certeza?'
      confirmModal.confirmText = options.confirmText || 'Confirmar'
      confirmModal.onConfirm = options.onConfirm
    }

    const closeConfirmModal = () => {
      confirmModal.show = false
      confirmModal.onConfirm = null
    }

    const handleConfirm = () => {
      if (confirmModal.onConfirm) {
        confirmModal.onConfirm()
      }
      closeConfirmModal()
    }

    const showAlertModal = (options) => {
      alertModal.show = true
      alertModal.title = options.title || 'Aviso'
      alertModal.message = options.message || ''
      alertModal.type = options.type || 'info'
    }

    const closeAlertModal = () => {
      alertModal.show = false
    }

    // Expor métodos globalmente
    window.showConfirmModal = showConfirmModal
    window.showAlertModal = showAlertModal

    return {
      confirmModal,
      alertModal,
      showConfirmModal,
      closeConfirmModal,
      handleConfirm,
      showAlertModal,
      closeAlertModal
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.modal-close:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.alert-icon {
  flex-shrink: 0;
  padding: 0.5rem;
  border-radius: 50%;
}

.alert-icon.success {
  background-color: #dcfce7;
  color: #16a34a;
}

.alert-icon.error {
  background-color: #fef2f2;
  color: #dc2626;
}

.alert-icon.warning {
  background-color: #fefce8;
  color: #ca8a04;
}

.alert-icon.info {
  background-color: #eff6ff;
  color: #2563eb;
}

.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
}

.btn-danger:hover {
  background-color: #b91c1c;
}
</style>