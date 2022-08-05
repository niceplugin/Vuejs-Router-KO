import { defineConfig, UserConfig } from 'vitepress'

const head: UserConfig['head'] = [
  ['link', { rel: 'icon', href: `/logo-icon.png` }],
]

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
      { icon: 'github', link: 'https://github.com/niceplugin/Vuejs-Router-KO' },
      { icon: 'slack', link: 'https://vuejs-korea.slack.com/' }
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
              text: '탐색 실패',
              link: '/guide/advanced/navigation-failures.html',
            },
            {
              text: '동적 라우팅',
              link: '/guide/advanced/dynamic-routing.html',
            },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Enumerations',
          collapsible: true,
          items: [
            {
              text: 'NavigationFailureType',
              link: '/api/enums/NavigationFailureType.md'
            },
          ]
        },
        {
          text: 'Interfaces',
          collapsible: true,
          items: [
            {
              text: 'HistoryState',
              link: '/api/interfaces/HistoryState.md'
            },
            {
              text: 'NavigationFailure',
              link: '/api/interfaces/NavigationFailure.md'
            },
            {
              text: 'NavigationGuard',
              link: '/api/interfaces/NavigationGuard.md'
            },
            {
              text: 'NavigationGuardNext',
              link: '/api/interfaces/NavigationGuardNext.md'
            },
            {
              text: 'NavigationGuardWithThis',
              link: '/api/interfaces/NavigationGuardWithThis.md'
            },
            {
              text: 'NavigationHookAfter',
              link: '/api/interfaces/NavigationHookAfter.md'
            },
            {
              text: 'RouteLocation',
              link: '/api/interfaces/RouteLocation.md'
            },
            {
              text: 'RouteLocationMatched',
              link: '/api/interfaces/RouteLocationMatched.md'
            },
            {
              text: 'RouteLocationNormalized',
              link: '/api/interfaces/RouteLocationNormalized.md'
            },
            {
              text: 'RouteLocationNormalizedLoaded',
              link: '/api/interfaces/RouteLocationNormalizedLoaded.md'
            },
            {
              text: 'RouteLocationOptions',
              link: '/api/interfaces/RouteLocationOptions.md'
            },
            {
              text: 'RouteMeta',
              link: '/api/interfaces/RouteMeta.md'
            },
            {
              text: 'Router',
              link: '/api/interfaces/Router.md'
            },
            {
              text: 'RouteRecordNormalized',
              link: '/api/interfaces/RouteRecordNormalized.md'
            },
            {
              text: 'RouterHistory',
              link: '/api/interfaces/RouterHistory.md'
            },
            {
              text: 'RouterLinkProps',
              link: '/api/interfaces/RouterLinkProps.md'
            },
            {
              text: 'RouterOptions',
              link: '/api/interfaces/RouterOptions.md'
            },
            {
              text: 'RouterScrollBehavior',
              link: '/api/interfaces/RouterScrollBehavior.md'
            },
            {
              text: 'RouterViewProps',
              link: '/api/interfaces/RouterViewProps.md'
            },
          ]
        },
        {
          text: 'Type Aliases',
          collapsible: true,
          items: [
            {
              text: 'LocationQuery',
              link: '/api/type_aliases/LocationQuery.md'
            },
            {
              text: 'LocationQueryRaw',
              link: '/api/type_aliases/LocationQueryRaw.md'
            },
            {
              text: 'PathParserOptions',
              link: '/api/type_aliases/PathParserOptions.md'
            },
            {
              text: 'RouteComponent',
              link: '/api/type_aliases/RouteComponent.md'
            },
            {
              text: 'RouteLocationRaw',
              link: '/api/type_aliases/RouteLocationRaw.md'
            },
            {
              text: 'RouteParams',
              link: '/api/type_aliases/RouteParams.md'
            },
            {
              text: 'RouteRecord',
              link: '/api/type_aliases/RouteRecord.md'
            },
            {
              text: 'RouteRecordName',
              link: '/api/type_aliases/RouteRecordName.md'
            },
            {
              text: 'RouteRecordRaw',
              link: '/api/type_aliases/RouteRecordRaw.md'
            },
            {
              text: 'UseLinkOptions',
              link: '/api/type_aliases/UseLinkOptions.md'
            },
          ]
        },
        {
          text: 'Variables',
          collapsible: true,
          items: [
            {
              text: 'RouterLink',
              link: '/api/variables/RouterLink.md'
            },
            {
              text: 'RouterView',
              link: '/api/variables/RouterView.md'
            },
            {
              text: 'START_LOCATION',
              link: '/api/variables/START_LOCATION.md'
            },
          ]
        },
        {
          text: 'Functions',
          collapsible: true,
          items: [
            {
              text: 'createMemoryHistory',
              link: '/api/functions/createMemoryHistory.md'
            },
            {
              text: 'createRouter',
              link: '/api/functions/createRouter.md'
            },
            {
              text: 'createWebHashHistory',
              link: '/api/functions/createWebHashHistory.md'
            },
            {
              text: 'createWebHistory',
              link: '/api/functions/createWebHistory.md'
            },
            {
              text: 'isNavigationFailure',
              link: '/api/functions/isNavigationFailure.md'
            },
            {
              text: 'loadRouteLocation',
              link: '/api/functions/loadRouteLocation.md'
            },
            {
              text: 'onBeforeRouteLeave',
              link: '/api/functions/onBeforeRouteLeave.md'
            },
            {
              text: 'onBeforeRouteUpdate',
              link: '/api/functions/onBeforeRouteUpdate.md'
            },
            {
              text: 'useLink',
              link: '/api/functions/useLink.md'
            },
            {
              text: 'useRoute',
              link: '/api/functions/useRoute.md'
            },
            {
              text: 'useRouter',
              link: '/api/functions/useRouter.md'
            },
          ]
        },
      ],
    },

    footer: {
      message: 'Translated by router.vuejs.kr',
      copyright: 'MIT Licensed | Copyright © 2014-present Evan You, Eduardo San Martin Morote'
    },
  },
})

export default config
