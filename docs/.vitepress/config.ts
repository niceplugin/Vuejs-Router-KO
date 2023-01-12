import { defineConfig, UserConfig } from 'vitepress'

const head: UserConfig['head'] = [
  ['link', { rel: 'icon', href: `/logo-icon.png` }],
  ['script', { src: 'https://unpkg.com/thesemetrics@latest', async: '',}]
]

const config = defineConfig({

  lang: 'ko',
  title: 'Vue Router',
  description: 'Vue 3에 필요한 최신 공식 라우터',
  head,
  // serviceWorker: true,

  locales: {
    '/': {
      lang: 'ko',
      title: 'Vue Router',
      description: 'Vue 3에 필요한 최신 공식 라우터',
    },
  },

  themeConfig: {
    repo: 'niceplugin/Vuejs-Router-KO',
    docsRepo: 'niceplugin/Vuejs-Router-KO',
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
        link: '/guide/index.html',
      },
      {
        text: 'API 문서',
        link: '/api/index.html',
      },
      {
        text: 'v4.x',
        items: [
          {
            text: 'v3.x',
            link: 'https://v3.router.vuejs.org/kr/'
          },
          {
            text: '변경사항',
            link: 'https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md',
          },
        ],
      },
    ],

    sidebar: {
      '/': [
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
          collapsible: false,
          children: [
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
          collapsible: false,
          children: [
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
              text: '탐색 실패',
              link: '/guide/advanced/navigation-failures.html',
            },
            {
              text: '동적 라우팅',
              link: '/guide/advanced/dynamic-routing.html',
            },
          ],
        },
        {
          text: '⚠️Vue 2에서 마이그레이션 (영문)',
          link: '/guide/migration.html',
        },
      ],
    },
  },
})

export default config
