# 시작하기 %{#Getting-Started}%

<VueSchoolLink
href="https://vueschool.io/courses/vue-router-4-for-everyone"
title="Vue School에서 Vue Router를 사용하여 강력한 Single Page Applications을 구축하는 방법을 배워보세요">무료 Vue Router 비디오 코스 시청하기</VueSchoolLink>

Vue Router는 Vue의 공식 클라이언트 사이드 라우팅 솔루션입니다.

클라이언트 사이드 라우팅은 싱글 페이지 애플리케이션(SPA)에서 사용자가 보는 콘텐츠에 브라우저 URL을 연결하는 데 사용됩니다. 사용자가 애플리케이션을 탐색함에 따라 URL이 적절하게 업데이트되지만, 페이지를 서버에서 다시 로드할 필요는 없습니다.

Vue Router는 Vue의 컴포넌트 시스템에 기반하여 구축됩니다. **라우트**를 구성하여 각 URL 경로에 대해 어떤 컴포넌트를 보여줄지 Vue Router에 알려줍니다.

::: tip 사전 요구 사항
이 가이드는 여러분이 이미 Vue에 익숙하다고 가정합니다. Vue 전문가일 필요는 없지만, 특정 기능에 대한 자세한 정보를 찾기 위해 [Vue 핵심 문서](https://vuejs.org/)를 참조해야 할 수도 있습니다.
:::

## 예제 %{#An-example}%

주요 개념을 소개하기 위해 다음 예제를 고려해 보겠습니다:

- [Vue Playground 예제](https://play.vuejs.org/#eNqFVVtv2zYU/itn6gArmC05btEHTXXTFcWyYZeiLfYy7UGWji02EsmRlOPA8H/fIambnaRD4Fg61++c7yN9DJqc8eirDpKANVIoA0coFOYG30kJJ9gq0cBs3+Is412AEq1B1Xmi2L+ObpvX+3IpI5+b8aFqSJ+rjANErcbQp/v3RrTchLMXlDa7CuZBl07YUoONrCl/bQPT6np9i3UtbLPv0phenVm6L3rQRgm+W79vlULeIQaZmypJ484HxyN87xzRtq3rj+SE08mViX2dlOf7vuAnh/I3xu/AiDdZEGfB+mdBz3ArGkzj0f9sRr4hy5D2zr49ykvjvmdqeTmv9RfDe4i7uM6dxsNiaF9+l0+y+Ts2Qj3cMm3oa94Zfd0py4uBzYFPO6Br3ZPaGzpme9rtQGdxg2WUgOC6Y0PDG/jbjnL0vMAsnhEsQcU4UZaMbU/z8zC3x/PYsbcN/ueilaJW03nDoy1Y+VUkT+0nvHI9PVB6PJE8M44HN2iJ27yt+9q09ek+rFR1oZg0RM5FgmvboKlEqRP/BrATX4SDH171JgBD4CIvThXJVldhP7Y7J9DtxP4nxZKk+470cnFQVuseHh2TlTduWmMEh5uiZsUdSXPAcKlOH/hIZmfEjhODRtPaozNKjyiiGcqn75Ej0Pl3lMyHp2fFeMHnEB/SRia+ict6ep/GXBWV1UGHyGtgh5O1K0KvuC8T/duieoi6tLdvYUYg+rXTmKH3jLmeKoW0owLDI7h8IrnvfAKrIargxfQ/lA0LHjmr8w3W3X3w2dVMIGWchoH9ohEl1pFRrCE2fccsgCY/1Mh3piLjaknc+pujr3TOqedk0eSSrg/BiVU3WtY5dBYMks2CkRtrzoLKGKmTOG65vNtFtON4jLh5Fb2MlnFJJ2tijVA3i40S99rdV1ngNmtr31BQXOLeCFHrRS7Zcy0eBd68jl5H13HNNjFVjxkv8eBq94unMY0mQWzZ7mJIKwtWo/pTGkaCORs2p9+Z+1+dzagWB6BFhcXdE/av+uAhf1RI0+1xMpzJFWnOuz98/gMP9Dw4icW2puhvOD+hFnVrMfqwn1peEuxJnEP7i+OM8d0X/eFgkOt+KAt0FLIj8v03Rh/hvoxeTbaozUONOiq0/aGhX6w5aY1xn7cRqkSVwEoegMCyEl4sl8sf3d1H5RhfbATdKk0C10t5cHaZlyWBHSzUJeNUFtaQww/08Tenz65xSzf+NLJaTTuP5UcARVFMACSwpL9VVyE4/QesCg/V)

`App.vue` 루트 컴포넌트부터 살펴보겠습니다.

### App.vue %{#App-vue}%

```vue
<template>
  <h1>Hello App!</h1>
  <p>
    <strong>현재 라우트 경로:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">홈으로 가기</RouterLink>
    <RouterLink to="/about">소개로 가기</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
```

이 템플릿은 Vue Router에서 제공하는 두 컴포넌트, `RouterLink`와 `RouterView`를 사용합니다.

일반적인 `<a>` 태그 대신, URL을 변경할 때 페이지를 다시 로드하지 않고 URL 생성, 인코딩 및 기타 다양한 기능을 처리할 수 있게 하는 커스텀 컴포넌트 `RouterLink`를 사용합니다. `RouterLink`에 대한 자세한 내용은 가이드의 나중 부분에서 다룹니다.

`RouterView` 컴포넌트는 현재 **라우트 컴포넌트**를 렌더링할 위치를 Vue Router에 알려줍니다. 이는 현재 URL 경로에 해당하는 컴포넌트입니다. `App.vue`에 있을 필요는 없으며, 레이아웃에 맞게 어디에든 배치할 수 있지만, 어딘가에 포함되어 있어야 합니다. 그렇지 않으면 Vue Router가 아무 것도 렌더링하지 않습니다.

위의 예제는 또한 <code v-pre>{{ $route.fullPath }}</code>를 사용합니다. 컴포넌트 템플릿에서 `$route`를 사용하여 현재 라우트를 나타내는 객체에 접근할 수 있습니다.

<VueMasteryLogoLink></VueMasteryLogoLink>

### 라우터 인스턴스 생성 %{#Creating-the-router-instance}%

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

`routes` 옵션은 라우트 자체를 정의하여 URL 경로를 컴포넌트에 매핑합니다. `component` 옵션으로 지정된 컴포넌트는 이전의 `App.vue`에서 `<RouterView>`에 의해 렌더링될 컴포넌트입니다. 이러한 라우트 컴포넌트는 때때로 _뷰(view)_라고 불리지만, 일반 Vue 컴포넌트에 불과합니다.

이 가이드에서는 나중에 볼 수 있듯이 라우트는 `path`와 `component` 외에도 다양한 옵션을 지원합니다.

`history` 옵션은 라우트가 URL에 어떻게 매핑되는지, 그리고 그 반대의 경우에 대해 제어합니다. Playground 예제에서는 `createMemoryHistory()`를 사용하여 브라우저 URL을 완전히 무시하고 자체 내부 URL을 사용합니다. 이는 Playground에는 적합하지만 실제 애플리케이션에서는 `createWebHistory()`나 `createWebHashHistory()`를 사용하고 싶을 것입니다. 이 주제에 대해서는 가이드의 [History 모드](./essentials/history-mode)에서 자세히 다룰 것입니다.

### 라우터 플러그인 등록 %{#Registering-the-router-plugin}%

라우터 인스턴스를 생성한 후, 우리는 그것을 플러그인으로 등록하기 위해 애플리케이션에서 `use()`를 호출해야 합니다:

```js
createApp(App)
  .use(router)
  .mount('#app')
```

또는 동등하게:

```js
const app = createApp(App)
app.use(router)
app.mount('#app')
```

대부분의 Vue 플러그인과 마찬가지로, `mount()` 호출 전에 `use()` 호출이 이루어져야 합니다.

이 플러그인이 하는 일에 대해 궁금하다면, 그 책임 중 일부는 다음과 같습니다:

1. `RouterView`와 `RouterLink` 컴포넌트를 [전역으로 등록](https://vuejs.org/guide/components/registration.html#global-registration)합니다.
2. 전역 `$router`와 `$route` 속성을 추가합니다.
3. `useRouter()` 및 `useRoute()` 컴포저블을 사용할 수 있게 합니다.
4. 초기 라우트를 해결하기 위해 라우터를 트리거합니다.

### 라우터와 현재 라우트 접근하기 %{#Accessing-the-router-and-current-route}%

여러분은 애플리케이션의 다른 곳에서 라우터에 접근하고 싶을 것입니다.

ES 모듈에서 라우터 인스턴스를 내보내는 경우, 필요한 곳에서 라우터 인스턴스를 직접 가져올 수 있습니다. 이 방법이 가장 좋은 접근 방식일 수 있지만, 컴포넌트 내부에 있는 경우 다른 옵션이 있습니다.

컴포넌트 템플릿에서 라우터 인스턴스는 `$router`로 노출됩니다. 이전에 본 `$route` 속성과 비슷하지만, 끝에 `r`이 추가되어 있습니다.

Options API를 사용하는 경우, JavaScript 코드에서 `this.$router`와 `this.$route`를 사용하여 이 두 속성에 접근할 수 있습니다. Playground 예제의 `HomeView.vue` 컴포넌트는 이 방식으로 라우터에 접근합니다:

```js
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
    },
  },
}
```

이 메서드는 [프로그래매틱 네비게이션](./essentials/navigation)에 사용되는 `push()`를 호출합니다. 이에 대해서는 나중에 더 자세히 배우게 될 것입니다.

Composition API를 사용할 경우, `this`를 통해 컴포넌트 인스턴스에 접근할 수 없으므로, 대신 사용할 수 있는 몇 가지 컴포저블을 Vue Router가 포함하고 있습니다. Playground 예제의 `AboutView.vue`는 그 접근 방식을 사용합니다:

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

지금 모든 코드를 이해할 필요는 없습니다. 중요한 것은 컴포저블 `useRouter()`와 `useRoute()`가 각각 라우터 인스턴스와 현재 라우트에 접근하는 데 사용된다는 것입니다.

### 다음 단계 %{#Next-steps}%

Vite를 사용한 완전한 예제를 보고 싶다면, Vue Router를 예제 프로젝트에 포함하는 옵션을 제공하는 [create-vue](https://github.com/vuejs/create-vue) 스캐폴딩 도구를 사용할 수 있습니다:

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

create-vue가 생성하는 예제 프로젝트는 여기서 본 기능과 유사합니다. 이 가이드의 다음 몇 페이지에서 소개된 기능을 탐색하는 데 유용한 출발점이 될 수 있습니다.

## 이 가이드의 관례 %{#Conventions-in-this-guide}%

### 단일 파일 컴포넌트 %{#Single-File-Components}%

Vue Router는 일반적으로 번들러(예: Vite)와 [SFCs](https://vuejs.org/guide/introduction.html#single-file-components)(즉, `.vue` 파일)를 사용하여 구축된 애플리케이션에서 사용됩니다. 이 가이드의 대부분 예제는 그 스타일로 작성될 것이지만, Vue Router 자체는 빌드 도구나 SFCs를 사용해야 한다는 요구 사항이 없습니다.

예를 들어, [Vue](https://vuejs.org/guide/quick-start.html#using-vue-from-cdn)와 [Vue Router](../installation#Direct-Download-CDN)의 _global builds_를 사용하는 경우, 라이브러리는 전역 객체를 통해 노출되지, 가져오기를 통해 노출되지 않습니다:

```js
const { createApp } = Vue
const { createRouter, createWebHistory } = VueRouter
```

### 컴포넌트 API 스타일 %{#Component-API-style}%

Vue Router는 Composition API와 Options API 모두와 사용할 수 있습니다. 관련된 경우, 이 가이드의 예제는 두 스타일 모두에 대해 작성된 컴포넌트를 보여줄 것입니다. Composition API 예제는 일반적으로 명시적인 `setup` 함수보다는 `<script setup>`을 사용할 것입니다.

두 스타일에 대한 리프레셔가 필요하다면, [Vue - API 스타일](https://vuejs.org/guide/introduction.html#api-styles)을 참조하십시오.

### `router`와 `route` %{#router-and-route}%

이 가이드에서는 종종 라우터 인스턴스를 `router`라고 합니다. 이것은 `createRouter()`에 의해 반환된 객체입니다. 애플리케이션에서 이 객체에 어떻게 접근하는지는 컨텍스트에 따라 달라집니다. 예를 들어, Composition API를 사용하는 컴포넌트에서는 `useRouter()`를 호출하여 접근할 수 있습니다. Options API를 사용하는 경우, `this.$router`를 사용하여 접근할 수 있습니다.

마찬가지로, 현재 라우트는 `route`라고 할 것입니다. 컴포넌트에서 `useRoute()` 또는 `this.$route`를 사용하여 접근할 수 있습니다. 이는 사용하는 API에 따라 달라집니다.

### `RouterView`와 `RouterLink` %{#RouterView-and-RouterLink}%

`RouterView`와 `RouterLink` 컴포넌트는 모두 [전역으로 등록](https://vuejs.org/guide/components/registration.html#global-registration)되므로, 컴포넌트 템플릿에서 사용하기 전에 가져올 필요가 없습니다. 그러나 선호한다면, 이들을 로컬로 가져올 수 있습니다, 예를 들어 `import { RouterLink } from 'vue-router'`.

템플릿에서 컴포넌트 이름은 PascalCase 또는 kebab-case로 작성할 수 있습니다. Vue의 템플릿 컴파일러는 어느 형식이든 지원하므로, `<RouterView>`와 `<router-view>`는 일반적으로 동일합니다. 프로젝트 내에서 사용되는 관례를 따르십시오.

DOM 내 템플릿을 사용하는 경우 [일반적인 주의 사항](https://vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)이 적용됩니다: 컴포넌트 이름은 kebab-case로 작성해야 하고 자체 종료 태그는 지원되지 않습니다. 따라서 `<RouterView />` 대신 `<router-view></router-view>`을 사용해야 합니다.
