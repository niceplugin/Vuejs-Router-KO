# RouteMeta

Interface to type `meta` fields in route records.

**`Example`**

```ts
// typings.d.ts or router.ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
 }
```

## Hierarchy

- `Record`<`string` \| `number` \| `symbol`, `unknown`\>

  ↳ **`RouteMeta`**
