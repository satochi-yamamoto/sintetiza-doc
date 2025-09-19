<template>
  <div class="clerk-fallback">
    <div class="fallback-container">
      <div class="fallback-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      </div>
      
      <h3 class="fallback-title">Sistema de Autenticação Indisponível</h3>
      
      <p class="fallback-message">
        O sistema de autenticação está temporariamente indisponível. 
        Isso pode acontecer devido a problemas de configuração ou conectividade.
      </p>
      
      <div class="fallback-actions">
        <button @click="reloadPage" class="btn-primary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          Recarregar Página
        </button>
        
        <button @click="goHome" class="btn-secondary">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Voltar ao Início
        </button>
      </div>
      
      <div class="fallback-help">
        <p class="help-text">
          Se o problema persistir, entre em contato com o suporte.
        </p>
        <router-link to="/help" class="help-link">
          Central de Ajuda
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const reloadPage = () => {
  window.location.reload()
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.clerk-fallback {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.fallback-container {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.fallback-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  color: #f59e0b;
}

.fallback-icon svg {
  width: 100%;
  height: 100%;
}

.fallback-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.fallback-message {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.fallback-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

.fallback-help {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.help-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.help-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.help-link:hover {
  text-decoration: underline;
}

@media (min-width: 640px) {
  .fallback-actions {
    flex-direction: row;
  }
}
</style>