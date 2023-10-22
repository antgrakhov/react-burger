import {defineConfig} from 'cypress'

export default defineConfig({
  projectId: 'iz3b9p',
  e2e: {
    baseUrl: 'http://localhost:3000/',
  },
})
