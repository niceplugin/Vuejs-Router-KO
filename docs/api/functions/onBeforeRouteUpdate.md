# onBeforeRouteUpdate

▸ **onBeforeRouteUpdate**(`updateGuard`): `void`

Add a navigation guard that triggers whenever the current location is about
to be updated. Similar to beforeRouteUpdate but can be used in any
component. The guard is removed when the component is unmounted.

### 파라미터

| 이름 | 타입 | 설명 |
| :------ | :------ | :------ |
| `updateGuard` | [`NavigationGuard`](../interfaces/NavigationGuard.md) | [NavigationGuard](../interfaces/NavigationGuard.md) |
