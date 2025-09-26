<template>
  <div class="privacy">
    <!-- Header -->
    <div class="privacy-header">
      <div class="header-content">
        <h1 class="page-title">
          Política de Privacidade
        </h1>
        <p class="page-subtitle">
          Última atualização: {{ lastUpdated }}
        </p>
        <div class="update-notice">
          <InfoIcon class="notice-icon" />
          <p class="notice-text">
            Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Table of Contents -->
    <div class="toc-section">
      <div class="toc-container">
        <h2 class="toc-title">
          Índice
        </h2>
        <nav class="toc-nav">
          <a 
            v-for="section in sections" 
            :key="section.id"
            :href="`#${section.id}`"
            class="toc-link"
            @click="scrollToSection(section.id)"
          >
            {{ section.title }}
          </a>
        </nav>
      </div>
    </div>
    
    <!-- Content -->
    <div class="privacy-content">
      <!-- Section 1: Informações que Coletamos -->
      <section
        id="informacoes-coletamos"
        class="content-section"
      >
        <h2 class="section-title">
          1. Informações que Coletamos
        </h2>
        
        <div class="subsection">
          <h3 class="subsection-title">
            1.1 Informações Fornecidas por Você
          </h3>
          <p class="section-text">
            Coletamos informações que você nos fornece diretamente, incluindo:
          </p>
          <ul class="section-list">
            <li>Nome completo e endereço de email ao criar uma conta</li>
            <li>Informações de pagamento processadas por nossos parceiros seguros</li>
            <li>Documentos que você carrega para processamento</li>
            <li>Mensagens enviadas através de nossos canais de suporte</li>
            <li>Preferências de configuração da conta</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            1.2 Informações Coletadas Automaticamente
          </h3>
          <p class="section-text">
            Quando você usa nosso serviço, coletamos automaticamente:
          </p>
          <ul class="section-list">
            <li>Informações de uso (páginas visitadas, tempo de sessão, cliques)</li>
            <li>Dados técnicos (endereço IP, tipo de navegador, sistema operacional)</li>
            <li>Cookies e tecnologias similares para melhorar sua experiência</li>
            <li>Logs de erro e performance para manutenção do sistema</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            1.3 Informações de Terceiros
          </h3>
          <p class="section-text">
            Podemos receber informações de terceiros quando você:
          </p>
          <ul class="section-list">
            <li>Faz login usando provedores de autenticação (Google, Apple, GitHub)</li>
            <li>Integra com serviços externos (Google Drive, OneDrive, Notion)</li>
            <li>É referenciado por outro usuário em nosso programa de indicações</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 2: Como Usamos suas Informações -->
      <section
        id="como-usamos"
        class="content-section"
      >
        <h2 class="section-title">
          2. Como Usamos suas Informações
        </h2>
        
        <div class="subsection">
          <h3 class="subsection-title">
            2.1 Prestação de Serviços
          </h3>
          <ul class="section-list">
            <li>Processar e gerar resumos de seus documentos</li>
            <li>Fornecer funcionalidades de tradução e análise</li>
            <li>Sincronizar dados entre dispositivos</li>
            <li>Processar pagamentos e gerenciar assinaturas</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            2.2 Comunicação
          </h3>
          <ul class="section-list">
            <li>Enviar notificações sobre o status de processamento</li>
            <li>Responder a solicitações de suporte</li>
            <li>Informar sobre atualizações importantes do serviço</li>
            <li>Enviar newsletters (apenas com seu consentimento)</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            2.3 Melhoria do Serviço
          </h3>
          <ul class="section-list">
            <li>Analisar padrões de uso para otimizar funcionalidades</li>
            <li>Treinar e melhorar nossos modelos de IA (dados anonimizados)</li>
            <li>Detectar e prevenir fraudes ou uso indevido</li>
            <li>Realizar pesquisas e análises estatísticas</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 3: Compartilhamento de Informações -->
      <section
        id="compartilhamento"
        class="content-section"
      >
        <h2 class="section-title">
          3. Compartilhamento de Informações
        </h2>
        
        <div class="important-notice">
          <ShieldIcon class="notice-icon" />
          <div class="notice-content">
            <h4 class="notice-title">
              Compromisso de Privacidade
            </h4>
            <p class="notice-text">
              Nunca vendemos, alugamos ou comercializamos suas informações pessoais.
            </p>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            3.1 Provedores de Serviço
          </h3>
          <p class="section-text">
            Compartilhamos informações com terceiros confiáveis que nos ajudam a operar nosso serviço:
          </p>
          <ul class="section-list">
            <li><strong>Processamento de Pagamentos:</strong> Stripe para transações seguras</li>
            <li><strong>Hospedagem:</strong> Supabase para armazenamento seguro de dados</li>
            <li><strong>IA e Processamento:</strong> OpenAI e Anthropic para geração de resumos</li>
            <li><strong>Analytics:</strong> Serviços de análise para melhorar a experiência</li>
            <li><strong>Suporte:</strong> Ferramentas de atendimento ao cliente</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            3.2 Requisitos Legais
          </h3>
          <p class="section-text">
            Podemos divulgar informações quando exigido por lei ou para:
          </p>
          <ul class="section-list">
            <li>Cumprir ordens judiciais ou solicitações governamentais</li>
            <li>Proteger nossos direitos, propriedade ou segurança</li>
            <li>Investigar possíveis violações de nossos termos</li>
            <li>Proteger a segurança de nossos usuários</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 4: Segurança dos Dados -->
      <section
        id="seguranca"
        class="content-section"
      >
        <h2 class="section-title">
          4. Segurança dos Dados
        </h2>
        
        <div class="security-grid">
          <div class="security-item">
            <LockIcon class="security-icon" />
            <h4 class="security-title">
              Criptografia
            </h4>
            <p class="security-text">
              Todos os dados são criptografados em trânsito e em repouso usando padrões da indústria.
            </p>
          </div>
          
          <div class="security-item">
            <ServerIcon class="security-icon" />
            <h4 class="security-title">
              Infraestrutura Segura
            </h4>
            <p class="security-text">
              Utilizamos provedores de nuvem certificados com medidas de segurança rigorosas.
            </p>
          </div>
          
          <div class="security-item">
            <UserGroupIcon class="security-icon" />
            <h4 class="security-title">
              Acesso Limitado
            </h4>
            <p class="security-text">
              Apenas funcionários autorizados têm acesso aos dados, seguindo o princípio do menor privilégio.
            </p>
          </div>
          
          <div class="security-item">
            <EyeIcon class="security-icon" />
            <h4 class="security-title">
              Monitoramento
            </h4>
            <p class="security-text">
              Monitoramos continuamente nossos sistemas para detectar e prevenir atividades suspeitas.
            </p>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            4.1 Processamento de Documentos
          </h3>
          <p class="section-text">
            Seus documentos são processados de forma segura:
          </p>
          <ul class="section-list">
            <li>Processamento temporário apenas para gerar resumos</li>
            <li>Exclusão automática de dados temporários após processamento</li>
            <li>Não armazenamos conteúdo de documentos além do necessário</li>
            <li>Modelos de IA não são treinados com seus dados específicos</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 5: Seus Direitos -->
      <section
        id="seus-direitos"
        class="content-section"
      >
        <h2 class="section-title">
          5. Seus Direitos
        </h2>
        
        <div class="rights-grid">
          <div class="right-item">
            <h4 class="right-title">
              Acesso
            </h4>
            <p class="right-text">
              Solicitar uma cópia de todas as informações que temos sobre você.
            </p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">
              Correção
            </h4>
            <p class="right-text">
              Corrigir informações imprecisas ou incompletas em sua conta.
            </p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">
              Exclusão
            </h4>
            <p class="right-text">
              Solicitar a exclusão de suas informações pessoais (direito ao esquecimento).
            </p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">
              Portabilidade
            </h4>
            <p class="right-text">
              Exportar seus dados em formato estruturado e legível por máquina.
            </p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">
              Objeção
            </h4>
            <p class="right-text">
              Opor-se ao processamento de seus dados para fins específicos.
            </p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">
              Limitação
            </h4>
            <p class="right-text">
              Solicitar a limitação do processamento em certas circunstâncias.
            </p>
          </div>
        </div>
        
        <div class="exercise-rights">
          <h3 class="subsection-title">
            Como Exercer seus Direitos
          </h3>
          <p class="section-text">
            Para exercer qualquer um desses direitos, entre em contato conosco através de:
          </p>
          <div class="contact-options">
            <div class="contact-item">
              <MailIcon class="contact-icon" />
              <span>privacidade@sintetiza-doc.com</span>
            </div>
            <div class="contact-item">
              <CogIcon class="contact-icon" />
              <span>Configurações da conta > Privacidade</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Section 6: Cookies -->
      <section
        id="cookies"
        class="content-section"
      >
        <h2 class="section-title">
          6. Cookies e Tecnologias Similares
        </h2>
        
        <div class="subsection">
          <h3 class="subsection-title">
            6.1 Tipos de Cookies
          </h3>
          <div class="cookies-grid">
            <div class="cookie-type">
              <h4 class="cookie-title">
                Essenciais
              </h4>
              <p class="cookie-text">
                Necessários para o funcionamento básico do site (autenticação, segurança).
              </p>
            </div>
            
            <div class="cookie-type">
              <h4 class="cookie-title">
                Funcionais
              </h4>
              <p class="cookie-text">
                Lembram suas preferências e configurações personalizadas.
              </p>
            </div>
            
            <div class="cookie-type">
              <h4 class="cookie-title">
                Analytics
              </h4>
              <p class="cookie-text">
                Ajudam a entender como você usa o site para melhorar a experiência.
              </p>
            </div>
            
            <div class="cookie-type">
              <h4 class="cookie-title">
                Marketing
              </h4>
              <p class="cookie-text">
                Usados para personalizar anúncios e medir eficácia de campanhas.
              </p>
            </div>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">
            6.2 Gerenciar Cookies
          </h3>
          <p class="section-text">
            Você pode controlar cookies através de:
          </p>
          <ul class="section-list">
            <li>Configurações do seu navegador</li>
            <li>Nossa central de preferências de cookies</li>
            <li>Ferramentas de opt-out de terceiros</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 7: Retenção de Dados -->
      <section
        id="retencao"
        class="content-section"
      >
        <h2 class="section-title">
          7. Retenção de Dados
        </h2>
        
        <div class="retention-table">
          <div class="table-header">
            <div class="header-cell">
              Tipo de Dado
            </div>
            <div class="header-cell">
              Período de Retenção
            </div>
            <div class="header-cell">
              Justificativa
            </div>
          </div>
          
          <div class="table-row">
            <div class="table-cell">
              Dados da conta
            </div>
            <div class="table-cell">
              Até exclusão da conta
            </div>
            <div class="table-cell">
              Prestação do serviço
            </div>
          </div>
          
          <div class="table-row">
            <div class="table-cell">
              Documentos processados
            </div>
            <div class="table-cell">
              30 dias após processamento
            </div>
            <div class="table-cell">
              Suporte técnico
            </div>
          </div>
          
          <div class="table-row">
            <div class="table-cell">
              Resumos gerados
            </div>
            <div class="table-cell">
              Conforme plano do usuário
            </div>
            <div class="table-cell">
              Acesso do usuário
            </div>
          </div>
          
          <div class="table-row">
            <div class="table-cell">
              Logs de sistema
            </div>
            <div class="table-cell">
              90 dias
            </div>
            <div class="table-cell">
              Segurança e debugging
            </div>
          </div>
          
          <div class="table-row">
            <div class="table-cell">
              Dados de pagamento
            </div>
            <div class="table-cell">
              7 anos
            </div>
            <div class="table-cell">
              Obrigações fiscais
            </div>
          </div>
        </div>
      </section>
      
      <!-- Section 8: Transferências Internacionais -->
      <section
        id="transferencias"
        class="content-section"
      >
        <h2 class="section-title">
          8. Transferências Internacionais
        </h2>
        
        <p class="section-text">
          Alguns de nossos provedores de serviço estão localizados fora do Brasil. 
          Garantimos proteção adequada através de:
        </p>
        
        <ul class="section-list">
          <li>Cláusulas contratuais padrão aprovadas</li>
          <li>Certificações de adequação (Privacy Shield, etc.)</li>
          <li>Decisões de adequação da autoridade competente</li>
          <li>Consentimento explícito quando necessário</li>
        </ul>
      </section>
      
      <!-- Section 9: Menores de Idade -->
      <section
        id="menores"
        class="content-section"
      >
        <h2 class="section-title">
          9. Proteção de Menores
        </h2>
        
        <div class="minor-protection">
          <ExclamationIcon class="protection-icon" />
          <div class="protection-content">
            <h3 class="protection-title">
              Restrição de Idade
            </h3>
            <p class="protection-text">
              Nosso serviço é destinado a usuários com 18 anos ou mais. 
              Não coletamos intencionalmente informações de menores de 18 anos.
            </p>
          </div>
        </div>
        
        <p class="section-text">
          Se tomarmos conhecimento de que coletamos informações de um menor, 
          excluiremos essas informações imediatamente. Se você acredita que 
          temos informações de um menor, entre em contato conosco.
        </p>
      </section>
      
      <!-- Section 10: Alterações -->
      <section
        id="alteracoes"
        class="content-section"
      >
        <h2 class="section-title">
          10. Alterações nesta Política
        </h2>
        
        <p class="section-text">
          Podemos atualizar esta política periodicamente. Quando fizermos alterações materiais:
        </p>
        
        <ul class="section-list">
          <li>Notificaremos você por email ou através do serviço</li>
          <li>Atualizaremos a data de "última atualização" no topo desta página</li>
          <li>Destacaremos as principais mudanças</li>
          <li>Solicitaremos novo consentimento quando exigido por lei</li>
        </ul>
        
        <p class="section-text">
          Recomendamos que revise esta política regularmente para se manter informado 
          sobre como protegemos suas informações.
        </p>
      </section>
      
      <!-- Section 11: Contato -->
      <section
        id="contato"
        class="content-section"
      >
        <h2 class="section-title">
          11. Entre em Contato
        </h2>
        
        <div class="contact-grid">
          <div class="contact-card">
            <h3 class="contact-title">
              Encarregado de Dados (DPO)
            </h3>
            <div class="contact-details">
              <div class="contact-item">
                <MailIcon class="contact-icon" />
                <span>dpo@sintetiza-doc.com</span>
              </div>
              <div class="contact-item">
                <PhoneIcon class="contact-icon" />
                <span>+55 (11) 9999-9999</span>
              </div>
            </div>
          </div>
          
          <div class="contact-card">
            <h3 class="contact-title">
              Endereço Físico
            </h3>
            <div class="contact-details">
              <div class="contact-item">
                <MapPinIcon class="contact-icon" />
                <div>
                  <p>Sintetiza Doc Ltda.</p>
                  <p>Av. Paulista, 1000 - Sala 1001</p>
                  <p>Bela Vista, São Paulo - SP</p>
                  <p>CEP: 01310-100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="authority-info">
          <h3 class="subsection-title">
            Autoridade de Proteção de Dados
          </h3>
          <p class="section-text">
            Se não estivermos conseguindo resolver sua preocupação, você tem o direito 
            de apresentar uma reclamação à Autoridade Nacional de Proteção de Dados (ANPD):
          </p>
          <div class="authority-contact">
            <div class="contact-item">
              <GlobeIcon class="contact-icon" />
              <span>www.gov.br/anpd</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Icons (inline components)
const InfoIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>`
}

const ShieldIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

const LockIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" /></svg>`
}

const ServerIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" /></svg>`
}

const UserGroupIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>`
}

const EyeIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>`
}

const MailIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>`
}

const CogIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" /></svg>`
}

const ExclamationIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`
}

const PhoneIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>`
}

const MapPinIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>`
}

const GlobeIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.029 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" /></svg>`
}

// Data
const lastUpdated = ref('15 de Janeiro de 2024')
const activeFaq = ref(null)

const sections = [
  { id: 'informacoes-coletamos', title: '1. Informações que Coletamos' },
  { id: 'como-usamos', title: '2. Como Usamos suas Informações' },
  { id: 'compartilhamento', title: '3. Compartilhamento de Informações' },
  { id: 'seguranca', title: '4. Segurança dos Dados' },
  { id: 'seus-direitos', title: '5. Seus Direitos' },
  { id: 'cookies', title: '6. Cookies e Tecnologias Similares' },
  { id: 'retencao', title: '7. Retenção de Dados' },
  { id: 'transferencias', title: '8. Transferências Internacionais' },
  { id: 'menores', title: '9. Proteção de Menores' },
  { id: 'alteracoes', title: '10. Alterações nesta Política' },
  { id: 'contato', title: '11. Entre em Contato' }
]

// Methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.privacy {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900 py-12;
}

.privacy-header {
  @apply text-center mb-12;
}

.header-content {
  @apply max-w-4xl mx-auto px-4;
}

.page-title {
  @apply text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4;
}

.page-subtitle {
  @apply text-lg text-gray-600 dark:text-gray-300 mb-6;
}

.update-notice {
  @apply flex items-center justify-center space-x-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-800 rounded-lg p-4;
}

.notice-icon {
  @apply w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0;
}

.notice-text {
  @apply text-blue-800 dark:text-blue-200;
}

.toc-section {
  @apply max-w-4xl mx-auto px-4 mb-12;
}

.toc-container {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6;
}

.toc-title {
  @apply text-xl font-bold text-gray-900 dark:text-white mb-4;
}

.toc-nav {
  @apply grid grid-cols-1 md:grid-cols-2 gap-2;
}

.toc-link {
  @apply block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors duration-200;
}

.privacy-content {
  @apply max-w-4xl mx-auto px-4 space-y-12;
}

.content-section {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8;
}

.section-title {
  @apply text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-3 border-b border-gray-200 dark:border-gray-700;
}

.subsection {
  @apply mb-8 last:mb-0;
}

.subsection-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-3;
}

.section-text {
  @apply text-gray-600 dark:text-gray-300 mb-4 leading-relaxed;
}

.section-list {
  @apply space-y-2 ml-6;
}

.section-list li {
  @apply text-gray-600 dark:text-gray-300 relative;
}

.section-list li::before {
  content: '•';
  @apply absolute -left-4 text-primary-600 dark:text-primary-400;
}

.important-notice {
  @apply flex items-start space-x-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6;
}

.important-notice .notice-icon {
  @apply w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1;
}

.notice-content {
  @apply flex-1;
}

.notice-title {
  @apply text-lg font-semibold text-green-900 dark:text-green-100 mb-2;
}

.notice-content .notice-text {
  @apply text-green-700 dark:text-green-300 mb-0;
}

.security-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 mb-6;
}

.security-item {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center;
}

.security-icon {
  @apply w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400;
}

.security-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.security-text {
  @apply text-gray-600 dark:text-gray-300;
}

.rights-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6;
}

.right-item {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6;
}

.right-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.right-text {
  @apply text-gray-600 dark:text-gray-300;
}

.exercise-rights {
  @apply mt-8 pt-6 border-t border-gray-200 dark:border-gray-700;
}

.contact-options {
  @apply space-y-3;
}

.contact-item {
  @apply flex items-center space-x-3;
}

.contact-icon {
  @apply w-5 h-5 text-primary-600 dark:text-primary-400;
}

.cookies-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

.cookie-type {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6;
}

.cookie-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.cookie-text {
  @apply text-gray-600 dark:text-gray-300;
}

.retention-table {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden;
}

.table-header {
  @apply grid grid-cols-3 gap-4 bg-gray-100 dark:bg-gray-600 p-4 font-semibold text-gray-900 dark:text-white;
}

.table-row {
  @apply grid grid-cols-3 gap-4 p-4 border-t border-gray-200 dark:border-gray-600;
}

.table-cell {
  @apply text-gray-600 dark:text-gray-300;
}

.header-cell {
  @apply text-gray-900 dark:text-white font-semibold;
}

.minor-protection {
  @apply flex items-start space-x-4 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6;
}

.protection-icon {
  @apply w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1;
}

.protection-content {
  @apply flex-1;
}

.protection-title {
  @apply text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2;
}

.protection-text {
  @apply text-yellow-700 dark:text-yellow-300;
}

.contact-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8 mb-8;
}

.contact-card {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6;
}

.contact-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-4;
}

.contact-details {
  @apply space-y-3;
}

.authority-info {
  @apply pt-6 border-t border-gray-200 dark:border-gray-700;
}

.authority-contact {
  @apply mt-4;
}

/* Responsive */
@media (max-width: 768px) {
  .privacy {
    @apply py-8;
  }
  
  .privacy-header {
    @apply mb-8;
  }
  
  .page-title {
    @apply text-3xl;
  }
  
  .toc-section {
    @apply mb-8;
  }
  
  .toc-nav {
    @apply grid-cols-1;
  }
  
  .privacy-content {
    @apply space-y-8;
  }
  
  .content-section {
    @apply p-6;
  }
  
  .security-grid,
  .rights-grid,
  .cookies-grid {
    @apply grid-cols-1;
  }
  
  .table-header,
  .table-row {
    @apply grid-cols-1 gap-2;
  }
  
  .table-header {
    @apply hidden;
  }
  
  .table-row {
    @apply space-y-2;
  }
  
  .table-cell::before {
    content: attr(data-label) ': ';
    @apply font-semibold;
  }
  
  .contact-grid {
    @apply grid-cols-1 gap-6;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Print styles */
@media print {
  .toc-section {
    @apply hidden;
  }
  
  .content-section {
    @apply shadow-none border-0 mb-8;
  }
  
  .section-title {
    @apply text-black;
  }
  
  .section-text,
  .section-list li {
    @apply text-black;
  }
}
</style>