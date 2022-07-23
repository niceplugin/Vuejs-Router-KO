# 옵션 API {#component-injections}

## 컴포넌트에 주입된 속성 {#component-injected-properties}

이것은 컴포넌트에서 옵션 API 스타일 `<script>` 내부의 함수에서 `this`를 통해 접근 가능한 속성입니다.
`app.use(router)`를 호출함으로서 모든 자식 컴포넌트에 속성이 주입됩니다.

- this.\$router

  라우터 인스턴스입니다.

- this.\$route

  유효한 [현재 경로 위치](/api/typescript/route-location-normalized.html).
  이 속성은 읽기 전용이며, 속성은 변경할 수 없지만 감시할 수 있습니다.

## 컴포넌트에서 사용 가능한 옵션 {#component-enabled-options}

이것은 컴포넌트에서 옵션 API 스타일로 `<script>`를 작성할 때,
내부에 추가 가능한 옵션입니다:

- **beforeRouteEnter**
- **beforeRouteUpdate**
- **beforeRouteLeave**

**참고**: [가이드 - 네비게이션 가드: 컴포넌트 내부 가드](/guide/advanced/navigation-guards.md#in-component-guards).