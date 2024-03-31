# 활성 링크 %{#Active-links}%

응용 프로그램에는 RouterLink 컴포넌트 목록을 렌더링하는 탐색 구성 요소가 있을 수 있습니다. 그 목록에서 현재 활성 경로와 다른 경로에 대해 스타일이 다르게 적용된 링크를 스타일링할 수 있습니다.

RouterLink 컴포넌트는 활성 링크에 `router-link-active` 및 `router-link-exact-active` 두 가지 CSS 클래스를 추가합니다. 그 차이점을 이해하려면 먼저 Vue Router가 링크가 _활성_ 상태임을 어떻게 결정하는지 고려해야 합니다.

## 링크가 활성 상태인 경우 %{#When-are-links-active-}%

RouterLink는 다음과 같은 경우 ***활성*** 상태로 간주됩니다:

1. 현재 위치와 동일한 라우트 기록(즉, 구성된 라우트)과 일치합니다.
2. 현재 위치와 동일한 `params` 값을 갖습니다.

[중첩 라우트](./nested-routes)를 사용하는 경우 관련 `params`가 일치하면 조상 라우트로의 모든 링크도 활성 상태로 간주됩니다.

[`query`](../../api/interfaces/RouteLocationNormalized#query)와 같은 다른 라우트 속성은 고려되지 않습니다.

경로가 완벽하게 일치할 필요는 없습니다. 예를 들어, [`alias`](./redirect-and-alias#Alias)를 사용하는 경우 동일한 라우트 기록 및 `params`로 해결되는 한 여전히 일치로 간주됩니다.

라우트에 [`redirect`](./redirect-and-alias#Redirect)가 있으면 링크가 활성 상태인지 확인할 때 따르지 않습니다.

## 정확히 활성화된 링크 %{#Exact-active-links}%

***정확한*** 일치에는 조상 라우트가 포함되지 않습니다.

다음과 같은 라우트가 있는 경우를 상상해 보세요:

```js
const routes = [
  {
    path: '/user/:username',
    component: User,
    children: [
      {
        path: 'role/:roleId',
        component: Role,
      }
    ]
  }
]
```

그런 다음 이 두 링크를 고려해 보세요:

```vue-html
<RouterLink to="/user/erina">
  User
</RouterLink>
<RouterLink to="/user/erina/role/admin">
  Role
</RouterLink>
```

현재 위치 경로가 `/user/erina/role/admin`이면 두 링크 모두 _활성_ 상태로 간주되어 두 링크에 `router-link-active` 클래스가 적용됩니다. 하지만 두 번째 링크만 _정확한_ 상태로 간주되어 두 번째 링크에만 `router-link-exact-active` 클래스가 적용됩니다.

## 클래스 구성 %{#Configuring-the-classes}%

RouterLink 컴포넌트에는 적용되는 클래스의 이름을 변경하는 데 사용할 수 있는 `activeClass` 및 `exactActiveClass` 두 가지 속성이 있습니다:

```vue-html
<RouterLink
  activeClass="border-indigo-500"
  exactActiveClass="border-indigo-700"
  ...
>
```

기본 클래스 이름은 `createRouter()`에 `linkActiveClass` 및 `linkExactActiveClass` 옵션을 전달하여 전역으로 변경할 수도 있습니다:

```js
const router = createRouter({
  linkActiveClass: 'border-indigo-500',
  linkExactActiveClass: 'border-indigo-700',
  // ...
})
```

더 고급 사용자 정의 기술에 대해서는 [RouterLink 확장](../advanced/extending-router-link)을 참조하십시오.
