# NavigationGuard

- **인자**:

  - [`RouteLocationNormalized`](/api/typescript/route-location-normalized.html) to - 탐색하려고 한 경로 위치.
  - [`RouteLocationNormalized`](/api/typescript/route-location-normalized.html) from - 탐색을 시작한 경로 위치.
  - `Function` next (선택적) - 탐색을 승인하는 콜백

- **상세**:

  경로 탐색을 제어하기 위해 전달할 수 있는 함수입니다.
  값(또는 Promise)을 반환하는 경우, `next` 콜백을 생략할 수 있으며, 이 패턴은 권장됩니다.
  이 함수에서 반환 가능한 값 또는 `next`에 전달 가능한 인자는 다음과 같습니다:

  - `undefined | void | true`: 탐색이 유효함.
  - `false`: 탐색이 취소됨.
  - [`RouteLocationRaw`](/api/typescript/route-location-raw.html): 다른 위치로 리디렉션.
  - `(vm: ComponentPublicInstance) => any` **`beforeRouteEnter`에만 해당**:
    탐색이 완료되면 실행할 콜백. 경로 컴포넌트 인스턴스를 인자로 받습니다.

- **참고**: [가이드 - 네비게이션 가드](/guide/advanced/navigation-guards.md)