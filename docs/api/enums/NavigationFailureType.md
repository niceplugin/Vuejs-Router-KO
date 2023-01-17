---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / NavigationFailureType

# Enumeration: NavigationFailureType

탐색 실패에 대해 가능한 모든 유형을 열거합니다.
특정 실패를 확인하기 위해 [isNavigationFailure](../index.md#isnavigationfailure)에 전달할 수 있습니다.

## Enumeration Members

### aborted (중단됨) {#aborted}

• **aborted** = ``4``

탐색 가드가 `false`를 반환했거나,
`next(false)`를 호출했기 때문에 실패한 탐색입니다.

___

### cancelled (취소됨) {#cancelled}

• **cancelled** = ``8``

취소된 탐색은 더 최근에 완료된 탐색이 시작되었기 때문에 실패한 탐색입니다(꼭 탐색이 완료된 것은 아님).

___

### duplicated (중복됨) {#duplicated}

• **duplicated** = ``16``

중복된 탐색은 이미 완전히 동일한 위치에 있는 동안 시작되었기 때문에 실패한 탐색입니다.