# 트랜지션 %{#transitions}%

경로 컴포넌트에서 트랜지션을 사용하고 탐색에 애니메이션을 적용하려면,
[v-slot API](/api/#routerview)를 사용해야 합니다:

```html
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
```

모든 트랜지션 API 작동은 [이곳](https://vuejs.kr/guide/built-ins/transition.html)에서 설명하는 것과 같습니다.

## 라우트 별 트랜지션 %{#per-route-transition}%

위 예제는 모든 경로에 동일한 트랜지션을 적용합니다.
각 경로의 컴포넌트가 서로 다른 트랜지션을 갖도록 하려면,
[메타 필드](meta.md)와 `<transition>`의 `name`을 동적으로 조합해 사용하면 됩니다:

```js
const routes = [
  {
    path: '/custom-transition',
    component: PanelLeft,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/other-transition',
    component: PanelRight,
    meta: { transition: 'slide-right' },
  },
]
```

```html
<router-view v-slot="{ Component, route }">
  <!-- 커스텀 트랜지션 또는 `fade`를 사용 -->
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

## 경로 기반 동적 트랜지션 %{#route-based-dynamic-transition}%

대상 경로와 현재 경로 간의 관계를 기반으로,
사용할 트랜지션을 동적으로 설정할 수도 있습니다.
이전 예제 코드와 매우 유사합니다:

```html
<!-- 동적인 트랜지션의 name 사용 -->
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition">
    <component :is="Component" />
  </transition>
</router-view>
```

경로의 깊이에 따라 `meta` 필드에 정보를 동적으로 추가하기 위해,
[탐색 후 훅](navigation-guards.md#global-after-hooks)을 추가할 수 있습니다:

```js
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})
```

## 재사용된 뷰에서 강제로 트랜지션 %{#forcing-a-transition-between-reused-views}%

Vue는 동일한 컴포넌트를 자동으로 재사용하여 트랜지션이 작동하지 않을 수 있습니다.
다행히도 [`key`](https://vuejs.kr/api/built-in-special-attributes.html#key) 속성을 추가해 강제로 트랜지션을 트리거 하는 것이 가능합니다.
이렇게 하면 경로를 유지하면서 파라미터 변경에 의한 트랜지션을 구현할 수 있습니다:

```vue
<router-view v-slot="{ Component, route }">
  <transition name="fade">
    <component :is="Component" :key="route.path" />
  </transition>
</router-view>
```

<!-- TODO: interactive example -->
<!-- See full example [here](https://github.com/vuejs/vue-router/blob/dev/examples/transitions/app.js). -->