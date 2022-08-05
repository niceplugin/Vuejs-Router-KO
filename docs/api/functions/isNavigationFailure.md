# isNavigationFailure

▸ **isNavigationFailure**(`error`, `type?`): error is NavigationRedirectError

Check if an object is a [NavigationFailure](../interfaces/NavigationFailure.md).

**`Example`**

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

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `any` | possible [NavigationFailure](../interfaces/NavigationFailure.md) |
| `type?` | `NAVIGATION_GUARD_REDIRECT` | optional types to check for |

## Returns

error is NavigationRedirectError

▸ **isNavigationFailure**(`error`, `type?`): error is NavigationFailure

## Parameters

| Name    | Type |
|:--------| :------ |
| `error` | `any` |
| `type?` | `ErrorTypes` \| [`NavigationFailureType`](../enums/NavigationFailureType.md) |

## Returns

error is NavigationFailure