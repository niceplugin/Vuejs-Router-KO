# 중첩된 라우트 %{#nested-routes}%

<VueSchoolLink
href="https://vueschool.io/lessons/nested-routes"
title="Learn about nested routes"
/>

일부 앱의 UI는 여러 단계로 중첩된 컴포넌트로 구성됩니다. 이 경우, URL 세그먼트가 중첩된 컴포넌트 중 특정 구조와 일치되어야 하는 것은 매우 일반적입니다. 예를 들면 다음과 같습니다:

```
/user/johnny/profile                   /user/johnny/posts 
┌──────────────────┐                  ┌──────────────────┐
│ User             │                  │ User             │
│ ┌──────────────┐ │                  │ ┌──────────────┐ │
│ │ Profile      │ │  ●────────────▶  │ │ Posts        │ │
│ │              │ │                  │ │              │ │
│ └──────────────┘ │                  │ └──────────────┘ │
└──────────────────┘                  └──────────────────┘
```

Vue Router를 사용하는 경우, 중첩된 라우트 구성을 통해 이러한 구조적 관계를 구현할 수 있습니다.

지난 장에서 만든 앱을 예로들면:

```vue
<!-- App.vue -->
<template>
  <router-view />
</template>
```

```vue
<!-- User.vue -->
<template>
  <div>
    User {{ $route.params.id }}
  </div>
</template>
```

```js
import User from './User.vue'

// 이것은 `createRouter`로 전달됨
const routes = [{ path: '/user/:id', component: User }]
```

여기서 `<router-view>`는 최상위 `router-view`입니다. 최상위 라우트와 일치하는 컴포넌트를 렌더링합니다. 마찬가지로 렌더링된 컴포넌트는 자체 중첩된 `<router-view>`를 포함할 수도 있습니다. 예를 들어 `User` 컴포넌트의 템플릿 내부에 `<router-view>`를 하나 추가하면:

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>유저 {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

이 중첩된 `router-view`에 컴포넌트를 렌더링하려면, `/user/:id` 라우트 내부의 모든 라우트에 `children` 옵션을 사용해야 합니다:

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // /user/:id/profile 와 매치된 경우,
        // User 컴포넌트 내부의 <router-view>에서 렌더링됨: UserProfile
        path: 'profile',
        component: UserProfile,
      },
      {
        // /user/:id/posts 와 매치된 경우,
        // User 컴포넌트 내부의 <router-view>에서 렌더링됨: UserPosts
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

**`/`로 시작하는 중첩 라우트는 루트 라우트로 처리됩니다. 이를 통해 중첩 URL을 사용하지 않고도 컴포넌트 중첩을 활용할 수 있습니다.**

보시다시피 `children` 옵션은 `routes`처럼 라우트를 나타내는 배열입니다. 따라서 필요한 만큼 중첩된 `router-view`를 사용할 수 있습니다.

위의 구성 상태로 `/user/eduardo`를 방문하면 일치하는 중첩 라우트가 없으므로, `User`의 `router-view` 내부에 아무것도 렌더링 되지 않습니다. 이럴 때, 그곳에 무언가를 렌더링하고 싶을 수 있습니다. 이 경우, 빈 중첩 라우트를 제공할 수 있습니다.

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // /user/:id 와 매치된 경우,
      // User 컴포넌트 내부의 <router-view>에서 렌더링됨: UserHome
      { path: '', component: UserHome },

      // ...다른 하위 라우트
    ],
  },
]
```

참고: [예제](https://codesandbox.io/s/nested-views-vue-router-4-examples-hl326?initialpath=%2Fusers%2Feduardo)

## 중첩된 이름이 있는 라우트 %{#nested-named-routes}%

[이름이 있는 라우트](./named-routes.md)를 처리할 때, 일반적으로 **"자식 라우트의 이름"만 지정**합니다:

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    // 자식 라우트에만 이름이 있음.
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

이렇게 하면 `/user/:id`로 이동하면 항상 중첩 라우트가 표시됩니다.

일부 시나리오에서는 중첩 라우트로 이동하지 않고 이름이 있는 라우트로 이동하고자 할 수 있습니다. 예를 들어 중첩된 이름이 있는 라우트(위 예제의 `name: user` 라우트)를 표시하지 않고 `/user/:id`로 이동하려는 경우입니다.

```js
const routes = [
  {
    path: '/user/:id',
    name: 'user-parent',
    component: User,
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

## 부모 컴포넌트 생략 <Badge text="4.1+" /> %{#Omitting-parent-components-}%

라우트 컴포넌트를 중첩할 필요 없이 라우트 간의 부모-자식 관계를 활용할 수도 있습니다. 이는 공통 라우트 접두어를 가진 라우트를 그룹화하거나, [라우트별 탐색 가드](../advanced/navigation-guards#Per-Route-Guard)나 [라우트 메타 필드](../advanced/meta)와 같은 보다 고급 기능을 사용할 때 유용할 수 있습니다.

이를 달성하기 위해, 부모 라우트에서 `component`와 `components` 옵션을 생략합니다:

```js
const routes = [
  {
    path: '/admin',
    children: [
      { path: '', component: AdminOverview },
      { path: 'users', component: AdminUserList },
      { path: 'users/:id', component: AdminUserDetails },
    ], 
  },
]
```

부모가 라우트 컴포넌트를 지정하지 않기 때문에, 최상위 `<router-view>`는 부모를 건너뛰고 대신 관련 자식의 컴포넌트를 사용합니다.
