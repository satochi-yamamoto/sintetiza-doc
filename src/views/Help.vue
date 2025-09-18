<template>
  <div class="help-page">
    <!-- Header -->
    <div class="help-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Central de Ajuda</h1>
          <p class="page-description">
            Encontre respostas para suas dúvidas e aprenda a usar o SintetizaDoc
          </p>
        </div>
        <div class="search-section">
          <div class="search-container">
            <MagnifyingGlassIcon class="search-icon" />
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Pesquisar na ajuda..." 
              class="search-input"
              @input="handleSearch"
            >
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="quick-actions-section">
      <div class="section-container">
        <h2 class="section-title">Ações Rápidas</h2>
        <div class="actions-grid">
          <router-link 
            to="/contact" 
            class="action-card"
          >
            <ChatBubbleLeftRightIcon class="action-icon" />
            <div class="action-content">
              <h3 class="action-title">Falar com Suporte</h3>
              <p class="action-description">Entre em contato conosco</p>
            </div>
            <ChevronRightIcon class="action-arrow" />
          </router-link>
          
          <router-link 
            to="/api-docs" 
            class="action-card"
          >
            <CodeBracketIcon class="action-icon" />
            <div class="action-content">
              <h3 class="action-title">Documentação da API</h3>
              <p class="action-description">Integre com nossa API</p>
            </div>
            <ChevronRightIcon class="action-arrow" />
          </router-link>
          
          <router-link 
            to="/status" 
            class="action-card"
          >
            <SignalIcon class="action-icon" />
            <div class="action-content">
              <h3 class="action-title">Status do Sistema</h3>
              <p class="action-description">Verifique a disponibilidade</p>
            </div>
            <ChevronRightIcon class="action-arrow" />
          </router-link>
          
          <a 
            href="#video-tutorials" 
            class="action-card"
            @click="scrollToSection('video-tutorials')"
          >
            <PlayIcon class="action-icon" />
            <div class="action-content">
              <h3 class="action-title">Tutoriais em Vídeo</h3>
              <p class="action-description">Aprenda assistindo</p>
            </div>
            <ChevronRightIcon class="action-arrow" />
          </a>
        </div>
      </div>
    </div>
    
    <!-- Categories -->
    <div class="categories-section">
      <div class="section-container">
        <h2 class="section-title">Categorias de Ajuda</h2>
        <div class="categories-grid">
          <div 
            v-for="category in filteredCategories" 
            :key="category.id"
            class="category-card"
            @click="toggleCategory(category.id)"
          >
            <div class="category-header">
              <div class="category-info">
                <component :is="category.icon" class="category-icon" />
                <div class="category-details">
                  <h3 class="category-title">{{ category.title }}</h3>
                  <p class="category-description">{{ category.description }}</p>
                </div>
              </div>
              <div class="category-toggle">
                <span class="article-count">{{ category.articles.length }} artigos</span>
                <ChevronDownIcon 
                  :class="['toggle-icon', { 'rotate-180': expandedCategories.includes(category.id) }]"
                />
              </div>
            </div>
            
            <div 
              v-if="expandedCategories.includes(category.id)" 
              class="category-content"
            >
              <div class="articles-list">
                <div 
                  v-for="article in category.articles" 
                  :key="article.id"
                  class="article-item"
                  @click.stop="openArticle(article)"
                >
                  <div class="article-info">
                    <h4 class="article-title">{{ article.title }}</h4>
                    <p class="article-summary">{{ article.summary }}</p>
                  </div>
                  <div class="article-meta">
                    <span class="article-views">{{ article.views }} visualizações</span>
                    <ChevronRightIcon class="article-arrow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Video Tutorials -->
    <div id="video-tutorials" class="tutorials-section">
      <div class="section-container">
        <h2 class="section-title">Tutoriais em Vídeo</h2>
        <div class="tutorials-grid">
          <div 
            v-for="tutorial in tutorials" 
            :key="tutorial.id"
            class="tutorial-card"
            @click="playTutorial(tutorial)"
          >
            <div class="tutorial-thumbnail">
              <img 
                :src="tutorial.thumbnail" 
                :alt="tutorial.title"
                class="thumbnail-image"
              >
              <div class="play-overlay">
                <PlayIcon class="play-icon" />
              </div>
              <div class="tutorial-duration">{{ tutorial.duration }}</div>
            </div>
            <div class="tutorial-content">
              <h3 class="tutorial-title">{{ tutorial.title }}</h3>
              <p class="tutorial-description">{{ tutorial.description }}</p>
              <div class="tutorial-meta">
                <span class="tutorial-level" :class="tutorial.level">
                  {{ getLevelText(tutorial.level) }}
                </span>
                <span class="tutorial-views">{{ tutorial.views }} visualizações</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Popular Articles -->
    <div class="popular-section">
      <div class="section-container">
        <h2 class="section-title">Artigos Mais Populares</h2>
        <div class="popular-grid">
          <div 
            v-for="article in popularArticles" 
            :key="article.id"
            class="popular-article"
            @click="openArticle(article)"
          >
            <div class="popular-rank">{{ article.rank }}</div>
            <div class="popular-content">
              <h3 class="popular-title">{{ article.title }}</h3>
              <p class="popular-summary">{{ article.summary }}</p>
              <div class="popular-meta">
                <span class="popular-category">{{ article.category }}</span>
                <span class="popular-views">{{ article.views }} visualizações</span>
              </div>
            </div>
            <ChevronRightIcon class="popular-arrow" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contact Support -->
    <div class="support-section">
      <div class="section-container">
        <div class="support-card">
          <div class="support-content">
            <QuestionMarkCircleIcon class="support-icon" />
            <div class="support-info">
              <h3 class="support-title">Não encontrou o que procurava?</h3>
              <p class="support-description">
                Nossa equipe de suporte está pronta para ajudar você.
              </p>
            </div>
          </div>
          <div class="support-actions">
            <router-link 
              to="/contact" 
              class="support-button primary"
            >
              <ChatBubbleLeftRightIcon class="button-icon" />
              Falar com Suporte
            </router-link>
            <a 
              href="mailto:suporte@sintetizadoc.com" 
              class="support-button secondary"
            >
              <EnvelopeIcon class="button-icon" />
              Enviar E-mail
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Article Modal -->
    <div 
      v-if="selectedArticle" 
      class="modal-overlay"
      @click="closeArticle"
    >
      <div 
        class="article-modal"
        @click.stop
      >
        <div class="modal-header">
          <div class="modal-title-section">
            <h2 class="modal-title">{{ selectedArticle.title }}</h2>
            <div class="modal-meta">
              <span class="modal-category">{{ selectedArticle.category }}</span>
              <span class="modal-views">{{ selectedArticle.views }} visualizações</span>
            </div>
          </div>
          <button 
            @click="closeArticle" 
            class="close-button"
          >
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        
        <div class="modal-content">
          <div class="article-content" v-html="selectedArticle.content" />
        </div>
        
        <div class="modal-footer">
          <div class="feedback-section">
            <span class="feedback-label">Este artigo foi útil?</span>
            <div class="feedback-buttons">
              <button 
                @click="submitFeedback(true)" 
                :class="['feedback-button', { active: feedback === true }]"
              >
                <HandThumbUpIcon class="feedback-icon" />
                Sim
              </button>
              <button 
                @click="submitFeedback(false)" 
                :class="['feedback-button', { active: feedback === false }]"
              >
                <HandThumbDownIcon class="feedback-icon" />
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Video Modal -->
    <div 
      v-if="selectedTutorial" 
      class="modal-overlay"
      @click="closeTutorial"
    >
      <div 
        class="video-modal"
        @click.stop
      >
        <div class="video-header">
          <h2 class="video-title">{{ selectedTutorial.title }}</h2>
          <button 
            @click="closeTutorial" 
            class="close-button"
          >
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        
        <div class="video-container">
          <div class="video-placeholder">
            <PlayIcon class="video-play-icon" />
            <p class="video-placeholder-text">
              Vídeo: {{ selectedTutorial.title }}
            </p>
            <p class="video-duration-text">
              Duração: {{ selectedTutorial.duration }}
            </p>
          </div>
        </div>
        
        <div class="video-description">
          <p>{{ selectedTutorial.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from '@/composables/useToast'

// Icons (inline components)
const MagnifyingGlassIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" /></svg>`
}

const ChatBubbleLeftRightIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.334a.75.75 0 001.28.53l3.58-3.58h.14c2.236 0 4.43-.18 6.57-.524 1.437-.232 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2z" clip-rule="evenodd" /></svg>`
}

const CodeBracketIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6.28 5.22a.75.75 0 010 1.06L2.56 10l3.72 3.72a.75.75 0 01-1.06 1.06L.97 10.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0zm7.44 0a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>`
}

const SignalIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.5 2A1.5 1.5 0 002 3.5V5c0 1.149.15 2.263.43 3.326a13.022 13.022 0 002.262 3.829c.14.161.292.312.459.450L9.75 17.2a.75.75 0 001.5 0l4.599-4.595c.167-.138.319-.289.459-.45a13.022 13.022 0 002.262-3.829C18.85 7.263 19 6.149 19 5V3.5A1.5 1.5 0 0017.5 2h-14zm5.5 9a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>`
}

const PlayIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>`
}

const ChevronRightIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>`
}

const ChevronDownIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" /></svg>`
}

const DocumentTextIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>`
}

const CogIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.205 1.251l-1.18 2.044a1 1 0 01-1.186.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.205-1.251l1.18-2.044a1 1 0 011.186-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
}

const CreditCardIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clip-rule="evenodd" /></svg>`
}

const ShieldCheckIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

const QuestionMarkCircleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>`
}

const EnvelopeIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg>`
}

const XMarkIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>`
}

const HandThumbUpIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54-.166 1.148.076 1.653.24.505.758.808 1.295.808.284 0 .549-.115.707-.28A1 1 0 0116.5 8.25v.25a4.75 4.75 0 01-4.75 4.75H10a.75.75 0 01-.75-.75V3z" /></svg>`
}

const HandThumbDownIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 016.905 17c0-.995.182-1.948.514-2.826.204-.54.166-1.148-.076-1.653-.24-.505-.758-.808-1.295-.808-.284 0-.549.115-.707.28A1 1 0 014.405 11.75v-.25A4.75 4.75 0 019.155 7h1.75c.414 0 .75.336.75.75V17z" /></svg>`
}

// Composables
const { showToast } = useToast()

// Data
const searchQuery = ref('')
const expandedCategories = ref([])
const selectedArticle = ref(null)
const selectedTutorial = ref(null)
const feedback = ref(null)

// Categories data
const categories = ref([
  {
    id: 'getting-started',
    title: 'Primeiros Passos',
    description: 'Como começar a usar o SintetizaDoc',
    icon: DocumentTextIcon,
    articles: [
      {
        id: 1,
        title: 'Como criar sua primeira conta',
        summary: 'Guia passo a passo para criar e configurar sua conta',
        category: 'Primeiros Passos',
        views: 15420,
        content: `
          <h3>Criando sua conta no SintetizaDoc</h3>
          <p>Bem-vindo ao SintetizaDoc! Este guia irá ajudá-lo a criar sua conta e começar a usar nossa plataforma.</p>
          
          <h4>Passo 1: Acesse a página de cadastro</h4>
          <p>Clique no botão "Cadastrar" no canto superior direito da página inicial.</p>
          
          <h4>Passo 2: Escolha seu método de cadastro</h4>
          <p>Você pode se cadastrar usando:</p>
          <ul>
            <li>E-mail e senha</li>
            <li>Conta do Google</li>
            <li>Conta do GitHub</li>
            <li>Conta da Apple</li>
          </ul>
          
          <h4>Passo 3: Complete seu perfil</h4>
          <p>Após o cadastro, complete as informações do seu perfil para uma melhor experiência.</p>
          
          <h4>Passo 4: Confirme seu e-mail</h4>
          <p>Verifique sua caixa de entrada e clique no link de confirmação que enviamos.</p>
        `
      },
      {
        id: 2,
        title: 'Fazendo upload do seu primeiro documento',
        summary: 'Aprenda a fazer upload e processar documentos',
        category: 'Primeiros Passos',
        views: 12890,
        content: `
          <h3>Upload de Documentos</h3>
          <p>O SintetizaDoc suporta diversos formatos de documentos para processamento.</p>
          
          <h4>Formatos suportados</h4>
          <ul>
            <li>PDF (.pdf)</li>
            <li>Word (.docx, .doc)</li>
            <li>Texto (.txt)</li>
            <li>PowerPoint (.pptx, .ppt)</li>
          </ul>
          
          <h4>Como fazer upload</h4>
          <ol>
            <li>Acesse o Dashboard</li>
            <li>Clique em "Novo Upload"</li>
            <li>Selecione o arquivo ou arraste para a área de upload</li>
            <li>Aguarde o processamento</li>
          </ol>
        `
      },
      {
        id: 3,
        title: 'Gerando seu primeiro resumo',
        summary: 'Como gerar resumos inteligentes dos seus documentos',
        category: 'Primeiros Passos',
        views: 11250,
        content: `
          <h3>Geração de Resumos</h3>
          <p>Após fazer upload de um documento, você pode gerar resumos personalizados.</p>
          
          <h4>Tipos de resumo disponíveis</h4>
          <ul>
            <li><strong>Executivo:</strong> Resumo focado em pontos-chave para tomada de decisão</li>
            <li><strong>Técnico:</strong> Resumo detalhado com aspectos técnicos</li>
            <li><strong>Educacional:</strong> Resumo didático para aprendizado</li>
            <li><strong>Personalizado:</strong> Resumo baseado em suas instruções específicas</li>
          </ul>
          
          <h4>Como gerar um resumo</h4>
          <ol>
            <li>Selecione o documento na lista</li>
            <li>Clique em "Gerar Resumo"</li>
            <li>Escolha o tipo de resumo</li>
            <li>Configure as opções (tamanho, idioma, etc.)</li>
            <li>Clique em "Processar"</li>
          </ol>
        `
      }
    ]
  },
  {
    id: 'account-settings',
    title: 'Conta e Configurações',
    description: 'Gerencie sua conta e preferências',
    icon: CogIcon,
    articles: [
      {
        id: 4,
        title: 'Alterando informações do perfil',
        summary: 'Como editar nome, e-mail e outras informações pessoais',
        category: 'Conta e Configurações',
        views: 8750,
        content: `
          <h3>Editando seu Perfil</h3>
          <p>Mantenha suas informações sempre atualizadas.</p>
          
          <h4>Informações editáveis</h4>
          <ul>
            <li>Nome completo</li>
            <li>E-mail</li>
            <li>Foto de perfil</li>
            <li>Preferências de idioma</li>
            <li>Configurações de notificação</li>
          </ul>
        `
      },
      {
        id: 5,
        title: 'Configurações de segurança',
        summary: 'Proteja sua conta com autenticação de dois fatores',
        category: 'Conta e Configurações',
        views: 6420,
        content: `
          <h3>Segurança da Conta</h3>
          <p>Proteja sua conta com nossas opções de segurança avançadas.</p>
          
          <h4>Autenticação de Dois Fatores (2FA)</h4>
          <p>Adicione uma camada extra de segurança à sua conta.</p>
          
          <h4>Senhas de aplicativo</h4>
          <p>Gere senhas específicas para integrações de terceiros.</p>
        `
      }
    ]
  },
  {
    id: 'billing',
    title: 'Faturamento e Planos',
    description: 'Informações sobre assinaturas e pagamentos',
    icon: CreditCardIcon,
    articles: [
      {
        id: 6,
        title: 'Comparação de planos',
        summary: 'Entenda as diferenças entre os planos disponíveis',
        category: 'Faturamento e Planos',
        views: 9830,
        content: `
          <h3>Planos Disponíveis</h3>
          <p>Escolha o plano que melhor se adequa às suas necessidades.</p>
          
          <h4>Plano Gratuito</h4>
          <ul>
            <li>5 documentos por mês</li>
            <li>Resumos básicos</li>
            <li>Suporte por e-mail</li>
          </ul>
          
          <h4>Plano Básico - R$ 29/mês</h4>
          <ul>
            <li>50 documentos por mês</li>
            <li>Todos os tipos de resumo</li>
            <li>Exportação em múltiplos formatos</li>
            <li>Suporte prioritário</li>
          </ul>
        `
      },
      {
        id: 7,
        title: 'Como fazer upgrade do plano',
        summary: 'Processo para atualizar sua assinatura',
        category: 'Faturamento e Planos',
        views: 5670,
        content: `
          <h3>Upgrade de Plano</h3>
          <p>Atualize seu plano a qualquer momento para ter acesso a mais recursos.</p>
          
          <h4>Como fazer upgrade</h4>
          <ol>
            <li>Acesse Configurações > Assinatura</li>
            <li>Clique em "Fazer Upgrade"</li>
            <li>Escolha o novo plano</li>
            <li>Complete o pagamento</li>
          </ol>
        `
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Solução de Problemas',
    description: 'Resolva problemas comuns rapidamente',
    icon: ShieldCheckIcon,
    articles: [
      {
        id: 8,
        title: 'Problemas com upload de arquivos',
        summary: 'Soluções para erros durante o upload',
        category: 'Solução de Problemas',
        views: 7890,
        content: `
          <h3>Problemas de Upload</h3>
          <p>Soluções para os problemas mais comuns durante o upload.</p>
          
          <h4>Arquivo muito grande</h4>
          <p>O limite máximo é de 50MB por arquivo. Comprima o arquivo ou divida em partes menores.</p>
          
          <h4>Formato não suportado</h4>
          <p>Verifique se o arquivo está em um dos formatos suportados: PDF, DOCX, TXT, PPTX.</p>
        `
      },
      {
        id: 9,
        title: 'Resumos não são gerados',
        summary: 'O que fazer quando a geração de resumos falha',
        category: 'Solução de Problemas',
        views: 4560,
        content: `
          <h3>Problemas na Geração de Resumos</h3>
          <p>Possíveis causas e soluções para falhas na geração de resumos.</p>
          
          <h4>Documento muito longo</h4>
          <p>Documentos muito extensos podem demorar mais para processar. Aguarde alguns minutos.</p>
          
          <h4>Texto ilegível</h4>
          <p>Certifique-se de que o documento contém texto legível e não apenas imagens.</p>
        `
      }
    ]
  }
])

// Tutorials data
const tutorials = ref([
  {
    id: 1,
    title: 'Introdução ao SintetizaDoc',
    description: 'Visão geral da plataforma e principais funcionalidades',
    thumbnail: 'https://via.placeholder.com/320x180/4F46E5/FFFFFF?text=Intro',
    duration: '5:30',
    level: 'beginner',
    views: 25430
  },
  {
    id: 2,
    title: 'Upload e Processamento de Documentos',
    description: 'Como fazer upload e processar diferentes tipos de documentos',
    thumbnail: 'https://via.placeholder.com/320x180/059669/FFFFFF?text=Upload',
    duration: '8:15',
    level: 'beginner',
    views: 18920
  },
  {
    id: 3,
    title: 'Tipos de Resumo e Personalização',
    description: 'Explorando os diferentes tipos de resumo e opções de personalização',
    thumbnail: 'https://via.placeholder.com/320x180/DC2626/FFFFFF?text=Resumos',
    duration: '12:45',
    level: 'intermediate',
    views: 14560
  },
  {
    id: 4,
    title: 'Integração com API',
    description: 'Como integrar o SintetizaDoc com suas aplicações usando nossa API',
    thumbnail: 'https://via.placeholder.com/320x180/7C3AED/FFFFFF?text=API',
    duration: '15:20',
    level: 'advanced',
    views: 8750
  }
])

// Popular articles data
const popularArticles = ref([
  {
    id: 1,
    rank: 1,
    title: 'Como criar sua primeira conta',
    summary: 'Guia passo a passo para criar e configurar sua conta',
    category: 'Primeiros Passos',
    views: 15420
  },
  {
    id: 2,
    rank: 2,
    title: 'Fazendo upload do seu primeiro documento',
    summary: 'Aprenda a fazer upload e processar documentos',
    category: 'Primeiros Passos',
    views: 12890
  },
  {
    id: 3,
    rank: 3,
    title: 'Gerando seu primeiro resumo',
    summary: 'Como gerar resumos inteligentes dos seus documentos',
    category: 'Primeiros Passos',
    views: 11250
  },
  {
    id: 4,
    rank: 4,
    title: 'Comparação de planos',
    summary: 'Entenda as diferenças entre os planos disponíveis',
    category: 'Faturamento e Planos',
    views: 9830
  },
  {
    id: 5,
    rank: 5,
    title: 'Alterando informações do perfil',
    summary: 'Como editar nome, e-mail e outras informações pessoais',
    category: 'Conta e Configurações',
    views: 8750
  }
])

// Computed properties
const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return categories.value.map(category => ({
    ...category,
    articles: category.articles.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query)
    )
  })).filter(category => category.articles.length > 0)
})

// Methods
const handleSearch = () => {
  // Expand categories that have matching articles
  if (searchQuery.value) {
    const matchingCategories = filteredCategories.value.map(c => c.id)
    expandedCategories.value = matchingCategories
  } else {
    expandedCategories.value = []
  }
}

const toggleCategory = (categoryId) => {
  const index = expandedCategories.value.indexOf(categoryId)
  if (index > -1) {
    expandedCategories.value.splice(index, 1)
  } else {
    expandedCategories.value.push(categoryId)
  }
}

const openArticle = (article) => {
  selectedArticle.value = article
  feedback.value = null
}

const closeArticle = () => {
  selectedArticle.value = null
  feedback.value = null
}

const playTutorial = (tutorial) => {
  selectedTutorial.value = tutorial
}

const closeTutorial = () => {
  selectedTutorial.value = null
}

const submitFeedback = (isHelpful) => {
  feedback.value = isHelpful
  showToast(
    isHelpful ? 'Obrigado pelo feedback positivo!' : 'Obrigado pelo feedback. Vamos melhorar este artigo.',
    'success'
  )
}

const getLevelText = (level) => {
  const levels = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado'
  }
  return levels[level] || level
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Lifecycle
onMounted(() => {
  // Auto-expand first category
  if (categories.value.length > 0) {
    expandedCategories.value = [categories.value[0].id]
  }
})
</script>

<style scoped>
.help-page {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}

/* Header */
.help-header {
  @apply bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12;
}

.header-content {
  @apply max-w-4xl mx-auto px-4 text-center;
}

.header-text {
  @apply mb-8;
}

.page-title {
  @apply text-4xl font-bold text-gray-900 dark:text-white mb-4;
}

.page-description {
  @apply text-xl text-gray-600 dark:text-gray-300;
}

.search-section {
  @apply max-w-md mx-auto;
}

.search-container {
  @apply relative;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400;
}

.search-input {
  @apply w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}

/* Sections */
.section-container {
  @apply max-w-6xl mx-auto px-4;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-8;
}

/* Quick Actions */
.quick-actions-section {
  @apply py-12;
}

.actions-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.action-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer flex items-center space-x-4 text-decoration-none;
}

.action-icon {
  @apply w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0;
}

.action-content {
  @apply flex-1;
}

.action-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-1;
}

.action-description {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

.action-arrow {
  @apply w-5 h-5 text-gray-400 flex-shrink-0;
}

/* Categories */
.categories-section {
  @apply py-12 bg-white dark:bg-gray-800;
}

.categories-grid {
  @apply space-y-4;
}

.category-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden cursor-pointer;
}

.category-header {
  @apply p-6 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors;
}

.category-info {
  @apply flex items-center space-x-4 flex-1;
}

.category-icon {
  @apply w-8 h-8 text-primary-600 dark:text-primary-400 flex-shrink-0;
}

.category-details {
  @apply flex-1;
}

.category-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-1;
}

.category-description {
  @apply text-gray-600 dark:text-gray-300;
}

.category-toggle {
  @apply flex items-center space-x-3;
}

.article-count {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

.toggle-icon {
  @apply w-5 h-5 text-gray-400 transition-transform duration-200;
}

.category-content {
  @apply border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800;
}

.articles-list {
  @apply divide-y divide-gray-200 dark:divide-gray-700;
}

.article-item {
  @apply p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between;
}

.article-info {
  @apply flex-1;
}

.article-title {
  @apply text-lg font-medium text-gray-900 dark:text-white mb-1;
}

.article-summary {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

.article-meta {
  @apply flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400;
}

.article-views {
  @apply flex-shrink-0;
}

.article-arrow {
  @apply w-4 h-4 flex-shrink-0;
}

/* Tutorials */
.tutorials-section {
  @apply py-12;
}

.tutorials-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6;
}

.tutorial-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-shadow;
}

.tutorial-thumbnail {
  @apply relative;
}

.thumbnail-image {
  @apply w-full h-48 object-cover;
}

.play-overlay {
  @apply absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity;
}

.play-icon {
  @apply w-12 h-12 text-white;
}

.tutorial-duration {
  @apply absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded;
}

.tutorial-content {
  @apply p-4;
}

.tutorial-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.tutorial-description {
  @apply text-gray-600 dark:text-gray-300 text-sm mb-3;
}

.tutorial-meta {
  @apply flex items-center justify-between text-sm;
}

.tutorial-level {
  @apply px-2 py-1 rounded-full text-xs font-medium;
}

.tutorial-level.beginner {
  @apply bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200;
}

.tutorial-level.intermediate {
  @apply bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200;
}

.tutorial-level.advanced {
  @apply bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200;
}

.tutorial-views {
  @apply text-gray-500 dark:text-gray-400;
}

/* Popular Articles */
.popular-section {
  @apply py-12 bg-white dark:bg-gray-800;
}

.popular-grid {
  @apply space-y-4;
}

.popular-article {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center space-x-4 transition-colors;
}

.popular-rank {
  @apply w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0;
}

.popular-content {
  @apply flex-1;
}

.popular-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-1;
}

.popular-summary {
  @apply text-gray-600 dark:text-gray-300 text-sm mb-2;
}

.popular-meta {
  @apply flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400;
}

.popular-category {
  @apply font-medium;
}

.popular-views {
  @apply flex-shrink-0;
}

.popular-arrow {
  @apply w-5 h-5 text-gray-400 flex-shrink-0;
}

/* Support Section */
.support-section {
  @apply py-12;
}

.support-card {
  @apply bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white;
}

.support-content {
  @apply flex items-center space-x-4 mb-6;
}

.support-icon {
  @apply w-12 h-12 flex-shrink-0;
}

.support-info {
  @apply flex-1;
}

.support-title {
  @apply text-2xl font-bold mb-2;
}

.support-description {
  @apply text-primary-100;
}

.support-actions {
  @apply flex flex-wrap gap-4;
}

.support-button {
  @apply px-6 py-3 rounded-lg font-medium flex items-center space-x-2 text-decoration-none transition-colors;
}

.support-button.primary {
  @apply bg-white text-primary-600 hover:bg-gray-100;
}

.support-button.secondary {
  @apply bg-primary-700 text-white hover:bg-primary-800 border border-primary-500;
}

.button-icon {
  @apply w-5 h-5;
}

/* Modals */
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50;
}

.article-modal {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col;
}

.modal-header {
  @apply p-6 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between;
}

.modal-title-section {
  @apply flex-1;
}

.modal-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-2;
}

.modal-meta {
  @apply flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400;
}

.modal-category {
  @apply font-medium;
}

.modal-views {
  @apply flex-shrink-0;
}

.close-button {
  @apply p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors;
}

.close-icon {
  @apply w-6 h-6 text-gray-400;
}

.modal-content {
  @apply flex-1 overflow-y-auto p-6;
}

.article-content {
  @apply prose dark:prose-invert max-w-none;
}

.modal-footer {
  @apply p-6 border-t border-gray-200 dark:border-gray-700;
}

.feedback-section {
  @apply flex items-center justify-between;
}

.feedback-label {
  @apply text-gray-900 dark:text-white font-medium;
}

.feedback-buttons {
  @apply flex space-x-3;
}

.feedback-button {
  @apply px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2;
}

.feedback-button.active {
  @apply bg-primary-50 dark:bg-primary-900/30 border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300;
}

.feedback-icon {
  @apply w-4 h-4;
}

/* Video Modal */
.video-modal {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden;
}

.video-header {
  @apply p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between;
}

.video-title {
  @apply text-xl font-bold text-gray-900 dark:text-white;
}

.video-container {
  @apply aspect-video bg-gray-900 flex items-center justify-center;
}

.video-placeholder {
  @apply text-center text-white;
}

.video-play-icon {
  @apply w-16 h-16 mx-auto mb-4;
}

.video-placeholder-text {
  @apply text-lg font-medium mb-2;
}

.video-duration-text {
  @apply text-gray-300;
}

.video-description {
  @apply p-6 text-gray-600 dark:text-gray-300;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    @apply text-left;
  }
  
  .actions-grid {
    @apply grid-cols-1;
  }
  
  .tutorials-grid {
    @apply grid-cols-1;
  }
  
  .support-content {
    @apply flex-col items-start space-y-4 space-x-0;
  }
  
  .support-actions {
    @apply flex-col w-full;
  }
  
  .support-button {
    @apply w-full justify-center;
  }
  
  .modal-header {
    @apply flex-col items-start space-y-4;
  }
  
  .feedback-section {
    @apply flex-col items-start space-y-4;
  }
}
</style>