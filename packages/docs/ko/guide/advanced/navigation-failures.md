# 탐색 결과 기다리기 %{#Waiting-for-the-result-of-a-Navigation}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/vue-router-4-detecting-navigation-failures"
  title="Learn how to detect navigation failures"
/>

`router-link`를 사용할 때, Vue Router는 `router.push`를 호출하여 탐색을 트리거합니다. 대부분의 링크 예상 동작은 유저를 새 페이지로 이동시키는 것이지만, 유저가 동일한 페이지에 머물게 되는 몇 가지 상황이 있습니다:

- 유저가 이동하려고 하는 페이지에 이미 있는 경우.
- [내비게이션 가드](./navigation-guards.md)가 `return false`를 수행하여 탐색을 차단하는 경우.
- 이전 탐색이 완료되지 않은 상태에서 새로운 내비게이션 가드가 발생한 경우.
- [내비게이션 가드](./navigation-guards.md)가 새로운 위치(예: `return '/login'`)를 반환하여 다른 곳으로 리다이렉션하는 경우.
- [내비게이션 가드](./navigation-guards.md)가 `Error`를 던지는 경우.

탐색이 완료된 후에 무언가를 하고 싶다면 `router.push`를 호출한 후 기다릴 방법이 필요합니다. 예를 들어 모바일 메뉴를 통해 다른 페이지로 이동하고, 새로운 페이지로 이동한 후에만 메뉴를 숨기고 싶다면 다음과 같이 할 수 있습니다:

```js
router.push('/my-profile')
this.isMenuOpen = false
```

하지만 이 코드는 메뉴를 바로 닫아버리는데 **탐색이 비동기적**이기 때문입니다. 이는 `router.push`가 반환하는 프로미스를 `await` 함으로 해결할 수 있습니다:

```js
await router.push('/my-profile')
this.isMenuOpen = false
```

이제 탐색이 완료된 후에 메뉴가 닫히지만, 탐색이 막혀도 메뉴가 닫히게 됩니다. 현재 페이지가 실제로 변경되었는지 여부를 감지하는 방법이 필요합니다.

## 탐색 실패 감지하기 %{#Detecting-Navigation-Failures}%

만약 탐색이 차단되어 유저가 동일한 페이지에 머무르게 되는 경우, `router.push`가 반환하는 `Promise`의 해결 값은 *탐색 실패*(Navigation Failure)가 됩니다. 그렇지 않으면, 이는 _falsy_ 값(보통 `undefined`)이 됩니다. 이를 통해 우리는 현재 위치에서 탐색이 이루어졌는지 여부를 구분할 수 있습니다:

```js
const navigationResult = await router.push('/my-profile')

if (navigationResult) {
  // 탐색 차단됨
} else {
  // 탐색 성공 (리다이렉션 포함)
  this.isMenuOpen = false
}
```

*탐색 실패*는 탐색이 왜 차단되었는지와 같은 충분한 정보를 제공하는 몇 가지 추가 프로퍼티를 가진 `Error` 인스턴스입니다. 탐색 결과의 종류를 확인하려면 `isNavigationFailure` 함수를 사용하세요:

```js
import { NavigationFailureType, isNavigationFailure } from 'vue-router'

// 저장하지 않고 글 편집 페이지를 떠나려고 할 때.
const failure = await router.push('/articles/2')

if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
  // 유저에게 알림을 표시합니다.
  showToast('You have unsaved changes, discard and leave anyway?')
}
```

::: tip
두 번째 파라미터를 생략하는 경우: `isNavigationFailure(failure)`는 `failure`가 *탐색 실패*인지 여부만 확인합니다.
:::

## 전역 탐색 실패 %{#Global-navigation-failures}%

전역 탐색 실패는 [`router.afterEach()` 내비게이션 가드](./navigation-guards.md#Global-After-Hooks)를 사용하여 전역적으로 감지할 수 있습니다:

```ts
router.afterEach((to, from, failure) => {
  if (failure) {
    sendToAnalytics(to, from, failure)
  }
})
```

## 탐색 실패 구분하기 %{#Differentiating-Navigation-Failures}%

처음에 언급했듯이 탐색이 차단되는 다양한 상황이 있으며, 이로 인해 서로 다른 *탐색 실패*가 발생합니다. 이들은 `isNavigationFailure`와 `NavigationFailureType`을 사용하여 구분할 수 있습니다. 세 가지 유형이 있습니다:

- `aborted`: 내비게이션 가드 내부에서 `false`가 반환되어 탐색이 차단된 경우.
- `cancelled`: 현재 탐색이 완료되기 전에 새로운 탐색이 시작된 경우. 예를 들어, 내비게이션 가드 내부에서 대기하는 동안 `router.push`가 호출된 경우.
- `duplicated`: 이미 현재 위치에 있기 때문에 탐색이 차단된 경우.

## *탐색 실패*의 프로퍼티 %{#Navigation-Failures-s-properties}%

모든 탐색 실패는 현재 위치와 실패한 탐색의 대상 위치를 반영하는 `to`와 `from` 프로퍼티를 노출합니다:

```js
// 관리자 페이지에 접근 시도
router.push('/admin').then(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```

모든 경우에 `to`와 `from`은 [정규화된 라우트 로케이션 객체](../../api/#RouteLocationNormalized)입니다.

## 리다이렉션 감지하기 %{#Detecting-Redirections}%

내비게이션 가드에서 새 위치를 반환하면 진행 중인 탐색을 덮어쓰는 새 탐색이 트리거됩니다. 다른 반환 값과 달리, 리다이렉션은 탐색을 차단하지 않고 **새로운 탐색을 생성**합니다. 따라서 이는 라우트 로케이션 객체의 redirectedFrom 프로퍼티를 읽어 확인하는 방식을 사용해야 합니다:

```js
await router.push('/my-profile')
if (router.currentRoute.value.redirectedFrom) {
  // redirectedFrom은 내비게이션 가드의 to/from 처럼 라우트 로케이션 객체입니다.
}
```
