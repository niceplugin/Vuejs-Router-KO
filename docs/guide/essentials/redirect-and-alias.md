# 리디렉션과 별칭 %{#redirect-and-alias}%

<VueSchoolLink
href="https://vueschool.io/lessons/vue-router-4-redirect-and-alias"
title="Learn how to use redirect and alias"
/>

## 리디렉션 %{#redirect}%

리디렉션은 `routes` 설정 시 정의할 수도 있습니다. `/home`에서 `/`로 리디렉션하려면:

```js
const routes = [{ path: '/home', redirect: '/' }]
```

리디렉션은 이름이 있는 라우트로 설정할 수도 있습니다:

```js
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

또는 함수를 사용하여 동적 리디렉션을 구현할 수도 있습니다:

```js
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 함수는 이동하려 했던 라우트(/search/:searchText) 객체를 인자로 받음.
      // 반환 값: 리디렉션 될 라우트 문자열 또는 위치 정보 객체.
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

**[네비게이션 가드](../advanced/navigation-guards.md)는 리디렉션이 정의된 라우트에는 적용되지 않습니다**. 예를 들어 위의 예에서 `/home` 라우트에 `beforeEnter` 가드를 추가해도 아무런 효과가 없습니다.

`redirect`를 정의한 경우, `component` 옵션을 생략할 수 있습니다. 이는 해당 라우트에는 도달할 수 없으므로 렌더링할 컴포넌트가 없기 때문입니다. 단, [중첩된 라우트](nested-routes.md)를 사용하는 경우에는 예외입니다. 라우트에 `children`과 `redirect` 속성이 있으면 `component` 속성도 있어야 합니다.

### 상대적인 리디렉션 %{#relative-redirecting}%

상대적인 위치로 리디렉션할 수도 있습니다:

```js
const routes = [
  {
    // 항상 /users/123/posts 는 /users/:id/profile 로 리디렉트 됨.
    path: '/users/:id/posts',
    redirect: to => {
      // 이 함수는 인자로 이동하려 했던 라우트를 수신하며,
      // 아래 반환 문자열은 상대 위치가 `/` 또는
      // { path: 'profile' } 로 시작되지 않음.
      return 'profile'
    },
  },
]
```

## 별칭 %{#alias}%

리디렉션은 사용자가 `/home`을 방문할 때 URL이 `/keys`로 대체되어 `/keys`로 매칭됨을 의미합니다. 하지만 별칭이란 무엇일까요?

**`/`의 별칭이 `/home`일 경우, `/home`을 방문할 때 URL이 `/home`으로 유지되지만, `/`를 방문한 것과 동일하다는 의미입니다.**

이 라우트는 다음과 같이 구성할 수 있습니다:

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

별칭을 사용하면 중첩 구조 구성에 제약을 받는 대신, UI 구조를 임의의 URL에 자유롭게 매핑할 수 있습니다. 중첩 라우트에 절대 라우트를 추가하려면, `/`로 시작하는 별칭을 정의합니다. 여러 개의 별칭을 배열로 정의할 수도 있습니다:

```js
const routes = [
  {
    path: '/users/:id',
    component: UsersLayout,
    children: [
      // 아래 3 개의 URL에 해당하면 UserList가 렌더링 됨.
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserList, alias: ['/:id', ''] },
    ],
  },
]
```

라우트에 파라미터가 있는 경우, 절대 라우트 별칭에 파라미터를 포함해야 합니다:

```js
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 아래 3 개의 URL에 해당하면 UserDetails가 렌더링 됨.
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```

참고: 별칭을 사용할 경우 SEO 최적화를 위한 [표준 링크 정의](https://support.google.com/webmasters/answer/139066?hl=en)
