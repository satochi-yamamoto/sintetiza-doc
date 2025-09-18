<template>
  <div class="status-page">
    <!-- Header -->
    <div class="status-header">
      <div class="header-content">
        <div class="status-indicator">
          <div :class="['status-dot', overallStatus]" />
          <div class="status-info">
            <h1 class="page-title">Status do Sistema</h1>
            <p class="status-message">{{ overallStatusMessage }}</p>
          </div>
        </div>
        <div class="last-updated">
          <ClockIcon class="clock-icon" />
          <span>Última atualização: {{ lastUpdated }}</span>
        </div>
      </div>
    </div>
    
    <!-- Current Status -->
    <div class="current-status-section">
      <div class="section-container">
        <h2 class="section-title">Status Atual dos Serviços</h2>
        
        <div class="services-grid">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="service-card"
          >
            <div class="service-header">
              <div class="service-info">
                <component :is="service.icon" class="service-icon" />
                <div class="service-details">
                  <h3 class="service-name">{{ service.name }}</h3>
                  <p class="service-description">{{ service.description }}</p>
                </div>
              </div>
              <div :class="['service-status', service.status]">
                <div :class="['status-dot', service.status]" />
                <span class="status-text">{{ getStatusText(service.status) }}</span>
              </div>
            </div>
            
            <div v-if="service.metrics" class="service-metrics">
              <div class="metric-item">
                <span class="metric-label">Uptime:</span>
                <span class="metric-value">{{ service.metrics.uptime }}%</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Tempo de resposta:</span>
                <span class="metric-value">{{ service.metrics.responseTime }}ms</span>
              </div>
            </div>
            
            <div v-if="service.lastIncident" class="last-incident">
              <ExclamationTriangleIcon class="incident-icon" />
              <div class="incident-info">
                <span class="incident-text">Último incidente: {{ service.lastIncident }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Performance Metrics -->
    <div class="metrics-section">
      <div class="section-container">
        <h2 class="section-title">Métricas de Performance</h2>
        
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-header">
              <ChartBarIcon class="metric-icon" />
              <h3 class="metric-title">Tempo de Resposta da API</h3>
            </div>
            <div class="metric-chart">
              <div class="chart-placeholder">
                <div class="chart-bars">
                  <div 
                    v-for="(value, index) in responseTimeData" 
                    :key="index"
                    class="chart-bar"
                    :style="{ height: `${(value / Math.max(...responseTimeData)) * 100}%` }"
                  />
                </div>
                <div class="chart-labels">
                  <span v-for="(label, index) in timeLabels" :key="index" class="chart-label">
                    {{ label }}
                  </span>
                </div>
              </div>
            </div>
            <div class="metric-summary">
              <div class="summary-item">
                <span class="summary-label">Média (24h):</span>
                <span class="summary-value">{{ averageResponseTime }}ms</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Pico:</span>
                <span class="summary-value">{{ peakResponseTime }}ms</span>
              </div>
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-header">
              <ServerIcon class="metric-icon" />
              <h3 class="metric-title">Uptime dos Serviços</h3>
            </div>
            <div class="uptime-grid">
              <div 
                v-for="service in services.filter(s => s.metrics)" 
                :key="service.id"
                class="uptime-item"
              >
                <div class="uptime-info">
                  <span class="uptime-name">{{ service.name }}</span>
                  <span class="uptime-percentage">{{ service.metrics.uptime }}%</span>
                </div>
                <div class="uptime-bar">
                  <div 
                    class="uptime-fill"
                    :style="{ width: `${service.metrics.uptime}%` }"
                    :class="{
                      'uptime-excellent': service.metrics.uptime >= 99.9,
                      'uptime-good': service.metrics.uptime >= 99.5 && service.metrics.uptime < 99.9,
                      'uptime-warning': service.metrics.uptime >= 95 && service.metrics.uptime < 99.5,
                      'uptime-critical': service.metrics.uptime < 95
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-header">
              <UsersIcon class="metric-icon" />
              <h3 class="metric-title">Usuários Ativos</h3>
            </div>
            <div class="active-users">
              <div class="users-count">
                <span class="count-number">{{ activeUsers.toLocaleString() }}</span>
                <span class="count-label">usuários online</span>
              </div>
              <div class="users-trend">
                <ArrowTrendingUpIcon v-if="usersTrend > 0" class="trend-icon positive" />
                <ArrowTrendingDownIcon v-else class="trend-icon negative" />
                <span :class="['trend-text', usersTrend > 0 ? 'positive' : 'negative']">
                  {{ Math.abs(usersTrend) }}% vs ontem
                </span>
              </div>
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-header">
              <DocumentIcon class="metric-icon" />
              <h3 class="metric-title">Processamento</h3>
            </div>
            <div class="processing-stats">
              <div class="stat-item">
                <span class="stat-value">{{ processingStats.documentsToday.toLocaleString() }}</span>
                <span class="stat-label">documentos hoje</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ processingStats.summariesToday.toLocaleString() }}</span>
                <span class="stat-label">resumos gerados</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ processingStats.avgProcessingTime }}s</span>
                <span class="stat-label">tempo médio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Incident History -->
    <div class="incidents-section">
      <div class="section-container">
        <div class="incidents-header">
          <h2 class="section-title">Histórico de Incidentes</h2>
          <div class="incidents-filter">
            <select v-model="incidentFilter" class="filter-select">
              <option value="all">Todos os incidentes</option>
              <option value="resolved">Resolvidos</option>
              <option value="investigating">Em investigação</option>
              <option value="monitoring">Monitorando</option>
            </select>
          </div>
        </div>
        
        <div v-if="filteredIncidents.length === 0" class="no-incidents">
          <CheckCircleIcon class="no-incidents-icon" />
          <h3 class="no-incidents-title">Nenhum incidente encontrado</h3>
          <p class="no-incidents-text">
            {{ incidentFilter === 'all' ? 'Não há incidentes registrados.' : `Não há incidentes com status "${getStatusText(incidentFilter)}".` }}
          </p>
        </div>
        
        <div v-else class="incidents-timeline">
          <div 
            v-for="incident in filteredIncidents" 
            :key="incident.id"
            class="incident-item"
          >
            <div class="incident-timeline-dot" :class="incident.status" />
            <div class="incident-content">
              <div class="incident-header">
                <h3 class="incident-title">{{ incident.title }}</h3>
                <div class="incident-meta">
                  <span :class="['incident-status', incident.status]">
                    {{ getStatusText(incident.status) }}
                  </span>
                  <span class="incident-date">{{ formatDate(incident.date) }}</span>
                </div>
              </div>
              <p class="incident-description">{{ incident.description }}</p>
              <div v-if="incident.affectedServices.length > 0" class="affected-services">
                <span class="affected-label">Serviços afetados:</span>
                <div class="affected-list">
                  <span 
                    v-for="service in incident.affectedServices" 
                    :key="service"
                    class="affected-service"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
              <div v-if="incident.updates && incident.updates.length > 0" class="incident-updates">
                <h4 class="updates-title">Atualizações:</h4>
                <div class="updates-list">
                  <div 
                    v-for="update in incident.updates" 
                    :key="update.id"
                    class="update-item"
                  >
                    <div class="update-time">{{ formatTime(update.time) }}</div>
                    <div class="update-text">{{ update.message }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Maintenance Schedule -->
    <div class="maintenance-section">
      <div class="section-container">
        <h2 class="section-title">Manutenções Programadas</h2>
        
        <div v-if="scheduledMaintenance.length === 0" class="no-maintenance">
          <WrenchScrewdriverIcon class="no-maintenance-icon" />
          <h3 class="no-maintenance-title">Nenhuma manutenção programada</h3>
          <p class="no-maintenance-text">
            Não há manutenções programadas no momento.
          </p>
        </div>
        
        <div v-else class="maintenance-list">
          <div 
            v-for="maintenance in scheduledMaintenance" 
            :key="maintenance.id"
            class="maintenance-item"
          >
            <div class="maintenance-header">
              <div class="maintenance-info">
                <h3 class="maintenance-title">{{ maintenance.title }}</h3>
                <p class="maintenance-description">{{ maintenance.description }}</p>
              </div>
              <div class="maintenance-schedule">
                <CalendarIcon class="schedule-icon" />
                <div class="schedule-details">
                  <div class="schedule-date">{{ formatDate(maintenance.startDate) }}</div>
                  <div class="schedule-time">
                    {{ formatTime(maintenance.startTime) }} - {{ formatTime(maintenance.endTime) }}
                  </div>
                  <div class="schedule-duration">Duração: {{ maintenance.duration }}</div>
                </div>
              </div>
            </div>
            <div v-if="maintenance.affectedServices.length > 0" class="maintenance-services">
              <span class="services-label">Serviços afetados:</span>
              <div class="services-list">
                <span 
                  v-for="service in maintenance.affectedServices" 
                  :key="service"
                  class="service-tag"
                >
                  {{ service }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Subscribe to Updates -->
    <div class="subscribe-section">
      <div class="section-container">
        <div class="subscribe-card">
          <div class="subscribe-content">
            <BellIcon class="subscribe-icon" />
            <div class="subscribe-info">
              <h3 class="subscribe-title">Receba Notificações de Status</h3>
              <p class="subscribe-description">
                Seja notificado sobre incidentes, manutenções e atualizações de status.
              </p>
            </div>
          </div>
          <div class="subscribe-form">
            <div class="form-group">
              <input 
                v-model="subscribeEmail" 
                type="email" 
                placeholder="Seu e-mail" 
                class="email-input"
                :disabled="subscribing"
              >
              <button 
                @click="subscribeToUpdates" 
                :disabled="!subscribeEmail || subscribing"
                class="subscribe-button"
              >
                <LoadingSpinner v-if="subscribing" class="button-spinner" />
                {{ subscribing ? 'Inscrevendo...' : 'Inscrever-se' }}
              </button>
            </div>
            <p class="subscribe-note">
              Você pode cancelar a inscrição a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

// Icons (inline components)
const ClockIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>`
}

const ServerIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" /></svg>`
}

const DatabaseIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" /><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" /><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" /></svg>`
}

const CloudIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /></svg>`
}

const CpuChipIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>`
}

const ShieldCheckIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

const ChartBarIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>`
}

const UsersIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>`
}

const DocumentIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>`
}

const ArrowTrendingUpIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" /></svg>`
}

const ArrowTrendingDownIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" /></svg>`
}

const ExclamationTriangleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.345 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>`
}

const CheckCircleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.23a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>`
}

const WrenchScrewdriverIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M14.5 10a4.5 4.5 0 004.284-5.882c-.105-.324-.51-.391-.752-.15L15.34 6.66a.454.454 0 01-.493.11 3.01 3.01 0 01-1.618-1.616.455.455 0 01.11-.494l2.694-2.692c.24-.241.174-.647-.15-.752a4.5 4.5 0 00-5.873 4.575c.055.873-.128 1.808-.8 2.368l-7.23 6.024a2.724 2.724 0 103.837 3.837l6.024-7.23c.56-.672 1.495-.855 2.368-.8.096.007.193.01.291.01zM5 16a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" /></svg>`
}

const CalendarIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" /></svg>`
}

const BellIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clip-rule="evenodd" /></svg>`
}

// Composables
const { showToast } = useToast()

// Data
const lastUpdated = ref('')
const incidentFilter = ref('all')
const subscribeEmail = ref('')
const subscribing = ref(false)

// Services data
const services = ref([
  {
    id: 'api',
    name: 'API Principal',
    description: 'Endpoints principais da aplicação',
    icon: ServerIcon,
    status: 'operational',
    metrics: {
      uptime: 99.95,
      responseTime: 145
    }
  },
  {
    id: 'database',
    name: 'Banco de Dados',
    description: 'Armazenamento de dados principal',
    icon: DatabaseIcon,
    status: 'operational',
    metrics: {
      uptime: 99.99,
      responseTime: 23
    }
  },
  {
    id: 'ai-processing',
    name: 'Processamento IA',
    description: 'Serviços de geração de resumos',
    icon: CpuChipIcon,
    status: 'operational',
    metrics: {
      uptime: 99.87,
      responseTime: 2340
    }
  },
  {
    id: 'file-storage',
    name: 'Armazenamento',
    description: 'Upload e armazenamento de arquivos',
    icon: CloudIcon,
    status: 'operational',
    metrics: {
      uptime: 99.92,
      responseTime: 89
    }
  },
  {
    id: 'authentication',
    name: 'Autenticação',
    description: 'Sistema de login e autorização',
    icon: ShieldCheckIcon,
    status: 'operational',
    metrics: {
      uptime: 99.98,
      responseTime: 67
    }
  },
  {
    id: 'notifications',
    name: 'Notificações',
    description: 'Envio de e-mails e notificações',
    icon: BellIcon,
    status: 'degraded',
    metrics: {
      uptime: 98.45,
      responseTime: 234
    },
    lastIncident: 'há 2 horas'
  }
])

// Performance metrics
const responseTimeData = ref([120, 145, 134, 156, 142, 138, 149, 143, 151, 147, 139, 145])
const timeLabels = ref(['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'])
const activeUsers = ref(1247)
const usersTrend = ref(12.5)
const processingStats = ref({
  documentsToday: 3456,
  summariesToday: 2891,
  avgProcessingTime: 2.3
})

// Incidents data
const incidents = ref([
  {
    id: 1,
    title: 'Lentidão no serviço de notificações',
    description: 'Alguns usuários podem experimentar atrasos no recebimento de notificações por e-mail.',
    status: 'investigating',
    date: new Date('2024-01-15T14:30:00'),
    affectedServices: ['Notificações'],
    updates: [
      {
        id: 1,
        time: new Date('2024-01-15T14:30:00'),
        message: 'Identificamos lentidão no serviço de notificações e estamos investigando a causa.'
      },
      {
        id: 2,
        time: new Date('2024-01-15T15:15:00'),
        message: 'Encontramos o problema relacionado ao provedor de e-mail. Implementando correção.'
      }
    ]
  },
  {
    id: 2,
    title: 'Manutenção programada do banco de dados',
    description: 'Manutenção de rotina para otimização de performance.',
    status: 'resolved',
    date: new Date('2024-01-14T02:00:00'),
    affectedServices: ['API Principal', 'Banco de Dados'],
    updates: [
      {
        id: 1,
        time: new Date('2024-01-14T02:00:00'),
        message: 'Iniciando manutenção programada do banco de dados.'
      },
      {
        id: 2,
        time: new Date('2024-01-14T03:30:00'),
        message: 'Manutenção concluída com sucesso. Todos os serviços operacionais.'
      }
    ]
  }
])

// Scheduled maintenance
const scheduledMaintenance = ref([
  {
    id: 1,
    title: 'Atualização do sistema de IA',
    description: 'Atualização dos modelos de IA para melhor qualidade dos resumos.',
    startDate: new Date('2024-01-20'),
    startTime: new Date('2024-01-20T03:00:00'),
    endTime: new Date('2024-01-20T05:00:00'),
    duration: '2 horas',
    affectedServices: ['Processamento IA']
  }
])

// Computed properties
const overallStatus = computed(() => {
  const statuses = services.value.map(s => s.status)
  if (statuses.includes('major-outage')) return 'major-outage'
  if (statuses.includes('partial-outage')) return 'partial-outage'
  if (statuses.includes('degraded')) return 'degraded'
  return 'operational'
})

const overallStatusMessage = computed(() => {
  switch (overallStatus.value) {
    case 'operational':
      return 'Todos os sistemas operacionais'
    case 'degraded':
      return 'Alguns sistemas com degradação'
    case 'partial-outage':
      return 'Interrupção parcial dos serviços'
    case 'major-outage':
      return 'Interrupção geral dos serviços'
    default:
      return 'Status desconhecido'
  }
})

const averageResponseTime = computed(() => {
  const sum = responseTimeData.value.reduce((a, b) => a + b, 0)
  return Math.round(sum / responseTimeData.value.length)
})

const peakResponseTime = computed(() => {
  return Math.max(...responseTimeData.value)
})

const filteredIncidents = computed(() => {
  if (incidentFilter.value === 'all') {
    return incidents.value
  }
  return incidents.value.filter(incident => incident.status === incidentFilter.value)
})

// Methods
const getStatusText = (status) => {
  const statusMap = {
    operational: 'Operacional',
    degraded: 'Degradado',
    'partial-outage': 'Interrupção Parcial',
    'major-outage': 'Interrupção Geral',
    resolved: 'Resolvido',
    investigating: 'Investigando',
    monitoring: 'Monitorando'
  }
  return statusMap[status] || status
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const formatTime = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const subscribeToUpdates = async () => {
  if (!subscribeEmail.value) return
  
  subscribing.value = true
  
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    showToast('Inscrição realizada com sucesso!', 'success')
    subscribeEmail.value = ''
  } catch (error) {
    console.error('Erro ao inscrever:', error)
    showToast('Erro ao realizar inscrição. Tente novamente.', 'error')
  } finally {
    subscribing.value = false
  }
}

const updateLastUpdated = () => {
  lastUpdated.value = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date())
}

// Lifecycle
onMounted(() => {
  updateLastUpdated()
  
  // Update timestamp every minute
  setInterval(updateLastUpdated, 60000)
})
</script>

<style scoped>
.status-page {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}

/* Header */
.status-header {
  @apply bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8;
}

.header-content {
  @apply max-w-6xl mx-auto px-4 flex items-center justify-between;
}

.status-indicator {
  @apply flex items-center space-x-4;
}

.status-dot {
  @apply w-4 h-4 rounded-full flex-shrink-0;
}

.status-dot.operational {
  @apply bg-green-500;
}

.status-dot.degraded {
  @apply bg-yellow-500;
}

.status-dot.partial-outage {
  @apply bg-orange-500;
}

.status-dot.major-outage {
  @apply bg-red-500;
}

.status-info {
  @apply flex-1;
}

.page-title {
  @apply text-3xl font-bold text-gray-900 dark:text-white;
}

.status-message {
  @apply text-gray-600 dark:text-gray-300 mt-1;
}

.last-updated {
  @apply flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400;
}

.clock-icon {
  @apply w-4 h-4;
}

/* Sections */
.section-container {
  @apply max-w-6xl mx-auto px-4;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-8;
}

/* Current Status */
.current-status-section {
  @apply py-12;
}

.services-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.service-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6;
}

.service-header {
  @apply flex items-start justify-between mb-4;
}

.service-info {
  @apply flex items-start space-x-3 flex-1;
}

.service-icon {
  @apply w-6 h-6 text-gray-600 dark:text-gray-300 flex-shrink-0 mt-1;
}

.service-details {
  @apply flex-1;
}

.service-name {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.service-description {
  @apply text-gray-600 dark:text-gray-300 text-sm mt-1;
}

.service-status {
  @apply flex items-center space-x-2 flex-shrink-0;
}

.status-text {
  @apply text-sm font-medium;
}

.service-status.operational .status-text {
  @apply text-green-600 dark:text-green-400;
}

.service-status.degraded .status-text {
  @apply text-yellow-600 dark:text-yellow-400;
}

.service-status.partial-outage .status-text {
  @apply text-orange-600 dark:text-orange-400;
}

.service-status.major-outage .status-text {
  @apply text-red-600 dark:text-red-400;
}

.service-metrics {
  @apply flex items-center space-x-6 text-sm;
}

.metric-item {
  @apply flex items-center space-x-2;
}

.metric-label {
  @apply text-gray-600 dark:text-gray-300;
}

.metric-value {
  @apply font-semibold text-gray-900 dark:text-white;
}

.last-incident {
  @apply flex items-center space-x-2 mt-3 p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg;
}

.incident-icon {
  @apply w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0;
}

.incident-info {
  @apply flex-1;
}

.incident-text {
  @apply text-sm text-yellow-800 dark:text-yellow-200;
}

/* Performance Metrics */
.metrics-section {
  @apply py-12 bg-white dark:bg-gray-800;
}

.metrics-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.metric-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6;
}

.metric-header {
  @apply flex items-center space-x-3 mb-6;
}

.metric-icon {
  @apply w-6 h-6 text-primary-600 dark:text-primary-400;
}

.metric-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.metric-chart {
  @apply mb-4;
}

.chart-placeholder {
  @apply h-32 relative;
}

.chart-bars {
  @apply flex items-end justify-between h-24 mb-2;
}

.chart-bar {
  @apply bg-primary-600 dark:bg-primary-400 w-6 rounded-t;
}

.chart-labels {
  @apply flex justify-between text-xs text-gray-500 dark:text-gray-400;
}

.chart-label {
  @apply w-6 text-center;
}

.metric-summary {
  @apply flex items-center justify-between text-sm;
}

.summary-item {
  @apply flex items-center space-x-2;
}

.summary-label {
  @apply text-gray-600 dark:text-gray-300;
}

.summary-value {
  @apply font-semibold text-gray-900 dark:text-white;
}

.uptime-grid {
  @apply space-y-4;
}

.uptime-item {
  @apply space-y-2;
}

.uptime-info {
  @apply flex items-center justify-between text-sm;
}

.uptime-name {
  @apply text-gray-900 dark:text-white font-medium;
}

.uptime-percentage {
  @apply text-gray-600 dark:text-gray-300;
}

.uptime-bar {
  @apply w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2;
}

.uptime-fill {
  @apply h-2 rounded-full transition-all duration-300;
}

.uptime-excellent {
  @apply bg-green-500;
}

.uptime-good {
  @apply bg-blue-500;
}

.uptime-warning {
  @apply bg-yellow-500;
}

.uptime-critical {
  @apply bg-red-500;
}

.active-users {
  @apply text-center;
}

.users-count {
  @apply mb-4;
}

.count-number {
  @apply text-3xl font-bold text-gray-900 dark:text-white block;
}

.count-label {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

.users-trend {
  @apply flex items-center justify-center space-x-2;
}

.trend-icon {
  @apply w-4 h-4;
}

.trend-icon.positive {
  @apply text-green-600 dark:text-green-400;
}

.trend-icon.negative {
  @apply text-red-600 dark:text-red-400;
}

.trend-text {
  @apply text-sm font-medium;
}

.trend-text.positive {
  @apply text-green-600 dark:text-green-400;
}

.trend-text.negative {
  @apply text-red-600 dark:text-red-400;
}

.processing-stats {
  @apply space-y-4;
}

.stat-item {
  @apply text-center;
}

.stat-value {
  @apply text-2xl font-bold text-gray-900 dark:text-white block;
}

.stat-label {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

/* Incidents */
.incidents-section {
  @apply py-12;
}

.incidents-header {
  @apply flex items-center justify-between mb-8;
}

.incidents-filter {
  @apply flex items-center space-x-2;
}

.filter-select {
  @apply px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}

.no-incidents {
  @apply text-center py-12;
}

.no-incidents-icon {
  @apply w-16 h-16 mx-auto text-green-500 mb-4;
}

.no-incidents-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-2;
}

.no-incidents-text {
  @apply text-gray-600 dark:text-gray-300;
}

.incidents-timeline {
  @apply space-y-8;
}

.incident-item {
  @apply flex space-x-4;
}

.incident-timeline-dot {
  @apply w-4 h-4 rounded-full flex-shrink-0 mt-2;
}

.incident-timeline-dot.resolved {
  @apply bg-green-500;
}

.incident-timeline-dot.investigating {
  @apply bg-yellow-500;
}

.incident-timeline-dot.monitoring {
  @apply bg-blue-500;
}

.incident-content {
  @apply flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6;
}

.incident-header {
  @apply flex items-start justify-between mb-3;
}

.incident-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.incident-meta {
  @apply flex items-center space-x-3 text-sm;
}

.incident-status {
  @apply px-2 py-1 rounded-full text-xs font-medium;
}

.incident-status.resolved {
  @apply bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200;
}

.incident-status.investigating {
  @apply bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200;
}

.incident-status.monitoring {
  @apply bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200;
}

.incident-date {
  @apply text-gray-500 dark:text-gray-400;
}

.incident-description {
  @apply text-gray-600 dark:text-gray-300 mb-4;
}

.affected-services {
  @apply mb-4;
}

.affected-label {
  @apply text-sm font-medium text-gray-900 dark:text-white;
}

.affected-list {
  @apply flex flex-wrap gap-2 mt-2;
}

.affected-service {
  @apply px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs;
}

.incident-updates {
  @apply border-t border-gray-200 dark:border-gray-700 pt-4;
}

.updates-title {
  @apply text-sm font-medium text-gray-900 dark:text-white mb-3;
}

.updates-list {
  @apply space-y-3;
}

.update-item {
  @apply flex space-x-3;
}

.update-time {
  @apply text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 w-16;
}

.update-text {
  @apply text-sm text-gray-600 dark:text-gray-300 flex-1;
}

/* Maintenance */
.maintenance-section {
  @apply py-12 bg-white dark:bg-gray-800;
}

.no-maintenance {
  @apply text-center py-12;
}

.no-maintenance-icon {
  @apply w-16 h-16 mx-auto text-gray-400 mb-4;
}

.no-maintenance-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-2;
}

.no-maintenance-text {
  @apply text-gray-600 dark:text-gray-300;
}

.maintenance-list {
  @apply space-y-6;
}

.maintenance-item {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6;
}

.maintenance-header {
  @apply flex items-start justify-between mb-4;
}

.maintenance-info {
  @apply flex-1;
}

.maintenance-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.maintenance-description {
  @apply text-gray-600 dark:text-gray-300;
}

.maintenance-schedule {
  @apply flex items-start space-x-3;
}

.schedule-icon {
  @apply w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1;
}

.schedule-details {
  @apply text-sm;
}

.schedule-date {
  @apply font-semibold text-gray-900 dark:text-white;
}

.schedule-time {
  @apply text-gray-600 dark:text-gray-300;
}

.schedule-duration {
  @apply text-gray-500 dark:text-gray-400;
}

.maintenance-services {
  @apply border-t border-gray-200 dark:border-gray-600 pt-4;
}

.services-label {
  @apply text-sm font-medium text-gray-900 dark:text-white;
}

.services-list {
  @apply flex flex-wrap gap-2 mt-2;
}

.service-tag {
  @apply px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded text-xs;
}

/* Subscribe */
.subscribe-section {
  @apply py-12;
}

.subscribe-card {
  @apply bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white;
}

.subscribe-content {
  @apply flex items-center space-x-4 mb-6;
}

.subscribe-icon {
  @apply w-8 h-8 flex-shrink-0;
}

.subscribe-info {
  @apply flex-1;
}

.subscribe-title {
  @apply text-xl font-semibold mb-2;
}

.subscribe-description {
  @apply text-primary-100;
}

.subscribe-form {
  @apply space-y-3;
}

.form-group {
  @apply flex space-x-3;
}

.email-input {
  @apply flex-1 px-4 py-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-primary-300 focus:outline-none disabled:opacity-50;
}

.subscribe-button {
  @apply px-6 py-2 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 focus:ring-2 focus:ring-primary-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2;
}

.button-spinner {
  @apply w-4 h-4;
}

.subscribe-note {
  @apply text-primary-200 text-sm;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    @apply flex-col items-start space-y-4;
  }
  
  .services-grid {
    @apply grid-cols-1;
  }
  
  .metrics-grid {
    @apply grid-cols-1;
  }
  
  .incidents-header {
    @apply flex-col items-start space-y-4;
  }
  
  .incident-header {
    @apply flex-col items-start space-y-2;
  }
  
  .maintenance-header {
    @apply flex-col items-start space-y-4;
  }
  
  .subscribe-content {
    @apply flex-col items-start space-y-4;
  }
  
  .form-group {
    @apply flex-col space-y-3 space-x-0;
  }
}
</style>