<template>
  <div class="blog-page">
    <!-- Header -->
    <div class="blog-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">
            Blog & Novidades
          </h1>
          <p class="page-description">
            Fique por dentro das últimas atualizações, dicas e novidades do SintetizaDoc
          </p>
        </div>
      </div>
    </div>
    
    <!-- Featured Post -->
    <div class="featured-section">
      <div class="section-container">
        <div 
          v-if="featuredPost" 
          class="featured-post"
          @click="openPost(featuredPost)"
        >
          <div class="featured-image">
            <img 
              :src="featuredPost.image" 
              :alt="featuredPost.title"
              class="post-image"
            >
            <div class="featured-badge">
              <StarIcon class="badge-icon" />
              Destaque
            </div>
          </div>
          <div class="featured-content">
            <div class="post-meta">
              <span
                class="post-category"
                :class="featuredPost.category.toLowerCase()"
              >
                {{ featuredPost.category }}
              </span>
              <span class="post-date">{{ formatDate(featuredPost.date) }}</span>
              <span class="post-read-time">{{ featuredPost.readTime }} min de leitura</span>
            </div>
            <h2 class="featured-title">
              {{ featuredPost.title }}
            </h2>
            <p class="featured-excerpt">
              {{ featuredPost.excerpt }}
            </p>
            <div class="featured-author">
              <img 
                :src="featuredPost.author.avatar" 
                :alt="featuredPost.author.name"
                class="author-avatar"
              >
              <div class="author-info">
                <span class="author-name">{{ featuredPost.author.name }}</span>
                <span class="author-role">{{ featuredPost.author.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Filters and Search -->
    <div class="filters-section">
      <div class="section-container">
        <div class="filters-header">
          <h2 class="section-title">
            Todos os Posts
          </h2>
          <div class="filters-controls">
            <div class="search-container">
              <MagnifyingGlassIcon class="search-icon" />
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Pesquisar posts..." 
                class="search-input"
              >
            </div>
            <div class="category-filters">
              <button 
                v-for="category in categories" 
                :key="category.id"
                :class="['filter-button', { active: selectedCategories.includes(category.id) }]"
                @click="toggleCategory(category.id)"
              >
                <component
                  :is="category.icon"
                  class="filter-icon"
                />
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Posts Grid -->
    <div class="posts-section">
      <div class="section-container">
        <div
          v-if="loading"
          class="loading-state"
        >
          <div class="loading-spinner" />
          <p class="loading-text">
            Carregando posts...
          </p>
        </div>
        
        <div
          v-else-if="filteredPosts.length === 0"
          class="empty-state"
        >
          <DocumentTextIcon class="empty-icon" />
          <h3 class="empty-title">
            Nenhum post encontrado
          </h3>
          <p class="empty-description">
            Não encontramos posts com os filtros selecionados.
          </p>
          <button 
            class="clear-filters-button" 
            @click="clearFilters"
          >
            Limpar Filtros
          </button>
        </div>
        
        <div
          v-else
          class="posts-grid"
        >
          <article 
            v-for="post in paginatedPosts" 
            :key="post.id"
            class="post-card"
            @click="openPost(post)"
          >
            <div class="post-image-container">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="post-image"
              >
              <div class="post-overlay">
                <EyeIcon class="overlay-icon" />
              </div>
            </div>
            
            <div class="post-content">
              <div class="post-meta">
                <span
                  class="post-category"
                  :class="post.category.toLowerCase()"
                >
                  {{ post.category }}
                </span>
                <span class="post-date">{{ formatDate(post.date) }}</span>
              </div>
              
              <h3 class="post-title">
                {{ post.title }}
              </h3>
              <p class="post-excerpt">
                {{ post.excerpt }}
              </p>
              
              <div class="post-footer">
                <div class="post-author">
                  <img 
                    :src="post.author.avatar" 
                    :alt="post.author.name"
                    class="author-avatar small"
                  >
                  <span class="author-name">{{ post.author.name }}</span>
                </div>
                <div class="post-stats">
                  <span class="read-time">{{ post.readTime }} min</span>
                  <span class="views-count">{{ post.views }} visualizações</span>
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="pagination"
        >
          <button 
            :disabled="currentPage === 1"
            class="pagination-button"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            <ChevronLeftIcon class="pagination-icon" />
            Anterior
          </button>
          
          <div class="pagination-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              :class="['pagination-number', { active: currentPage === page }]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            :disabled="currentPage === totalPages"
            class="pagination-button"
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
          >
            Próximo
            <ChevronRightIcon class="pagination-icon" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Newsletter Signup -->
    <div class="newsletter-section">
      <div class="section-container">
        <div class="newsletter-card">
          <div class="newsletter-content">
            <EnvelopeIcon class="newsletter-icon" />
            <div class="newsletter-info">
              <h3 class="newsletter-title">
                Receba nossas novidades
              </h3>
              <p class="newsletter-description">
                Seja o primeiro a saber sobre novas funcionalidades, dicas e atualizações.
              </p>
            </div>
          </div>
          <form
            class="newsletter-form"
            @submit.prevent="subscribeNewsletter"
          >
            <div class="form-group">
              <input 
                v-model="newsletterEmail" 
                type="email" 
                placeholder="Seu e-mail" 
                class="newsletter-input"
                required
              >
              <button 
                type="submit" 
                :disabled="subscribing"
                class="newsletter-button"
              >
                <span v-if="subscribing">Inscrevendo...</span>
                <span v-else>Inscrever-se</span>
              </button>
            </div>
            <p class="newsletter-privacy">
              Ao se inscrever, você concorda com nossa 
              <router-link
                to="/privacy"
                class="privacy-link"
              >
                Política de Privacidade
              </router-link>.
            </p>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Post Modal -->
    <div 
      v-if="selectedPost" 
      class="modal-overlay"
      @click="closePost"
    >
      <div 
        class="post-modal"
        @click.stop
      >
        <div class="modal-header">
          <button 
            class="close-button" 
            @click="closePost"
          >
            <XMarkIcon class="close-icon" />
          </button>
        </div>
        
        <div class="modal-content">
          <div class="post-hero">
            <img 
              :src="selectedPost.image" 
              :alt="selectedPost.title"
              class="hero-image"
            >
          </div>
          
          <div class="post-header">
            <div class="post-meta">
              <span
                class="post-category"
                :class="selectedPost.category.toLowerCase()"
              >
                {{ selectedPost.category }}
              </span>
              <span class="post-date">{{ formatDate(selectedPost.date) }}</span>
              <span class="post-read-time">{{ selectedPost.readTime }} min de leitura</span>
            </div>
            
            <h1 class="post-title">
              {{ selectedPost.title }}
            </h1>
            
            <div class="post-author-section">
              <img 
                :src="selectedPost.author.avatar" 
                :alt="selectedPost.author.name"
                class="author-avatar"
              >
              <div class="author-details">
                <span class="author-name">{{ selectedPost.author.name }}</span>
                <span class="author-role">{{ selectedPost.author.role }}</span>
              </div>
            </div>
          </div>
          
          <div class="post-body">
            <div
              class="post-content-text"
              v-html="selectedPost.content"
            />
          </div>
          
          <div class="post-actions">
            <div class="social-share">
              <span class="share-label">Compartilhar:</span>
              <div class="share-buttons">
                <button 
                  class="share-button twitter" 
                  @click="sharePost('twitter')"
                >
                  <svg
                    class="share-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Twitter
                </button>
                
                <button 
                  class="share-button linkedin" 
                  @click="sharePost('linkedin')"
                >
                  <svg
                    class="share-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </button>
                
                <button 
                  class="share-button copy" 
                  @click="sharePost('copy')"
                >
                  <LinkIcon class="share-icon" />
                  Copiar Link
                </button>
              </div>
            </div>
          </div>
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

const StarIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" /></svg>`
}

const DocumentTextIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>`
}

const EyeIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>`
}

const ChevronLeftIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" /></svg>`
}

const ChevronRightIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>`
}

const EnvelopeIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" /><path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" /></svg>`
}

const XMarkIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>`
}

const LinkIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" /><path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" /></svg>`
}

const SparklesIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0V6H3a1 1 0 110-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 8.134a1 1 0 010 1.732L14.146 10.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 10.8 6.5 9.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clip-rule="evenodd" /></svg>`
}

const CogIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.205 1.251l-1.18 2.044a1 1 0 01-1.186.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.205-1.251l1.18-2.044a1 1 0 011.186-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
}

const LightBulbIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-3.815 10.631C7.237 14.5 8.138 16 9.5 16h1c1.362 0 2.263-1.5 3.315-3.369A6 6 0 0010 2zM8.5 17a.5.5 0 01.5-.5h2a.5.5 0 010 1H9a.5.5 0 01-.5-.5zM8 18a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 018 18z" /></svg>`
}

const ShieldCheckIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

// Composables
const { showToast } = useToast()

// Data
const loading = ref(false)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedPost = ref(null)
const currentPage = ref(1)
const postsPerPage = 9
const newsletterEmail = ref('')
const subscribing = ref(false)

// Categories
const categories = ref([
  { id: 'novidades', name: 'Novidades', icon: SparklesIcon },
  { id: 'recursos', name: 'Recursos', icon: CogIcon },
  { id: 'dicas', name: 'Dicas', icon: LightBulbIcon },
  { id: 'seguranca', name: 'Segurança', icon: ShieldCheckIcon }
])

// Posts data
const posts = ref([
  {
    id: 1,
    title: 'Novo Sistema de IA Avançada para Resumos Mais Precisos',
    excerpt: 'Implementamos um novo modelo de inteligência artificial que melhora significativamente a qualidade e precisão dos resumos gerados.',
    content: `
      <h2>Revolucionando a Geração de Resumos</h2>
      <p>Estamos empolgados em anunciar o lançamento do nosso novo sistema de IA avançada, que representa um marco significativo na evolução do SintetizaDoc.</p>
      
      <h3>O que mudou?</h3>
      <p>Nosso novo modelo de inteligência artificial utiliza as mais recentes técnicas de processamento de linguagem natural para:</p>
      <ul>
        <li><strong>Maior precisão:</strong> Resumos 40% mais precisos na captura de pontos-chave</li>
        <li><strong>Melhor contexto:</strong> Compreensão aprimorada do contexto e nuances do texto</li>
        <li><strong>Personalização:</strong> Adaptação automática ao estilo e tom do documento original</li>
        <li><strong>Velocidade:</strong> Processamento 60% mais rápido que a versão anterior</li>
      </ul>
      
      <h3>Novos Recursos</h3>
      <p>Além das melhorias na qualidade, também introduzimos novos recursos:</p>
      <ul>
        <li>Resumos em múltiplos idiomas simultaneamente</li>
        <li>Detecção automática de tópicos principais</li>
        <li>Sugestões de palavras-chave relevantes</li>
        <li>Análise de sentimento do conteúdo</li>
      </ul>
      
      <h3>Como isso afeta você?</h3>
      <p>Todos os usuários já têm acesso automático a essas melhorias. Não é necessária nenhuma ação adicional - seus próximos resumos já utilizarão o novo sistema.</p>
      
      <p>Continuamos comprometidos em fornecer a melhor experiência possível para nossos usuários, e esta atualização é apenas o começo de muitas inovações que estão por vir.</p>
    `,
    category: 'Novidades',
    date: new Date('2024-01-15'),
    readTime: 5,
    views: 2840,
    image: 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=IA+Avançada',
    author: {
      name: 'Ana Silva',
      role: 'Head de Produto',
      avatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=AS'
    }
  },
  {
    id: 2,
    title: 'Como Otimizar seus Resumos para Diferentes Audiências',
    excerpt: 'Aprenda técnicas avançadas para personalizar seus resumos de acordo com o público-alvo, maximizando o impacto da sua comunicação.',
    content: `
      <h2>Personalizando Resumos para Máximo Impacto</h2>
      <p>Um dos segredos para uma comunicação eficaz é adaptar sua mensagem ao público que irá consumi-la. No SintetizaDoc, oferecemos várias ferramentas para ajudar você a criar resumos perfeitos para cada situação.</p>
      
      <h3>Conhecendo sua Audiência</h3>
      <p>Antes de gerar um resumo, considere:</p>
      <ul>
        <li><strong>Nível de conhecimento técnico:</strong> Executivos vs. especialistas técnicos</li>
        <li><strong>Tempo disponível:</strong> Resumo executivo vs. análise detalhada</li>
        <li><strong>Objetivo da leitura:</strong> Tomada de decisão vs. aprendizado</li>
        <li><strong>Contexto organizacional:</strong> Interno vs. externo</li>
      </ul>
      
      <h3>Tipos de Resumo por Audiência</h3>
      
      <h4>Para Executivos (Resumo Executivo)</h4>
      <ul>
        <li>Foque em insights acionáveis</li>
        <li>Destaque impactos no negócio</li>
        <li>Use linguagem clara e direta</li>
        <li>Inclua recomendações específicas</li>
      </ul>
      
      <h4>Para Equipes Técnicas (Resumo Técnico)</h4>
      <ul>
        <li>Mantenha terminologia especializada</li>
        <li>Inclua detalhes metodológicos</li>
        <li>Destaque aspectos de implementação</li>
        <li>Forneça contexto técnico completo</li>
      </ul>
      
      <h4>Para Fins Educacionais</h4>
      <ul>
        <li>Estruture o conteúdo progressivamente</li>
        <li>Inclua definições e explicações</li>
        <li>Use exemplos práticos</li>
        <li>Adicione perguntas para reflexão</li>
      </ul>
      
      <h3>Dicas Práticas</h3>
      <p>Para obter os melhores resultados:</p>
      <ol>
        <li>Use as configurações avançadas do SintetizaDoc</li>
        <li>Experimente diferentes estilos de resumo</li>
        <li>Revise e ajuste conforme necessário</li>
        <li>Colete feedback da sua audiência</li>
      </ol>
    `,
    category: 'Dicas',
    date: new Date('2024-01-10'),
    readTime: 8,
    views: 1920,
    image: 'https://via.placeholder.com/800x400/059669/FFFFFF?text=Otimização',
    author: {
      name: 'Carlos Mendes',
      role: 'Especialista em Conteúdo',
      avatar: 'https://via.placeholder.com/40x40/DC2626/FFFFFF?text=CM'
    }
  },
  {
    id: 3,
    title: 'Novas Medidas de Segurança e Proteção de Dados',
    excerpt: 'Implementamos protocolos de segurança ainda mais rigorosos para garantir a máxima proteção dos seus documentos e informações.',
    content: `
      <h2>Segurança em Primeiro Lugar</h2>
      <p>A segurança dos seus dados é nossa prioridade máxima. Por isso, implementamos uma série de novas medidas de proteção que elevam ainda mais o nível de segurança da nossa plataforma.</p>
      
      <h3>Novas Implementações</h3>
      
      <h4>Criptografia Avançada</h4>
      <ul>
        <li>Criptografia AES-256 para todos os dados em repouso</li>
        <li>TLS 1.3 para todas as comunicações</li>
        <li>Chaves de criptografia rotacionadas automaticamente</li>
      </ul>
      
      <h4>Autenticação Multifator (MFA)</h4>
      <ul>
        <li>Suporte a aplicativos autenticadores</li>
        <li>SMS e e-mail como opções de backup</li>
        <li>Chaves de segurança físicas (FIDO2/WebAuthn)</li>
      </ul>
      
      <h4>Monitoramento e Auditoria</h4>
      <ul>
        <li>Log detalhado de todas as atividades</li>
        <li>Detecção automática de atividades suspeitas</li>
        <li>Relatórios de segurança em tempo real</li>
      </ul>
      
      <h3>Conformidade e Certificações</h3>
      <p>Mantemos conformidade com os mais rigorosos padrões internacionais:</p>
      <ul>
        <li><strong>LGPD:</strong> Lei Geral de Proteção de Dados</li>
        <li><strong>GDPR:</strong> Regulamento Geral sobre a Proteção de Dados</li>
        <li><strong>SOC 2 Type II:</strong> Controles de segurança organizacional</li>
        <li><strong>ISO 27001:</strong> Gestão de segurança da informação</li>
      </ul>
      
      <h3>O que isso significa para você?</h3>
      <p>Essas melhorias garantem que:</p>
      <ul>
        <li>Seus documentos estão protegidos com a mais alta tecnologia</li>
        <li>Apenas você tem acesso aos seus dados</li>
        <li>Todas as atividades são monitoradas e auditadas</li>
        <li>Estamos em conformidade com todas as regulamentações</li>
      </ul>
      
      <p>Para ativar a autenticação multifator, acesse suas configurações de segurança no painel de controle.</p>
    `,
    category: 'Segurança',
    date: new Date('2024-01-08'),
    readTime: 6,
    views: 1560,
    image: 'https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Segurança',
    author: {
      name: 'Roberto Santos',
      role: 'CISO',
      avatar: 'https://via.placeholder.com/40x40/7C3AED/FFFFFF?text=RS'
    }
  },
  {
    id: 4,
    title: 'Integração com Google Drive e OneDrive Disponível',
    excerpt: 'Agora você pode importar documentos diretamente do Google Drive e OneDrive, tornando seu fluxo de trabalho ainda mais eficiente.',
    content: `
      <h2>Conecte suas Nuvens Favoritas</h2>
      <p>Sabemos que você armazena documentos em diferentes plataformas. Por isso, desenvolvemos integrações nativas com os principais serviços de armazenamento em nuvem.</p>
      
      <h3>Recursos Disponíveis</h3>
      
      <h4>Google Drive</h4>
      <ul>
        <li>Importação direta de documentos</li>
        <li>Sincronização automática de alterações</li>
        <li>Suporte a pastas compartilhadas</li>
        <li>Preservação de permissões originais</li>
      </ul>
      
      <h4>Microsoft OneDrive</h4>
      <ul>
        <li>Acesso a arquivos pessoais e corporativos</li>
        <li>Integração com Microsoft 365</li>
        <li>Suporte a SharePoint</li>
        <li>Processamento de arquivos do Office</li>
      </ul>
      
      <h3>Como Configurar</h3>
      <ol>
        <li>Acesse Configurações > Integrações</li>
        <li>Clique em "Conectar" na plataforma desejada</li>
        <li>Autorize o acesso em sua conta</li>
        <li>Selecione as pastas que deseja sincronizar</li>
      </ol>
      
      <h3>Benefícios da Integração</h3>
      <ul>
        <li><strong>Fluxo de trabalho unificado:</strong> Acesse tudo em um só lugar</li>
        <li><strong>Economia de tempo:</strong> Sem necessidade de downloads manuais</li>
        <li><strong>Sincronização automática:</strong> Sempre trabalhe com a versão mais recente</li>
        <li><strong>Segurança mantida:</strong> Suas permissões originais são respeitadas</li>
      </ul>
      
      <h3>Próximos Passos</h3>
      <p>Estamos trabalhando em integrações com:</p>
      <ul>
        <li>Dropbox</li>
        <li>Box</li>
        <li>iCloud Drive</li>
        <li>Amazon S3</li>
      </ul>
      
      <p>Fique atento às próximas atualizações!</p>
    `,
    category: 'Recursos',
    date: new Date('2024-01-05'),
    readTime: 4,
    views: 2100,
    image: 'https://via.placeholder.com/800x400/059669/FFFFFF?text=Integração',
    author: {
      name: 'Marina Costa',
      role: 'Desenvolvedora Senior',
      avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=MC'
    }
  },
  {
    id: 5,
    title: '5 Dicas para Maximizar a Qualidade dos seus Resumos',
    excerpt: 'Descubra estratégias práticas para obter resumos mais eficazes e informativos usando as funcionalidades avançadas do SintetizaDoc.',
    content: `
      <h2>Dominando a Arte dos Resumos Eficazes</h2>
      <p>Um bom resumo pode fazer a diferença entre uma informação que é absorvida e uma que é ignorada. Aqui estão nossas melhores dicas para criar resumos excepcionais.</p>
      
      <h3>Dica 1: Prepare seu Documento</h3>
      <p>Antes de gerar o resumo:</p>
      <ul>
        <li>Certifique-se de que o texto está bem formatado</li>
        <li>Remova elementos desnecessários (cabeçalhos repetitivos, rodapés)</li>
        <li>Verifique se não há erros de OCR em documentos escaneados</li>
        <li>Organize o conteúdo em seções lógicas</li>
      </ul>
      
      <h3>Dica 2: Escolha o Tipo Certo de Resumo</h3>
      <p>Cada tipo serve a um propósito específico:</p>
      <ul>
        <li><strong>Executivo:</strong> Para tomadores de decisão</li>
        <li><strong>Técnico:</strong> Para especialistas na área</li>
        <li><strong>Educacional:</strong> Para aprendizado e ensino</li>
        <li><strong>Personalizado:</strong> Para necessidades específicas</li>
      </ul>
      
      <h3>Dica 3: Configure o Tamanho Adequado</h3>
      <p>O tamanho ideal depende do uso:</p>
      <ul>
        <li><strong>Resumo rápido:</strong> 100-200 palavras</li>
        <li><strong>Resumo padrão:</strong> 300-500 palavras</li>
        <li><strong>Resumo detalhado:</strong> 500-1000 palavras</li>
      </ul>
      
      <h3>Dica 4: Use Instruções Personalizadas</h3>
      <p>Para resultados mais precisos, forneça contexto:</p>
      <ul>
        <li>"Foque nos aspectos financeiros"</li>
        <li>"Destaque riscos e oportunidades"</li>
        <li>"Inclua dados quantitativos"</li>
        <li>"Use linguagem técnica apropriada"</li>
      </ul>
      
      <h3>Dica 5: Revise e Refine</h3>
      <p>Após gerar o resumo:</p>
      <ul>
        <li>Verifique se os pontos principais foram capturados</li>
        <li>Ajuste o tom se necessário</li>
        <li>Adicione contexto específico se relevante</li>
        <li>Teste com sua audiência-alvo</li>
      </ul>
      
      <h3>Recursos Avançados</h3>
      <p>Explore funcionalidades que podem melhorar seus resumos:</p>
      <ul>
        <li>Análise de sentimento</li>
        <li>Extração de palavras-chave</li>
        <li>Identificação de tópicos principais</li>
        <li>Sugestões de títulos</li>
      </ul>
      
      <p>Lembre-se: um bom resumo é aquele que comunica efetivamente a essência do documento original para sua audiência específica.</p>
    `,
    category: 'Dicas',
    date: new Date('2024-01-03'),
    readTime: 7,
    views: 1780,
    image: 'https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Dicas',
    author: {
      name: 'Pedro Oliveira',
      role: 'Content Strategist',
      avatar: 'https://via.placeholder.com/40x40/059669/FFFFFF?text=PO'
    }
  },
  {
    id: 6,
    title: 'Lançamento do Plano Empresarial com Recursos Avançados',
    excerpt: 'Apresentamos nosso novo plano empresarial com funcionalidades exclusivas para grandes organizações e equipes.',
    content: `
      <h2>Soluções Empresariais de Próximo Nível</h2>
      <p>Desenvolvemos um plano especialmente pensado para atender às necessidades complexas de grandes organizações.</p>
      
      <h3>Recursos Exclusivos do Plano Empresarial</h3>
      
      <h4>Gestão de Equipes</h4>
      <ul>
        <li>Dashboard administrativo completo</li>
        <li>Controle granular de permissões</li>
        <li>Relatórios de uso e produtividade</li>
        <li>Auditoria completa de atividades</li>
      </ul>
      
      <h4>Integração Avançada</h4>
      <ul>
        <li>API dedicada com rate limits elevados</li>
        <li>Webhooks para automação</li>
        <li>SSO (Single Sign-On) com SAML/OIDC</li>
        <li>Integração com sistemas corporativos</li>
      </ul>
      
      <h4>Segurança Corporativa</h4>
      <ul>
        <li>Controles de acesso baseados em função (RBAC)</li>
        <li>Políticas de retenção de dados personalizadas</li>
        <li>Criptografia com chaves gerenciadas pelo cliente</li>
        <li>Compliance com regulamentações específicas</li>
      </ul>
      
      <h4>Suporte Premium</h4>
      <ul>
        <li>Gerente de conta dedicado</li>
        <li>Suporte 24/7 com SLA garantido</li>
        <li>Treinamento personalizado para equipes</li>
        <li>Consultoria em implementação</li>
      </ul>
      
      <h3>Casos de Uso Empresariais</h3>
      
      <h4>Departamentos Jurídicos</h4>
      <ul>
        <li>Análise rápida de contratos</li>
        <li>Resumos de jurisprudência</li>
        <li>Compliance automático</li>
      </ul>
      
      <h4>Consultorias</h4>
      <ul>
        <li>Processamento de relatórios de pesquisa</li>
        <li>Sínteses para apresentações</li>
        <li>Análise competitiva</li>
      </ul>
      
      <h4>Instituições Financeiras</h4>
      <ul>
        <li>Análise de relatórios financeiros</li>
        <li>Due diligence automatizada</li>
        <li>Resumos regulatórios</li>
      </ul>
      
      <h3>Migração e Implementação</h3>
      <p>Nossa equipe especializada oferece:</p>
      <ul>
        <li>Análise de necessidades específicas</li>
        <li>Plano de migração personalizado</li>
        <li>Implementação assistida</li>
        <li>Treinamento completo da equipe</li>
      </ul>
      
      <h3>Preços e Contratação</h3>
      <p>O plano empresarial oferece:</p>
      <ul>
        <li>Preços personalizados baseados no volume</li>
        <li>Contratos anuais com desconto</li>
        <li>Período de teste de 30 dias</li>
        <li>Migração gratuita de outros planos</li>
      </ul>
      
      <p>Entre em contato com nossa equipe de vendas para uma demonstração personalizada e proposta comercial.</p>
    `,
    category: 'Novidades',
    date: new Date('2024-01-01'),
    readTime: 6,
    views: 1340,
    image: 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Empresarial',
    author: {
      name: 'Luciana Ferreira',
      role: 'Head de Vendas Corporativas',
      avatar: 'https://via.placeholder.com/40x40/DC2626/FFFFFF?text=LF'
    }
  }
])

// Featured post (most recent)
const featuredPost = computed(() => {
  return posts.value.reduce((latest, post) => {
    return new Date(post.date) > new Date(latest.date) ? post : latest
  })
})

// Filtered posts
const filteredPosts = computed(() => {
  let filtered = posts.value.filter(post => post.id !== featuredPost.value?.id)
  
  // Apply category filter
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(post => 
      selectedCategories.value.includes(post.category.toLowerCase())
    )
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query)
    )
  }
  
  // Sort by date (newest first)
  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  // Always show first page
  if (total > 0) pages.push(1)
  
  // Show pages around current page
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    if (!pages.includes(i)) pages.push(i)
  }
  
  // Always show last page
  if (total > 1 && !pages.includes(total)) pages.push(total)
  
  return pages.sort((a, b) => a - b)
})

// Methods
const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
  currentPage.value = 1 // Reset to first page when filtering
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  currentPage.value = 1
}

const openPost = (post) => {
  selectedPost.value = post
  // Increment view count (in a real app, this would be an API call)
  post.views++
}

const closePost = () => {
  selectedPost.value = null
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) return
  
  subscribing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showToast('Inscrição realizada com sucesso! Obrigado por se juntar à nossa newsletter.', 'success')
    newsletterEmail.value = ''
  } catch (error) {
    showToast('Erro ao realizar inscrição. Tente novamente.', 'error')
  } finally {
    subscribing.value = false
  }
}

const sharePost = async (platform) => {
  if (!selectedPost.value) return
  
  const post = selectedPost.value
  const url = `${window.location.origin}/blog/${post.id}`
  const text = `${post.title} - ${post.excerpt}`
  
  try {
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        await navigator.clipboard.writeText(url)
        showToast('Link copiado para a área de transferência!', 'success')
        break
    }
  } catch (error) {
    showToast('Erro ao compartilhar. Tente novamente.', 'error')
  }
}

// Lifecycle
onMounted(() => {
  // Simulate loading
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.blog-page {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900;
}

/* Header */
.blog-header {
  @apply bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-16;
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

/* Featured Post */
.featured-section {
  @apply py-12;
}

.section-container {
  @apply max-w-6xl mx-auto px-4;
}

.featured-post {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow lg:flex;
}

.featured-image {
  @apply relative lg:w-1/2;
}

.post-image {
  @apply w-full h-64 lg:h-full object-cover;
}

.featured-badge {
  @apply absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1;
}

.badge-icon {
  @apply w-4 h-4;
}

.featured-content {
  @apply p-8 lg:w-1/2 flex flex-col justify-center;
}

.post-meta {
  @apply flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4;
}

.post-category {
  @apply px-2 py-1 rounded-full text-xs font-medium;
}

.post-category.novidades {
  @apply bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200;
}

.post-category.recursos {
  @apply bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200;
}

.post-category.dicas {
  @apply bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200;
}

.post-category.seguranca {
  @apply bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200;
}

.post-date {
  @apply flex-shrink-0;
}

.post-read-time {
  @apply flex-shrink-0;
}

.featured-title {
  @apply text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4;
}

.featured-excerpt {
  @apply text-gray-600 dark:text-gray-300 text-lg mb-6;
}

.featured-author {
  @apply flex items-center space-x-3;
}

.author-avatar {
  @apply w-10 h-10 rounded-full object-cover;
}

.author-avatar.small {
  @apply w-8 h-8;
}

.author-info {
  @apply flex flex-col;
}

.author-name {
  @apply font-medium text-gray-900 dark:text-white;
}

.author-role {
  @apply text-sm text-gray-500 dark:text-gray-400;
}

/* Filters */
.filters-section {
  @apply py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700;
}

.filters-header {
  @apply flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white;
}

.filters-controls {
  @apply flex flex-col sm:flex-row gap-4;
}

.search-container {
  @apply relative;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400;
}

.search-input {
  @apply pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-64;
}

.category-filters {
  @apply flex flex-wrap gap-2;
}

.filter-button {
  @apply flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors;
}

.filter-button.active {
  @apply bg-primary-500 border-primary-500 text-white hover:bg-primary-600;
}

.filter-icon {
  @apply w-4 h-4;
}

/* Posts Grid */
.posts-section {
  @apply py-12;
}

.loading-state {
  @apply flex flex-col items-center justify-center py-16;
}

.loading-spinner {
  @apply w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-4;
}

.loading-text {
  @apply text-gray-600 dark:text-gray-400;
}

.empty-state {
  @apply text-center py-16;
}

.empty-icon {
  @apply w-16 h-16 text-gray-400 mx-auto mb-4;
}

.empty-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white mb-2;
}

.empty-description {
  @apply text-gray-600 dark:text-gray-400 mb-6;
}

.clear-filters-button {
  @apply px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors;
}

.posts-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}

.post-card {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow;
}

.post-image-container {
  @apply relative overflow-hidden;
}

.post-overlay {
  @apply absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center;
}

.overlay-icon {
  @apply w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity;
}

.post-card:hover .overlay-icon {
  @apply opacity-100;
}

.post-content {
  @apply p-6;
}

.post-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2;
}

.post-excerpt {
  @apply text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3;
}

.post-footer {
  @apply flex items-center justify-between;
}

.post-author {
  @apply flex items-center space-x-2;
}

.post-stats {
  @apply flex flex-col text-xs text-gray-500 dark:text-gray-400 text-right;
}

.read-time {
  @apply mb-1;
}

.views-count {
  @apply text-xs;
}

/* Pagination */
.pagination {
  @apply flex items-center justify-center space-x-2 mt-12;
}

.pagination-button {
  @apply flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}

.pagination-icon {
  @apply w-4 h-4;
}

.pagination-numbers {
  @apply flex space-x-1;
}

.pagination-number {
  @apply w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors;
}

.pagination-number.active {
  @apply bg-primary-500 border-primary-500 text-white hover:bg-primary-600;
}

/* Newsletter */
.newsletter-section {
  @apply py-16 bg-gradient-to-r from-primary-500 to-primary-600;
}

.newsletter-card {
  @apply bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl;
}

.newsletter-content {
  @apply flex items-center space-x-4 mb-6;
}

.newsletter-icon {
  @apply w-12 h-12 text-primary-500 flex-shrink-0;
}

.newsletter-info {
  @apply flex-1;
}

.newsletter-title {
  @apply text-xl font-bold text-gray-900 dark:text-white mb-2;
}

.newsletter-description {
  @apply text-gray-600 dark:text-gray-300;
}

.newsletter-form {
  @apply space-y-4;
}

.form-group {
  @apply flex flex-col sm:flex-row gap-3;
}

.newsletter-input {
  @apply flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}

.newsletter-button {
  @apply px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap;
}

.newsletter-privacy {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.privacy-link {
  @apply text-primary-500 hover:text-primary-600 underline;
}

/* Post Modal */
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4;
}

.post-modal {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col;
}

.modal-header {
  @apply flex justify-end p-4 border-b border-gray-200 dark:border-gray-700;
}

.close-button {
  @apply p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors;
}

.close-icon {
  @apply w-6 h-6;
}

.modal-content {
  @apply flex-1 overflow-y-auto;
}

.post-hero {
  @apply w-full;
}

.hero-image {
  @apply w-full h-64 lg:h-80 object-cover;
}

.post-header {
  @apply p-8 border-b border-gray-200 dark:border-gray-700;
}

.post-author-section {
  @apply flex items-center space-x-4 mt-6;
}

.author-details {
  @apply flex flex-col;
}

.post-body {
  @apply p-8;
}

.post-content-text {
  @apply prose prose-lg dark:prose-invert max-w-none;
}

.post-content-text h2 {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

.post-content-text h3 {
  @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3;
}

.post-content-text h4 {
  @apply text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2;
}

.post-content-text p {
  @apply text-gray-700 dark:text-gray-300 mb-4 leading-relaxed;
}

.post-content-text ul,
.post-content-text ol {
  @apply mb-4 pl-6;
}

.post-content-text li {
  @apply text-gray-700 dark:text-gray-300 mb-2;
}

.post-content-text strong {
  @apply font-semibold text-gray-900 dark:text-white;
}

.post-actions {
  @apply p-8 border-t border-gray-200 dark:border-gray-700;
}

.social-share {
  @apply flex flex-col sm:flex-row sm:items-center gap-4;
}

.share-label {
  @apply font-medium text-gray-900 dark:text-white;
}

.share-buttons {
  @apply flex flex-wrap gap-3;
}

.share-button {
  @apply flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors;
}

.share-button.twitter {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.share-button.linkedin {
  @apply bg-blue-700 text-white hover:bg-blue-800;
}

.share-button.copy {
  @apply bg-gray-500 text-white hover:bg-gray-600;
}

.share-icon {
  @apply w-4 h-4;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    @apply text-3xl;
  }
  
  .featured-title {
    @apply text-xl;
  }
  
  .filters-header {
    @apply flex-col gap-4;
  }
  
  .filters-controls {
    @apply flex-col gap-3;
  }
  
  .search-input {
    @apply w-full;
  }
  
  .posts-grid {
    @apply grid-cols-1;
  }
  
  .pagination {
    @apply flex-wrap;
  }
  
  .newsletter-content {
    @apply flex-col text-center;
  }
  
  .post-modal {
    @apply m-2 max-h-[95vh];
  }
  
  .post-header,
  .post-body,
  .post-actions {
    @apply p-4;
  }
}

/* Utility Classes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>