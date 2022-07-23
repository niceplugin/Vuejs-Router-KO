# `<router-link>`의 `v-slot` {#router-link-s-v-slot}

`<router-link>`는 [범위가 지정된 슬롯](https://v3-docs.vuejs-korea.org/guide/components/slots.html#scoped-slots)을 통해 저수준으로 커스텀된 것을 노출합니다.
이것은 주로 라이브러리 작성자를 대상으로 하는 고급 API이지만,
커스텀 컴포넌트로 경로 링크를 만들려는 개발자에게도 유용할 수 있습니다.

:::tip
`<router-link>`에 `custom` 속성을 사용해,
콘텐츠가 `<a>` 엘리먼트 내부에 래핑되지 않도록 하십시오.
:::

```html
<router-link
  to="/about"
  custom
  v-slot="{ href, route, navigate, isActive, isExactActive }"
>
  <MyNavLink :active="isActive" :href="href" @click="navigate">
    {{ route.fullPath }}
  </MyNavLink>
</router-link>
```

- `href`: 이동할 URL이며, `<a>` 엘리먼트의 `href` 속성 값이 되야 합니다.
  히스토리 모드를 구성할 때 `base`가 전달된 경우, 해당 값이 여기에 포함됩니다.
- `route`: 이동해야 할 경로가 정규화된 위치 객체.
- `navigate`: 탐색을 트리거하는 함수입니다.
  `router-link`처럼 **이벤트를 자동으로 prevent**하며,
  `ctrl` 또는 `cmd` + 클릭 시에도 이벤트를 prevent합니다.
- `isActive`: [active-class](/api/built-in-components/router-link-props.html#active-class)를 적용해야 하는 경우 `true`입니다.
- `isExactActive`: [exact-active-class](/api/built-in-components/router-link-props.html#exact-active-class)를 적용해야 하는 경우 `true`입니다.

### 예제: 외부 엘리먼트에 활성화된 클래스 적용하기

때로는 활성화된 클래스가 `<a>` 엘리먼트가 아닌,
외부 엘리먼트에게 적용되어야 할 수 있습니다.
이 경우 해당 엘리먼트를 `router-link` 내부에 래핑한 후,
`v-slot` 속성으로 링크를 생성하면 됩니다:

```html
<router-link
  to="/foo"
  custom
  v-slot="{ href, route, navigate, isActive, isExactActive }"
>
  <li
    :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
  >
    <a :href="href" @click="navigate">{{ route.fullPath }}</a>
  </li>
</router-link>
```

:::tip
`a` 엘리먼트에 `target="_blank"`를 추가하는 경우,
`@click="navigate"` 핸들러를 생략해야 합니다.
:::