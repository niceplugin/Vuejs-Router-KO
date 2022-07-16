# 네비게이션 가드 {#navigation-guards}

네비게이션 가드는 주로 탐색을 리디렉션하거나 취소하여, 탐색을 막는데 사용됩니다.
경로 탐색 프로세스에 가드를 연결하는 방법으로는 "전역", "경로별", "컴포넌트 내부"가 있습니다.

## 전역: 비포 가드 {#global-before-guards}

라우터 인스턴스의 `beforeEach()` 메서드에 콜백 함수를 전달하여,
"비포(탐색 전) 가드"를 전역으로 등록할 수 있습니다:

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 탐색을 취소하려면 명시적으로 false를 반환해야 함.
  return false
})
```

탐색이 트리거 될 때마다 등록 순서대로 "전역 비포 가드"가 호출됩니다.
가드는 비동기식으로 해결될 수 있으며,
탐색은 모든 훅이 해결되기 전까지 **대기 중**(pending)으로 간주합니다.

모든 가드 함수는 두 개의 인자를 받습니다:

- **`to`**: 탐색 될 [경로 위치 객체](/api/#routelocationnormalized)
- **`from`**: 탐색 전 현재 [경로 위치 객체](/api/#routelocationnormalized)

그리고 선택적으로 다음 값 중 하나를 반환할 수 있습니다:

- `false`: 현재 탐색을 취소합니다.
  URL이 변경된 경우,
  `from` 경로로 URL이 재설정됩니다.
- [경로 위치 정보](/api/#routelocationraw):
  [`router.push()`](/api/#push)를 사용할 때처럼 경로 위치(문자열 또는 객체)를 전달합니다.
  현재 탐색이 중단되고, 기존 `from` 위치에서 새로운 탐색 동작이 생성됩니다.

  ```js
  router.beforeEach(async (to, from) => {
    if (
      // 유저 로그인 인증여부 확인
      !isAuthenticated &&
      // ❗ 무한 리디렉션 방지
      to.name !== 'Login'
    ) {
      // 유저를 로그인 페이지로 리디렉션
      return { name: 'Login' }
    }
  })
  ```

예외 상황 시 `Error`를 던질 수도 있습니다.
이 경우에도 탐색은 취소되고 [`router.onError()`](/api/#onerror) 메서드에 전달돼 등록된 모든 콜백 함수를 호출합니다.

`undefined`, `true` 또는 아무것도 반환되지 않으면,
**탐색이 유효**하다고 판단하고 다음 탐색 가드가 호출됩니다.

위의 모든 설명은 **`async` 함수** 및 `Promise`에서 동일한 방식으로 작동합니다:

```js
router.beforeEach(async (to, from) => {
  // canUserAccess()는 `true` 또는 `false` 중 하나를 리턴함
  const canAccess = await canUserAccess(to)
  if (!canAccess) return '/login'
})
```

### 선택적 세 번째 인자 `next` {#optional-third-argument-next}

Vue Router의 이전 버전에서는 세 번째 인자 `next`를 사용할 수도 있었는데,
이는 일반적인 실수의 원인이었으며,
[RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation)를 이유로 제거했습니다.
그러나 여전히 지원되므로 탐색 가드에서 세 번째 인자를 전달받을 수 있습니다.
이 경우, 트리거 되는 탐색 가드별 정확히 한 번만 `next`를 호출해야 합니다.
그렇지 않으면 영원히 훅이 해결되지 않거나 오류가 생깁니다.

다음은 인증되지 않은 사용자를 `/login`으로 리디렉션하는 **나쁜 예제**입니다:

```js
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 사용자가 인증되지 않은 경우, `next`가 두 번 호출됨
  next()
})
```

올바른 예제:

```js
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

## 전역: 리졸브(resolve) 가드 {#global-resolve-guards}

`router.beforeResolve`로 전역 가드를 등록할 수 있습니다.
이것은 **모든 탐색**에서 트리거되기 때문에 `router.beforeEach`와 유사하지만,
**컴포넌트 내 가드 및 비동기 경로 컴포넌트가 모두 해결된 후**, 최종적으로 탐색을 진행 할 것인지 결정하기 위한 목적으로 호출합니다.
다음은 [사용자 정의 메타를 정의한](meta.md) 속성 `requiresCamera`가 있는 경로에 대해,
사용자가 카메라에 접근 권한을 부여했는지 확인하는 예입니다:

```js
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 오류를 처리한 다음 탐색을 취소합니다.
        return false
      } else {
        // 예기치 않은 오류, 탐색을 취소하고 오류를 전역 핸들러에 전달
        throw error
      }
    }
  }
})
```

유저가 페이지에 접근할 수 없는 경우,
`router.beforeResolve`는 이것을 처리하기 위해 데이터를 가져오거나 다른 작업을 실행하기에 이상적인 곳입니다. 

<!-- TODO: how to combine with [`meta` fields](./meta.md) to create a [generic fetching mechanism](#TODO). -->

## 전역: 탐색 후 훅 {#global-after-hooks}

전역으로 탐색 후 훅을 등록할 수도 있지만,
가드와 달리 `next` 함수를 전달받지 않으며 탐색에 영향을 줄 수 없습니다:

```js
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})
```

<!-- TODO: maybe add links to examples -->

애널리틱스, 페이지 `<title>` 변경, 페이지 정보를 알리는 접근성 기능 및 기타 여러 작업에 유용하며,
탐색 실패를 세 번째 인자로 전달합니다:

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

참고: [가이드 - 탐색 실패](navigation-failures.md)

## 경로 별 가드 {#per-route-guard}

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

Note it is possible to achieve a similar behavior by using [route meta fields](meta.md) and [global navigation guards](#global-before-guards).

## 컴포넌트 내부 가드 {#in-component-guards}

Finally, you can directly define route navigation guards inside route components (the ones passed to the router configuration)

### 옵션 API 사용 {#using-the-options-api}

You can add the following options to route components:

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```js
const UserDetails = {
  template: `...`,
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

### 컴포지션 API 사용 {#using-the-composition-api}

If you are writing your component using the [composition API and a `setup` function](https://v3.vuejs.org/guide/composition-api-setup.html#setup), you can add update and leave guards through `onBeforeRouteUpdate` and `onBeforeRouteLeave` respectively. Please refer to the [Composition API section](composition-api.md#navigation-guards) for more details.

## 전체적인 탐색 흐름 {#the-full-navigation-resolution-flow}

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
