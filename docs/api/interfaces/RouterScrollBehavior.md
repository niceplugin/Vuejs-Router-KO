# RouterScrollBehavior

이것은 [Callable](https://en.wikipedia.org/wiki/Callable_object)입니다.

▸ **RouterScrollBehavior**(`to`, `from`, `savedPosition`): `Awaitable`<``false`` \| `void` \| `ScrollPosition`\>

### 파라미터

| 이름 | 타입 | 설명 |
| :------ | :------ | :------ |
| `to` | [`RouteLocationNormalized`](RouteLocationNormalized.md) | Route location where we are navigating to |
| `from` | [`RouteLocationNormalizedLoaded`](RouteLocationNormalizedLoaded.md) | Route location where we are navigating from |
| `savedPosition` | ``null`` \| `_ScrollPositionNormalized` | saved position if it exists, `null` otherwise |
