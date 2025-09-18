<template>
  <div class="terms">
    <!-- Header -->
    <div class="terms-header">
      <div class="header-content">
        <h1 class="page-title">Termos de Uso</h1>
        <p class="page-subtitle">
          Última atualização: {{ lastUpdated }}
        </p>
        <div class="update-notice">
          <DocumentIcon class="notice-icon" />
          <p class="notice-text">
            Estes termos regem o uso de nossos serviços. Ao usar nossa plataforma, você concorda com estes termos.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Table of Contents -->
    <div class="toc-section">
      <div class="toc-container">
        <h2 class="toc-title">Índice</h2>
        <nav class="toc-nav">
          <a 
            v-for="section in sections" 
            :key="section.id"
            :href="`#${section.id}`"
            @click="scrollToSection(section.id)"
            class="toc-link"
          >
            {{ section.title }}
          </a>
        </nav>
      </div>
    </div>
    
    <!-- Content -->
    <div class="terms-content">
      <!-- Section 1: Aceitação dos Termos -->
      <section id="aceitacao" class="content-section">
        <h2 class="section-title">1. Aceitação dos Termos</h2>
        
        <p class="section-text">
          Ao acessar e usar o Sintetiza Doc ("Serviço", "Plataforma"), operado pela 
          Sintetiza Doc Ltda. ("nós", "nosso", "Empresa"), você concorda em cumprir 
          e estar vinculado a estes Termos de Uso ("Termos").
        </p>
        
        <div class="important-notice">
          <ExclamationIcon class="notice-icon" />
          <div class="notice-content">
            <h4 class="notice-title">Importante</h4>
            <p class="notice-text">
              Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
            </p>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">1.1 Capacidade Legal</h3>
          <p class="section-text">
            Você declara que:
          </p>
          <ul class="section-list">
            <li>Tem pelo menos 18 anos de idade</li>
            <li>Possui capacidade legal para celebrar contratos</li>
            <li>Não está proibido de usar o serviço por lei aplicável</li>
            <li>Usará o serviço apenas para fins legais e autorizados</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">1.2 Alterações dos Termos</h3>
          <p class="section-text">
            Reservamo-nos o direito de modificar estes termos a qualquer momento. 
            Alterações significativas serão notificadas com pelo menos 30 dias de antecedência. 
            O uso continuado após as alterações constitui aceitação dos novos termos.
          </p>
        </div>
      </section>
      
      <!-- Section 2: Descrição do Serviço -->
      <section id="descricao-servico" class="content-section">
        <h2 class="section-title">2. Descrição do Serviço</h2>
        
        <p class="section-text">
          O Sintetiza Doc é uma plataforma de inteligência artificial que oferece:
        </p>
        
        <div class="services-grid">
          <div class="service-item">
            <DocumentTextIcon class="service-icon" />
            <h4 class="service-title">Geração de Resumos</h4>
            <p class="service-text">
              Criação automática de resumos de documentos em múltiplos formatos e estilos.
            </p>
          </div>
          
          <div class="service-item">
            <TranslateIcon class="service-icon" />
            <h4 class="service-title">Tradução</h4>
            <p class="service-text">
              Tradução bidirecional entre português e inglês com alta precisão.
            </p>
          </div>
          
          <div class="service-item">
            <MicrophoneIcon class="service-icon" />
            <h4 class="service-title">Transcrição</h4>
            <p class="service-text">
              Conversão de áudio em texto para reuniões e apresentações.
            </p>
          </div>
          
          <div class="service-item">
            <ShareIcon class="service-icon" />
            <h4 class="service-title">Exportação</h4>
            <p class="service-text">
              Exportação para múltiplos formatos e integração com ferramentas populares.
            </p>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">2.1 Disponibilidade</h3>
          <p class="section-text">
            Embora nos esforcemos para manter o serviço disponível 24/7, não garantimos 
            disponibilidade ininterrupta. O serviço pode estar temporariamente indisponível 
            devido a manutenção, atualizações ou circunstâncias além de nosso controle.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">2.2 Limitações Técnicas</h3>
          <p class="section-text">
            O serviço está sujeito a limitações técnicas, incluindo:
          </p>
          <ul class="section-list">
            <li>Tamanho máximo de arquivos por plano</li>
            <li>Número de processamentos por período</li>
            <li>Formatos de arquivo suportados</li>
            <li>Tempo de retenção de dados</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 3: Contas de Usuário -->
      <section id="contas-usuario" class="content-section">
        <h2 class="section-title">3. Contas de Usuário</h2>
        
        <div class="subsection">
          <h3 class="subsection-title">3.1 Criação de Conta</h3>
          <p class="section-text">
            Para usar nosso serviço, você deve:
          </p>
          <ul class="section-list">
            <li>Fornecer informações precisas e completas</li>
            <li>Manter suas informações atualizadas</li>
            <li>Proteger a confidencialidade de sua senha</li>
            <li>Notificar-nos imediatamente sobre uso não autorizado</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">3.2 Responsabilidade da Conta</h3>
          <p class="section-text">
            Você é totalmente responsável por:
          </p>
          <ul class="section-list">
            <li>Todas as atividades que ocorrem em sua conta</li>
            <li>Manter a segurança de suas credenciais de acesso</li>
            <li>Todas as taxas e encargos incorridos em sua conta</li>
            <li>Cumprir estes termos e todas as leis aplicáveis</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">3.3 Suspensão e Encerramento</h3>
          <p class="section-text">
            Podemos suspender ou encerrar sua conta se:
          </p>
          <ul class="section-list">
            <li>Você violar estes termos</li>
            <li>Houver atividade suspeita ou fraudulenta</li>
            <li>Você não pagar taxas devidas</li>
            <li>Solicitado por autoridades competentes</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 4: Uso Aceitável -->
      <section id="uso-aceitavel" class="content-section">
        <h2 class="section-title">4. Política de Uso Aceitável</h2>
        
        <div class="acceptable-use">
          <div class="use-section allowed">
            <h3 class="use-title">
              <CheckIcon class="use-icon" />
              Usos Permitidos
            </h3>
            <ul class="use-list">
              <li>Processar documentos legítimos de sua propriedade</li>
              <li>Gerar resumos para fins educacionais ou profissionais</li>
              <li>Traduzir conteúdo próprio ou autorizado</li>
              <li>Usar para pesquisa acadêmica (com devidas citações)</li>
              <li>Integrar com ferramentas de produtividade</li>
            </ul>
          </div>
          
          <div class="use-section prohibited">
            <h3 class="use-title">
              <XIcon class="use-icon" />
              Usos Proibidos
            </h3>
            <ul class="use-list">
              <li>Processar conteúdo protegido por direitos autorais sem autorização</li>
              <li>Gerar conteúdo ilegal, difamatório ou prejudicial</li>
              <li>Usar para spam, phishing ou outras atividades maliciosas</li>
              <li>Tentar contornar limitações técnicas ou de segurança</li>
              <li>Revender ou redistribuir nossos serviços sem autorização</li>
              <li>Usar para criar conteúdo que viole direitos de terceiros</li>
              <li>Processar informações pessoais sensíveis sem consentimento</li>
            </ul>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">4.1 Monitoramento</h3>
          <p class="section-text">
            Reservamo-nos o direito de monitorar o uso do serviço para garantir 
            conformidade com estes termos. Isso pode incluir análise automatizada 
            de conteúdo para detectar violações.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">4.2 Consequências de Violação</h3>
          <p class="section-text">
            Violações da política de uso aceitável podem resultar em:
          </p>
          <ul class="section-list">
            <li>Aviso e solicitação de correção</li>
            <li>Suspensão temporária do serviço</li>
            <li>Encerramento permanente da conta</li>
            <li>Ação legal quando apropriado</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 5: Propriedade Intelectual -->
      <section id="propriedade-intelectual" class="content-section">
        <h2 class="section-title">5. Propriedade Intelectual</h2>
        
        <div class="subsection">
          <h3 class="subsection-title">5.1 Nossos Direitos</h3>
          <p class="section-text">
            O Sintetiza Doc e todos os seus componentes são protegidos por direitos 
            de propriedade intelectual. Isso inclui:
          </p>
          <ul class="section-list">
            <li>Software, algoritmos e modelos de IA</li>
            <li>Interface do usuário e design</li>
            <li>Marca, logotipos e materiais de marketing</li>
            <li>Documentação e conteúdo do site</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">5.2 Seus Direitos</h3>
          <p class="section-text">
            Você mantém todos os direitos sobre:
          </p>
          <ul class="section-list">
            <li>Documentos originais que você carrega</li>
            <li>Resumos e traduções gerados a partir de seu conteúdo</li>
            <li>Dados e configurações de sua conta</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">5.3 Licença de Uso</h3>
          <p class="section-text">
            Concedemos a você uma licença limitada, não exclusiva e revogável para 
            usar nosso serviço de acordo com estes termos. Esta licença não inclui:
          </p>
          <ul class="section-list">
            <li>Direito de modificar ou criar obras derivadas</li>
            <li>Direito de revender ou sublicenciar</li>
            <li>Direito de engenharia reversa</li>
            <li>Direito de usar nossa propriedade intelectual</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">5.4 Licença de Conteúdo</h3>
          <p class="section-text">
            Ao carregar conteúdo, você nos concede uma licença limitada para:
          </p>
          <ul class="section-list">
            <li>Processar e analisar seu conteúdo</li>
            <li>Gerar resumos e traduções</li>
            <li>Armazenar temporariamente para prestação do serviço</li>
            <li>Melhorar nossos algoritmos (apenas dados anonimizados)</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 6: Pagamentos e Assinaturas -->
      <section id="pagamentos" class="content-section">
        <h2 class="section-title">6. Pagamentos e Assinaturas</h2>
        
        <div class="pricing-overview">
          <h3 class="subsection-title">6.1 Planos Disponíveis</h3>
          <div class="plans-grid">
            <div class="plan-item">
              <h4 class="plan-name">Gratuito</h4>
              <p class="plan-description">Funcionalidades básicas com limitações</p>
            </div>
            <div class="plan-item">
              <h4 class="plan-name">Básico</h4>
              <p class="plan-description">Para usuários individuais</p>
            </div>
            <div class="plan-item">
              <h4 class="plan-name">Profissional</h4>
              <p class="plan-description">Para profissionais e pequenas equipes</p>
            </div>
            <div class="plan-item">
              <h4 class="plan-name">Empresarial</h4>
              <p class="plan-description">Para organizações e grandes equipes</p>
            </div>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">6.2 Cobrança</h3>
          <p class="section-text">
            Para planos pagos:
          </p>
          <ul class="section-list">
            <li>Cobrança recorrente mensal ou anual</li>
            <li>Pagamento processado por parceiros seguros (Stripe)</li>
            <li>Preços em reais brasileiros (BRL)</li>
            <li>Impostos aplicáveis incluídos quando exigido</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">6.3 Cancelamento e Reembolsos</h3>
          <p class="section-text">
            Política de cancelamento:
          </p>
          <ul class="section-list">
            <li>Cancelamento a qualquer momento através das configurações</li>
            <li>Acesso mantido até o final do período pago</li>
            <li>Reembolsos disponíveis em até 7 dias após a compra</li>
            <li>Reembolsos processados no método de pagamento original</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">6.4 Alterações de Preço</h3>
          <p class="section-text">
            Podemos alterar preços com:
          </p>
          <ul class="section-list">
            <li>Notificação de 30 dias para assinantes existentes</li>
            <li>Opção de cancelar antes da alteração entrar em vigor</li>
            <li>Preços atuais mantidos até a próxima renovação</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 7: Privacidade e Dados -->
      <section id="privacidade-dados" class="content-section">
        <h2 class="section-title">7. Privacidade e Proteção de Dados</h2>
        
        <div class="privacy-summary">
          <ShieldIcon class="privacy-icon" />
          <div class="privacy-content">
            <h3 class="privacy-title">Compromisso com a Privacidade</h3>
            <p class="privacy-text">
              Levamos sua privacidade a sério. Nossa 
              <router-link to="/privacy" class="privacy-link">Política de Privacidade</router-link> 
              detalha como coletamos, usamos e protegemos suas informações.
            </p>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">7.1 Processamento de Documentos</h3>
          <p class="section-text">
            Quando você carrega documentos:
          </p>
          <ul class="section-list">
            <li>Processamos apenas para gerar o resultado solicitado</li>
            <li>Não armazenamos conteúdo além do necessário</li>
            <li>Excluímos dados temporários após processamento</li>
            <li>Não usamos seu conteúdo para treinar modelos</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">7.2 Conformidade Legal</h3>
          <p class="section-text">
            Cumprimos regulamentações aplicáveis:
          </p>
          <ul class="section-list">
            <li>Lei Geral de Proteção de Dados (LGPD)</li>
            <li>Regulamento Geral sobre Proteção de Dados (GDPR)</li>
            <li>California Consumer Privacy Act (CCPA)</li>
            <li>Outras leis locais de proteção de dados</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 8: Limitações e Isenções -->
      <section id="limitacoes" class="content-section">
        <h2 class="section-title">8. Limitações de Responsabilidade</h2>
        
        <div class="disclaimer-notice">
          <ExclamationTriangleIcon class="disclaimer-icon" />
          <div class="disclaimer-content">
            <h4 class="disclaimer-title">Isenção de Garantias</h4>
            <p class="disclaimer-text">
              O serviço é fornecido "como está" e "conforme disponível", 
              sem garantias de qualquer tipo, expressas ou implícitas.
            </p>
          </div>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">8.1 Limitações Gerais</h3>
          <p class="section-text">
            Em nenhuma circunstância seremos responsáveis por:
          </p>
          <ul class="section-list">
            <li>Danos indiretos, incidentais ou consequenciais</li>
            <li>Perda de lucros, dados ou oportunidades de negócio</li>
            <li>Interrupções ou falhas no serviço</li>
            <li>Ações de terceiros ou conteúdo de usuários</li>
            <li>Violações de segurança além de nosso controle</li>
          </ul>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">8.2 Limitação Monetária</h3>
          <p class="section-text">
            Nossa responsabilidade total não excederá o valor pago por você 
            nos 12 meses anteriores ao evento que deu origem à reclamação.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">8.3 Precisão do Conteúdo</h3>
          <p class="section-text">
            Embora nos esforcemos para fornecer resultados precisos:
          </p>
          <ul class="section-list">
            <li>IA pode produzir resultados imprecisos ou incompletos</li>
            <li>Você deve revisar e validar todos os resultados</li>
            <li>Não garantimos 100% de precisão em traduções ou resumos</li>
            <li>Resultados podem variar baseados na qualidade do input</li>
          </ul>
        </div>
      </section>
      
      <!-- Section 9: Indenização -->
      <section id="indenizacao" class="content-section">
        <h2 class="section-title">9. Indenização</h2>
        
        <p class="section-text">
          Você concorda em nos indenizar e isentar de responsabilidade contra 
          quaisquer reclamações, danos, perdas, custos e despesas (incluindo 
          honorários advocatícios) decorrentes de:
        </p>
        
        <ul class="section-list">
          <li>Seu uso do serviço em violação destes termos</li>
          <li>Violação de direitos de terceiros</li>
          <li>Conteúdo que você carrega ou processa</li>
          <li>Atividades fraudulentas ou ilegais</li>
          <li>Violação de leis ou regulamentações aplicáveis</li>
        </ul>
      </section>
      
      <!-- Section 10: Resolução de Disputas -->
      <section id="resolucao-disputas" class="content-section">
        <h2 class="section-title">10. Resolução de Disputas</h2>
        
        <div class="subsection">
          <h3 class="subsection-title">10.1 Negociação Direta</h3>
          <p class="section-text">
            Encorajamos a resolução amigável de disputas. Entre em contato 
            conosco primeiro através de nossos canais de suporte.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">10.2 Mediação</h3>
          <p class="section-text">
            Se não conseguirmos resolver a disputa diretamente, concordamos 
            em tentar mediação através de um mediador mutuamente aceito.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">10.3 Jurisdição</h3>
          <p class="section-text">
            Estes termos são regidos pelas leis brasileiras. Disputas não 
            resolvidas serão submetidas à jurisdição dos tribunais de São Paulo, SP.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">10.4 Prazo para Reclamações</h3>
          <p class="section-text">
            Qualquer reclamação deve ser apresentada dentro de 1 (um) ano 
            após o evento que deu origem à disputa.
          </p>
        </div>
      </section>
      
      <!-- Section 11: Disposições Gerais -->
      <section id="disposicoes-gerais" class="content-section">
        <h2 class="section-title">11. Disposições Gerais</h2>
        
        <div class="subsection">
          <h3 class="subsection-title">11.1 Integralidade</h3>
          <p class="section-text">
            Estes termos, juntamente com nossa Política de Privacidade, 
            constituem o acordo completo entre você e nós.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">11.2 Divisibilidade</h3>
          <p class="section-text">
            Se qualquer disposição destes termos for considerada inválida, 
            as demais disposições permanecerão em pleno vigor.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">11.3 Renúncia</h3>
          <p class="section-text">
            A falha em fazer cumprir qualquer direito ou disposição não 
            constitui renúncia a esse direito ou disposição.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">11.4 Cessão</h3>
          <p class="section-text">
            Você não pode ceder seus direitos sob estes termos sem nosso 
            consentimento prévio por escrito. Podemos ceder nossos direitos 
            a qualquer momento.
          </p>
        </div>
        
        <div class="subsection">
          <h3 class="subsection-title">11.5 Sobrevivência</h3>
          <p class="section-text">
            As disposições que por sua natureza devem sobreviver ao 
            encerramento destes termos continuarão em vigor.
          </p>
        </div>
      </section>
      
      <!-- Section 12: Contato -->
      <section id="contato" class="content-section">
        <h2 class="section-title">12. Informações de Contato</h2>
        
        <div class="contact-grid">
          <div class="contact-card">
            <h3 class="contact-title">Suporte Geral</h3>
            <div class="contact-details">
              <div class="contact-item">
                <MailIcon class="contact-icon" />
                <span>suporte@sintetiza-doc.com</span>
              </div>
              <div class="contact-item">
                <PhoneIcon class="contact-icon" />
                <span>+55 (11) 9999-9999</span>
              </div>
            </div>
          </div>
          
          <div class="contact-card">
            <h3 class="contact-title">Questões Legais</h3>
            <div class="contact-details">
              <div class="contact-item">
                <MailIcon class="contact-icon" />
                <span>legal@sintetiza-doc.com</span>
              </div>
            </div>
          </div>
          
          <div class="contact-card">
            <h3 class="contact-title">Endereço</h3>
            <div class="contact-details">
              <div class="contact-item">
                <MapPinIcon class="contact-icon" />
                <div>
                  <p>Sintetiza Doc Ltda.</p>
                  <p>Av. Paulista, 1000 - Sala 1001</p>
                  <p>Bela Vista, São Paulo - SP</p>
                  <p>CEP: 01310-100</p>
                  <p>CNPJ: 00.000.000/0001-00</p>
                </div>
              </div>
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
const DocumentIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>`
}

const ExclamationIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>`
}

const DocumentTextIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" /><path d="M8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z" /></svg>`
}

const TranslateIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 12.236 11.618 14z" clip-rule="evenodd" /></svg>`
}

const MicrophoneIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd" /></svg>`
}

const ShareIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>`
}

const CheckIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`
}

const XIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>`
}

const ShieldIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`
}

const ExclamationTriangleIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`
}

const MailIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>`
}

const PhoneIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>`
}

const MapPinIcon = {
  template: `<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>`
}

// Data
const lastUpdated = ref('15 de Janeiro de 2024')

const sections = [
  { id: 'aceitacao', title: '1. Aceitação dos Termos' },
  { id: 'descricao-servico', title: '2. Descrição do Serviço' },
  { id: 'contas-usuario', title: '3. Contas de Usuário' },
  { id: 'uso-aceitavel', title: '4. Política de Uso Aceitável' },
  { id: 'propriedade-intelectual', title: '5. Propriedade Intelectual' },
  { id: 'pagamentos', title: '6. Pagamentos e Assinaturas' },
  { id: 'privacidade-dados', title: '7. Privacidade e Proteção de Dados' },
  { id: 'limitacoes', title: '8. Limitações de Responsabilidade' },
  { id: 'indenizacao', title: '9. Indenização' },
  { id: 'resolucao-disputas', title: '10. Resolução de Disputas' },
  { id: 'disposicoes-gerais', title: '11. Disposições Gerais' },
  { id: 'contato', title: '12. Informações de Contato' }
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
.terms {
  @apply min-h-screen bg-gray-50 dark:bg-gray-900 py-12;
}

.terms-header {
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
  @apply flex items-center justify-center space-x-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4;
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

.terms-content {
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
  @apply flex items-start space-x-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6;
}

.important-notice .notice-icon {
  @apply w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1;
}

.notice-content {
  @apply flex-1;
}

.notice-title {
  @apply text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2;
}

.notice-content .notice-text {
  @apply text-yellow-700 dark:text-yellow-300 mb-0;
}

.services-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6 mb-6;
}

.service-item {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center;
}

.service-icon {
  @apply w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400;
}

.service-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.service-text {
  @apply text-gray-600 dark:text-gray-300;
}

.acceptable-use {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6;
}

.use-section {
  @apply rounded-lg p-6;
}

.use-section.allowed {
  @apply bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800;
}

.use-section.prohibited {
  @apply bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800;
}

.use-title {
  @apply flex items-center space-x-3 text-lg font-semibold mb-4;
}

.allowed .use-title {
  @apply text-green-900 dark:text-green-100;
}

.prohibited .use-title {
  @apply text-red-900 dark:text-red-100;
}

.use-icon {
  @apply w-6 h-6;
}

.allowed .use-icon {
  @apply text-green-600 dark:text-green-400;
}

.prohibited .use-icon {
  @apply text-red-600 dark:text-red-400;
}

.use-list {
  @apply space-y-2;
}

.allowed .use-list li {
  @apply text-green-700 dark:text-green-300 relative pl-4;
}

.prohibited .use-list li {
  @apply text-red-700 dark:text-red-300 relative pl-4;
}

.allowed .use-list li::before {
  content: '✓';
  @apply absolute left-0 text-green-600 dark:text-green-400;
}

.prohibited .use-list li::before {
  content: '✗';
  @apply absolute left-0 text-red-600 dark:text-red-400;
}

.pricing-overview {
  @apply mb-6;
}

.plans-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4;
}

.plan-item {
  @apply bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center;
}

.plan-name {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.plan-description {
  @apply text-gray-600 dark:text-gray-300 text-sm;
}

.privacy-summary {
  @apply flex items-start space-x-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6;
}

.privacy-icon {
  @apply w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1;
}

.privacy-content {
  @apply flex-1;
}

.privacy-title {
  @apply text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2;
}

.privacy-text {
  @apply text-blue-700 dark:text-blue-300;
}

.privacy-link {
  @apply text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline;
}

.disclaimer-notice {
  @apply flex items-start space-x-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6;
}

.disclaimer-icon {
  @apply w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1;
}

.disclaimer-content {
  @apply flex-1;
}

.disclaimer-title {
  @apply text-lg font-semibold text-red-900 dark:text-red-100 mb-2;
}

.disclaimer-text {
  @apply text-red-700 dark:text-red-300;
}

.contact-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
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

.contact-item {
  @apply flex items-start space-x-3;
}

.contact-icon {
  @apply w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .terms {
    @apply py-8;
  }
  
  .terms-header {
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
  
  .terms-content {
    @apply space-y-8;
  }
  
  .content-section {
    @apply p-6;
  }
  
  .services-grid {
    @apply grid-cols-1;
  }
  
  .acceptable-use {
    @apply grid-cols-1 gap-6;
  }
  
  .plans-grid {
    @apply grid-cols-1;
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