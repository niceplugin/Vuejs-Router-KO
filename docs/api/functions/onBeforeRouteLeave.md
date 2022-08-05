# onBeforeRouteLeave

▸ **onBeforeRouteLeave**(`leaveGuard`): `void`

Add a navigation guard that triggers whenever the component for the current
location is about to be left. Similar to beforeRouteLeave but can be
used in any component. The guard is removed when the component is unmounted.

### 파라미터

| 이름 | 타입 | 설명 |
| :------ | :------ | :------ |
| `leaveGuard` | [`NavigationGuard`](../interfaces/NavigationGuard.md) | [NavigationGuard](../interfaces/NavigationGuard.md) |
