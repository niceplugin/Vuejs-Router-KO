import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_URL = 'https://router.vuejs.org'
export const META_TITLE = 'Vue Router'
export const META_DESCRIPTION = 'Vue.js 공식 라우터'

export const koConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/niceplugin/Vuejs-Router-KO/edit/main-korean/packages/docs/ko/:path',
      text: '이 페이지 편집 제안하기',
    },

    outline: {
      label: '이 페이지 목차',
    },

    docFooter: {
      prev: '이전',
      next: '다음',
    },

    nav: [
      {
        text: '가이드',
        link: '/guide/',
        activeMatch: '^/guide/',
      },
      {
        text: 'API <span class="VPBadge danger non-translate-badge-inline">영문</span>',
        link: '/api/',
        activeMatch: '^/api/',
      },
      {
        text: 'v4.x',
        items: [{ text: 'v3.x', link: 'https://v3.router.vuejs.org/kr' }],
      },
      {
        text: '링크',
        items: [
          {
            text: '토론',
            link: 'https://github.com/vuejs/router/discussions',
          },
          {
            text: '변경사항',
            link: 'https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md',
          },
          {
            text: 'Vue.js 자격증',
            link: 'https://certificates.dev/vuejs/?friend=VUEROUTER&utm_source=router_vuejs&utm_medium=link&utm_campaign=router_vuejs_links&utm_content=navbar',
          },
        ],
      },
    ],

    sidebar: {
      '/': [
        {
          text: 'Setup',
          items: [
            {
              text: '소개',
              link: '/introduction.html',
            },
            {
              text: '설치',
              link: '/installation.html',
            },
          ],
        },
        {
          text: '기본',
          items: [
            {
              text: '시작하기',
              link: '/guide/',
            },
            {
              text: '동적 라우트 매칭',
              link: '/guide/essentials/dynamic-matching.html',
            },
            {
              text: "라우트 매칭 문법",
              link: '/guide/essentials/route-matching-syntax.html',
            },
            {
              text: '네임드 라우트',
              link: '/guide/essentials/named-routes.html',
            },
            {
              text: '중첩된 라우트',
              link: '/guide/essentials/nested-routes.html',
            },
            {
              text: '프로그래매틱 탐색',
              link: '/guide/essentials/navigation.html',
            },
            {
              text: '네임드 뷰 (view)',
              link: '/guide/essentials/named-views.html',
            },
            {
              text: '리다이렉션 및 별칭',
              link: '/guide/essentials/redirect-and-alias.html',
            },
            {
              text: '라우트 컴포넌트에 프로퍼티 전달',
              link: '/guide/essentials/passing-props.html',
            },
            {
              text: '활성화된 링크',
              link: '/guide/essentials/active-links.html',
            },
            {
              text: '다양한 히스토리 모드',
              link: '/guide/essentials/history-mode.html',
            },
          ],
        },
        {
          text: '고급',
          items: [
            {
              text: '내비게이션 가드',
              link: '/guide/advanced/navigation-guards.html',
            },
            {
              text: '라우트 메타 필드',
              link: '/guide/advanced/meta.html',
            },
            {
              text: '데이터 가져오기',
              link: '/guide/advanced/data-fetching.html',
            },
            {
              text: 'Composition API',
              link: '/guide/advanced/composition-api.html',
            },
            {
              text: 'RouterView 슬롯',
              link: '/guide/advanced/router-view-slot.html',
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
              text: '지연된 로딩',
              link: '/guide/advanced/lazy-loading.html',
            },
            {
              text: '타입이 지정된 라우트',
              link: '/guide/advanced/typed-routes.html',
            },
            {
              text: 'RouterLink 확장',
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
          items: [
            {
              text: 'Vue 2에서 마이그레이션 <span class="VPBadge danger non-translate-badge-inline">영문</span>',
              link: '/guide/migration/index.html',
            },
          ],
        },
      ],

      '/api/': [
        {
          text: 'packages',
          items: [
            {
              text: 'vue-router',
              link: '/api/'
            }
          ],
        },
      ],
    },
  },
}

export const koSearch: DefaultTheme.AlgoliaSearchOptions = {
  appId: '5EXDT4HOIA',
  apiKey: '222957c39e026b1bf8d2e9a78a2fb2dd',
  indexName: 'router-vuejs',
  placeholder: '문서 검색',
  translations: {
    button: {
      buttonText: '검색',
      buttonAriaLabel: '검색',
    },
    modal: {
      searchBox: {
        resetButtonTitle: '검색 지우기',
        resetButtonAriaLabel: '검색 지우기',
        cancelButtonText: '취소',
        cancelButtonAriaLabel: '취소',
      },
      startScreen: {
        recentSearchesTitle: '검색 기록',
        noRecentSearchesText: '최근 검색 없음',
        saveRecentSearchButtonTitle: '검색 기록에 저장',
        removeRecentSearchButtonTitle: '검색 기록에서 삭제',
        favoriteSearchesTitle: '즐겨찾기',
        removeFavoriteSearchButtonTitle: '즐겨찾기에서 삭제',
      },
      errorScreen: {
        titleText: '결과를 가져올 수 없습니다',
        helpText: '네트워크 연결을 확인하세요',
      },
      footer: {
        selectText: '선택',
        navigateText: '탐색',
        closeText: '닫기',
        searchByText: '검색 기준',
      },
      noResultsScreen: {
        noResultsText: '결과를 찾을 수 없습니다',
        suggestedQueryText: '새로운 검색을 시도할 수 있습니다',
        reportMissingResultsText: '해당 검색어에 대한 결과가 있어야 합니까?',
        reportMissingResultsLinkText: '피드백 보내기 클릭',
      },
    },
  },
}
