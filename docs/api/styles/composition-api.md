# 컴포지션 API {#composition-api}

## onBeforeRouteLeave

현재 위치의 컴포넌트가 떠나려고 할 때마다 트리거되는 네비게이션 가드를 추가합니다.
`beforeRouteLeave`와 유사하며 모든 컴포넌트에서 사용할 수 있습니다.
컴포넌트가 마운트 해제되면 가드가 제거됩니다.

**시그니처**:

```typescript
export declare function onBeforeRouteLeave(leaveGuard: NavigationGuard): void
```

### 파라미터

| 파라미터  | 타입                                  | 설명             |
| ---------- | ------------------------------------- | ----------------------- |
| leaveGuard | [`NavigationGuard`](/api/typescript/navigation-guard.html) | 네비게이션 가드를 추가합니다. |

## onBeforeRouteUpdate

현재 위치가 업데이트되려고 할 때마다 트리거되는 네비게이션 가드를 추가합니다.
`beforeRouteUpdate`와 유사하며 모든 컴포넌트에서 사용할 수 있습니다.
컴포넌트가 마운트 해제되면 가드가 제거됩니다.

**시그니처**:

```typescript
export declare function onBeforeRouteUpdate(updateGuard: NavigationGuard): void
```

### 파라미터

| 파라미터   | 타입                                  | 설명             |
| ----------- | ------------------------------------- | ----------------------- |
| updateGuard | [`NavigationGuard`](/api/typescript/navigation-guard.html) | 네비게이션 가드를 추가합니다. |

## useLink

[`v-slot` API](/api/built-in-components/router-link-v-slot.html)에 의해 노출되는 모든 것을 반환합니다.

**시그니처**:

```typescript
export declare function useLink(props: RouterLinkOptions): {
  route: ComputedRef<RouteLocationNormalized & { href: string }>,
  href: ComputedRef<string>,
  isActive: ComputedRef<boolean>,
  isExactActive: ComputedRef<boolean>,
  navigate: (event?: MouseEvent) => Promise(NavigationFailure | void),
}
```

### 파라미터

| 파라미터 | 타입                | 설명                                                                           |
| --------- | ------------------- | ------------------------------------------------------------------------------------- |
| props     | `RouterLinkOptions` | `<router-link>`에 전달할 수 있는 props 객체입니다. `Ref`와 `ComputedRef`를 허용합니다. |

## useRoute

현재 경로 위치를 반환합니다.
템플릿 내에서 `$route`를 사용하는 것과 같습니다.
`setup()` 내부에서 호출되어야 합니다.

**시그니처**:

```typescript
export declare function useRoute(): RouteLocationNormalized
```

## useRouter

라우터 인스턴스를 반환합니다.
템플릿 내에서 `$router`를 사용하는 것과 동일합니다.
`setup()` 내부에서 호출되어야 합니다.

**시그니처**:

```typescript
export declare function useRouter(): Router
```