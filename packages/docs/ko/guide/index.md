# 시작하기 %{#Getting-Started}%

<VueSchoolLink
href="https://vueschool.io/courses/vue-router-4-for-everyone"
title="Learn how to build powerful Single Page Applications with the Vue Router on Vue School">Watch a Free Vue Router Video Course</VueSchoolLink>

Vue Router는 Vue의 공식 클라이언트 측 라우팅 솔루션입니다.

클라이언트 측 라우팅은 단일 페이지 애플리케이션(SPA)에서 유저가 보는 콘텐츠와 브라우저 URL을 연결하는 데 사용됩니다. 유저가 애플리케이션을 탐색할 때 URL이 그에 따라 업데이트되지만, 페이지를 서버에서 다시 로드할 필요는 없습니다.

Vue Router는 Vue의 컴포넌트 시스템을 기반으로 구축되었습니다. 각 URL 경로에 어떤 컴포넌트를 표시할지 **라우트**를 설정하여 Vue Router에 알려줍니다.

::: tip 전제 조건
이 가이드는 여러분이 이미 Vue에 익숙하다는 것을 전제로 합니다. Vue 전문가일 필요는 없지만, 특정 기능에 대한 추가 정보가 필요할 때는 [Vue 핵심 문서](https://vuejs.org/)를 참고해야 할 수도 있습니다.
:::

## 예제 %{#An-example}%

핵심 개념을 소개하기 위해 다음 예제를 살펴보겠습니다:

- [Vue Playground 예제](https://play.vuejs.org/#eNqFVVtv2zYU/itn6gArmC05btEHTXXTFcWyYZeiLfYy7UGWji02EsmRlOPA8H/fIambnaRD4Fg61++c7yN9DJqc8eirDpKANVIoA0coFOYG30kJJ9gq0cBs3+Is412AEq1B1Xmi2L+ObpvX+3IpI5+b8aFqSJ+rjANErcbQp/v3RrTchLMXlDa7CuZBl07YUoONrCl/bQPT6np9i3UtbLPv0phenVm6L3rQRgm+W79vlULeIQaZmypJ484HxyN87xzRtq3rj+SE08mViX2dlOf7vuAnh/I3xu/AiDdZEGfB+mdBz3ArGkzj0f9sRr4hy5D2zr49ykvjvmdqeTmv9RfDe4i7uM6dxsNiaF9+l0+y+Ts2Qj3cMm3oa94Zfd0py4uBzYFPO6Br3ZPaGzpme9rtQGdxg2WUgOC6Y0PDG/jbjnL0vMAsnhEsQcU4UZaMbU/z8zC3x/PYsbcN/ueilaJW03nDoy1Y+VUkT+0nvHI9PVB6PJE8M44HN2iJ27yt+9q09ek+rFR1oZg0RM5FgmvboKlEqRP/BrATX4SDH171JgBD4CIvThXJVldhP7Y7J9DtxP4nxZKk+470cnFQVuseHh2TlTduWmMEh5uiZsUdSXPAcKlOH/hIZmfEjhODRtPaozNKjyiiGcqn75Ej0Pl3lMyHp2fFeMHnEB/SRia+ict6ep/GXBWV1UGHyGtgh5O1K0KvuC8T/duieoi6tLdvYUYg+rXTmKH3jLmeKoW0owLDI7h8IrnvfAKrIargxfQ/lA0LHjmr8w3W3X3w2dVMIGWchoH9ohEl1pFRrCE2fccsgCY/1Mh3piLjaknc+pujr3TOqedk0eSSrg/BiVU3WtY5dBYMks2CkRtrzoLKGKmTOG65vNtFtON4jLh5Fb2MlnFJJ2tijVA3i40S99rdV1ngNmtr31BQXOLeCFHrRS7Zcy0eBd68jl5H13HNNjFVjxkv8eBq94unMY0mQWzZ7mJIKwtWo/pTGkaCORs2p9+Z+1+dzagWB6BFhcXdE/av+uAhf1RI0+1xMpzJFWnOuz98/gMP9Dw4icW2puhvOD+hFnVrMfqwn1peEuxJnEP7i+OM8d0X/eFgkOt+KAt0FLIj8v03Rh/hvoxeTbaozUONOiq0/aGhX6w5aY1xn7cRqkSVwEoegMCyEl4sl8sf3d1H5RhfbATdKk0C10t5cHaZlyWBHSzUJeNUFtaQww/08Tenz65xSzf+NLJaTTuP5UcARVFMACSwpL9VVyE4/QesCg/V)

먼저 루트 컴포넌트인 `App.vue`를 살펴보겠습니다.

### App.vue %{#App-vue}%

```vue
<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```

이 템플릿은 Vue Router가 제공하는 두 가지 컴포넌트인 `RouterLink`와 `RouterView`를 사용하고 있습니다.

링크를 생성하기 위해 일반 `<a>` 태그 대신, `RouterLink` 컴포넌트를 사용합니다. 이를 통해 Vue Router는 페이지를 새로고침 하지 않고 URL을 변경하며, URL 생성, 인코딩, 다양한 기타 기능을 처리할 수 있습니다. `RouterLink`에 대한 자세한 내용은 가이드의 이후 섹션에서 더 깊이 다루겠습니다.

`RouterView` 컴포넌트는 현재 **라우트 컴포넌트**를 렌더링할 위치를 Vue Router에 알려줍니다. 이는 현재 URL 경로에 해당하는 컴포넌트입니다. 반드시 `App.vue`에 있을 필요는 없으며, 레이아웃에 맞게 어디에든 배치할 수 있지만, 반드시 어딘가에 포함되어야 합니다. 그렇지 않으면 Vue Router는 아무 것도 렌더링하지 않습니다.

위 예제에서는 <code v-pre>{{ $route.fullPath }}</code>도 사용됩니다. 컴포넌트 템플릿에서 `$route`를 사용하여 현재 라우트를 나타내는 객체에 접근할 수 있습니다.

<VueMasteryLogoLink></VueMasteryLogoLink>

### 라우터 인스턴스 생성하기 %{#Creating-the-router-instance}%

라우터 인스턴스는 `createRouter()` 함수를 호출하여 생성됩니다:

```js
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
```

`routes` 옵션은 URL 경로를 컴포넌트에 매핑하여 라우트를 정의합니다. `component` 옵션에 지정된 컴포넌트는 앞서 `App.vue`의 `<RouterView>`에서 렌더링될 컴포넌트입니다. 이러한 라우트 컴포넌트는 *뷰(view)* 라고도 불리지만, 본질적으로는 일반적인 Vue 컴포넌트입니다.

라우트는 다양한 다른 옵션을 지원하며, 이에 대해서는 가이드의 이후 섹션에서 더 깊이 다루겠습니다. 현재는 `path`와 `component`만 필요합니다.

`history` 옵션은 라우트가 URL에 어떻게 매핑되는지를 제어합니다. Playground 예제에서는 `createMemoryHistory()`를 사용하고 있으며, 이는 브라우저 URL을 완전히 무시하고 자체 내부 URL을 대신 사용합니다. 이는 Playground에 적합하지만, 실제 애플리케이션에서는 사용하기 어렵습니다. 일반적으로는 `createWebHistory()`나 `createWebHashHistory()`를 사용하는 것이 좋습니다. 이 주제에 대해서는 [다양한 히스토리 모드](./essentials/history-mode) 가이드에서 더 깊이 다루겠습니다.

### 라우터 플러그인 등록하기 %{#Registering-the-router-plugin}%

한 번 라우터 인스턴스를 생성한 후, 애플리케이션에서 `use()`를 호출하여 플러그인으로 등록해야 합니다:

```js
createApp(App)
  .use(router)
  .mount('#app')
```

또는 다음과 같이:

```js
const app = createApp(App)
app.use(router)
app.mount('#app')
```

대부분의 Vue 플러그인과 마찬가지로, `use()` 호출은 `mount()` 호출 이전에 이루어져야 합니다.

이 플러그인이 하는 역할은 다음과 같습니다:

1. `RouterView`와 `RouterLink` 컴포넌트를 [전역적으로 등록](https://vuejs.org/guide/components/registration.html#global-registration)합니다.
2. 전역 프로퍼티를 `$router`와 `$route`를 추가합니다.
3. `useRouter()`와 `useRoute()` 컴포저블을 활성화합니다.
4. 초기 라우트를 설정하기 위해 라우터를 작동시킵니다.

### 라우터와 현재 라우트에 접근하기 %{#Accessing-the-router-and-current-route}%

응용 프로그램의 다른 곳에서 라우터에 접근하고 싶을 것입니다.

ES 모듈에서 라우터 인스턴스를 내보내는 경우, 필요한 곳에서 라우터 인스턴스를 직접 가져올 수 있습니다. 일부 경우에는 이것이 가장 좋은 접근 방식이지만, 컴포넌트 내부에 있을 때는 다른 옵션도 있습니다.

컴포넌트 템플릿에서는 라우터 인스턴스가 `$router`로 노출됩니다. 이것은 `$route` 프로퍼티와 유사하지만 끝에 `r`이 추가된 점을 유의하세요.

Options API를 사용하는 경우, 자바스크립트 코드에서 `this.$router` 및 `this.$route`로 동일한 두 프로퍼티에 접근할 수 있습니다. Playground 예제의 `HomeView.vue` 컴포넌트는 다음과 같이 라우터에 접근합니다:

```js
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
    },
  },
}
```

이 메서드는 [프로그래매틱 탐색](./essentials/navigation)에 사용되는 `push()`를 호출하고 있습니다. 이에 대해서는 나중에 더 자세히 알아볼 것입니다.

Composition API를 사용하면 `this`를 통해 컴포넌트 인스턴스에 접근할 수 없으므로, Vue Router에는 대신 사용할 수 있는 몇 가지 컴포저블이 포함되어 있습니다. Playground 예제의 `AboutView.vue`는 이 접근 방식을 사용하고 있습니다:

```vue
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
</script>
```

지금 당장 모든 코드를 이해할 필요는 없습니다. 중요한 점은 라우터 인스턴스와 현재 라우트에 접근하기 위해 `useRouter()`와 `useRoute()`라는 컴포저블이 사용된다는 것입니다.

### 다음 단계 %{#Next-steps}%

Vite를 사용한 완전한 예제를 보고 싶다면, [create-vue](https://github.com/vuejs/create-vue) 스캐폴딩 도구를 사용할 수 있습니다. 이 도구에는 예제 프로젝트에 Vue Router를 포함하는 옵션이 있습니다:

::: code-group

```bash [npm]
npm create vue@latest
```

```bash [yarn]
yarn create vue
```

```bash [pnpm]
pnpm create vue
```

:::

create-vue로 생성된 예제 프로젝트는 여기서 본 것과 유사한 기능을 사용합니다. 이 가이드의 다음 페이지에서 소개하는 기능을 탐색하는 데 유용한 출발점이 될 수 있습니다.

## 이 가이드의 규칙 %{#Conventions-in-this-guide}%

### 싱글 파일 컴포넌트 %{#Single-File-Components}%

Vue Router는 번들러(예: Vite)와 [SFCs](https://vuejs.org/guide/introduction.html#single-file-components) (즉, `.vue` 파일)을 사용하여 빌드되는 애플리케이션에서 주로 사용됩니다. 가이드 대부분의 예제는 이러한 스타일로 작성되지만, Vue Router 자체는 빌드 도구나 SFCs를 반드시 사용할 필요는 없습니다.

예를 들어, [Vue](https://vuejs.org/guide/quick-start.html#using-vue-from-cdn)와 [Vue Router](../installation#Direct-Download-CDN)의 *글로벌 빌드*를 사용하는 경우, 라이브러리는 임포트가 아닌 전역 객체를 통해 노출됩니다:

```js
const { createApp } = Vue
const { createRouter, createWebHistory } = VueRouter
```

### Component API 스타일 %{#Component-API-style}%

Vue Router는 Composition API와 Options API 둘 다 사용할 수 있습니다. 필요한 경우, 예제는 두 가지 스타일로 작성된 컴포넌트를 보여줄 것입니다. Composition API 예제는 명시적인 `setup` 함수보다는 일반적으로 `<script setup>`을 사용할 것입니다.

이 두 가지 스타일에 대해 다시 확인하고 싶다면 [Vue - API 스타일](https://vuejs.org/guide/introduction.html#api-styles)을 참고하십시오.

### `router` 및 `route` %{#router-and-route}%

가이드 전반에 걸쳐, 라우터 인스턴스를 종종 `router`라고 부를 것입니다. 이는 `createRouter()`가 반환하는 객체입니다. 애플리케이션에서 해당 객체에 접근하는 방법은 컨텍스트에 따라 다릅니다. 예를 들어, Composition API를 사용하는 컴포넌트에서는 `useRouter()`를 호출하여 접근할 수 있습니다. Options API를 사용하는 경우 `this.$router`를 사용하여 접근할 수 있습니다.

마찬가지로, 현재 라우트를 `route`라고 부를 것입니다. 컴포넌트에서 `useRoute()` 또는 `this.$route`를 사용하여 접근할 수 있으며, 이는 컴포넌트가 사용하는 API에 따라 다릅니다.

### `RouterView` 및 `RouterLink` %{#RouterView-and-RouterLink}%

`RouterView`와 `RouterLink` 컴포넌트는 둘 다 [전역으로 등록](https://vuejs.org/guide/components/registration.html#global-registration)되므로, 컴포넌트 템플릿에서 사용하기 전에 임포트할 필요가 없습니다. 하지만 원한다면 로컬로 임포트할 수 있습니다. 예: `import { RouterLink } from 'vue-router'`.

템플릿에서 컴포넌트 이름은 PascalCase나 kebab-case로 작성할 수 있습니다. Vue의 템플릿 컴파일러는 두 가지 형식을 모두 지원하므로 `<RouterView>`와 `<router-view>`는 일반적으로 동일합니다. 프로젝트 내에서 사용되는 관례를 따르는 것이 좋습니다.

만약 in-DOM 템플릿을 사용 중이라면 [주의사항](https://vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)이 적용됩니다. 컴포넌트 이름은 반드시 kebab-case로 작성해야 하며, 자체 종료 태그는 지원되지 않습니다. 따라서 `<RouterView />` 대신 `<router-view></router-view>`를 사용해야 합니다.
