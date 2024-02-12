# 이름이 있는 라우트 %{#Named-Routes}%

<VueSchoolLink
href="https://vueschool.io/lessons/named-routes"
title="Learn about the named routes"
/>

모든 라우트에는 `path`와 더불어 `name`도 제공할 수 있으며, 다음과 같은 장점이 있습니다:

- 하드코딩된 URL 없음.
- `params`을 자동 인코딩/디코딩.
- URL에 오타 발생 방지.
- 라우트의 우선순위를 우회.

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

`<router-link>` 컴포넌트의 `to`에 객체를 전달해 이름이 있는 라우트에 연결할 수 있습니다.

```vue-html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  유저 링크!
</router-link>
```

프로그래밍 방식의 `router.push()`에도 같은 방식의 객체를 사용합니다:

```js
router.push({ name: 'user', params: { username: 'erina' } })
```

위의 두 경우 모두 `/user/erina` 라우트로 이동합니다.

참고: [예제](https://github.com/vuejs/vue-router/blob/dev/examples/named-routes/app.js)

각 이름은 모든 라우트에서 **고유해야 합니다**. 하나의 이름을 여러 라우트에 추가하면 라우터는 마지막에 추가된 것만 유지합니다. 이에 관해서 더 자세한 정보는 [동적 라우팅](../advanced/dynamic-routing.md#Removing-routes) 섹션에서 확인할 수 있습니다.
