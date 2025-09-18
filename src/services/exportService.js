import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import * as XLSX from 'xlsx'

// Serviço de exportação
export const exportService = {
  // Exportar para Word (.docx)
  async exportToWord(summary, metadata = {}) {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Título
            new Paragraph({
              text: metadata.title || 'Resumo de Documento',
              heading: HeadingLevel.TITLE,
              spacing: { after: 400 }
            }),
            
            // Informações do documento
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Informações do Documento',
                  bold: true,
                  size: 24
                })
              ],
              spacing: { before: 200, after: 200 }
            }),
            
            new Paragraph({
              children: [
                new TextRun({ text: 'Arquivo: ', bold: true }),
                new TextRun({ text: metadata.fileName || 'N/A' })
              ]
            }),
            
            new Paragraph({
              children: [
                new TextRun({ text: 'Data de processamento: ', bold: true }),
                new TextRun({ text: new Date().toLocaleDateString('pt-BR') })
              ]
            }),
            
            new Paragraph({
              children: [
                new TextRun({ text: 'Tipo de resumo: ', bold: true }),
                new TextRun({ text: metadata.summaryType || 'Padrão' })
              ]
            }),
            
            // Resumo
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Resumo',
                  bold: true,
                  size: 24
                })
              ],
              spacing: { before: 400, after: 200 }
            }),
            
            ...this.parseTextToParagraphs(summary.content || summary)
          ]
        }]
      })
      
      const buffer = await Packer.toBuffer(doc)
      return {
        buffer,
        fileName: `resumo_${Date.now()}.docx`,
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
    } catch (error) {
      console.error('Erro ao exportar para Word:', error)
      throw new Error(`Erro na exportação para Word: ${error.message}`)
    }
  },
  
  // Exportar para Excel (.xlsx)
  async exportToExcel(summaries, metadata = {}) {
    try {
      // Se for um único resumo, transformar em array
      const summaryList = Array.isArray(summaries) ? summaries : [summaries]
      
      // Criar workbook
      const wb = XLSX.utils.book_new()
      
      // Aba principal com resumos
      const summaryData = summaryList.map((summary, index) => ({
        'ID': index + 1,
        'Arquivo': summary.fileName || metadata.fileName || 'N/A',
        'Tipo de Resumo': summary.type || metadata.summaryType || 'Padrão',
        'Data': new Date().toLocaleDateString('pt-BR'),
        'Resumo': this.cleanTextForExcel(summary.content || summary),
        'Palavras': summary.wordCount || 'N/A',
        'Status': 'Concluído'
      }))
      
      const ws1 = XLSX.utils.json_to_sheet(summaryData)
      
      // Ajustar largura das colunas
      const colWidths = [
        { wch: 5 },  // ID
        { wch: 25 }, // Arquivo
        { wch: 15 }, // Tipo
        { wch: 12 }, // Data
        { wch: 50 }, // Resumo
        { wch: 10 }, // Palavras
        { wch: 10 }  // Status
      ]
      ws1['!cols'] = colWidths
      
      XLSX.utils.book_append_sheet(wb, ws1, 'Resumos')
      
      // Aba com estatísticas (se houver múltiplos resumos)
      if (summaryList.length > 1) {
        const statsData = [
          { 'Métrica': 'Total de Resumos', 'Valor': summaryList.length },
          { 'Métrica': 'Data de Exportação', 'Valor': new Date().toLocaleDateString('pt-BR') },
          { 'Métrica': 'Tipos de Resumo', 'Valor': [...new Set(summaryList.map(s => s.type || 'Padrão'))].join(', ') }
        ]
        
        const ws2 = XLSX.utils.json_to_sheet(statsData)
        ws2['!cols'] = [{ wch: 20 }, { wch: 30 }]
        XLSX.utils.book_append_sheet(wb, ws2, 'Estatísticas')
      }
      
      // Gerar buffer
      const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
      
      return {
        buffer,
        fileName: `resumos_${Date.now()}.xlsx`,
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error)
      throw new Error(`Erro na exportação para Excel: ${error.message}`)
    }
  },
  
  // Exportar para Notion (formato Markdown)
  async exportToNotion(summary, metadata = {}) {
    try {
      const notionContent = `# ${metadata.title || 'Resumo de Documento'}

## 📄 Informações do Documento

- **Arquivo:** ${metadata.fileName || 'N/A'}
- **Data de processamento:** ${new Date().toLocaleDateString('pt-BR')}
- **Tipo de resumo:** ${metadata.summaryType || 'Padrão'}
- **Provedor de IA:** ${metadata.aiProvider || 'N/A'}

## 📝 Resumo

${summary.content || summary}

## 📊 Estatísticas

- **Palavras no resumo:** ${summary.wordCount || 'N/A'}
- **Caracteres:** ${summary.charCount || 'N/A'}
- **Gerado em:** ${new Date().toLocaleString('pt-BR')}

---

*Resumo gerado automaticamente pela plataforma Sintetiza*
`
      
      return {
        content: notionContent,
        fileName: `resumo_notion_${Date.now()}.md`,
        mimeType: 'text/markdown',
        instructions: {
          title: 'Como importar para o Notion:',
          steps: [
            '1. Copie o conteúdo do arquivo',
            '2. No Notion, crie uma nova página',
            '3. Cole o conteúdo (Ctrl+V)',
            '4. O Notion converterá automaticamente o Markdown'
          ]
        }
      }
    } catch (error) {
      console.error('Erro ao exportar para Notion:', error)
      throw new Error(`Erro na exportação para Notion: ${error.message}`)
    }
  },
  
  // Exportar para Trello (formato JSON)
  async exportToTrello(summary, metadata = {}) {
    try {
      // Extrair tarefas do resumo
      const tasks = this.extractTasksFromSummary(summary.content || summary)
      
      const trelloData = {
        name: metadata.title || 'Resumo - Tarefas e Ações',
        desc: `Resumo gerado em ${new Date().toLocaleDateString('pt-BR')}\n\nArquivo: ${metadata.fileName || 'N/A'}`,
        lists: [
          {
            name: 'Resumo Principal',
            cards: [
              {
                name: 'Resumo do Documento',
                desc: summary.content || summary,
                labels: [{ color: 'blue', name: 'Resumo' }]
              }
            ]
          },
          {
            name: 'Tarefas Identificadas',
            cards: tasks.map((task, index) => ({
              name: `Tarefa ${index + 1}`,
              desc: task,
              labels: [{ color: 'orange', name: 'Tarefa' }],
              due: null
            }))
          },
          {
            name: 'Concluído',
            cards: []
          }
        ]
      }
      
      return {
        content: JSON.stringify(trelloData, null, 2),
        fileName: `trello_board_${Date.now()}.json`,
        mimeType: 'application/json',
        instructions: {
          title: 'Como importar para o Trello:',
          steps: [
            '1. Acesse o Trello e vá em "Criar quadro"',
            '2. Clique em "Importar" no menu',
            '3. Selecione "JSON" como formato',
            '4. Faça upload do arquivo gerado'
          ]
        }
      }
    } catch (error) {
      console.error('Erro ao exportar para Trello:', error)
      throw new Error(`Erro na exportação para Trello: ${error.message}`)
    }
  },
  
  // Preparar conteúdo para email
  async prepareEmailContent(summary, metadata = {}) {
    try {
      const emailContent = {
        subject: `Resumo: ${metadata.fileName || 'Documento'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">📄 Resumo de Documento</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Informações do Documento</h3>
              <p><strong>Arquivo:</strong> ${metadata.fileName || 'N/A'}</p>
              <p><strong>Data de processamento:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
              <p><strong>Tipo de resumo:</strong> ${metadata.summaryType || 'Padrão'}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3>📝 Resumo</h3>
              <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #2563eb; margin: 10px 0;">
                ${this.formatTextForEmail(summary.content || summary)}
              </div>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0;">📊 Estatísticas</h4>
              <p><strong>Palavras no resumo:</strong> ${summary.wordCount || 'N/A'}</p>
              <p><strong>Gerado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; text-align: center;">
              Resumo gerado automaticamente pela plataforma Sintetiza
            </p>
          </div>
        `,
        text: `
Resumo de Documento

Arquivo: ${metadata.fileName || 'N/A'}
Data: ${new Date().toLocaleDateString('pt-BR')}
Tipo: ${metadata.summaryType || 'Padrão'}

Resumo:
${summary.content || summary}

---
Resumo gerado pela plataforma Sintetiza
        `
      }
      
      return emailContent
    } catch (error) {
      console.error('Erro ao preparar conteúdo do email:', error)
      throw new Error(`Erro na preparação do email: ${error.message}`)
    }
  },
  
  // Exportar como PDF (usando jsPDF)
  async exportToPDF(summary, metadata = {}) {
    try {
      // Importação dinâmica do jsPDF
      const { jsPDF } = await import('jspdf')
      
      const doc = new jsPDF()
      
      // Configurações
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 20
      const maxWidth = pageWidth - (margin * 2)
      let yPosition = margin
      
      // Título
      doc.setFontSize(18)
      doc.setFont(undefined, 'bold')
      doc.text(metadata.title || 'Resumo de Documento', margin, yPosition)
      yPosition += 15
      
      // Informações do documento
      doc.setFontSize(12)
      doc.setFont(undefined, 'normal')
      doc.text(`Arquivo: ${metadata.fileName || 'N/A'}`, margin, yPosition)
      yPosition += 8
      doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, margin, yPosition)
      yPosition += 8
      doc.text(`Tipo: ${metadata.summaryType || 'Padrão'}`, margin, yPosition)
      yPosition += 15
      
      // Resumo
      doc.setFontSize(14)
      doc.setFont(undefined, 'bold')
      doc.text('Resumo', margin, yPosition)
      yPosition += 10
      
      doc.setFontSize(11)
      doc.setFont(undefined, 'normal')
      
      // Quebrar texto em linhas
      const summaryText = summary.content || summary
      const lines = doc.splitTextToSize(summaryText, maxWidth)
      
      lines.forEach(line => {
        if (yPosition > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage()
          yPosition = margin
        }
        doc.text(line, margin, yPosition)
        yPosition += 6
      })
      
      const pdfBuffer = doc.output('arraybuffer')
      
      return {
        buffer: pdfBuffer,
        fileName: `resumo_${Date.now()}.pdf`,
        mimeType: 'application/pdf'
      }
    } catch (error) {
      console.error('Erro ao exportar para PDF:', error)
      throw new Error(`Erro na exportação para PDF: ${error.message}`)
    }
  },
  
  // Utilitários
  parseTextToParagraphs(text) {
    return text.split('\n\n').map(paragraph => 
      new Paragraph({
        children: [new TextRun({ text: paragraph.trim() })],
        spacing: { after: 200 }
      })
    )
  },
  
  cleanTextForExcel(text) {
    return text
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 32767) // Limite do Excel
  },
  
  formatTextForEmail(text) {
    return text
      .split('\n')
      .map(line => `<p>${line.trim()}</p>`)
      .join('')
  },
  
  extractTasksFromSummary(text) {
    // Regex simples para identificar possíveis tarefas
    const taskPatterns = [
      /(?:^|\n)[-•*]\s+(.+)/gm,
      /(?:^|\n)\d+\.\s+(.+)/gm,
      /(?:tarefa|ação|pendência|fazer|implementar|desenvolver):\s*(.+)/gi
    ]
    
    const tasks = []
    
    taskPatterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(text)) !== null) {
        const task = match[1].trim()
        if (task.length > 10 && !tasks.includes(task)) {
          tasks.push(task)
        }
      }
    })
    
    return tasks.length > 0 ? tasks : ['Nenhuma tarefa específica identificada']
  },
  
  // Download de arquivo
  downloadFile(data, fileName, mimeType) {
    try {
      const blob = new Blob([data], { type: mimeType })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro no download:', error)
      throw new Error(`Erro no download: ${error.message}`)
    }
  }
}

export default exportService