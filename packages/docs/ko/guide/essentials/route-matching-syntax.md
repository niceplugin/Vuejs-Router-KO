# 라우트 매칭 문법 %{#Routes-Matching-Syntax}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/vue-router-4-advanced-routes-matching-syntax"
  title="Learn how to use advanced route routes' matching syntax"
/>

대부분의 애플리케이션은 `/about` 같은 정적 라우트 및 [동적 라우트 매칭](./dynamic-matching.md)에서 방금 본 것처럼 `/users/:userId`와 같은 동적 라우트를 사용할 것입니다. 하지만 Vue Router는 훨씬 더 많은 기능을 제공합니다!

:::tip
편의상 모든 라우트에서 **`component` 프로퍼티를 생략**하고 `path` 값에 주목 하겠습니다.
:::

## 파라미터의 사용자 정의 정규식 %{#Custom-regex-in-params}%

`:userId`와 같은 파라미터를 정의할 때, 내부적으로는 다음과 같은 정규식을 사용합니다: `([^/]+)` (슬래시 `/`가 아닌 한 개 이상의 문자). 이것은 URL에서 파라미터를 잘 추출합니다. 그러나 파라미터 값에 따라 두 라우트를 구분해야 하는 경우 문제가 발생할 수 있습니다. 예를 들어, `/:orderId`와 `/:productName`이라는 두 라우트가 있다고 가정하면, 둘 다 동일한 URL에 매칭됩니다. 따라서 이를 구분할 방법이 필요합니다. 가장 간단한 방법은 경로에 구분할 수 있는 정적 섹션을 추가하는 것입니다:

```js
const routes = [
  // 매칭 /o/3549
  { path: '/o/:orderId' },
  // 매칭 /p/books
  { path: '/p/:productName' },
]
```

하지만 경우에 따라서 `/o` 또는 `/p`와 같은 정적 섹션을 추가하고 싶지 않을 수 있습니다. 만약 `orderId`는 항상 숫자이고 `productName`은 어떤 것이든 될 수 있는 조건이라면 파라미터 괄호 안에 사용자 정의 정규식을 지정할 수 있습니다:

```js
const routes = [
  // /:orderId -> 숫자만 매칭
  { path: '/:orderId(\\d+)' },
  // /:productName -> 그 외 모든 것과 매칭
  { path: '/:productName' },
]
```

이제 `/25`로 이동하면 `/:orderId`에 매칭되고, 다른 모든 것은 `/:productName`에 매칭됩니다. `routes` 배열의 순서는 중요하지 않습니다!

:::tip
JavaScript 문자열에서 실제로 백슬래시 문자를 전달하려면 `\d`를 `\\d`로 하는 것처럼 **백슬래시(`\`)를 이스케이프 처리**해야 합니다.
:::

## 반복 가능한 파라미터 %{#Repeatable-params}%

`/first/second/third`와 같이 여러 섹션이 있는 라우트를 매칭해야 하는 경우, 파라미터를 `*` (0개 이상) 또는 `+` (1개 이상)로 반복 가능하도록 표시해야 합니다:

```js
const routes = [
  // /:chapters -> /one, /one/two, /one/two/three 등 매칭
  { path: '/:chapters+' },
  // /:chapters -> /, /one, /one/two, /one/two/three 등 매칭
  { path: '/:chapters*' },
]
```

이렇게 하면 파라미터는 문자열 대신 배열을 가지며, 네임드 라우트를 사용할 때도 배열을 전달해야 합니다:

```js
// 정의됨 { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// 생성됨 /
router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href
// 생성됨 /a/b

// 정의됨 { path: '/:chapters+', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// `chapters`가 비어있기 때문에 오류가 발생합니다.
```

이것은 **닫는 괄호 뒤에** 추가하여 사용자 정의 정규식과 함께 사용할 수도 있습니다:

```js
const routes = [
  // 숫자만 매칭
  // /1, /1/2 등 매칭
  { path: '/:chapters(\\d+)+' },
  // /, /1, /1/2 등 매칭
  { path: '/:chapters(\\d+)*' },
]
```

## 민감하고 엄격한 라우트 구성 %{#Sensitive-and-strict-route-options}%

기본적으로 모든 라우트는 대소문자를 구분하지 않으며, 끝에 슬래시가 있든 없든 라우트를 매칭합니다. 예를 들어, `/users` 라우트는 `/users`, `/users/` 심지어 `/Users/`와도 매칭됩니다. 이러한 동작은 `strict`(끝에 슬래시 구분) 및 `sensitive`(대소문자 구분) 옵션으로 구성할 수 있으며, 이는 라우터와 라우트 모두에 적용할 수 있습니다:

```js
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // /users/posva 와 매칭되지만 아래는 안됩니다:
    // - /users/posva/ 왜냐하면 strict: true
    // - /Users/posva 왜냐하면 sensitive: true
    { path: '/users/:id', sensitive: true },
    // /users, /Users, /users/42 와 매칭되지만 /users/, /users/42/ 는 안됩니다.
    { path: '/users/:id?' },
  ],
  strict: true, // 모든 라우트에 적용
})
```

## 선택적 파라미터 %{#Optional-parameters}%

파라미터에 `?` 수식어를 사용하여 (0 또는 1개만 있도록) 선택 사항으로 표시할 수도 있습니다:

```js
const routes = [
  // /users, /users/posva 와 매칭될 것입니다
  { path: '/users/:userId?' },
  // /users, /users/42 와 매칭될 것입니다
  { path: '/users/:userId(\\d+)?' },
]
```

`*`도 기술적으로는 파라미터를 선택 사항으로 표시하지만 `?` 파라미터는 반복할 수 없습니다.

라우트 세그먼트에 **선택적 파라미터만 있는 경우**, 경로는 **끝에 슬래시가 없는 경로**와 매칭되지 않습니다. 예를 들어:

- `/users/:uid?-:name?`는 `/users`와 매칭되지 않으며, 오직 `/users/-` 또는 `/users/-/`와 매칭됩니다.
- `/users/:uid(\\d+)?:name?`는 `/users`와 매칭되지 않으며, 오직 `/users/`, `/users/2`, `/users/2/` 등과 매칭됩니다.

[Playground](https://paths.esm.dev/?p=AAMsIPQg4AoKzidgQFoEXAmw-IEBBRYYOE0SkABTASiz1qgBpgQA1QTsFjAb3h2onsmlAmGIFsCXjXh4AIA.&t=/users/2/#)에서 매칭 문법을 직접 실험해볼 수 있습니다.

## 디버깅 %{#Debugging}%

라우트가 왜 매칭되지 않는지 이해하거나 버그를 보고하기 위해 라우트가 정규식으로 어떻게 변환되는지 확인해야 한다면, [경로 순위 확인 도구](https://paths.esm.dev/?p=AAMeJSyAwR4UbFDAFxAcAGAIJXMAAA..#)를 사용할 수 있습니다. 이 도구는 URL을 통해 라우트를 공유하는 기능을 지원합니다.
