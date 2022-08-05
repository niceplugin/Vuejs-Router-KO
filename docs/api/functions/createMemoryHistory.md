# createMemoryHistory

▸ **createMemoryHistory**(`base?`): [`RouterHistory`](../interfaces/RouterHistory.md)

Creates an in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.

### 파라미터

| 이름 | 타입 | 기본 값 | 설명 |
| :------ | :------ | :------ | :------ |
| `base` | `string` | `''` | Base applied to all urls, defaults to '/' |
