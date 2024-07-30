# 라우트 컴포넌트에 프로퍼티 전달 %{#Passing-Props-to-Route-Components}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/route-props"
  title="Learn how to pass props to route components"
/>

컴포넌트에서 `$route` 또는 `useRoute()`를 사용하는 것은 라우터와의 긴밀한 결합을 초래하며, 이는 해당 컴포넌트가 특정 URL에서만 사용되도록 하는 제약을 가져옵니다. 이것이 반드시 나쁜 것은 아니지만, `props` 옵션을 사용하면 이러한 작용을 분리할 수 있습니다:

이전 예제로 돌아가 봅시다:

```vue
<!-- User.vue -->
<template>
  <div>
    User {{ $route.params.id }}
  </div>
</template>
```

그리고 다음과 같은 코드가 있다고 할 때:

```js
import User from './User.vue'

// 이것은 `createRouter`에 전달됩니다.
const routes = [
  { path: '/users/:id', component: User },
]
```

프로퍼티를 선언하여 `User.vue`에서 `$route`에 대한 직접적인 의존성을 제거할 수 있습니다:

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

그런 다음 라우트 구성에서 `props: true` 설정으로 `id` 파라미터를 컴포넌트에 프로퍼티로 전달하도록 할 수 있습니다:

```js
const routes = [
  { path: '/user/:id', component: User, props: true }
]
```

이렇게 하면 컴포넌트를 어디서든 사용할 수 있게 되어 컴포넌트를 재사용하고 테스트하기가 더 쉬워집니다.

## 불리언 모드 %{#Boolean-mode}%

`props`가 `true`로 설정되면, `route.params`가 컴포넌트의 프로퍼티로 설정됩니다.

## 네임드 뷰 %{#Named-views}%

네임드 뷰가 있는 라우트의 경우, 각 네임드 뷰에 `props` 옵션을 정의해야 합니다:

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

`props`가 객체일 때, 이 객체는 그대로 컴포넌트의 프로퍼티로 설정됩니다. 이는 프로퍼티가 고정적일 때 유용합니다.

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

프로퍼티를 반환하는 함수를 생성할 수 있습니다. 이를 통해 파라미터를 다른 타입으로 변환하거나, 정적 값과 라우트 기반 값을 결합하는 등의 작업을 할 수 있습니다.

```js
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

URL `/search?q=vue`는 `{query: 'vue'}`를 `SearchUser` 컴포넌트에 프로퍼티로 전달합니다.

`props` 함수는 상태를 유지하지 않도록 하는 것이 좋습니다. 이 함수는 라우트가 변경될 때만 작동하기 때문입니다. 프로퍼티를 정의하는 데 상태가 필요하다면 래퍼 컴포넌트를 사용하세요. 이렇게 하면 Vue가 상태 변화에 반응할 수 있습니다.

## RouterView를 통해서 %{#Via-RouterView}%

[`<RouterView>` 슬롯](../advanced/router-view-slot)을 통해 모든 프로퍼티를 전달할 수 있습니다:

```vue-html
<RouterView v-slot="{ Component }">
  <component
    :is="Component"
    view-prop="value"
   />
</RouterView>
```

::: warning
이 경우 **모든 뷰 컴포넌트**는 `view-prop`을 받게 됩니다. 이는 모든 뷰 컴포넌트가 `view-prop` 프로퍼티를 선언했음을 의미하므로 일반적으로 좋은 솔루션이 아닙니다. 가능하다면 위에서 설명한 다른 옵션을 사용하세요.
:::
