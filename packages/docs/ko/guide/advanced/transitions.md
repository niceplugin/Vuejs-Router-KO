# Transitions %{#Transitions}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/route-transitions"
  title="Learn about route transitions"
/>

라우터 컴포넌트에 트랜지션을 사용하고 탐색을 애니메이션화 하려면 [`<RouterView>` 슬롯](./router-view-slot)을 사용해야 합니다:

```vue-html
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>
```

[모든 트랜지션 API](https://vuejs.org/guide/built-ins/transition.html)가 이곳에서도 동일하게 작동합니다.

## 라우트별 트랜지션 %{#Per-Route-Transition}%

위의 사용법은 모든 라우트에 동일한 트랜지션을 적용합니다. 각 라우트의 컴포넌트에 다른 트랜지션을 적용하려면, [메타 필드](./meta.md)와 동적 `name`을 `<transition>`에 결합해야 합니다:

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

```vue-html
<router-view v-slot="{ Component, route }">
  <!-- 사용자 지정 트랜지션을 사용하거나 `fade`로 대체합니다. -->
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

## 라우트 기반의 동적 트랜지션 %{#Route-Based-Dynamic-Transition}%

목표 라우트와 현재 라우트 간의 관계를 기반으로 사용할 트랜지션을 동적으로 결정하는 것도 가능합니다. 이전과 매우 유사한 코드 조각을 사용합니다:

```vue-html
<!-- 동적 트랜지션 이름 사용 -->
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition">
    <component :is="Component" />
  </transition>
</router-view>
```

[에프터 훅](./navigation-guards.md#Global-After-Hooks)을 사용하여 라우트 깊이에 따라 동적으로 `meta` 필드에 정보를 추가할 수 있습니다:

```js
router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})
```

## 재사용되는 뷰 강제 트랜지션 %{#Forcing-a-transition-between-reused-views}%

Vue는 자동으로 재사용하는 컴포넌트의 트랜지션을 피할 수 있습니다. 다행히도 [`key` 프로퍼티](https://vuejs.org/api/built-in-special-attributes.html#key)를 추가하여 트랜지션을 강제할 수 있습니다. 이를 통해 동일한 라우트에서 다른 파라미터를 사용하여 트랜지션을 트리거할 수도 있습니다:

```vue-html
<router-view v-slot="{ Component, route }">
  <transition name="fade">
    <component :is="Component" :key="route.path" />
  </transition>
</router-view>
```

<!-- TODO: interactive example -->
<!-- See full example [here](https://github.com/vuejs/vue-router/blob/dev/examples/transitions/app.js). -->
