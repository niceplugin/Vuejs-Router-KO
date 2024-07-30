# 내비게이션 가드 %{#Navigation-Guards}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/route-guards"
  title="Learn how to add navigation guards"
/>

이름에서 알 수 있듯이, Vue 라우터가 제공하는 내비게이션 가드는 주로 탐색을 리다이렉션하거나 취소하여 탐색을 보호하는 데 사용됩니다. 라우트 탐색 프로세스에서 훅을 거는 방법에는 "전역", "각 라우트별", "컴포넌트 내"가 있습니다.

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

- **`to`**: 이동할 [정규화된 형식의](../../api/#RouteLocationNormalized) 라우트 로케이션 객체.
- **`from`**: 현재 [정규화된 형식의](../../api/#RouteLocationNormalized) 라우트 로케이션 객체.

그리고 선택적으로 다음 값 중 하나를 반환할 수 있습니다:

- `false`: 현재 탐색을 취소합니다. 브라우저 URL이 변경된 경우(유저가 수동으로 변경했거나 뒤로 가기 버튼을 통해 변경한 경우), `from` 라우트의 URL로 재설정됩니다.
- [라우트 로케이션 객체](../../api/#RouteLocationRaw): `router.push()`를 호출할 때처럼 라우트 로케이션 객체를 전달하여 다른 위치로 리다이렉션합니다. 이 경우 `replace: true` 또는 `name: 'home'`과 같은 옵션을 전달할 수 있습니다. 현재 탐색을 중단하고 동일한 `from`으로 새 탐색을 생성합니다.

  ```js
  router.beforeEach(async (to, from) => {
    if (
      // 인증된 유저인지 확인.
      !isAuthenticated &&
      // ❗️ 무한 리다이렉션 방지.
      to.name !== 'Login'
    ) {
      // 유저를 로그인 페이지로 리다이렉션.
      return { name: 'Login' }
    }
  })
  ```

예상치 못한 상황이 발생하면 `Error`를 던질 수도 있습니다. 이 경우에도 탐색이 취소되며, [`router.onError()`](../../api/interfaces/Router.md#onError)를 통해 등록된 콜백이 호출됩니다.

아무것도 반환하지 않거나, `undefined` 또는 `true`를 반환하면 **탐색이 유효**하며, 다음 내비게이션 가드가 호출됩니다.

위의 모든 사항은 **`async` 함수 및 Promise에서도 동일하게 작동**합니다:

```js
router.beforeEach(async (to, from) => {
  // canUserAccess()는 `true` 또는 `false`를 반환합니다.
  const canAccess = await canUserAccess(to)
  if (!canAccess) return '/login'
})
```

### 선택적 세 번째 인자 `next` %{#Optional-third-argument-next}%

이전 버전의 Vue Router에서는 *세 번째 인자* `next`를 사용할 수 있었습니다. 이는 일반적인 실수의 원인이 되었고, 이를 제거하기 위한 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation)가 진행되었습니다. 그러나 여전히 지원되므로 내비게이션 가드에서 세 번째 인자를 전달 받을 수 있습니다. 이 경우, **내비게이션 가드를 통과할 때 `next`를 정확히 한 번 호출해야 합니다**. `next`는 여러 번 나타날 수 있지만, 논리 경로가 중복되지 않는 경우에만 가능합니다. 그렇지 않으면 훅이 절대 해결되지 않거나 오류가 발생합니다. 다음은 유저가 인증되지 않은 경우 `/login`으로 리다이렉션하는 **잘못된 예제**가 있습니다:

```js
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 유저가 인증되지 않은 경우, `next`가 두 번 호출됩니다.
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

`router.beforeResolve`를 사용하여 전역 가드를 등록할 수 있습니다. 이는 `router.beforeEach`와 유사하게 **모든 탐색 시** 트리거되지만, 리졸브 가드는 **모든 컴포넌트 내 가드와 비동기 라우트 컴포넌트가 처리된 후** 탐색이 확정되기 바로 전에 호출됩니다. 다음은 [사용자 정의 메타](./meta.md) 프로퍼티 `requiresCamera`가 정의된 라우트에서 유저가 카메라 접근 권한을 부여했는지 확인하는 예제입니다:

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
        // 예기치 않은 오류가 발생하면 탐색을 취소하고 오류를 전역 핸들러로 전달합니다.
        throw error
      }
    }
  }
})
```

`router.beforeResolve`는 유저가 페이지에 접근할 수 없는 경우 실행을 피하고자 하는 데이터 가져오기나 기타 작업을 수행하기에 이상적인 위치입니다.

<!-- TODO: how to combine with [`meta` fields](./meta.md) to create a [generic fetching mechanism](#TODO). -->

## 전역 애프터 훅 %{#Global-After-Hooks}%

전역 애프터 훅을 등록할 수도 있습니다. 그러나 가드와 달리 이러한 훅은 `next` 함수를 받지 않으며 탐색에 영향을 줄 수 없습니다:

```js
router.afterEach((to, from) => {
  sendToAnalytics(to.fullPath)
})
```

<!-- TODO: maybe add links to examples -->

이 훅들은 분석, 페이지 제목 변경, 페이지 알림과 같은 접근성 기능 등 다양한 용도에 유용합니다.

그리고 이 훅들은 [탐색 실패](./navigation-failures.md)를 세 번째 인자로 전달합니다:

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

탐색 실패에 대해 더 알아보려면 [가이드](./navigation-failures.md)를 참고하세요.

## 가드에 전역 종속성 제공 %{#Global-injections-within-guards}%

Vue 3.3부터 내비게이션 가드 내에서 `inject()`를 사용할 수 있습니다. 이는 [Pinia Store](https://pinia.vuejs.org)처럼 전역 프로퍼티를 종속성으로 제공하는 데 유용합니다. `app.provide()`로 제공된 모든 것은 `router.beforeEach()`, `router.beforeResolve()`, `router.afterEach()` 내에서도 접근할 수 있습니다:

```ts
// main.ts
const app = createApp(App)
app.provide('global', 'hello injections')

// router.ts 또는 main.ts
router.beforeEach((to, from) => {
  const global = inject('global') // 'hello injections'
  // Pinia Store
  const userStore = useAuthStore()
  // ...
})
```

## 라우트별 가드 %{#Per-Route-Guard}%

라우트의 구성 객체에서 `beforeEnter` 가드를 직접 정의할 수 있습니다:

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // 탐색 거부.
      return false
    },
  },
]
```

`beforeEnter` 가드는 **라우트에 진입할 때만** 트리거되며, `params`, `query` 또는 `hash`가 변경될 때는 트리거되지 않습니다. 예를 들어, `/users/2`에서 `/users/3`으로 가거나 `/users/2#info`에서 `/users/2#projects`로 갈 때는 트리거되지 않습니다. **다른** 라우트로 탐색할 때만 트리거됩니다.

`beforeEnter`에 함수 배열을 전달할 수도 있으며, 이는 다른 라우트에서 가드를 재사용할 때 유용합니다:

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

[중첩된 라우트](../essentials/nested-routes)에서 사용할 경우, 부모 및 자식 라우트 모두 `beforeEnter`를 사용할 수 있습니다. 부모 라우트에 정의된 `beforeEnter`는 같은 부모를 가진 자식들 간 이동 시 트리거되지 않습니다. 예를 들어:

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

위 예제에서 `beforeEnter`는 `/user/list`와 `/user/details` 간 이동 시 호출되지 않습니다. 두 라우트가 같은 부모를 공유하기 때문입니다. 대신 `details` 라우트에 직접 `beforeEnter` 가드를 정의하면, 두 라우트 간 이동 시 호출됩니다.

::: tip
[라우트 메타 필드](./meta)와 전역 내비게이션 가드를 사용하여 라우트별 가드와 유사한 동작을 구현할 수 있습니다.
:::

## 컴포넌트 내 가드 %{#In-Component-Guards}%

마지막으로, 라우터 구성에 전달되는 라우트 컴포넌트 내부에서 직접 라우트 내비게이션 가드를 정의할 수 있습니다.

### Options API 사용하기 %{#Using-the-Options-API}%

다음 옵션들을 라우트 컴포넌트에 추가할 수 있습니다:

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```vue
<script>
export default {
  beforeRouteEnter(to, from) {
    // 라우트가 이 컴포넌트를 렌더링하기 위해 확정되기 전에 호출됩니다.
    // 이 가드가 호출될 때는 컴포넌트가 아직 생성되지 않았기 때문에,
    // `this`로 컴포넌트 인스턴스에 접근할 수 없습니다!
  },
  beforeRouteUpdate(to, from) {
    // 이 컴포넌트가 보여지고 있는 동안 라우트가 변경됬지만, 이 컴포넌트가 새로운 라우트에서 재사용 될 때.
    // 예를 들어, `/users/:id`라는 라우트에서 `/users/1`과 `/users/2` 사이를 이동할 때
    // `UserDetails` 컴포넌트 인스턴스가 재사용되며, 이 때 이 훅이 호출됩니다.
    // 이 과정 동안 컴포넌트가 마운트되어 있기 때문에, 내비게이션 가드는 `this` 컴포넌트 인스턴스에 접근할 수 있습니다.
  },
  beforeRouteLeave(to, from) {
    // 이 컴포넌트가 보여지고 있는 동안 라우트가 벗어나려고 할 때 호출됩니다.
    // `beforeRouteUpdate`와 마찬가지로, `this` 컴포넌트 인스턴스에 접근할 수 있습니다.
  },
}
</script>
```

`beforeRouteEnter` 가드는 `this`에 접근할 수 없습니다. 이 가드는 탐색이 확정되기 전에 호출되므로 새로 진입하는 컴포넌트가 아직 생성되기 전이기 때문입니다.

하지만 `next`에 콜백을 전달하여 인스턴스에 접근할 수 있습니다. 탐색이 확정되면 콜백이 호출되고 컴포넌트 인스턴스가 콜백의 인자로 전달됩니다:

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // `vm`을 통해 컴포넌트 공개 인스턴스에 접근합니다.
  })
}
```

`beforeRouteEnter`가 콜백을 `next`에 전달할 수 있는 유일한 가드임을 유의하십시오. `beforeRouteUpdate` 및 `beforeRouteLeave`에서는 이미 `this`를 사용 가능하므로 콜백을 전달할 필요가 없으며 따라서 *지원되지 않습니다*:

```js
beforeRouteUpdate (to, from) {
  // `this`를 사용합니다.
  this.name = to.params.name
}
```

**리브 가드**는 유저가 저장되지 않은 수정 사항이 있는 상태에서 실수로 라우트를 떠나는 것을 방지하는 데 주로 사용됩니다. `false`를 반환하여 탐색을 취소할 수 있습니다.

```js
beforeRouteLeave (to, from) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
}
```

### Composition API 사용하기 %{#Using-the-Composition-API}%

컴포넌트를 Composition API를 사용하여 작성하는 경우, `onBeforeRouteUpdate`와 `onBeforeRouteLeave`를 통해 업데이트 가드와 리브 가드를 추가할 수 있습니다. 자세한 내용은 [Composition API](./composition-api.md#navigation-guards)를 참고하세요.

## 전체적인 탐색 처리 과정 %{#The-Full-Navigation-Resolution-Flow}%

1. 탐색 트리거됨.
2. 비활성화된 컴포넌트에서 `beforeRouteLeave` 가드 호출.
3. 전역 `beforeEach` 가드 호출.
4. 재사용되는 컴포넌트에서 `beforeRouteUpdate` 가드 호출.
5. 라우트 구성에서 `beforeEnter` 호출.
6. 비동기 라우트 컴포넌트 처리.
7. 활성화된 컴포넌트에서 `beforeRouteEnter` 호출.
8. 전역 `beforeResolve` 가드 호출.
9. 탐색이 확정됨.
10. 전역 `afterEach` 훅 호출.
11. DOM 업데이트 트리거됨.
12. 생성된 인스턴스를 사용하여 `beforeRouteEnter` 가드에서 `next`에 전달된 콜백 함수를 호출.
