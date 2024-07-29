# 라우트 메타 필드 %{#Route-Meta-Fields}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/route-meta-fields"
  title="Learn how to use route meta fields"
/>

때때로 라우트에 임의의 정보를 첨부하고 싶을 때가 있습니다. 예를 들어 트랜지션 이름, 라우트에 접근할 수 있는 유저를 제어하는 역할 등 입니다. 이는 프로퍼티 객체를 허용하는 `meta` 프로퍼티를 통해 구현할 수 있으며, 라우트 로케이션 객체 및 네비게이션 가드에서 접근할 수 있는 습니다. `meta` 프로퍼티는 다음과 같이 정의할 수 있습니다:

```js
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // 인증된 유저만 게시글을 작성할 수 있음
        meta: { requiresAuth: true },
      },
      {
        path: ':id',
        component: PostsDetail,
        // 누구나 게시글을 읽을 수 있음
        meta: { requiresAuth: false },
      },
    ],
  },
]
```

그러면 `meta` 필드에 어떻게 접근할 수 있을까요?

<!-- TODO: the explanation about route records should be explained before and things should be moved here -->

우선, `routes` 배열에서 각 라우트 객체는 **라우트 레코드**라고 합니다. 라우트 레코드는 중첩될 수 있습니다. 따라서 라우트가 매칭될 때, 하나 이상의 라우트 레코드와 매칭될 수 있습니다.

예를 들어, 위의 라우트 구성에서 URL `/posts/new`는 부모 라우트 레코드(`path: '/posts'`)와 자식 라우트 레코드(`path: 'new'`) 모두와 매칭됩니다.

라우트와 일치된 모든 라우트 레코드는 `route` 객체(네비게이션 가드의 라우트 객체 포함)에서 `route.matched` 배열로 노출됩니다. 이 배열을 통해 모든 `meta` 필드를 확인할 수 있지만, Vue Router는 부모에서 자식까지 **모든 `meta`** 필드를 비재귀으로 병합한 `route.meta`도 제공합니다. 이는 다음과 같이 간단하게 작성할 수 있음을 의미합니다:

```js
router.beforeEach((to, from) => {
  // to.matched.some(record => record.meta.requiresAuth) 처럼
  // 모든 라우트 레코드를 확인할 필요가 없음.
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // 이 라우트는 인증이 필요하므로 로그인 여부를 확인하고
    // 로그인하지 않았다면 로그인 페이지로 리다이렉션합니다.
    return {
      path: '/login',
      // 나중에 돌아올 수 있도록 현재 위치를 저장합니다.
      query: { redirect: to.fullPath },
    }
  }
})
```

## TypeScript %{#TypeScript}%

`RouteMeta` 인터페이스를 `vue-router`에서 확장하여 `meta` 필드에 타입을 지정할 수 있습니다:

```ts
// 이를 `router.ts`와 같은 `.ts` 파일에 직접 추가할 수 있습니다.
// 또는 `.d.ts` 파일에 추가할 수도 있습니다.
// 해당 파일이 프로젝트의 tsconfig.json의 "files"에 포함되어 있는지 확인하십시오.
import 'vue-router'

// 모듈로 인식되도록 최소한 하나의 `export` 문을 추가하십시오.
export {}

declare module 'vue-router' {
  interface RouteMeta {
    // 선택 사항
    isAdmin?: boolean
    // 모든 라우트에서 선언해야 함
    requiresAuth: boolean
  }
}
```
