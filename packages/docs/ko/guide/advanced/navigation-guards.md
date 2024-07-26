# 네비게이션 가드 %{#Navigation-Guards}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/route-guards"
  title="Learn how to add navigation guards"
/>

이름에서 알 수 있듯이, Vue 라우터가 제공하는 네비게이션 가드는 주로 탐색을 리다이렉션하거나 취소하여 탐색을 보호하는 데 사용됩니다. 라우트 탐색 프로세스에서 훅을 거는 방법에는 "전역", "각 라우트별", "컴포넌트 내"가 있습니다.

## 전역 비포 가드 %{#Global-Before-Guards}%

전역 비포 가드는 `router.beforeEach`를 사용하여 등록할 수 있습니다:

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 탐색을 취소하려면 명시적으로 false를 반환합니다.
  return false
})
```

탐색이 트리거되면 전역 비포 가드는 생성된 순서대로 호출됩니다. 가드는 비동기적으로 처리될 수 있으며, 모든 훅이 처리되기 전까지 탐색은 **대기 중**(pending)으로 간주됩니다.

각 가드 함수는 두 개의 인자를 받습니다:

- **`to`**: 이동할 대상 라우트 위치 [정규화된 형식으로](../../api/#RouteLocationNormalized).
- **`from`**: 현재 라우트 위치 [정규화된 형식으로](../../api/#RouteLocationNormalized).

그리고 선택적으로 다음 값 중 하나를 반환할 수 있습니다:

- `false`: 현재 탐색을 취소합니다. 브라우저 URL이 변경된 경우(유저가 수동으로 변경했거나 뒤로 가기 버튼을 통해 변경한 경우), `from` 라우트의 URL로 재설정됩니다.
- [라우트 주소](../../api/#RouteLocationRaw): `router.push()`를 호출할 때처럼 라우트 위치를 전달하여 다른 위치로 리다이렉션합니다. 이 경우 `replace: true` 또는 `name: 'home'`과 같은 옵션을 전달할 수 있습니다. 현재 탐색을 중단하고 동일한 `from`으로 새 탐색을 생성합니다.

  ```js
  router.beforeEach(async (to, from) => {
    if (
      // 인증된 유저인지 확인.
      !isAuthenticated &&
      // ❗️ 무한 리디렉션 방지.
      to.name !== 'Login'
    ) {
      // 유저를 로그인 페이지로 리다이렉션.
      return { name: 'Login' }
    }
  })
  ```

예상치 못한 상황이 발생하면 `Error`를 던질 수도 있습니다. 이 경우에도 탐색이 취소되며, [`router.onError()`](../../api/interfaces/Router.md#onError)를 통해 등록된 콜백이 호출됩니다.

아무것도 반환하지 않거나, `undefined` 또는 `true`를 반환하면 **탐색이 유효**하며, 다음 네비게이션 가드가 호출됩니다.

위의 모든 사항은 **`async` 함수 및 Promise에서도 동일하게 작동**합니다:

```js
router.beforeEach(async (to, from) => {
  // canUserAccess()는 `true` 또는 `false`를 반환합니다.
  const canAccess = await canUserAccess(to)
  if (!canAccess) return '/login'
})
```

### 선택적 세 번째 인자 `next` %{#Optional-third-argument-next}%

In previous versions of Vue Router, it was also possible to use a _third argument_ `next`, this was a common source of mistakes and went through an [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation) to remove it. However, it is still supported, meaning you can pass a third argument to any navigation guard. In that case, **you must call `next` exactly once** in any given pass through a navigation guard. It can appear more than once, but only if the logical paths have no overlap, otherwise the hook will never be resolved or produce errors. Here is **a bad example** of redirecting the user to `/login` if they are not authenticated:
이전 버전의 Vue Router에서는 *세 번째 인자* `next`를 사용할 수 있었습니다. 이는 일반적인 실수의 원인이 되었고, 이를 제거하기 위한 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation)가 진행되었습니다. 그러나 여전히 지원되므로 네비게이션 가드에서 세 번째 인자를 전달 받을 수 있습니다. 이 경우, **네비게이션 가드를 통과할 때 `next`를 정확히 한 번 호출해야 합니다**. `next`는 여러 번 나타날 수 있지만, 논리 경로가 중복되지 않는 경우에만 가능합니다. 그렇지 않으면 훅이 절대 해결되지 않거나 오류가 발생합니다. 다음은 유저가 인증되지 않은 경우 `/login`으로 리다이렉션하는 **잘못된 예제**가 있습니다:

```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 사용자가 인증되지 않은 경우, `next`가 두 번 호출됩니다.
  next()
})
```

올바른 예제는 다음과 같습니다:

```js
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

## 전역 리졸브 가드 %{#Global-Resolve-Guards}%

You can register a global guard with `router.beforeResolve`. This is similar to `router.beforeEach` because it triggers on **every navigation**, but resolve guards are called right before the navigation is confirmed, **after all in-component guards and async route components are resolved**. Here is an example that ensures the user has given access to the Camera for routes that [have defined a custom meta](./meta.md) property `requiresCamera`:

```js
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... handle the error and then cancel the navigation
        return false
      } else {
        // unexpected error, cancel the navigation and pass the error to the global handler
        throw error
      }
    }
  }
})
```

`router.beforeResolve` is the ideal spot to fetch data or do any other operation that you want to avoid doing if the user cannot enter a page.

<!-- TODO: how to combine with [`meta` fields](./meta.md) to create a [generic fetching mechanism](#TODO). -->

## 전역 애프터 훅 %{#Global-After-Hooks}%

You can also register global after hooks, however unlike guards, these hooks do not get a `next` function and cannot affect the navigation:

```js
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})
```

<!-- TODO: maybe add links to examples -->

They are useful for analytics, changing the title of the page, accessibility features like announcing the page and many other things.

They also reflect [navigation failures](./navigation-failures.md) as the third argument:

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

Learn more about navigation failures on [its guide](./navigation-failures.md).

## 가드에 전역 종속성 제공 %{#Global-injections-within-guards}%

Since Vue 3.3, it is possible to use `inject()` within navigation guards. This is useful for injecting global properties like the [pinia stores](https://pinia.vuejs.org). Anything that is provided with `app.provide()` is also accessible within `router.beforeEach()`, `router.beforeResolve()`, `router.afterEach()`:

```ts
// main.ts
const app = createApp(App)
app.provide('global', 'hello injections')

// router.ts or main.ts
router.beforeEach((to, from) => {
  const global = inject('global') // 'hello injections'
  // a pinia store
  const userStore = useAuthStore()
  // ...
})
```

## 라우트별 가드 %{#Per-Route-Guard}%

You can define `beforeEnter` guards directly on a route's configuration object:

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

`beforeEnter` guards **only trigger when entering the route**, they don't trigger when the `params`, `query` or `hash` change e.g. going from `/users/2` to `/users/3` or going from `/users/2#info` to `/users/2#projects`. They are only triggered when navigating **from a different** route.

You can also pass an array of functions to `beforeEnter`, this is useful when reusing guards for different routes:

```js
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```

When working with [nested routes](../essentials/nested-routes), both parent and child routes can use `beforeEnter`. When placed on a parent route, it won't be triggered when moving between children with that same parent. For example:

```js
const routes = [
  {
    path: '/user',
    beforeEnter() {
      // ...
    },
    children: [
      { path: 'list', component: UserList },
      { path: 'details', component: UserDetails },
    ],
  },
]
```

The `beforeEnter` in the example above won't be called when moving between `/user/list` and `/user/details`, as they share the same parent. If we put the `beforeEnter` guard directly on the `details` route instead, that would be called when moving between those two routes.

::: tip
It is possible to achieve similar behavior to per-route guards by using [route meta fields](./meta) and global navigation guards.
:::

## 컴포넌트 내 가드 %{#In-Component-Guards}%

Finally, you can directly define route navigation guards inside route components (the ones passed to the router configuration)

### Options API 사용하기 %{#Using-the-Options-API}%

You can add the following options to route components:

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```vue
<script>
export default {
  beforeRouteEnter(to, from) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
  beforeRouteUpdate(to, from) {
    // called when the route that renders this component has changed, but this component is reused in the new route.
    // For example, given a route with params `/users/:id`, when we navigate between `/users/1` and `/users/2`,
    // the same `UserDetails` component instance will be reused, and this hook will be called when that happens.
    // Because the component is mounted while this happens, the navigation guard has access to `this` component instance.
  },
  beforeRouteLeave(to, from) {
    // called when the route that renders this component is about to be navigated away from.
    // As with `beforeRouteUpdate`, it has access to `this` component instance.
  },
}
</script>
```

The `beforeRouteEnter` guard does **NOT** have access to `this`, because the guard is called before the navigation is confirmed, thus the new entering component has not even been created yet.

However, you can access the instance by passing a callback to `next`. The callback will be called when the navigation is confirmed, and the component instance will be passed to the callback as the argument:

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // access to component public instance via `vm`
  })
}
```

Note that `beforeRouteEnter` is the only guard that supports passing a callback to `next`. For `beforeRouteUpdate` and `beforeRouteLeave`, `this` is already available, so passing a callback is unnecessary and therefore _not supported_:

```js
beforeRouteUpdate (to, from) {
  // just use `this`
  this.name = to.params.name
}
```

The **leave guard** is usually used to prevent the user from accidentally leaving the route with unsaved edits. The navigation can be canceled by returning `false`.

```js
beforeRouteLeave (to, from) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
}
```

### Composition API 사용하기 %{#Using-the-Composition-API}%

If you are writing your component using the Composition API, you can add update and leave guards through `onBeforeRouteUpdate` and `onBeforeRouteLeave` respectively. Please refer to the [Composition API section](./composition-api.md#navigation-guards) for more details.

## 전체적인 탐색 처리 과정 %{#The-Full-Navigation-Resolution-Flow}%

1. Navigation triggered.
2. Call `beforeRouteLeave` guards in deactivated components.
3. Call global `beforeEach` guards.
4. Call `beforeRouteUpdate` guards in reused components.
5. Call `beforeEnter` in route configs.
6. Resolve async route components.
7. Call `beforeRouteEnter` in activated components.
8. Call global `beforeResolve` guards.
9. Navigation is confirmed.
10. Call global `afterEach` hooks.
11. DOM updates triggered.
12. Call callbacks passed to `next` in `beforeRouteEnter` guards with instantiated instances.
