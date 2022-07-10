import { defineConfig, UserConfig } from 'vitepress'

const head: UserConfig['head'] = [
  ['link', { rel: 'icon', href: `/logo.png` }],
]

// @ts-ignore
if (process.env.NODE_ENV === 'production') {
  head.push([
    'script',
    {
      src: 'https://unpkg.com/thesemetrics@latest',
      async: '',
    },
  ])
}

const config = defineConfig({
  lang: 'ko',
  title: 'Vue Router',
  description: 'Vue.js 공식 라우터',
  head,
  // serviceWorker: true,

  themeConfig: {
    repo: 'niceplugin/Vuejs-Router-KO',
    docsRepo: 'niceplugin/Vuejs-Router-KO',
    dir: 'docs',
    docsDir: 'docs',
    docsBranch: 'main-korean',
    editLinks: true,
    editLinkText: '이 페이지 편집 제안하기',

    // carbonAds: {
    //   carbon: 'CEBICK3I',
    //   custom: 'CEBICK3M',
    //   placement: 'routervuejsorg',
    // },

    // algolia: {
    //   appId: 'BTNTW3I1XP',
    //   apiKey: '771d10c8c5cc48f7922f15048b4d931c',
    //   indexName: 'next_router_vuejs',
    //   // searchParameters: {
    //   //   facetFilters: ['tags:guide,api,migration'],
    //   // },
    // },

    nav: [
      {
        text: '가이드',
        link: '/guide/',
      },
      {
        text: 'API 참고서',
        link: '/api/',
      },
      {
        text: 'v4.x',
        items: [{ text: 'v3.x', link: 'https://v3.router.vuejs.org' }],
      },
      {
        text: '변경사항',
        link: 'https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md',
      },
    ],

    sidebar: [
      {
        text: '소개',
        link: '/introduction.html',
      },
      {
        text: '설치',
        link: '/installation.html',
      },
      {
        text: '핵심',
        collapsable: false,
        children: [
          {
            text: '시작하기',
            link: '/guide/',
          },
          {
            text: '동적 경로 매칭',
            link: '/guide/essentials/dynamic-matching.html',
          },
          {
            text: "Routes' Matching Syntax",
            link: '/guide/essentials/route-matching-syntax.html',
          },
          {
            text: 'Nested Routes',
            link: '/guide/essentials/nested-routes.html',
          },
          {
            text: 'Programmatic Navigation',
            link: '/guide/essentials/navigation.html',
          },
          {
            text: 'Named Routes',
            link: '/guide/essentials/named-routes.html',
          },
          {
            text: 'Named Views',
            link: '/guide/essentials/named-views.html',
          },
          {
            text: 'Redirect and Alias',
            link: '/guide/essentials/redirect-and-alias.html',
          },
          {
            text: 'Passing Props to Route Components',
            link: '/guide/essentials/passing-props.html',
          },
          {
            text: 'Different History modes',
            link: '/guide/essentials/history-mode.html',
          },
        ],
      },
      {
        text: '고급',
        collapsable: false,
        children: [
          {
            text: 'Navigation guards',
            link: '/guide/advanced/navigation-guards.html',
          },
          {
            text: 'Route Meta Fields',
            link: '/guide/advanced/meta.html',
          },
          {
            text: 'Data Fetching',
            link: '/guide/advanced/data-fetching.html',
          },
          {
            text: 'Composition API',
            link: '/guide/advanced/composition-api.html',
          },
          {
            text: 'Transitions',
            link: '/guide/advanced/transitions.html',
          },
          {
            text: 'Scroll Behavior',
            link: '/guide/advanced/scroll-behavior.html',
          },
          {
            text: 'Lazy Loading Routes',
            link: '/guide/advanced/lazy-loading.html',
          },
          {
            text: 'Typed Routes',
            link: '/guide/advanced/typed-routes.html',
          },
          {
            text: 'Extending RouterLink',
            link: '/guide/advanced/extending-router-link.html',
          },
          {
            text: 'Navigation Failures',
            link: '/guide/advanced/navigation-failures.html',
          },
          {
            text: 'Dynamic Routing',
            link: '/guide/advanced/dynamic-routing.html',
          },
        ],
      },
      {
        text: 'Vue 2에서 마이그레이션',
        link: '/guide/migration/index.html',
      },
    ],
  },
})

export default config
