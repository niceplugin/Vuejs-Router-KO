# 경로 메타 필드 %{#route-meta-fields}%

때때로, 경로에 `meta`라는 속성 객체를 사용하여,
임의의 정보(예: 누가 경로에 접근 가능한지, 트랜지션 이름 등)를 추가하면,
경로 위치 및 탐색 가드에서 접근할 수 있습니다.

`meta` 속성은 다음과 같이 정의합니다:

```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 유저 인증 필수
        meta: { requiresAuth: true }
      },
      {
        path: ':id',
        component: PostsDetail,
        // 유저 인증 없어도 됨
        meta: { requiresAuth: false }
      }
    ]
  }
]
```

`meta` 필드는 다음과 같이 접근합니다.

<!-- TODO: the explanation about route records should be explained before and things should be moved here -->

먼저 `routes`의 각 경로 객체를 **경로 레코드**(route record)라고 하며, 중첩될 수 있습니다.
따라서 매칭된 경로는 둘 이상의 경로 레코드와 매칭될 수 있습니다.

예를 들어 위처럼 구성된 경로에서 `/posts/new`는 부모 경로 레코드(`path: '/posts'`)와 자식 경로 레코드(`path: 'new'`) 모두와 일치합니다.

경로와 일치하는 모든 경로 레코드는 `$route` 객체의 속성 `matched`에서 배열로 노출됩니다.
모든 `meta` 필드를 확인하기 위해 해당 배열을 뒤져볼 수 있지만,
Vue Router는 부모에서 자식으로 **모든 `meta`** 필드를 비재귀적 병합한 `$route.meta` 객체도 제공하므로,
`meta`에 간단히 접근할 수 있습니다.

```js
router.beforeEach((to, from) => {
  // to.matched.some(record => record.meta.requiresAuth)와 같이
  // 모든 경로 레코드를 확인하는 대신,
  // `to.meta.requiresAuth`처럼 바로 접근 가능함.
  //
  // 인증이 필수인 경로 && 로그인 하지 않았다면
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 로그인 페이지로 리디렉션
    return {
      path: '/login',
      // 나중에 다시 올 수 있도록, 방문한 위치를 저장
      query: { redirect: to.fullPath },
    }
  }
})
```

## TypeScript

`vue-router`에서 `RouteMeta` 인터페이스를 확장하여 메타 필드를 입력할 수 있습니다:

```ts
// 이것은 `router.ts`처럼, 아무 `.ts` 파일에 직접 추가 가능.
// `.d.ts` 파일에 추가 가능하며,
// 이 경우 모듈로 처리되도록 내보내기를 추가해야 함.
export {}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 선택적
    isAdmin?: boolean
    // 모든 경로에서 선언해야 함
    requiresAuth: boolean
  }
}
```
