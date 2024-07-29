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

The `scrollBehavior` function receives the `to` and `from` route objects, like [Navigation Guards](./navigation-guards.md). The third argument, `savedPosition`, is only available if this is a `popstate` navigation (triggered by the browser's back/forward buttons).

The function can return a [`ScrollToOptions`](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions) position object:

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // 항상 최상단으로 스크롤.
    return { top: 0 }
  },
})
```

You can also pass a CSS selector or a DOM element via `el`. In that scenario, `top` and `left` will be treated as relative offsets to that element.

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll 10px above the element #main
    return {
      // could also be
      // el: document.getElementById('main'),
      el: '#main',
      // 10px above the element
      top: 10,
    }
  },
})
```

If a falsy value or an empty object is returned, no scrolling will happen.

Returning the `savedPosition` will result in a native-like behavior when navigating with back/forward buttons:

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

If you want to simulate the "scroll to anchor" behavior:

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

If your browser supports [scroll behavior](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions/behavior), you can make it smooth:

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

## Delaying the scroll %{#Delaying-the-scroll}%

Sometimes we need to wait a bit before scrolling in the page. For example, when dealing with transitions, we want to wait for the transition to finish before scrolling. To do this you can return a Promise that returns the desired position descriptor. Here is an example where we wait 500ms before scrolling:

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

It's possible to hook this up with events from a page-level transition component to make the scroll behavior play nicely with your page transitions, but due to the possible variance and complexity in use cases, we simply provide this primitive to enable specific userland implementations.
