# useLink

▸ **useLink**(`props`): `Object`

## Parameters

| Name | Type |
| :------ | :------ |
| `props` | `VueUseOptions`<`RouterLinkOptions`\> |

## Returns

`Object`

| Name | Type |
| :------ | :------ |
| `href` | `ComputedRef`<`string`\> |
| `isActive` | `ComputedRef`<`boolean`\> |
| `isExactActive` | `ComputedRef`<`boolean`\> |
| `navigate` | (`e`: `MouseEvent`) => `Promise`<`void` \| [`NavigationFailure`](interfaces/NavigationFailure.md)\> |
| `route` | `ComputedRef`<[`RouteLocation`](interfaces/RouteLocation.md) & { `href`: `string`  }\> |