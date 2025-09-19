<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h1>
          <UserProfile 
            :appearance="{
              elements: {
                card: 'shadow-none border-0',
                navbar: 'bg-gray-50',
                navbarButton: 'text-gray-700 hover:text-indigo-600',
                navbarButtonActive: 'text-indigo-600 bg-indigo-50',
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
                formFieldInput: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
                headerTitle: 'text-xl font-semibold text-gray-900',
                headerSubtitle: 'text-gray-600'
              }
            }"
            :routing="'path'"
            :path="'/user-profile'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserProfile } from '@clerk/vue'

export default {
  name: 'UserProfilePage',
  components: {
    UserProfile
  }
}
</script>