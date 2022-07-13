# 리디렉션과 별칭 {#redirect-and-alias}

## 리디렉션 {#redirect}

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
      // 함수는 이동할 경로를 인자로 받음.
      
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

### 상대적인 리디렉션 {#relative-redirecting}

상대적인 위치로 리디렉션할 수도 있습니다:

상대 경로 오작동 이슈 있음 =============================================

```js
const routes = [
  {
    // 항상 리디렉션 됨: /users/123/posts -> /users/123/profile
    path: '/users/:id/posts',
    redirect: to => {
      // 함수는 이동할 경로를 인자로 받음.
      // a relative location doesn't start with `/`
      // or { path: 'profile'}
      return 'profile'
    },
  },
]
```

## 별칭 {#alias}

A redirect means when the user visits `/home`, the URL will be replaced by `/`, and then matched as `/`. But what is an alias?

**An alias of `/` as `/home` means when the user visits `/home`, the URL remains `/home`, but it will be matched as if the user is visiting `/`.**

The above can be expressed in the route configuration as:

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

An alias gives you the freedom to map a UI structure to an arbitrary URL, instead of being constrained by the configuration's nesting structure. Make the alias start with a `/` to make the path absolute in nested routes. You can even combine both and provide multiple aliases with an array:

```js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // this will render the UserList for these 3 URLs
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

If your route has parameters, make sure to include them in any absolute alias:

```js
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // this will render the UserDetails for these 3 URLs
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```

**Note about SEO**: when using aliases, make sure to [define canonical links](https://support.google.com/webmasters/answer/139066?hl=en).
