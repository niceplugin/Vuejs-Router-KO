# useLink

▸ **useLink**(`props`): `Object`

### 파라미터

| Name | Type |
| :------ | :------ |
| `props` | `VueUseOptions`<`RouterLinkOptions`\> |

### 반환 값

`Object`

| Name | Type |
| :------ | :------ |
| `href` | `ComputedRef`<`string`\> |
| `isActive` | `ComputedRef`<`boolean`\> |
| `isExactActive` | `ComputedRef`<`boolean`\> |
| `navigate` | (`e`: `MouseEvent`) => `Promise`<`void` \| [`NavigationFailure`](../interfaces/NavigationFailure.md)\> |
| `route` | `ComputedRef`<[`RouteLocation`](../interfaces/RouteLocation.md) & { `href`: `string`  }\> |