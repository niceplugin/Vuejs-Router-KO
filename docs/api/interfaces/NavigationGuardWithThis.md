---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / NavigationGuardWithThis

# Interface: NavigationGuardWithThis<T\>

## Type parameters

| 이름 |
| :------ |
| `T` |

## Callable

### NavigationGuardWithThis

▸ **NavigationGuardWithThis**(`this`, `to`, `from`, `next`): `NavigationGuardReturn` \| `Promise`<`NavigationGuardReturn`\>

Navigation guard. See [Navigation
Guards](/guide/advanced/navigation-guards.md).

#### Parameters

| 이름 | 타입 |
| :------ | :------ |
| `this` | `T` |
| `to` | [`RouteLocationNormalized`](RouteLocationNormalized.md) |
| `from` | [`RouteLocationNormalized`](RouteLocationNormalized.md) |
| `next` | [`NavigationGuardNext`](NavigationGuardNext.md) |

#### Returns

`NavigationGuardReturn` \| `Promise`<`NavigationGuardReturn`\>
