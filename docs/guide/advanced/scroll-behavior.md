# 스크롤 동작 %{#scroll-behavior}%

<VueSchoolLink
href="https://vueschool.io/lessons/scroll-behavior"
title="Learn how to customize scroll behavior"
/>

클라이언트 측 라우팅을 사용할 때, 새로운 경로로 이동하면 스크롤을 맨위로 이동하거나, 이전 페이지를 다시 로드하면 기록된 스크롤 위치로 이동하도록 구현할 수 있습니다. 또한 경로 탐색 시, 스크롤 동작을 원하는 대로 커스텀할 수 있습니다.

**참고: 이 기능은 브라우저가 `history.pushState`를 지원하는 경우에만 작동.**

라우터 인스턴스를 생성할 때, `scrollBehavior` 함수를 제공할 수 있습니다:

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 원하는 위치
  }
})
```

`scrollBehavior` 함수는 [네비게이션 가드](navigation-guards.md)처럼 경로 객체 `to`와 `from`을 인자로 받습니다. 세 번째 인자 `savedPosition`은 `popstate` 탐색(브라우저의 뒤로/앞으로 버튼에 의해 트리거됨)인 경우에만 사용할 수 있습니다.

이 함수는 [`ScrollToOptions`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions) 형식의 위치 객체를 반환할 수 있습니다:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 항상 맨 위로 스크롤
    return { top: 0 }
  },
})
```

`el`을 통해 CSS 셀렉터 또는 DOM 엘리먼트를 전달할 수도 있습니다. 아래 예제는 `top`과 `left`는 해당 엘리먼트에 대한 상대 오프셋으로 처리됩니다:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 항상 #main 엘리먼트가 추가적으로 10px만큼 위로 올라간 상태로 스크롤
    return {
      // 아래 코드는
      // `el: document.getElementById('main'),`과 동일
      el: '#main',
      // 엘리먼트를 10px 위로
      top: 10,
    }
  },
})
```

거짓(falsy) 값이나 빈 객체가 반환되면, 스크롤이 발생하지 않습니다.

`savedPosition`을 반환하면 뒤로/앞으로 버튼으로 탐색할 때, 네이티브와 유사한 동작이 발생합니다:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
```

"앵커로 스크롤" 동작을 구현하려면:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
      }
    }
  },
})
```

브라우저가 [스크롤 동작](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions/behavior)을 지원하는 경우, 부드럽게 할 수 있습니다:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  }
})
```

## 스크롤 지연 %{#delaying-the-scroll}%

때때로 우리는 페이지에서 스크롤하기 전에 조금 기다려야 합니다. 예를 들어 트랜지션을 처리하는 경우, 트랜지션이 완료될 때까지 기다린 후 스크롤을 해야 합니다. 이를 위해 원하는 위치를 정의한 객체를 반환하는 Promise를 반환할 수 있습니다. 다음은 스크롤하기 전에 500ms를 기다리는 예제입니다:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })
  },
})
```

이것은 페이지 수준 트랜지션 컴포넌트의 이벤트와 연결하여, 페이지 트랜지션으로 스크롤 동작이 원활하게 재생되도록 할 수 있습니다. 하지만 개발의 다양성과 복잡성을 고려해, 개발자가 직접 무엇인가를 구현할 수 있도록, Promise 반환 방식을 제공합니다.
