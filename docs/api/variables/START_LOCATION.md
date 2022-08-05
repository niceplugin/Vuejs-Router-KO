# START\_LOCATION

• `Const` **START\_LOCATION**: [`RouteLocationNormalizedLoaded`](../interfaces/RouteLocationNormalizedLoaded.md)

Initial route location where the router is. Can be used in navigation guards
to differentiate the initial navigation.

**`Example`**

```js
import { START_LOCATION } from 'vue-router'

router.beforeEach((to, from) => {
  if (from === START_LOCATION) {
    // initial navigation
  }
})
```