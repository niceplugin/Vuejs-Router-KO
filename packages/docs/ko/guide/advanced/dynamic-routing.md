# 동적 라우팅 %{#Dynamic-Routing}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/vue-router-4-dynamic-routing"
  title="Learn how to add routes at runtime"
/>

라우터에 라우트를 추가하는 것은 일반적으로 `routes` 옵션을 통해 이루어지지만, 애플리케이션이 이미 실행 중인 상황에서 라우트를 추가하거나 제거하고 싶을 때도 있습니다. [Vue CLI UI](https://cli.vuejs.org/dev-guide/ui-api.html)와 같은 확장 가능한 인터페이스를 가진 애플리케이션은 이를 사용하여 애플리케이션을 확장할 수 있습니다.

## 라우트 추가하기 %{#Adding-routes}%

동적 라우팅은 주로 `router.addRoute()`와 `router.removeRoute()` 두 가지 함수를 통해 이루어집니다. 이 함수들은 **오직** 새로운 라우트를 등록할 뿐이며, 새로 추가된 라우트가 현재 위치와 일치하더라도 그 새로운 라우트를 표시하기 위해서는 `router.push()`나 `router.replace()`를 사용하여 **수동으로 이동**해야 합니다. 예제를 통해 살펴보겠습니다:

다음과 같이 하나의 라우트만 있는 라우터가 있다고 가정해봅시다:

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:articleName', component: Article }],
})
```

`/about`, `/store`, `/3-tricks-to-improve-your-routing-code` 같은 페이지로 이동하면 `Article` 컴포넌트가 렌더링됩니다. 우리가 `/about` 페이지에 있고 새로운 라우트를 추가한다고 가정해 봅시다:

```js
router.addRoute({ path: '/about', component: About })
```

페이지는 여전히 `Article` 컴포넌트를 표시할 것입니다. 현재 위치를 변경하고 우리가 있던 위치를 덮어쓰려면 수동으로 `router.replace()`를 호출해야 합니다 (새 항목을 푸쉬하여 히스토리에 동일한 위치가 두 번 기록되는 것을 방지합니다).

```js
router.addRoute({ path: '/about', component: About })
// this.$route 또는 useRoute()를 사용할 수도 있습니다.
router.replace(router.currentRoute.value.fullPath)
```

새 라우트가 표시될 때까지 기다려야 하는 경우 `await router.replace()`를 사용할 수 있다는 점을 기억하세요.

## 내비게이션 가드에서 라우트 추가하기 %{#Adding-routes-inside-navigation-guards}%

라우트 내비게이션 가드 내부에서 라우트를 추가하거나 제거하려는 경우, `router.replace()`를 호출하지 말고 새로운 위치를 반환하여 리다이렉션을 트리거해야 합니다:

```js
router.beforeEach(to => {
  if (!hasNecessaryRoute(to)) {
    router.addRoute(generateRoute(to))
    // 리다이렉션 트리거
    return to.fullPath
  }
})
```

위의 예제는 두 가지를 가정합니다: 첫째, 새로 추가된 라우트 레코드는 `to` 위치와 일치하지만, 최초에 우리가 접근하려고 한 위치와는 다른 위치입니다. 둘째, 새로운 라우트를 추가한 후 `hasNecessaryRoute()`는 `false`를 반환하여 무한 리다이렉션을 피합니다.

리다이렉션을 하기 때문에 진행 중인 탐색을 교체하여 이전 예제와 동일한 방식으로 동작합니다. 실제 상황에서는 뷰 컴포넌트가 마운트될 때 새로운 라우트를 등록하는 등 내비게이션 가드 외부에서 라우트를 추가하는 경우가 더 많습니다.

## 라우트 제거하기 %{#Removing-routes}%

기존 라우트를 제거하는 몇 가지 방법이 있습니다:

- 이름이 중복되는 라우트 추가로 제거하기. 동일한 이름의 라우트를 추가하면 기존 라우트를 먼저 제거한 다음 새 라우트를 추가합니다:

  ```js
  router.addRoute({ path: '/about', name: 'about', component: About })
  // 이 코드는 이전에 추가된 라우트를 제거합니다.
  // 왜냐하면 두 라우트는 이름이 중복되는데, 이름은 모든 라우트에서 고유해야 하기 때문입니다.
  router.addRoute({ path: '/other', name: 'about', component: Other })
  ```

- `router.addRoute()`에서 반환된 콜백을 호출하여 제거하기:

  ```js
  const removeRoute = router.addRoute(routeRecord)
  removeRoute() // 라우트가 존재하면 제거합니다.
  ```

  이 방법은 라우트에 이름이 없는 경우 유용합니다.
- `router.removeRoute()`를 사용하여 이름으로 라우트를 제거하기:

  ```js
  router.addRoute({ path: '/about', name: 'about', component: About })
  // 해당 이름의 라우트를 제거합니다.
  router.removeRoute('about')
  ```

  이 함수를 사용하고 싶지만 이름 중복을 피하고 싶다면 라우트에 `Symbol`을 이름으로 사용할 수 있습니다.

라우트가 제거되면, **해당 라우트의 모든 별칭 및 자식 라우트도 함께 제거됩니다**.

## 중첩된 경로 추가하기 %{#Adding-nested-routes}%

기존 라우트에 중첩 라우트를 추가하려면 `router.addRoute()`의 첫 번째 파라미터로 라우트의 *이름*을 전달할 수 있습니다. 이렇게 하면 마치 `children`을 통해 라우트를 추가한 것처럼 동작합니다:

```js
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
router.addRoute('admin', { path: 'settings', component: AdminSettings })
```

아래와 같습니다:

```js
router.addRoute({
  name: 'admin',
  path: '/admin',
  component: Admin,
  children: [{ path: 'settings', component: AdminSettings }],
})
```

## 기존 라우트 확인하기 %{#Looking-at-existing-routes}%

Vue Router는 기존 라우트를 확인할 수 있는 두 가지 함수를 제공합니다:

- [`router.hasRoute()`](/api/interfaces/Router.md#hasRoute): 라우트가 존재하는지 확인합니다.
- [`router.getRoutes()`](/api/interfaces/Router.md#getRoutes): 모든 라우트 레코드 배열을 가져옵니다.
