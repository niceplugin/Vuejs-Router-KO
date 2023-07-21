# 경로 매칭 문법 %{#routes-matching-syntax}%

<VueSchoolLink
href="https://vueschool.io/lessons/vue-router-4-advanced-routes-matching-syntax"
title="Learn how to use advanced route routes' matching syntax"
/>

대부분의 앱은 [동적 경로 매칭](dynamic-matching.md)에서 본 것처럼, `/about` 같은 정적 경로와 `/users/:userId` 같은 동적 경로를 사용하지만, Vue Router는 훨씬 더 많은 것을 제공합니다!

:::tip
이 문서에서는, 각 경로 객체의 `path` 속성 값을 집중 탐구하기 위해 의도적으로 `component` 속성은 생략했습니다.
:::

## 파라미터에 커스텀 정규식 사용하기 %{#custom-regex-in-params}%

`:userId`라는 파라미터를 정의하면, 내부적으로 "`/`가 아닌 하나 이상의 문자"라는 의미를 가진 `([^/]+)` 정규식을 사용하여, URL에서 파라미터를 추출합니다. 두 개의 경로가 파라미터를 기반으로 구분되어야 하는 경우가 아니라면 잘 작동합니다. 만약 `/:orderId`과 `/:productName` 두 개의 경로가 있고, 두 경로 모두 동일한 파라미터를 가지고 있다고 가정해 봅시다. 이럴 경우 이 두 경로를 구분할 필요가 있으므로, 경로에 정적 섹션을 추가하면 됩니다:

```js
const routes = [
  // 매치: /order/3549
  { path: '/order/:orderId' },
  // 매치:  /product/books
  { path: '/product/:productName' },
]
```

그러나 때에 따라서는 정적 섹션 `/order` 또는 `/product`를 추가하고 싶지 않을 수 있습니다. `:orderId`은 숫자만 가능하지만, `:productName`은 무엇이든 가능하다면, 파라미터에 괄호를 사용해 커스텀 정규식을 지정할 수 있습니다:

```js
const routes = [
  // /:orderId -> 숫자만 매치됨
  { path: '/:orderId(\\d+)' },
  // /:productName -> 무엇이든 매치됨
  { path: '/:productName' },
]
```

이제 `/25`로 이동하면 `/:orderId`와 일치하고, 다른 항목으로 이동하면 `/:productName`과 일치합니다. `routes` 배열의 순서는 중요하지 않습니다!

:::tip
JavaScript 문자열에서 `\` 문자를 실제로 `\d`처럼 전달하려면, **`\`를 이스케이프**처리해 `\\d`와 같이 전달해야 합니다.
:::

## 반복가능한 파라미터 %{#repeatable-params}%

`/first/second/third`처럼 여러 섹션이 있는 경로를 매칭해야 하는 경우, 파라미터에 `*`(의미: 0개 이상) 또는 `+`(의미: 1개 이상)를 사용하여, 파라미터가 반복 가능함을 정의해야 합니다:

```js
const routes = [
  // /:chapters -> 매치됨 /, /one, /one/two, /one/two/three, 등
  { path: '/:chapters*' },
  // /:chapters -> 매치됨 /one, /one/two, /one/two/three, 등
  { path: '/:chapters+' },
]
```

이렇게 하면 파라미터에 문자열 대신 배열이 제공되며, 명명된 경로를 사용할 때 배열을 전달해야 합니다:

```js
// 다음의 경우 { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// 탐색된 경로 /
router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href
// 탐색된 경로 /a/b

// 다음의 경우 { path: '/:chapters+', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// `+`를 사용했으나 `chapters`가 비어있으므로 애러가 발생함.
```

**닫는 괄호 뒤에 추가하여** 커스텀 정규식과 결합할 수도 있습니다:

```js
const routes = [
  // 숫자만 매치함
  // 매치됨 /1, /1/2, etc
  { path: '/:chapters(\\d+)+' },
  // 매치됨 /, /1, /1/2, etc
  { path: '/:chapters(\\d+)*' },
]
```

## 민감하고 엄격한 경로 옵션 %{#sensitive-and-strict-route-options}%

기본적으로 모든 경로는 대소문자를 구분하지 않으며, 후행 슬래시가 있거나 없는 경로와 일치합니다. 예를 들어 `/users` 경로는 `/users`, `/users/`, 심지어 `/Users/`와 일치합니다. 이 동작은 `strict` 및 `sensitive` 옵션으로 구성할 수 있으며, 라우터 또는 경로 단계에서 설정할 수 있습니다:

```js
const router = createRouter({
  history: createWebHistory(),
  strict: true, // 모든 경로에 적용
  routes: [
    // /users/posva 는 매치가능, 하지만 다음은 아님:
    // - /users/posva/ 이유는 strict: true
    // - /Users/posva  이유는 sensitive: true
    { path: '/users/:id', sensitive: true },
    // /users, /Users, /users/42 는 매치가능, 하지만 /users/ 또는 /users/42/ 는 아님
    { path: '/users/:id?' },
  ],
})
```

## 선택적 파라미터 %{#optional-parameters}%

`?`(0개 또는 1개) 수식어를 사용하여 파라미터를 선택사항으로 정의할 수도 있습니다:

```js
const routes = [
  // 매치 가능: /users, /users/posva
  { path: '/users/:userId?' },
  // 매치 가능: /users, /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

`*`는 기술적으로 파라미터를 선택사항으로 정의합니다. 하지만 `?`는 반복 불가능 파라미터로 배열 대신 문자열을 제공집니다.

## 디버깅 %{#debugging}%

경로가 매칭되지 않는 원인을 찾아야 하는 경우가 있습니다. 경로가 정규식으로 변환되는 방법 분석 또는 버그 보고를 위해 [경로 우선순위 확인 도구](https://paths.esm.dev/?p=AAMeJSyAwR4UbFDAFxAcAGAIJXMAAA..#)를 사용할 수 있습니다.
