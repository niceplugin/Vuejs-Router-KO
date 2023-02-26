# 동적 라우팅 %{#dynamic-routing}%

라우터에 경로를 추가하는 것은 일반적으로 [`routes` 옵션](/api/interfaces/RouterOptions.md#routes)을 통해 이루어지지만,
어떤 상황에서는 앱이 이미 실행 중인 경우에도 경로를 추가하거나 제거하고 싶을 수 있습니다.
[Vue CLI UI](https://cli.vuejs.org/dev-guide/ui-api.html)와 같은 확장 가능한 인터페이스가 있는 앱은,
이를 사용하여 앱을 확장할 수 있습니다.

## 경로 추가하기 %{#adding-routes}%

동적 라우팅은 주로 `router.addRoute()`와 `router.removeRoute()` 두 개의 함수로 구현됩니다.
이것들은 새 경로만 등록하므로,
새로 추가된 경로가 현재 위치와 일치하는 경우,
새 경로를 표시하려면 `router.push()` 또는 `router.replace()`를 사용하여 **수동으로 탐색**해야 합니다.

다음은 라우터에 하나의 단일 경로만 있다고 가정해 봅시다:

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:articleName', component: Article }],
})
```

모든 페이지 `/about`, `/store`, `/3-tricks-to-improve-your-routing-code`가 결국 `Article` 컴포넌트를 렌더링합니다.
우리가 `/about`에 있고 새 경로를 추가하는 경우:

```js
router.addRoute({ path: '/about', component: About })
```

하지만 페이지는 여전히 `Article` 컴포넌트가 표시됩니다.
수동으로 `router.replace()`를 호출하여(푸쉬를 사용하면 히스토리에 기록되므로),
현재 위치를 교체 변경해야 합니다:

```js
router.addRoute({ path: '/about', component: About })
// `router.currentRoute.value` 대신,
// `this.$route`나 `const route = userRoute()`를 사용해도 됨.
router.replace(router.currentRoute.value.fullPath)
```

새 경로가 표시될 때까지 기다려야 하는 경우, `await router.replace()`할 수 있음을 기억합시다.

## 네비게이션 가드 내부에서 경로 추가하기 %{#adding-routes-inside-navigation-guards}%

네비게이션 가드 내부에서 경로를 추가하거나 제거하기로 결정했다면,
`router.replace()`를 호출하지 말고 새 위치를 반환하는 리디렉션을 트리거해야 합니다:

```js
router.beforeEach(to => {
  if (!hasNecessaryRoute(to)) {
    router.addRoute(generateRoute(to))
    // 리디렉션 트리거
    return to.fullPath
  }
})
```

위의 예는 두 가지를 가정합니다:
1. 새로 추가된 경로 레코드는 `to` 경로와 일치하지만,
  실제로 접근하려는 위치가 새로 추가된 경로 위치와 다름.
2. `hasNecessaryRoute()`는 무한 리디렉션을 방지하기 위해, 새 경로 추가 후에는 `false` 반환.

탐색을 대체하는 방식으로 리디렉션 하는 것으로,
앞서 설명한 `router.replace()` 예제와 같은 동작입니다.

실제 시나리오에서는 네비게이션 가드 외부에서 뷰 컴포넌트가 마운트되면,
이러한 동작을 처리해야 할 수도 있습니다.

## 경로 제거하기 %{#removing-routes}%

존재하는 경로를 제거하는 몇 가지 방법이 있습니다:

- 같은 `name`을 가지는 경로를 추가합니다.
  `name`이 중복될 경우,
  기존 경로를 제거한 후에 경로를 추가합니다.
  ```js
  router.addRoute({ path: '/about', name: 'about', component: About })
  // name 값이 동일하므로 이전에 추가한 경로가 제거됨.
  router.addRoute({ path: '/other', name: 'about', component: Other })
  ```
- `router.addRoute()`가 반환한 콜백을 호출:
  ```js
  const removeRoute = router.addRoute(routeRecord)
  removeRoute() // 경로가 존재하는 경우 제거함.
  ```
  `name`이 없는 경로일 경우에 유용합니다.
- `router.removeRoute()`에 `name` 문자열을 인자로 전달해 경로를 제거합니다.
  ```js
  router.addRoute({ path: '/about', name: 'about', component: About })
  router.removeRoute('about') // 경로를 제거함.
  ```
  경로의 `name`에 `Symbol`을 사용하면, 경로간 `name`의 충돌을 피할 수 있습니다.

경로가 제거되면 **모든 별칭과 자식**도 함께 제거됩니다.

## 중첩 경로 추가하기 %{#adding-nested-routes}%

중첩된 경로를 기존 경로에 추가하려면,
경로의 `name`을 첫 번째 파라미터로 `router.addRoute()`에 전달할 수 있습니다.
그러면 경로가 `children`을 통해 추가된 것처럼 간편하게 추가됩니다:

```js
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
router.addRoute('admin', { path: 'settings', component: AdminSettings })
```

이것은 다음과 동일합니다:

```js
router.addRoute({
  name: 'admin',
  path: '/admin',
  component: Admin,
  children: [{ path: 'settings', component: AdminSettings }],
})
```

## 존재하는 경로 찾기 %{#looking-at-existing-routes}%

Vue Router는 존재하는 경로를 찾아볼 수 있도록,
두 개의 함수를 제공합니다:

- [`router.hasRoute()`](/api/interfaces/Router.md#Methods-hasRoute): 경로 이름을 인자로 전달하여 경로가 존재하는지 확인.
- [`router.getRoutes()`](/api/interfaces/Router.md#Methods-getRoutes): 모든 경로 레코드를 배열로 반환.
