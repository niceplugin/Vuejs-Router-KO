import { defineConfig } from 'vitepress'
import { koConfig } from './ko'
import { sharedConfig } from './shared'

export default defineConfig({
  ...sharedConfig,

  locales: {
    root: { label: '한국어', lang: 'ko-KR', link: '/', ...koConfig },
    en: { label: 'English', lang: 'en-US', link: 'https://router.vuejs.org/' },
    zh: { label: '简体中文', lang: 'zh-CN', link: 'https://router.vuejs.org//zh/' },
    pt: { label: 'Português', lang: 'pt-PT', link: 'https://vue-router-docs-pt.netlify.app/' },
  },
})
