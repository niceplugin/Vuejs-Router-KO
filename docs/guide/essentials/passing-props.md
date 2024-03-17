# 라우트 컴포넌트에 프롭스 전달하기 %{#Passing-Props-to-Route-Components}%

<VueSchoolLink
href="https://vueschool.io/lessons/route-props"
title="라우트 컴포넌트에 프롭스를 전달하는 방법 배우기"
/>

`$route` 또는 `useRoute()`를 컴포넌트에서 사용하면 라우트와의 강한 결합이 생기며 이는 컴포넌트가 특정 URL에서만 사용될 수 있게 제한합니다. 이것이 반드시 나쁜 것은 아니지만, `props` 옵션을 사용함으로써 이러한 동작을 분리할 수 있습니다.

이전 예제로 돌아가 봅시다:

```vue
<!-- User.vue -->
<template>
  <div>
    User {{ $route.params.id }}
  </div>
</template>
```

다음과 함께 사용:

```js
import User from './User.vue'

// 이것은 `createRouter`에 전달됩니다
const routes = [
  { path: '/users/:id', component: User },
]
```

`User.vue`에서 `$route`에 대한 직접적인 의존성을 제거하려면 대신 prop을 선언할 수 있습니다:

::: code-group

```vue [Composition API]
<!-- User.vue -->
<script setup>
defineProps({
  id: String
})
</script>

<template>
  <div>
    User {{ id }}
  </div>
</template>
```

```vue [Options API]
<!-- User.vue -->
<script>
export default {
  props: {
    id: String
  }
}
</script>

<template>
  <div>
    User {{ id }}
  </div>
</template>
```

:::

그런 다음 `props: true`를 설정하여 `id` 매개변수를 prop으로 전달하도록 라우트를 구성할 수 있습니다:

```js
const routes = [
  { path: '/user/:id', component: User, props: true }
]
```

이렇게 하면 어디에서나 컴포넌트를 더 쉽게 재사용하고 테스트할 수 있습니다.

## 불리언 모드 %{#Boolean-mode}%

라우트의 `props`가 `true`로 설정되면, `route.params`가 컴포넌트의 props로 설정됩니다.

## 이름이 있는 뷰 %{#Named-views}%

이름이 있는 뷰가 있는 라우트의 경우, 이름이 있는 뷰 각각에 `props` 옵션을 정의해야 합니다:

```js
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

## 객체 모드 %{#Object-mode}%

`props`가 객체인 경우, 이는 그대로 컴포넌트의 props로 설정됩니다. Props가 정적일 때 유용합니다.

```js
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

## 함수 모드 %{#Function-mode}%

Props를 반환하는 함수를 만들 수 있습니다. 이를 통해 파라미터를 다른 유형으로 캐스팅하고, 정적 값을 라우트 기반의 값과 결합하는 등의 작업을 수행할 수 있습니다.

```js
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

`/search?q=vue`는 `SearchUser` 컴포넌트의 props로 `{ query: 'vue' }`를 전달합니다.

라우트가 변경될 때만 `props`를 정의하는 함수가 평가되므로, 상태가 변경될 때도 반응하는 `props`를 전달하려면, 함수 내부에 상태를 사용하는 대신, 래퍼 컴포넌트를 사용해 계산된 속성(`computed`)을 `props`로 전달해야 합니다.

## RouterView에서 직접 %{#Via-RouterView}%

또한 [`<RouterView>` 슬롯](../advanced/router-view-slot)을 통해 어떤 props도 전달할 수 있습니다:

```vue-html
<RouterView v-slot="{ Component }">
  <component
    :is="Component"
    view-prop="value"
   />
</RouterView>
```

::: warning
이 경우, **모든 view 컴포넌트**가 `view-prop`을 받게 됩니다. 이는 보통 좋은 아이디어가 아닙니다. 왜냐하면 모든 view 컴포넌트가 `view-prop` prop을 선언했다는 것을 의미하기 때문입니다. 그렇지 않을 수도 있습니다. 가능하다면 위의 옵션 중 하나를 사용하세요.
:::
