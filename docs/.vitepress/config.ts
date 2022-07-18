import { defineConfig, UserConfig } from 'vitepress'

const head: UserConfig['head'] = [
  ['link', { rel: 'icon', href: `/logo-icon.png` }],
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

  lastUpdated: true,

  themeConfig: {
    logo: '/logo-icon.png',

    editLink: {
      pattern: 'https://github.com/niceplugin/Vuejs-Router-KO/edit/main-korean/docs/:path',
      text: '이 페이지 편집 제안하기'
    },

    lastUpdatedText: '마지막 수정일',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/niceplugin/Vuejs-Router-KO' }
    ],

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

    sidebar: {
      '/guide/': [
        {
          text: '시작하기',
          collapsible: true,
          items: [
            {
              text: '소개',
              link: '/guide/introduction.html',
            },
            {
              text: '설치',
              link: '/guide/installation.html',
            },
            {
              text: '시작하기',
              link: '/guide/',
            },
            {
              text: '⚠️Vue 2에서 마이그레이션 (영문)',
              link: '/guide/migration.html',
            },
          ]
        },
        {
          text: '핵심',
          collapsible: true,
          items: [
            {
              text: '동적 경로 매칭',
              link: '/guide/essentials/dynamic-matching.html',
            },
            {
              text: "경로 매칭 문법",
              link: '/guide/essentials/route-matching-syntax.html',
            },
            {
              text: '중첩된 경로',
              link: '/guide/essentials/nested-routes.html',
            },
            {
              text: '프로그래밍 방식 탐색',
              link: '/guide/essentials/navigation.html',
            },
            {
              text: '이름이 있는 경로',
              link: '/guide/essentials/named-routes.html',
            },
            {
              text: '이름이 있는 뷰',
              link: '/guide/essentials/named-views.html',
            },
            {
              text: '리디렉션과 별칭',
              link: '/guide/essentials/redirect-and-alias.html',
            },
            {
              text: '경로 컴포넌트에 props 전달하기',
              link: '/guide/essentials/passing-props.html',
            },
            {
              text: '다양한 히스토리 모드',
              link: '/guide/essentials/history-mode.html',
            },
          ],
        },
        {
          text: '고급',
          collapsible: true,
          items: [
            {
              text: '네비게이션 가드',
              link: '/guide/advanced/navigation-guards.html',
            },
            {
              text: '경로 메타 필드',
              link: '/guide/advanced/meta.html',
            },
            {
              text: '데이터 가져오기',
              link: '/guide/advanced/data-fetching.html',
            },
            {
              text: '컴포지션 API',
              link: '/guide/advanced/composition-api.html',
            },
            {
              text: '트랜지션',
              link: '/guide/advanced/transitions.html',
            },
            {
              text: '스크롤 동작',
              link: '/guide/advanced/scroll-behavior.html',
            },
            {
              text: '경로 지연 로딩',
              link: '/guide/advanced/lazy-loading.html',
            },
            {
              text: 'Typed Routes',
              link: '/guide/advanced/typed-routes.html',
            },
            {
              text: 'RouterLink 확장하기',
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
      ],
    },

    footer: {
      copyright: 'MIT Licensed | Copyright © 2014-present Evan You, Eduardo San Martin Morote'
    },
  },
})

export default config
