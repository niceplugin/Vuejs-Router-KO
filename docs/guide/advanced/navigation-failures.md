# 탐색 결과 기다리기 {#waiting-for-the-result-of-a-navigation}

When using `router-link`, Vue Router calls `router.push` to trigger a navigation. While the expected behavior for most links is to navigate a user to a new page, there are a few situations where users will remain on the same page:

`router-link`를 사용할 때,
Vue Router는 `router.push`를 호출하여 탐색을 트리거합니다.
대부분의 링크에서 예상되는 동작은 사용자를 새 페이지로 이동하는 것이지만,
사용자가 동일한 페이지에 남아 있는 몇 가지 상황이 있습니다.

- Users are already on the page that they are trying to navigate to.
- A [navigation guard](navigation-guards.md) aborts the navigation by doing `return false`.
- A new navigation guard takes place while the previous one not finished.
- A [navigation guard](navigation-guards.md) redirects somewhere else by returning a new location (e.g. `return '/login'`).
- A [navigation guard](navigation-guards.md) throws an `Error`.

- 사용자는 탐색하려는 페이지에 이미 있음.
- [내비게이션 가드](navigation-guards.md)가 `return false`로 탐색을 중단함.
- 이전 탐색이 완료되지 않은 상태에서 새로운 탐색 가드가 실행됨.
- [내비게이션 가드](navigation-guards.md)가 새 위치를 반환하여 다른 곳으로 리디렉션(예: `return '/login'`).
- [네비게이션 가드](navigation-guards.md)가 `Error`를 던짐.

탐색이 끝난 후 무언가를 하고 싶다면,
`router.push`를 호출한 후 기다릴 방법이 필요합니다.
다른 페이지로 이동할 수 있는 모바일 메뉴가 있고,
새 페이지로 이동한 후에만 메뉴를 숨기고 싶을 때,
다음과 같이 구현했다고 가정해봅시다:

```js
router.push('/my-profile')
this.isMenuOpen = false
```

하지만 **탐색이 비동기식**이기 때문에 메뉴는 즉시 닫힙니다.
`router.push`가 반환하는 Promise를 `await`해야 합니다:

```js
await router.push('/my-profile')
this.isMenuOpen = false
```

이제 메뉴는 탐색이 완료되면 닫히지만 탐색이 금지된 경우에도 닫힙니다.
현재 있는 페이지를 실제로 변경했는지 여부를 감지할 방법이 필요합니다.

## 탐색 실패 감지하기 {#detecting-navigation-failures}

If a navigation is prevented, resulting in the user staying on the same page, the resolved value of the `Promise` returned by `router.push` will be a _Navigation Failure_. Otherwise, it will be a _falsy_ value (usually `undefined`). This allows us to differentiate the case where we navigated away from where we are or not:

```js
const navigationResult = await router.push('/my-profile')

if (navigationResult) {
  // navigation prevented
} else {
  // navigation succeeded (this includes the case of a redirection)
  this.isMenuOpen = false
}
```

_Navigation Failures_ are `Error` instances with a few extra properties that gives us enough information to know what navigation was prevented and why. To check the nature of a navigation result, use the `isNavigationFailure` function:

```js
import { NavigationFailureType, isNavigationFailure } from 'vue-router'

// trying to leave the editing page of an article without saving
const failure = await router.push('/articles/2')

if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
  // show a small notification to the user
  showToast('You have unsaved changes, discard and leave anyway?')
}
```

::: tip
If you omit the second parameter: `isNavigationFailure(failure)`, it will only check if `failure` is a _Navigation Failure_.
:::

## 탐색 실패 구별하기 {#differentiating-navigation-failures}

As we said at the beginning, there are different situations aborting a navigation, all of them resulting in different _Navigation Failures_. They can be differentiated using the `isNavigationFailure` and `NavigationFailureType`. There are three different types:

- `aborted`: `false` was returned inside of a navigation guard to the navigation.
- `cancelled`: A new navigation took place before the current navigation could finish. e.g. `router.push` was called while waiting inside of a navigation guard.
- `duplicated`: The navigation was prevented because we are already at the target location.

## 탐색 실패의 속성 {#navigation-failures-s-properties}

All navigation failures expose `to` and `from` properties to reflect the current location as well as the target location for the navigation that failed:

```js
// trying to access the admin page
router.push('/admin').then(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```

In all cases, `to` and `from` are normalized route locations.

## 리디렉션 감지하기 {#detecting-redirections}

When returning a new location inside of a Navigation Guard, we are triggering a new navigation that overrides the ongoing one. Differently from other return values, a redirection doesn't prevent a navigation, **it creates a new one**. It is therefore checked differently, by reading the `redirectedFrom` property in a Route Location:

```js
await router.push('/my-profile')
if (router.currentRoute.value.redirectedFrom) {
  // redirectedFrom is resolved route location like to and from in navigation guards
}
```
