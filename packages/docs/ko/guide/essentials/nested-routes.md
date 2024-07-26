# 중첩된 라우트 %{#Nested-Routes}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/nested-routes"
  title="Learn about nested routes"
/>

일부 애플리케이션의 UI는 여러 단계로 중첩된 컴포넌트들로 구성됩니다. 이 경우 URL의 세그먼트가 컴포넌트가 중첩된 특정 구조와 일치하는 경우가 매우 일반적입니다. 예를 들어:

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

Vue Router를 사용하면 중첩된 라우트 설정으로 이러한 관계를 표현할 수 있습니다.

지난 챕터에서 만든 애플리케이션을 예로 들어 보겠습니다:

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

// 이것은 `createRouter`에 전달됩니다.
const routes = [{ path: '/user/:id', component: User }]
```

여기서 `<router-view>`는 최상위 `router-view`입니다. 이것은 최상위 라우트에 의해 매치된 컴포넌트를 렌더링합니다. 마찬가지로, 렌더링된 컴포넌트도 자체적으로 중첩된 `<router-view>`를 포함할 수 있습니다. 예를 들어, `User` 컴포넌트의 템플릿 안에 하나를 추가한다면:

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

이 중첩된 `router-view`에 컴포넌트를 렌더링하려면, 각 라우트에서 `children` 옵션을 사용해야 합니다:

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // UserProfile은 /user/:id/profile 가 매칭되면
        // User의 `<router-view>` 안에서 렌더링됩니다.
        path: 'profile',
        component: UserProfile,
      },
      {
        // UserPosts는 /user/:id/posts 가 매칭되면
        // User의 `<router-view>` 안에서 렌더링됩니다.
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

**참고로 `/`로 시작하는 중첩 경로는 루트 경로로 취급됩니다. 이를 통해 중첩 URL을 사용하지 않고도 컴포넌트 중첩을 활용할 수 있습니다.**

보시다시피, `children` 옵션은 `routes` 자체처럼 또 다른 라우트 배열입니다. 따라서 필요한 만큼 뷰를 계속 중첩할 수 있습니다.

위 설정에 따라 `/user/eduardo`를 방문하면, 중첩된 경로가 일치하지 않기 때문에 `User`의 `router-view` 안에는 아무 것도 렌더링되지 않습니다. 이 경우, 그곳에 무언가를 렌더링하고 싶다면 빈 중첩 경로를 제공할 수 있습니다:

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // UserHome은 /user/:id 가 매칭되면
      // User의 <router-view> 안에서 렌더링됩니다.
      { path: '', component: UserHome },

      // ...다른 자식 라우트
    ],
  },
]
```

이 예제의 데모는 [여기](https://codesandbox.io/s/nested-views-vue-router-4-examples-hl326?initialpath=%2Fusers%2Feduardo)에서 확인할 수 있습니다.

## 중첩된 네임드 라우트 %{#Nested-Named-Routes}%

[네임드 라우트](./named-routes.md)를 다룰 때, 일반적으로 **자식 라우트에 이름을 지정**합니다:

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    // 자식만 네임드 라우트라는 점에 주목하세요.
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

이렇게 하면 `/user/:id`로 이동할 때 항상 중첩된 라우트가 표시됩니다.

어떤 상황에서는 중첩된 라우트로 이동하지 않고 네임드 라우트로만 이동하고 싶을 수 있습니다. 예를 들어, `/user/:id`로 이동하면서 중첩된 라우트를 표시하지 않으려는 경우입니다. 이 경우, 부모 라우트에도 이름을 지정할 수 있지만, **페이지를 새로고침하면 중첩된 자식 라우트가 항상 표시**된다는 점을 유의해야 합니다. 이는 네임드 라우트 대신 `/users/:id` 경로 탐색으로 간주되기 때문입니다:

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

## 부모 컴포넌트 생략하기 <Badge text="4.1+" /> %{#Omitting-parent-components-}%

라우트 컴포넌트를 중첩할 필요 없이 라우트 간의 부모-자식 관계를 활용할 수도 있습니다. 이는 공통 경로 접두사가 있는 라우트를 그룹화하거나, [각 라우트별 네비게이션 가드](../advanced/navigation-guards#Per-Route-Guard) 또는 [라우트 메타 필드](../advanced/meta)와 같은 고급 기능을 사용할 때 유용합니다.

이를 위해 부모 라우트에서 `component` 및 `components` 옵션을 생략합니다:

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

부모 라우트의 컴포넌트를 지정하지 않으면, 최상위 `<router-view>`는 부모를 건너뛰고 관련 자식의 컴포넌트를 대신 사용합니다.
