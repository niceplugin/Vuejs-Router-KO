API Documentation

# API Documentation

## Enumerations (열거형) %{#Enumerations}%

- [NavigationFailureType](enums/NavigationFailureType.md)

## Interfaces (인터페이스) %{#Interfaces}%

- [HistoryState](interfaces/HistoryState.md)
- [NavigationFailure](interfaces/NavigationFailure.md)
- [NavigationGuard](interfaces/NavigationGuard.md)
- [NavigationGuardNext](interfaces/NavigationGuardNext.md)
- [NavigationGuardWithThis](interfaces/NavigationGuardWithThis.md)
- [NavigationHookAfter](interfaces/NavigationHookAfter.md)
- [RouteLocation](interfaces/RouteLocation.md)
- [RouteLocationMatched](interfaces/RouteLocationMatched.md)
- [RouteLocationNormalized](interfaces/RouteLocationNormalized.md)
- [RouteLocationNormalizedLoaded](interfaces/RouteLocationNormalizedLoaded.md)
- [RouteLocationOptions](interfaces/RouteLocationOptions.md)
- [RouteMeta](interfaces/RouteMeta.md)
- [RouteRecordNormalized](interfaces/RouteRecordNormalized.md)
- [Router](interfaces/Router.md)
- [RouterHistory](interfaces/RouterHistory.md)
- [RouterLinkProps](interfaces/RouterLinkProps.md)
- [RouterOptions](interfaces/RouterOptions.md)
- [RouterScrollBehavior](interfaces/RouterScrollBehavior.md)
- [RouterViewProps](interfaces/RouterViewProps.md)

## Type Aliases (타입 별칭) %{#Type-Aliases}%

### LocationQuery %{#Type-Aliases-LocationQuery}%

Ƭ **LocationQuery**: `Record`<`string`, `LocationQueryValue` \| `LocationQueryValue`[]\>

[RouteLocationNormalized](interfaces/RouteLocationNormalized.md)에 나타나는 정규화된 쿼리 객체

___

### LocationQueryRaw %{#Type-Aliases-LocationQueryRaw}%

Ƭ **LocationQueryRaw**: `Record`<`string` \| `number`, `LocationQueryValueRaw` \| `LocationQueryValueRaw`[]\>

[RouteLocationRaw](index.md#routelocationraw)를 생성할 때,
[push](interfaces/Router.md#push) 및 [replace](interfaces/Router.md#replace)와 같은 함수
또는 모든 위치에 전달할 수 있는 느슨한 [LocationQuery](index.md#locationquery) 객체입니다.

___

### PathParserOptions %{#Type-Aliases-PathParserOptions}%

Ƭ **PathParserOptions**: `Pick`<`_PathParserOptions`, ``"end"`` \| ``"sensitive"`` \| ``"strict"``\>

___

### RouteComponent %{#Type-Aliases-RouteComponent}%

Ƭ **RouteComponent**: `Component` \| `DefineComponent`

[RouteLocationMatched](interfaces/RouteLocationMatched.md)에서 허용된 컴포넌트

___

### RouteLocationRaw %{#Type-Aliases-RouteLocationRaw}%

Ƭ **RouteLocationRaw**: `string` \| `RouteLocationPathRaw` \| `RouteLocationNamedRaw`

사용자 수준 경로 위치

___

### RouteParams %{#Type-Aliases-RouteParams}%

Ƭ **RouteParams**: `Record`<`string`, `RouteParamValue` \| `RouteParamValue`[]\>

___

### RouteParamsRaw %{#Type-Aliases-RouteParamsRaw}%

Ƭ **RouteParamsRaw**: `Record`<`string`, `RouteParamValueRaw` \| `Exclude`<`RouteParamValueRaw`, ``null`` \| `undefined`\>[]\>

___

### RouteRecord %{#Type-Aliases-RouteRecord}%

Ƭ **RouteRecord**: [`RouteRecordNormalized`](interfaces/RouteRecordNormalized.md)

[경로 레코드](index.md#routerecord)의 정규화된 버전.

___

### RouteRecordName %{#Type-Aliases-RouteRecordName}%

Ƭ **RouteRecordName**: `string` \| `symbol`

커스텀 경로 레코드 이름에 가능한 값

___

### RouteRecordRaw %{#Type-Aliases-RouteRecordRaw}%

Ƭ **RouteRecordRaw**: `RouteRecordSingleView` \| `RouteRecordSingleViewWithChildren` \| `RouteRecordMultipleViews` \| `RouteRecordMultipleViewsWithChildren` \| `RouteRecordRedirect`

___

### UseLinkOptions %{#Type-Aliases-UseLinkOptions}%

Ƭ **UseLinkOptions**: `VueUseOptions`<`RouterLinkOptions`\>

## Variables (변수) %{#Variables}%

### RouterLink %{#Variables-RouterLink}%

• `Const` **RouterLink**: `_RouterLinkI`

클릭 시 탐색을 트리거하는 링크를 렌더링하는 컴포넌트.

___

### RouterView %{#Variables-RouterView}%

• `Const` **RouterView**: () => { `$props`: `AllowedComponentProps` & `ComponentCustomProps` & `VNodeProps` & [`RouterViewProps`](interfaces/RouterViewProps.md) ; `$slots`: { `default?`: (`__namedParameters`: { `Component`: `VNode`<`RendererNode`, `RendererElement`, { `[key: string]`: `any`;  }\> ; `route`: [`RouteLocationNormalizedLoaded`](interfaces/RouteLocationNormalizedLoaded.md)  }) => `VNode`<`RendererNode`, `RendererElement`, { `[key: string]`: `any`;  }\>[]  }  }

#### Type declaration %{#Variables-RouterView-Type-declaration}%

• **new RouterView**()

사용자가 있는 현재 경로를 표시하는 컴포넌트.

___

### START\_LOCATION %{#Variables-START\_LOCATION}%

• `Const` **START\_LOCATION**: [`RouteLocationNormalizedLoaded`](interfaces/RouteLocationNormalizedLoaded.md)

라우터가 있는 초기 경로 위치입니다.
탐색 가드에서 초기 탐색을 구별하는 데 사용할 수 있습니다.

**`Example`**

```js
import { START_LOCATION } from 'vue-router'

router.beforeEach((to, from) => {
  if (from === START_LOCATION) {
    // 탐색 초기화
  }
})
```

## Functions (함수) %{#Functions}%

### createMemoryHistory %{#Functions-createMemoryHistory}%

▸ **createMemoryHistory**(`base?`): [`RouterHistory`](interfaces/RouterHistory.md)

메모리 기반 히스토리를 생성합니다. 이 히스토리의 주요 목적은 SSR을 처리하는 것입니다.
이것은 어디에도 없는 특별한 장소에서 시작됩니다. `router.push` 또는 `router.replace`를 호출하여 해당 위치를 시작 위치로 바꾸는 것은 사용자에게 달려 있습니다.

#### Parameters %{#Functions-createMemoryHistory-Parameters}%

| 이름     | 타입       | 기본 값 | 설명                          |
|:-------|:---------|:-----|:----------------------------|
| `base` | `string` | `''` | 기본값이 모든 URL에 적용되고, 기본값은 '/' |

#### Returns %{#Functions-createMemoryHistory-Returns}%

[`RouterHistory`](interfaces/RouterHistory.md)

라우터 생성자에게 전달될 수 있는 히스토리 객체

___

### createRouter %{#Functions-createRouter}%

▸ **createRouter**(`options`): [`Router`](interfaces/Router.md)

Vue 앱에서 사용할 수 있는 라우터 인스턴스를 생성.

#### Parameters %{#Functions-createRouter-Parameters}%

| 이름        | 타입                                             | 설명                                           |
|:----------|:-----------------------------------------------|:---------------------------------------------|
| `options` | [`RouterOptions`](interfaces/RouterOptions.md) | [RouterOptions](interfaces/RouterOptions.md) |

#### Returns %{#Functions-createRouter-Returns}%

[`Router`](interfaces/Router.md)

___

### createWebHashHistory %{#Functions-createWebHashHistory}%

▸ **createWebHashHistory**(`base?`): [`RouterHistory`](interfaces/RouterHistory.md)

해시 히스토리를 만듭니다.
호스트가 없는 웹 애플리케이션(예: `file://`)이나 URL을 처리하도록 서버를 구성할 수 없는 경우에 유용합니다.

**`Example`**

```js
// https://example.com/folder 에서
createWebHashHistory() // `https://example.com/folder#`라는 URL이 제공됨.
createWebHashHistory('/folder/') // `https://example.com/folder/#`라는 URL이 제공됨.
// 베이스에 `#`이 제공되면, `createWebHashHistory`에 의해 추가되지 않습니다
createWebHashHistory('/folder/#/app/') // `https://example.com/folder/#/app/`라는 URL이 제공됨.
// 원래 URL을 변경하고 URL 복사를 중단하므로 이 작업을 피해야 합니다.
createWebHashHistory('/other-folder/') // `https://example.com/other-folder/#`라는 URL이 제공됨.

// file:///usr/etc/folder/index.html 에서
// `host`가 없는 위치의 경우 기본값이 무시됨.
createWebHashHistory('/iAmIgnored') // `file:///usr/etc/folder/index.html#`라는 URL이 제공됨.
```

#### Parameters %{#Functions-createWebHashHistory-Parameters}%

| 이름      | 타입       | 설명                                                                                                                                                                                                          |
|:--------|:---------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `base?` | `string` | 선택적으로 베이스를 제공. 기본값은 `location.pathname + location.search`입니다. 헤드에 `<base>` 태그가 있는 경우, 해당 값은 이 파라미터를 위해 무시되지만, 모든 `history.pushState()` 호출에 영향을 줍니다. `<base>` 태그의 `href` 값은 이 파라미터와 일치해야 합니다(`#` 뒤의 항목은 무시). |

#### Returns %{#Functions-createWebHashHistory-Returns}%

[`RouterHistory`](interfaces/RouterHistory.md)

___

### createWebHistory %{#Functions-createWebHistory}%

▸ **createWebHistory**(`base?`): [`RouterHistory`](interfaces/RouterHistory.md)

HTML5 히스토리를 만듭니다. 단일 페이지 애플리케이션에 대한 가장 일반적인 히스토리입니다.

#### Parameters %{#Functions-createWebHistory-Parameters}%

| 이름      | 타입       |
|:--------|:---------|
| `base?` | `string` |

#### Returns %{#Functions-createWebHistory-Returns}%

[`RouterHistory`](interfaces/RouterHistory.md)

___

### isNavigationFailure %{#Functions-isNavigationFailure}%

▸ **isNavigationFailure**(`error`, `type?`): 애러는 NavigationRedirectError 임.

객체가 [NavigationFailure](interfaces/NavigationFailure.md)인지 확인합니다.

**`Example`**

```js
import { isNavigationFailure, NavigationFailureType } from 'vue-router'

router.afterEach((to, from, failure) => {
  // 모든 종류의 탐색 실패
  if (isNavigationFailure(failure)) {
    // ...
  }
  // 오직 중복 탐색만
  if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    // ...
  }
  // 중단되거나 취소된 탐색만
  if (isNavigationFailure(failure, NavigationFailureType.aborted | NavigationFailureType.canceled)) {
    // ...
  }
})
```

#### Parameters %{#Functions-isNavigationFailure-Parameters}%

| 이름      | 타입                          | 설명                                                       |
|:--------|:----------------------------|:---------------------------------------------------------|
| `error` | `any`                       | 가능한 [NavigationFailure](interfaces/NavigationFailure.md) |
| `type?` | `NAVIGATION_GUARD_REDIRECT` | 선택적으로 확인할 타입                                             |

#### Returns %{#Functions-isNavigationFailure-Returns}%

NavigationRedirectError 애러.

▸ **isNavigationFailure**(`error`, `type?`): NavigationFailure 애러.

#### Parameters %{#Functions-isNavigationFailure-Parameters_1}%

| 이름      | 타입             |
|:--------|:---------------|
| `error` | `any`          |
| `type?` | `ErrorTypes` \ | [`NavigationFailureType`](enums/NavigationFailureType.md) |

#### Returns %{#Functions-isNavigationFailure-Returns_1}%

NavigationFailure 애러.

___

### loadRouteLocation %{#Functions-loadRouteLocation}%

▸ **loadRouteLocation**(`route`): `Promise`<[`RouteLocationNormalizedLoaded`](interfaces/RouteLocationNormalizedLoaded.md)\>

경로가 로드되었는지 확인하여 `<RouterView>`에 o prop으로 전달할 수 있습니다. (원문: Ensures a route is loaded, so it can be passed as o prop to `<RouterView>`.)

#### Parameters %{#Functions-loadRouteLocation-Parameters}%

| 이름      | 타입                                                                 | 설명            |
|:--------|:-------------------------------------------------------------------|:--------------|
| `route` | [`RouteLocationNormalized`](interfaces/RouteLocationNormalized.md) | 로드하기위해 확인된 경로 |

#### Returns %{#Functions-loadRouteLocation-Returns}%

`Promise`<[`RouteLocationNormalizedLoaded`](interfaces/RouteLocationNormalizedLoaded.md)\>

___

### onBeforeRouteLeave %{#Functions-onBeforeRouteLeave}%

▸ **onBeforeRouteLeave**(`leaveGuard`): `void`

현재 위치에 대한 컴포넌트가 남으려고 할 때마다 트리거되는 탐색 가드를 추가합니다.
`beforeRouteLeave`와 유사하지만, 모든 컴포넌트에서 사용할 수 있습니다.
컴포넌트가 마운트 해제되면 가드가 제거됩니다.

#### Parameters %{#Functions-onBeforeRouteLeave-Parameters}%

| 이름           | 타입                                                 | 설명                                               |
|:-------------|:---------------------------------------------------|:-------------------------------------------------|
| `leaveGuard` | [`NavigationGuard`](interfaces/NavigationGuard.md) | [NavigationGuard](interfaces/NavigationGuard.md) |

#### Returns %{#Functions-onBeforeRouteLeave-Returns}%

`void`

___

### onBeforeRouteUpdate %{#Functions-onBeforeRouteUpdate}%

▸ **onBeforeRouteUpdate**(`updateGuard`): `void`

현재 위치가 업데이트될 때마다 트리거되는 내비게이션 가드를 추가합니다.
`beforeRouteUpdate`와 유사하지만, 모든 컴포넌트에서 사용할 수 있습니다.
컴포넌트가 마운트 해제되면 가드가 제거됩니다.

#### Parameters %{#Functions-onBeforeRouteUpdate-Parameters}%

| 이름            | 타입                                                 | 설명                                               |
|:--------------|:---------------------------------------------------|:-------------------------------------------------|
| `updateGuard` | [`NavigationGuard`](interfaces/NavigationGuard.md) | [NavigationGuard](interfaces/NavigationGuard.md) |

#### Returns %{#Functions-onBeforeRouteUpdate-Returns}%

`void`

___

### useLink %{#Functions-useLink}%

▸ **useLink**(`props`): `Object`

#### Parameters %{#Functions-useLink-Parameters}%

| 이름      | 타입                                    |
|:--------|:--------------------------------------|
| `props` | `VueUseOptions`<`RouterLinkOptions`\> |

#### Returns %{#Functions-useLink-Returns}%

`Object`

| 이름              | 타입                                                                                     |
|:----------------|:---------------------------------------------------------------------------------------|
| `href`          | `ComputedRef`<`string`\>                                                               |
| `isActive`      | `ComputedRef`<`boolean`\>                                                              |
| `isExactActive` | `ComputedRef`<`boolean`\>                                                              |
| `navigate`      | (`e`: `MouseEvent`) => `Promise`<`void` \                                              | [`NavigationFailure`](interfaces/NavigationFailure.md)\> |
| `route`         | `ComputedRef`<[`RouteLocation`](interfaces/RouteLocation.md) & { `href`: `string`  }\> |

___

### useRoute %{#Functions-useRoute}%

▸ **useRoute**(): [`RouteLocationNormalizedLoaded`](interfaces/RouteLocationNormalizedLoaded.md)

현재 경로 위치를 반환합니다.
템플릿 내에서 `$route`를 사용하는 것과 같습니다.

#### Returns %{#Functions-useRoute-Returns}%

[`RouteLocationNormalizedLoaded`](interfaces/RouteLocationNormalizedLoaded.md)

___

### useRouter %{#Functions-useRouter}%

▸ **useRouter**(): [`Router`](interfaces/Router.md)

라우터 인스턴스를 반환합니다.
템플릿 내에서 `$router`를 사용하는 것과 같습니다.

#### Returns %{#Functions-useRouter-Returns}%

[`Router`](interfaces/Router.md)
