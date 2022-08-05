# NavigationFailureType

탐색 실패에 대해 가능한 모든 유형의 열거입니다.
특정 실패를 확인하기 위해 [isNavigationFailure](../functions/isNavigationFailure.md)에 전달할 수 있습니다.

### 열거형(enum) 구성 {#enumeration-members}

- **aborted** = ``4``<br>
  중단된 탐색: 네비게이션 가드가 `false`를 반환했거나,
  `next(false)`를 호출했기 때문에 실패한 탐색입니다.

- **cancelled** = ``8``<br>
  취소된 탐색:
  이 탐색 중(꼭 완료되는건 아님) 다른 탐색이 시작되어 실패한 탐색입니다.

- **duplicated** = ``16``<br>
  중복된 탐색:
  이미 정확히 같은 현재 위치에 있는 동안,
  이곳으로 탐색이 시작되어 때문에 실패한 탐색입니다.
