# `<router-view>` Props

## name

- **타입**: `string`
- **기본값**: `"default"`
- **상세**:

  `<router-view>`에 `name`이 있으면,
  일치하는 경로 레코드의 `components` 옵션 내 `name`에 해당하는 값의 컴포넌트를 렌더링합니다.

- **참고**: [가이드 - 이름이 있는 뷰](/guide/essentials/named-views.md)

## route

- **타입**: [`RouteLocationNormalized`](/api/typescript/route-location-normalized.html)
- **상세**:

  모든 컴포넌트를 뷰(view)에 표시할 수 있도록 해결된(지연 로드인 경우 로드가 완료된) 경로 위치 객체를 받습니다.
  보통 `router.resolt`로 경로 위치 객체를 생성하며,
  이 객체는 `shallowRef`나 `computed`를 사용해 **반응형으로 감싼 객체**를 받아야 합니다.