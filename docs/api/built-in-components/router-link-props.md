# `<router-link>` Props

## to

- **타입**: [`RouteLocationRaw`](/api/typescript/route-location-raw.html)
- **상세**:

  링크의 대상 경로를 나타내는 `string` 또는 [경로 위치 객체](/api/typescript/route-location-raw.html) 입니다.
  클릭하면 `to` 속성 값이 내부적으로 `router.push()`로 전달됩니다.

```html
<!-- 리터럴 문자열 -->
<router-link to="/home">홈</router-link>
<!-- 다음과 같이 랜더링 됨 -->
<a href="/home">홈</a>

<!-- `v-bind`로 자바스크립 표현식을 사용 -->
<router-link :to="'/home'">홈</router-link>

<!-- 위 코드와 같음 -->
<router-link :to="{ path: '/home' }">홈</router-link>

<!-- 이름이 있는 경로 ->
<router-link :to="{ name: 'user', params: { userId: '123' }}">유저</router-link>

<!-- 쿼리 사용: `/register?plan=private` -->
<router-link :to="{ path: '/register', query: { plan: 'private' }}">
  등록하기
</router-link>
```

## replace

- **타입**: `boolean`
- **기본값**: `false`
- **상세**:

  `replace` 속성은 클릭 시 `router.push()` 대신 `router.replace()`가 호출되므로,
  탐색이 기록되지 않습니다.

```html
<router-link to="/abc" replace>ABC로 이동</router-link>
```

## active-class

- **타입**: `string`
- **기본값**: `"router-link-active"`
- **상세**:

  링크가 활성화 되었을 때, 렌더링된 `<a>`에 적용할 클래스입니다.
  [`linkActiveClass`](/api/typescript/router-options.html#linkactiveclass)로 전역 구성을 한 경우,
  기본값은 전역 구성 값 입니다.

## aria-current-value

- **타입**: `'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'`(`string`)
- **기본값**: `"page"`
- **상세**:

  링크가 정확히 활성화되면 [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) 속성에 값이 전달됩니다.

## custom

- **타입**: `boolean`
- **기본값**: `false`
- **상세**:

  `<router-link>`가 콘텐츠를 `<a>` 엘리먼트로 래핑하지 않아야 하는지 여부.

  커스텀 RouterLink를 생성하기 위해 [`v-slot`](/api/built-in-components/router-link-v-slot.html)을 사용할 때 유용합니다.
  기본적으로 `<router-link>`는 `v-slot`을 사용하는 경우에도 `<a>` 엘리먼트로 래핑된 콘텐츠를 렌더링하지만,
  `custom` 속성을 전달하면 래핑 기능이 비활성화됩니다.

- **예제**:

  ```html
  <router-link to="/home" custom v-slot="{ navigate, href, route }">
    <a :href="href" @click="navigate">{{ route.fullPath }}</a>
  </router-link>
  ```

  `<a href="/home">/home</a>`로 랜더링 됩니다.

  ```html
  <router-link to="/home" v-slot="{ route }">
    <span>{{ route.fullPath }}</span>
  </router-link>
  ```

  `<a href="/home"><span>/home</span></a>`로 랜더링 됩니다.

## exact-active-class

- **타입**: `string`
- **기본값**: `"router-link-exact-active"`
- **상세**:

  링크가 정확히 활성화 되었을 때, 렌더링된 `<a>`에 적용할 클래스입니다.
  [`linkExactActiveClass`](/api/typescript/router-options.html#linkexactactiveclass)로 전역 구성을 한 경우,
  기본값은 전역 구성 값 입니다.