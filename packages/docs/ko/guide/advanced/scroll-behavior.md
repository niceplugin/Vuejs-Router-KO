# 스크롤 동작 %{#Scroll-Behavior}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/scroll-behavior"
  title="Learn how to customize scroll behavior"
/>

프론트엔드 라우팅을 사용하는 경우, 새로운 라우트로 이동할 때 페이지를 맨 위로 스크롤하거나, 마치 페이지를 새로 고친 것처럼 이전의 스크롤 위치를 유지하고 싶을 수 있습니다. Vue Router는 이러한 작업을 수행할 수 있게 해주며, 라우트 탐색 시 페이지의 스크롤 동작을 사용자 정의할 수 있습니다.

**참고: 이 기능은 브라우저가 `history.pushState`를 지원하는 경우에만 작동합니다.**

라우터 인스턴스를 생성할 때 `scrollBehavior` 함수를 제공할 수 있습니다:

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // 원하는 위치로 돌아가기.
  }
})
```

`scrollBehavior` 함수는 [네비게이션 가드](./navigation-guards.md) 처럼 `to`와 `from` 라우트 객체를 인자로 받습니다. 세 번째 인자인 `savedPosition`은 브라우저의 뒤로/앞으로 가기 버튼에 의해 트리거되는 `popstate` 탐색인 경우에만 사용할 수 있습니다.

이 함수는 [`ScrollToOptions`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions) 위치 객체를 반환할 수 있습니다:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 항상 최상단으로 스크롤.
    return { top: 0 }
  },
})
```

CSS 셀렉터나 DOM 엘리먼트를 `el`로 전달할 수도 있습니다. 이 경우 `top`과 `left`는 해당 엘리먼트에 대한 상대적 오프셋으로 처리됩니다.

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 항상 #main 엘리먼트 보다 10px 위로 스크롤하기.
    return {
      // 다음과 같이 작성할 수도 있습니다:
      // el: document.getElementById('main'),
      el: '#main',
      // 엘리먼트 보다 10px 위로
      top: 10,
    }
  },
})
```

Falsy 값이나 빈 객체를 반환하면 스크롤이 발생하지 않습니다.

`savedPosition`을 반환하면 뒤로/앞으로 가기 버튼으로 탐색할 때 네이티브와 같은 동작이 이루어집니다:

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

"앵커로 스크롤" 동작을 시뮬레이션하려면 다음과 같이 할 수 있습니다:

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

브라우저가 [scroll behavior](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions/behavior)를 지원하는 경우, 스크롤을 부드럽게 할 수 있습니다:

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

## 지연된 스크롤 %{#Delaying-the-scroll}%

페이지에서 스크롤하기 전에 잠시 기다려야 할 때가 있습니다. 예를 들어 트랜지션 작업을 처리할 때는 트랜지션이 완료되기를 기다렸다가 스크롤을 해야 합니다. 이를 위해 원하는 위치 객체를 반환하는 Promise를 반환할 수 있습니다. 여기 500ms 동안 기다린 후 스크롤하는 예제가 있습니다:

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

이것을 페이지 수준 트랜지션 컴포넌트의 이벤트와 연결하여 스크롤 동작이 페이지 트랜지션과 잘 맞아떨어지도록 할 수 있지만, 사용 사례의 다양성과 복잡성 때문에 개발자가 원하는 대로 구현할 수 있도록 이 기본 기능만 제공합니다.
