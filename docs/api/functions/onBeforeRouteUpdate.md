# onBeforeRouteUpdate

▸ **onBeforeRouteUpdate**(`updateGuard`): `void`

Add a navigation guard that triggers whenever the current location is about
to be updated. Similar to beforeRouteUpdate but can be used in any
component. The guard is removed when the component is unmounted.

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `updateGuard` | [`NavigationGuard`](../interfaces/NavigationGuard.md) | [NavigationGuard](../interfaces/NavigationGuard.md) |

## Returns

`void`