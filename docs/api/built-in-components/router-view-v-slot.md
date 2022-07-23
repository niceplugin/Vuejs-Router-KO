# `<router-view>`의 `v-slot`

`<router-view>`는 주로 `<transition>`와 `<keep-alive>` 컴포넌트로 경로 컴포넌트를 래핑하기 위해 `v-slot` API를 노출합니다.

```html
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition || 'fade'" mode="out-in">
    <keep-alive>
      <suspense>
        <template #default>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </template>
        <template #fallback> 로딩 중... </template>
      </suspense>
    </keep-alive>
  </transition>
</router-view>
```

- `Component`: `<component>`의 `is` prop에 전달할 VNode.
- `route`: 처리된(resolved) [정규화된 경로 위치](/api/typescript/route-location-normalized.html).

뷰 컴포넌트의 props를 `<router-view>`가 아닌 `<component>`에 직접 전달해야 합니다:

```html
<router-view v-slot="{ Component, route }">
  <component :is="Component" view-prop="value" />
</router-view>
```