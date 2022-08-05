# RouteMeta

Interface to type `meta` fields in route records.

### 예제

```ts
// typings.d.ts or router.ts
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
 }
```

### 계층

- `Record`<`string` \| `number` \| `symbol`, `unknown`\>

  ↳ **`RouteMeta`**
