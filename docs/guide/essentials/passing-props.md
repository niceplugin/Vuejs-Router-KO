# 경로 컴포넌트에 props 전달하기 %{#passing-props-to-route-components}%

컴포넌트에서 `$route`를 사용하면 특정 URL에서만 사용할 수 있으므로,
경로와 긴밀하게 결합되고 컴포넌트의 유연성이 제한됩니다.
이것이 반드시 나쁜 것은 아니지만,
`props` 옵션으로 이러한 작용을 분리할 수 있습니다.

이 예제 코드는:

```js
const User = {
  template: '<div>사용자: {{ $route.params.id }}</div>'
}
const routes = [{ path: '/user/:id', component: User }]
```

이렇게 바꿀 수 있습니다:

```js
const User = {
  // 경로의 파라미터와 동일한 이름으로 prop을 추가해야 함.
  props: ['id'],
  template: '<div>사용자: {{ id }}</div>'
}
const routes = [{ path: '/user/:id', component: User, props: true }]
```

이렇게 하면 어디에서나 컴포넌트를 더 쉽게 재사용하고 테스트할 수 있습니다.

::: tip 꼭 기억하기!
컴포넌트에서 바로 `route` 정보를 사용하지 않고 `props`로 분리하여,
`props`를 사용하는 것은 비효율적이라고 느껴질 수 있습니다.

이 패턴의 근본적인 목적은 "**경로에 컴포넌트가 종속되지 않고 가독성과 재사용성을 유지**"하기 위함임을 인지해야 합니다.
:::

## 불리언 모드 %{#boolean-mode}%

경로의 `props`가 `true`로 설정되면, `route.params`가 컴포넌트의 props로 설정됩니다.

## 이름이 있는 뷰 %{#named-views}%

이름이 있는 뷰가 있는 경로의 경우,
이름이 있는 뷰 각각에 `props` 옵션을 정의해야 합니다:

```js
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

## 객체 모드 %{#object-mode}%

`props`가 객체인 경우,
이는 그대로 컴포넌트의 props로 설정됩니다.
Props가 정적일 때 유용합니다.

```js
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

## 함수 모드 %{#function-mode}%

Props를 반환하는 함수를 만들 수 있습니다.
이를 통해 파라미터를 다른 유형으로 캐스팅하고,
정적 값을 경로 기반의 값과 결합하는 등의 작업을 수행할 수 있습니다.

```js
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => ({ query: route.query.q })
  }
]
```

`/search?q=vue`는 `SearchUser` 컴포넌트의 props로 `{ query: 'vue' }`를 전달합니다.

경로가 변경될 때만 `props`를 정의하는 함수가 평가되므로,
상태가 변경될 때도 반응하는 `props`를 전달하려면,
함수 내부에 상태를 사용하는 대신,
래퍼 컴포넌트를 사용해 계산된 속성(`computed`)을 `props`로 전달해야 합니다.

::: details "래퍼 컴포넌트" 없이 "경로 컴포넌트" 내부에 계산된 속성을 사용하면?
래퍼 컴포넌트 없이 경로 컴포넌트 내부에 계산된 속성을 사용하는 경우,
컴포넌트로 전달된 `props`는 상태를 고려할 필요가 없는 경우에도 상태를 고려해야 합니다.
이렇게되면 경로를 세팅할 때 `props`를 정의하여,
어디에서나 컴포넌트의 재사용성과 테스트가 쉽도록 설계한 패턴이 무의미해집니다.
결국 `props`의 흐름이 불명확해 가독성과 추적관리가 어렵고 오작동을 유발합니다.
:::
