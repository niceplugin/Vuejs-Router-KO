# RouteLocationRaw

`router.push()`나 `redirect`에 전달하거나,
[Navigation Guards](/guide/advanced/navigation-guards.md)에서 반환하는 유저-레벨(개발자 입장에서 사용 가능한) 경로 위치입니다.

이 저수준 위치는 `/users/posva#bio`와 같은 `string`이거나, 객체 입니다:

```js
// 이 세 가지 포멧은 동일함.
router.push('/users/posva#bio')
router.push({ path: '/users/posva', hash: '#bio' })
router.push({ name: 'users', params: { username: 'posva' }, hash: '#bio' })
// 해시만 변경.
router.push({ hash: '#bio' })
// 쿼리만 변경
router.push({ query: { page: '2' } })
// 파라미터만 변경
router.push({ params: { username: 'jolyne' } })
```

참고로 `path`는 인코딩된 상태로 제공되어야 하며(예: `phantom blood`는 `phantom%20blood`으로),
`params`, `query` 및 `hash`는 인코딩되지 않아야 하며 라우터에 의해 인코딩됩니다.

저수준 경로 위치는 네비게이션 가드에서 `router.push()` 대신 `router.replace()`를 호출하는 `replace` 옵션도 지원합니다.
이것을 사용하면 `router.push()`를 호출할 때,
내부적으로 `router.replace()`를 호출합니다.

```js
router.push({ hash: '#bio', replace: true })
// 둘 다 동일함.
router.replace({ hash: '#bio' })
```