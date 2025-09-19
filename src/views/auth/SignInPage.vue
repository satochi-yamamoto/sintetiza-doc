<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <router-link to="/sign-up" class="font-medium text-indigo-600 hover:text-indigo-500">
            crie uma nova conta
          </router-link>
        </p>
      </div>
      <div class="mt-8">
        <SignIn
          :appearance="{
            elements: {
              formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-sm normal-case',
              card: 'shadow-lg',
              headerTitle: 'text-2xl font-bold text-gray-900',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
              formFieldInput: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
              footerActionLink: 'text-indigo-600 hover:text-indigo-500'
            }
          }"
          :routing="'path'"
          :path="'/sign-in'"
          :sign-up-url="'/sign-up'"
          :initial-values="{
            email_address: '',
            password: ''
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SignIn } from '@clerk/vue'

export default {
  name: 'SignInPage',
  components: {
    SignIn
  }
}
</script>