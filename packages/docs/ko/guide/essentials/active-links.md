# 활성화된 링크 %{#Active-links}%

애플리케이션에는 `RouterLink` 컴포넌트 리스트를 렌더링하는 내비게이션 컴포넌트가 있는 경우가 많습니다. 이 리스트 내에서 현재 활성화된 라우트 링크를 다른 링크와 다르게 스타일링하고 싶을 수 있습니다.

`RouterLink` 컴포넌트는 활성화된 링크에 `router-link-active`와 `router-link-exact-active`라는 두 개의 CSS 클래스를 추가합니다. 이 둘의 차이를 이해하려면 먼저 Vue Router가 링크를 *활성화됨*으로 판단하는 방식을 고려해야 합니다.

## 링크는 언제 활성화 되나요? %{#When-are-links-active-}%

`RouterLink`가 **_활성화됨_** 으로 간주되는 조건은 다음과 같습니다:

1. 현재 위치와 동일한 라우트 레코드(즉, 구성된 라우트)가 매칭됩니다.
2. 현재 위치와 `params`의 값이 동일합니다.

[중첩된 라우트](./nested-routes)를 사용하는 경우, 관련 `params`가 일치하면 상위 라우트의 링크도 활성화된 것으로 간주됩니다.

[`query`](../../api/interfaces/RouteLocationBase.html#query) 같은 라우트의 다른 프로퍼티는 고려되지 않습니다.

경로가 반드시 완벽하게 일치할 필요는 없습니다. 예를 들어 [`alias`](./redirect-and-alias#Alias)를 사용하는 경우, 동일한 라우트 레코드와 `params`로 확인되기만 하면 매칭된 것으로 간주됩니다.

[`redirect`](./redirect-and-alias#Redirect)가 있는 라우트의 경우, 활성화된 링크가 되지 않습니다.

## 정확히 활성화된 링크 %{#Exact-active-links}%

**_정확한_** 매칭은 상위 라우트를 포함하지 않습니다.

다음과 같은 라우트가 있다고 가정해 보겠습니다:

```js
const routes = [
  {
    path: '/user/:username',
    component: User,
    children: [
      {
        path: 'role/:roleId',
        component: Role,
      },
    ],
  },
]
```

그런 다음 아래 두 링크를 살펴봅시다:

```vue-html
<RouterLink to="/user/erina">
  User
</RouterLink>
<RouterLink to="/user/erina/role/admin">
  Role
</RouterLink>
```

현재 위치 경로가 `/user/erina/role/admin`인 경우, 이 두 링크는 모두 *활성화된* 것으로 간주되어 `router-link-active` 클래스가 두 링크 모두에 적용됩니다. 그러나 두 번째 링크만 *정확한* 것으로 간주되어 `router-link-exact-active` 클래스는 두 번째 링크에만 적용됩니다.

## 클래스 구성 %{#Configuring-the-classes}%

RouterLink 컴포넌트에는 `activeClass`와 `exactActiveClass`라는 두 개의 프로퍼티가 있는데, 이를 사용하여 적용되는 클래스의 이름을 변경할 수 있습니다:

```vue-html
<RouterLink
  activeClass="border-indigo-500"
  exactActiveClass="border-indigo-700"
  ...
>
```

기본 클래스명은 `createRouter()`에 `linkActiveClass` 및 `linkExactActiveClass` 옵션을 전달하여 전역적으로 변경할 수도 있습니다:

```js
const router = createRouter({
  linkActiveClass: 'border-indigo-500',
  linkExactActiveClass: 'border-indigo-700',
  // ...
})
```

더 고급 맞춤화 기술에 대해서는 `v-slot` API를 사용하는 [RouterLink 확장](../advanced/extending-router-link)을 참고하세요.
