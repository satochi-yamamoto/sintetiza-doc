<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Cobrança e Assinatura
        </h1>
        <p class="text-gray-600 mt-2">
          Gerencie sua assinatura, métodos de pagamento e histórico de cobrança
        </p>
      </div>

      <!-- Current Plan -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">
              Plano Atual
            </h2>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Ativo
            </span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">
                Plano Profissional
              </h3>
              <p class="text-3xl font-bold text-gray-900">
                R$ 49,90<span class="text-lg font-normal text-gray-500">/mês</span>
              </p>
              <p class="text-sm text-gray-500 mt-1">
                Próxima cobrança: 15 de Janeiro, 2024
              </p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">
                Uso Atual
              </h4>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Documentos processados</span>
                  <span class="font-medium">127 / 500</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    style="width: 25.4%"
                  />
                </div>
              </div>
            </div>
            
            <div class="flex items-center justify-end">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Alterar Plano
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">
              Método de Pagamento
            </h2>
            <button class="text-blue-600 hover:text-blue-700 font-medium">
              Adicionar Cartão
            </button>
          </div>
          
          <div class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <div class="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
              <span class="text-white text-xs font-bold">VISA</span>
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-900">
                •••• •••• •••• 4242
              </p>
              <p class="text-sm text-gray-500">
                Expira em 12/2027
              </p>
            </div>
            <div class="flex space-x-2">
              <button class="text-gray-400 hover:text-gray-600">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button class="text-red-400 hover:text-red-600">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing History -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">
              Histórico de Cobrança
            </h2>
            <button class="text-blue-600 hover:text-blue-700 font-medium">
              Baixar Todas
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    15 Dez 2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Plano Profissional - Dezembro 2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ 49,90
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Pago
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900">
                      Baixar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    15 Nov 2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Plano Profissional - Novembro 2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ 49,90
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Pago
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900">
                      Baixar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    15 Out 2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Plano Profissional - Outubro 2023
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ 49,90
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Pago
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900">
                      Baixar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Cancel Subscription -->
      <div class="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              class="w-5 h-5 text-red-400"
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
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-sm font-medium text-red-800">
              Cancelar Assinatura
            </h3>
            <p class="mt-1 text-sm text-red-700">
              Você pode cancelar sua assinatura a qualquer momento. Você continuará tendo acesso até o final do período atual.
            </p>
            <div class="mt-4">
              <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Cancelar Assinatura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Billing',
  data() {
    return {
      currentPlan: {
        name: 'Profissional',
        price: 49.90,
        nextBilling: '2024-01-15',
        documentsUsed: 127,
        documentsLimit: 500
      },
      paymentMethod: {
        type: 'visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2027
      },
      billingHistory: [
        {
          date: '2023-12-15',
          description: 'Plano Profissional - Dezembro 2023',
          amount: 49.90,
          status: 'paid'
        },
        {
          date: '2023-11-15',
          description: 'Plano Profissional - Novembro 2023',
          amount: 49.90,
          status: 'paid'
        },
        {
          date: '2023-10-15',
          description: 'Plano Profissional - Outubro 2023',
          amount: 49.90,
          status: 'paid'
        }
      ]
    }
  },
  methods: {
    changePlan() {
      // Implementar mudança de plano
      console.log('Alterar plano')
    },
    addPaymentMethod() {
      // Implementar adição de método de pagamento
      console.log('Adicionar método de pagamento')
    },
    downloadInvoice(invoice) {
      // Implementar download de fatura
      console.log('Download fatura:', {
        id: invoice?.id,
        number: invoice?.number,
        status: invoice?.status,
        amount: invoice?.amount,
        date: invoice?.date
      })
    },
    cancelSubscription() {
      // Implementar cancelamento de assinatura
      if (confirm('Tem certeza que deseja cancelar sua assinatura?')) {
        console.log('Cancelar assinatura')
      }
    }
  }
}
</script>