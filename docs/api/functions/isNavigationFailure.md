# isNavigationFailure

▸ **isNavigationFailure**(`error`, `type?`): error is NavigationRedirectError

Check if an object is a [NavigationFailure](../interfaces/NavigationFailure.md).

### 예제

```js
import { isNavigationFailure, NavigationFailureType } from 'vue-router'

router.afterEach((to, from, failure) => {
  // Any kind of navigation failure
  if (isNavigationFailure(failure)) {
    // ...
  }
  // Only duplicated navigations
  if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    // ...
  }
  // Aborted or canceled navigations
  if (isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.canceled)) {
    // ...
  }
})
```

### 파라미터

| 이름 | 타입 | 설명 |
| :------ | :------ | :------ |
| `error` | `any` | possible [NavigationFailure](../interfaces/NavigationFailure.md) |
| `type?` | `NAVIGATION_GUARD_REDIRECT` | optional types to check for |

---

▸ **isNavigationFailure**(`error`, `type?`): error is NavigationFailure

### 파라미터

| Name    | Type |
|:--------| :------ |
| `error` | `any` |
| `type?` | `ErrorTypes` \| [`NavigationFailureType`](../enums/NavigationFailureType.md) |
