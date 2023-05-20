# 네비게이션 가드 %{#navigation-guards}%






네비게이션 가드는 주로 탐색을 리디렉션하거나 취소하여, 탐색을 막는데 사용됩니다. 경로 탐색 프로세스에 가드를 연결하는 방법으로는 "전역", "경로별", "컴포넌트 내부"가 있습니다.

## 전역: 비포 가드 %{#global-before-guards}%

라우터 인스턴스의 `beforeEach()` 메서드에 콜백 함수를 전달하여, "비포(탐색 전) 가드"를 전역으로 등록할 수 있습니다:

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 탐색을 취소하려면 명시적으로 false를 반환해야 함.
  return false
})
```

탐색이 트리거 될 때마다 등록 순서대로 "전역 비포 가드"가 호출됩니다. 가드는 비동기식으로 해결될 수 있으며, 탐색은 모든 훅이 해결되기 전까지 **대기 중**(pending)으로 간주합니다.

모든 가드 함수는 두 개의 인자를 받습니다:

- **`to`**: 탐색 될 [경로 위치 객체](/api/interfaces/RouteLocationNormalized.html)
- **`from`**: 탐색 전 현재 [경로 위치 객체](/api/interfaces/RouteLocationNormalized.html)

그리고 선택적으로 다음 값 중 하나를 반환할 수 있습니다:

- `false`: 현재 탐색을 취소합니다. URL이 변경된 경우, `from` 경로로 URL이 재설정됩니다.
- [경로 위치 정보](/api/#routelocationraw): [`router.push()`](/api/interfaces/Router.md#push)를 사용할 때처럼 경로 위치(문자열 또는 객체)를 전달합니다. 현재 탐색이 중단되고, 기존 `from` 위치에서 새로운 탐색 동작이 생성됩니다.

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

예외 상황 시 `Error`를 던질 수도 있습니다. 이 경우에도 탐색은 취소되고 [`router.onError()`](/api/interfaces/Router.md#onerror) 메서드에 전달돼 등록된 모든 콜백 함수를 호출합니다.

`undefined`, `true` 또는 아무것도 반환되지 않으면, **탐색이 유효**하다고 판단하고 다음 탐색 가드가 호출됩니다.

위의 모든 설명은 **`async` 함수** 및 `Promise`에서 동일한 방식으로 작동합니다:

```js
router.beforeEach(async (to, from) => {
  // canUserAccess()는 `true` 또는 `false` 중 하나를 리턴함
  const canAccess = await canUserAccess(to)
  if (!canAccess) return '/login'
})
```

### 선택적 세 번째 인자 `next` %{#optional-third-argument-next}%

Vue Router의 이전 버전에서는 세 번째 인자 `next`를 사용할 수도 있었는데, 이는 일반적인 실수의 원인이었으며, [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation)를 이유로 제거했습니다. 그러나 여전히 지원되므로 탐색 가드에서 세 번째 인자를 전달받을 수 있습니다. 이 경우, 트리거 되는 탐색 가드별 정확히 한 번만 `next`를 호출해야 합니다. 그렇지 않으면 영원히 훅이 해결되지 않거나 오류가 생깁니다. 다음은 인증되지 않은 사용자를 `/login`으로 리디렉션하는 **나쁜 예제**입니다:

```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 사용자가 인증되지 않은 경우, `next`가 두 번 호출됨
  next()
})
```

올바른 예제:

```js
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

## 전역: 리졸브(resolve) 가드 %{#global-resolve-guards}%

`router.beforeResolve`로 전역 가드를 등록할 수 있습니다. 이것은 **모든 탐색**에서 트리거되기 때문에 `router.beforeEach`와 유사하지만, **컴포넌트 내 가드 및 비동기 경로 컴포넌트가 모두 해결된 후**, 최종적으로 탐색을 진행 할 것인지 결정하기 위한 목적으로 호출합니다. 다음은 [사용자 정의 메타를 정의한](meta.md) 속성 `requiresCamera`가 있는 경로에 대해, 사용자가 카메라에 접근 권한을 부여했는지 확인하는 예입니다:

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

유저가 페이지에 접근할 수 없는 경우, `router.beforeResolve`는 이것을 처리하기 위해 데이터를 가져오거나 다른 작업을 실행하기에 이상적인 곳입니다. 

<!-- TODO: how to combine with [`meta` fields](./meta.md) to create a [generic fetching mechanism](#TODO). -->

## 전역: 탐색 후 훅 %{#global-after-hooks}%

전역으로 탐색 후 훅을 등록할 수도 있지만, 가드와 달리 `next` 함수를 전달받지 않으며 탐색에 영향을 줄 수 없습니다:

```js
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})
```

<!-- TODO: maybe add links to examples -->

애널리틱스, 페이지 `<title>` 변경, 페이지 정보를 알리는 접근성 기능 및 기타 여러 작업에 유용합니다.

또한 탐색 실패를 세 번째 인자로 전달합니다:

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

참고: [가이드 - 탐색 실패](navigation-failures.md)

## 가드에서 전역 인젝션(injection) %{global-injections-within-guards}%

Vue 3.3부터는 내비게이션 가드 내에서 `inject()`를 사용할 수 있습니다. 이는 [pinia 스토어](https://pinia.vuejs.org)와 같은 전역 속성을 인젝션하는 데 유용합니다. `app.provide()`와 함께 제공되는 모든 항목은 `router.beforeEach()`, `router.beforeResolve()`, `router.afterEach()` 내에서도 액세스할 수 있습니다.

```ts
// main.ts
const app = createApp(App)
app.provide('global', '안녕 인젝션!')

// router.ts 또는 main.ts
router.beforeEach((to, from) => {
  console.log(inject('global')) // -> '안녕 인젝션!'
})
```

## 경로 별 가드 %{#per-route-guard}%

경로를 구성하는 객체에서 직접 `beforeEnter` 가드를 정의할 수 있습니다:

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // 경로 진입 거부
      return false
    },
  },
]
```

경로 별 `beforeEnter`는 **경로에 진입할 때만 가드를 실행**하며, `params`, `query` 또는 `hash`가 변경될 때 트리거하지 않습니다(예: `/users/2`에서 `/users/3`으로 이동 또는 `/users/2#info`에서 `/users/2#projects`로 이동). **다른** 경로에서 탐색된 경우에만 실행됩니다.

함수로 이루어진 배열을 `beforeEnter`에 전달할 수도 있습니다. 이는 다른 경로의 가드를 재사용할 때 유용합니다:

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

[경로 메타 필드](./meta.md) 및 [전역 탐색 가드](#global-before-guards)를 사용하여 유사한 동작을 수행할 수 있습니다.

## 컴포넌트 내부 가드 %{#in-component-guards}%

마지막으로 경로를 구성하는 객체에 전달되는 "경로 컴포넌트" 내에서 경로 탐색 가드를 직접 정의할 수 있습니다.

### 옵션 API 사용 %{#using-the-options-api}%

경로 컴포넌트에 다음과 같은 가드 옵션을 추가할 수 있습니다:

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 이 컴포넌트를 렌더링하는 경로가 결정되기 전에 호출됨.
    // 이 가드가 호출되는 시점에 컴포넌트 인스턴스는 아직 생성되지 않았으므로,
    // `this`로 컴포넌트 인스턴스에 접근할 수 없음.
  },
  beforeRouteUpdate(to, from) {
    // 이 컴포넌트를 렌더링하는 경로의 세부 정보가 변경될 때 동일한 컴포넌트가 사용되는 경우 호출됨.
    // 예를 들어 `/users/:id` 파라미터가 있는 경로가 `/users/1`과 `/users/2` 사이를 탐색할 때,
    // `UserDetails` 컴포넌트 인스턴스가 유지되면 이 훅이 호출됨.
    // 이 시점에서 컴포넌트 인스턴트는 마운트된 상태이므로, 훅 내부에서 `this`로 컴포넌트 인스턴스에 접근할 수 있음.
  },
  beforeRouteLeave(to, from) {
    // 이 컴포넌트를 렌더링한 경로에서 떠나려고 할 때 호출됨.
    // `beforeRouteUpdate`처럼 `this`로 컴포넌트 인스턴스에 접근할 수 있음.
  },
}
```

`beforeRouteEnter` 가드는 탐색이 결정되기 전에 호출되므로, 진입할 새로운 컴포넌트가 아직 생성되지 않아 **`this`에 접근할 수 없습니다**.

그러나 `next`에 콜백을 전달하여 인스턴스에 접근할 수 있습니다. 탐색이 결정되면 콜백이 호출되고, 컴포넌트 인스턴스가 콜백의 인자로 전달됩니다:

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // `vm`을 통해 컴포넌트 공개 인스턴스에 접근
  })
}
```

`beforeRouteEnter`는 훅의 콜백 함수에 `next` 인자가 전달되는 유일한 가드입니다. `beforeRouteUpdate` 및 `beforeRouteLeave`는 `this`가 이미 사용 가능하므로, 콜백을 전달할 필요가 없으므로 지원되지 않습니다:

```js
beforeRouteUpdate (to, from) {
  // 컴포넌트 인스턴스에 접근하기 위해 `this`를 사용.
  this.name = to.params.name
}
```

**리브(leave) 가드**는 일반적으로 유저가 작업한 무엇인가를 저장하지 않고, 실수로 경로에서 떠나는 것을 방지하는 데 사용됩니다. `false`를 반환하여 탐색을 취소할 수 있습니다:

```js
beforeRouteLeave (to, from) {
  const answer = window.confirm('정말 떠나시겠습니까? 저장되지 않은 변경 사항이 있습니다!')
  if (!answer) return false
}
```

### 컴포지션 API 사용 %{#using-the-composition-api}%

[컴포지션 API 및 `setup` 함수](https://vuejs.kr/api/composition-api-setup.html#setup)를 사용하여 컴포넌트를 작성하는 경우, `onBeforeRouteUpdate` 및 `onBeforeRouteLeave` 가드를 추가할 수 있습니다. 참고: [가이드 - 컴포지션 API](composition-api.md#navigation-guards)

## 전체적인 탐색 흐름 %{#the-full-navigation-resolution-flow}%

1. 탐색이 트리거됨.
2. 비활성화된 컴포넌트에서 `beforeRouteLeave` 가드 호출.
3. 전역 `beforeEach` 가드 호출.
4. 재사용된 컴포넌트에서 `beforeRouteUpdate` 가드 호출.
5. 경로를 구성하면서 `beforeEnter` 호출.
6. 비동기 경로 컴포넌트를 해결(resolve).
7. 활성화된 컴포넌트에서 `beforeRouteEnter` 호출.
8. 전역 `beforeResolve` 가드 호출.
9. 탐색이 승인됨.
10. 전역 `afterEach` 훅 호출.
11. DOM 업데이트가 트리거됨.
12. 인스턴스화 된 인스턴스 내부 `beforeRouteEnter` 가드에서 전달된 `next` 콜백 호출.

[//]: # (![Vue router flow]&#40;./images/vue-router-lifecycle.png&#41;)

<!-- https://www.figma.com/file/KOQQRmhZs9qJtpOTfw8a1I/Vue-Router-Lifecycle-(ko-kr) -->
