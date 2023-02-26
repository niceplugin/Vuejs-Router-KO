# 리디렉션과 별칭 %{#redirect-and-alias}%

## 리디렉션 %{#redirect}%

리디렉션은 `routes` 설정 시 정의할 수도 있습니다.
`/home`에서 `/`로 리디렉션하려면:

```js
const routes = [{ path: '/home', redirect: '/' }]
```

리디렉션은 이름이 있는 경로로 설정할 수도 있습니다:

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
      // 함수는 이동하려 했던 경로(/search/:searchText) 객체를 인자로 받음.
      
      // 반환 값: 리디렉션 될 경로 문자열 또는 위치 정보 객체.
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

**[네비게이션 가드](../advanced/navigation-guards.md)는 리디렉션이 정의된 경로에는 적용되지 않습니다**.
예를 들어 위의 예에서 `/home` 경로에 `beforeEnter` 가드를 추가해도 아무런 효과가 없습니다.

`redirect`를 정의한 경우, `component` 옵션을 생략할 수 있습니다.
이는 해당 경로에는 도달할 수 없으므로 렌더링할 컴포넌트가 없기 때문입니다.
단, [중첩된 경로](nested-routes.md)를 사용하는 경우에는 예외입니다.
경로에 `children`과 `redirect` 속성이 있으면 `component` 속성도 있어야 합니다.

### 상대적인 리디렉션 %{#relative-redirecting}%

상대적인 위치로 리디렉션할 수도 있습니다:

```js
const routes = [
  { path: '/hello/awesome/html' },
  {
    // "/hello/awesome/html"에서
    // "/users/:id/posts"로 경로 변경을 시도하면,
    path: '/users/:id/posts',
    redirect: to => {
      // 함수는 이동하려 했던 경로(/users/:id/posts) 객체를 인자로 받음.

      // 리디렉션 됨: "/hello/awesome/vue"
      return 'vue'
      
      // 리디렉션 됨: "/hello/awesome/vue"
      return './vue'

      // 리디렉션 됨: "/hello/vue"
      return '../vue'

      // 리디렉션 됨: "/vue"
      return '../../vue'
    },
  },
]
```

## 별칭 %{#alias}%

**`/`의 별칭이 `/home`일 경우,
`/home`을 방문할 때 URL이 `/home`으로 유지되지만,
`/`를 방문한 것과 동일하다는 의미입니다.**

이 경로는 다음과 같이 구성할 수 있습니다:

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

별칭을 사용하면 중첩 구조 구성에 제약을 받는 대신,
UI 구조를 임의의 URL에 자유롭게 매핑할 수 있습니다.
중첩 경로에 절대 경로를 추가하려면,
`/`로 시작하는 별칭을 정의합니다.
여러 개의 별칭을 배열로 정의할 수도 있습니다:

```js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 아래 3 개의 URL에 해당하면 UserList가 렌더링 됨.
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

경로에 파라미터가 있는 경우, 절대 경로 별칭에 파라미터를 포함해야 합니다:

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
