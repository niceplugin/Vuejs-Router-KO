# 리다이렉션 및 별칭 %{#Redirect-and-Alias}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/vue-router-4-redirect-and-alias"
  title="Learn how to use redirect and alias"
/>

## 리다이렉션 %{#Redirect}%

리다이렉션은 `routes` 구성을 통해서도 실행됩니다. `/home`에서 `/`로 리다이렉션하려면 다음과 같이 합니다:

```js
const routes = [{ path: '/home', redirect: '/' }]
```

리다이렉션은 네임드 라우트를 대상으로 할 수도 있습니다:

```js
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

또는 동적 리다이렉션을 위해 함수를 사용할 수도 있습니다:

```js
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 함수는 대상 라우트를 인자로 받습니다.
      // 여기서 리다이렉션 경로/위치가 반환됩니다.
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

참고로 **[네비게이션 가드](../advanced/navigation-guards.md)는 리다이렉션하는 라우트가 아닌 대상 라우트에만 적용됩니다**. 예를 들어 위의 예시에서 `/home` 라우트에 `beforeEnter` 가드를 추가해도 아무런 효과가 없습니다.

`redirect`를 작성할 때는 직접적으로 도달하는 컴포넌트가 없으므로 `component` 옵션을 생략할 수 있습니다. 단, [중첩된 라우트](./nested-routes.md)의 경우는 예외입니다. 라우트 레코드에 `children`과 `redirect` 프로퍼티가 있는 경우 `component` 프로퍼티도 포함되어야 합니다.

### 상대적인 리다이렉션 %{#Relative-redirecting}%

상대 위치로 리다이렉션하는 것도 가능합니다.

```js
const routes = [
  {
    // 항상 /users/123/posts 를 /users/123/profile 로 리다이렉션합니다.
    path: '/users/:id/posts',
    redirect: to => {
      // 이 함수는 대상 라우트를 인자로 받습니다.
      // 상대 경로는 `/`로 시작하지 않으며,
      // `{ path: 'profile' }` 형태로 작성합니다.
      return 'profile'
    },
  },
]
```

## 별칭 (alias) %{#Alias}%

리다이렉션은 유저가 `/home`에 방문하면 URL이 `/`로 대체되고, `/`로 매칭되는 것을 의미합니다. 그렇다면 별칭이란 무엇일까요?

**`/`를  `/home`의 별칭으로 구성하면, 유저가 `/home`에 방문했을 때 URL은 여전히 `/home`이지만 유저가 `/`를 방문한 것처럼 매칭됩니다.**

위의 내용은 다음과 같이 라우트를 구성하는 것과 같습니다:

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

별칭을 사용하면 중첩 구조 구성에 구애받지 않고 임의의 URL에 UI 구조를 자유롭게 매핑할 수 있습니다. 별칭을 `/`로 시작하면 중첩된 라우트에서 경로를 절대 경로로 만들 수 있습니다. 여러 별칭을 배열로 제공하여 결합할 수도 있습니다:

```js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 다음 3개의 URL은 UserList 로 렌더링됩니다.
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

라우트에 파라미터가 있는 경우, 반드시 별칭에 파라미터를 포함해야 합니다:

```js
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 다음 3개의 URL은 `UserDetails` 로 렌더링됩니다.
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```

**SEO 참고 사항**: 별칭을 사용할 때 반드시 [정규 링크(canonical links)](https://support.google.com/webmasters/answer/139066?hl=ko)를 정의해야 합니다.
