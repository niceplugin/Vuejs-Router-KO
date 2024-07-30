# 네임드 라우트 %{#Named-Routes}%

<VueSchoolLink v-if="false"
  href="https://vueschool.io/lessons/named-routes"
  title="Learn about the named routes"
/>

라우트를 생성할 때, 선택적으로 라우트에 `name`을 부여할 수 있습니다:

```js
const routes = [
  {
    path: '/user/:username',
    name: 'profile', // [!code highlight]
    component: User
  }
]
```

그런 다음 `<router-link>`에 `to` 프로퍼티를 전달할 때 `path` 대신 `name`을 사용할 수 있습니다:

```vue-html
<router-link :to="{ name: 'profile', params: { username: 'erina' } }">
  User profile
</router-link>
```

위 예제는 `/user/erina`로 가는 링크를 생성합니다.

- [Playground에서 보기](https://play.vuejs.org/#eNqtVVtP2zAU/itWNqlFauNNIB6iUMEQEps0NjH2tOzBtKY1JLZlO6VTlP++4+PcelnFwyRofe7fubaKCiZk/GyjJBKFVsaRiswNZ45faU1q8mRUQUbrko8yuaPwlRfK/LkV1sHXpGHeq9JxMzScGmT19t5xkMaUaR1vOb9VBe+kntgWXz2Cs06O1LbCTwvRW7knGnEm50paRwIYcrEFd1xlkpBVyCQ5lN74ZOJV0Nom5JcnCFRCM7dKyIiOJkSygsNzBZiBmivAI7l0SUipRvuhCfPge7uWHBiGZPctS0iLJv7T2/YutFFPIt+JjgUJPn7DZ32CtWg7PIZ/4BASg7txKE6gC1VKNx69gw6NTqJJ1HQK5iR1vNA52M+8Yrr6OLuD+AuCtbQpBQYK9Oy6NAZAhLI1KKuKvEc69jSp65Tqw/oh3V7f00P9MsdveOWiecE75DDNhXwhiVMXWVRttYbUWdRpE2xOZ0sHxq1v2jl/a5jQyZ042Mv/HKjvt2aGFTCXFWmnAsTcCMkAxw4SHIjG9E2AUtpUusWyFvyVUGCltBsFmJB2W/dHZCHWswdYLwJ/XiulnrNr323zcQeodthDuAHTgmm4aEqCH1zsrBHYLIISheyyqD9Nnp1FK+e0TSgtpX5ZxrBBtNe4PItP4w8Q07oBN+a2mD4a9erPzDN4bzY1iy5BiS742imV2ynT4l8h9hQvz+Pz+COU/pGCdyrkgm/Qt3ddw/5Cms7CLXsSy50k/dJDT8037QTcuq1kWZ6r1y/Ic6bkHdD5is9fDvCf7SZA/m44ZLfmg+QcM0vugvjmxx3fwLsTFmpRwlwdE95zq/LSYwxqn0q5ANgDPUT7GXsm5PLB3mwcl7ZNygPFaqA+NvL6SOo93NP4bFDF9sfh+LThtgxvkF80fyxxy/Ac7U9i/RcYNWrd).

`name`을 사용하는 것은 다양한 장점이 있습니다:

- 하드코딩된 URL이 없습니다.
- `params`의 자동 인코딩.
- URL 오타 방지.
- 경로 순위를 우회하여 동일한 경로로 매칭되는 낮은 순위의 라우트를 표시할 수 있습니다.

이름은 모든 라우트에서 **고유해야 합니다**. 동일한 이름을 여러 라우트에 추가하면 마지막 라우터의 것만 유지합니다. 이에 대한 자세한 내용은 [동적 라우팅](../advanced/dynamic-routing#Removing-routes) 섹션에서 확인할 수 있습니다.

Vue Router에는 `router.push()`와 `router.replace()` 메서드처럼 (이동할) 위치(정보 객체)를 전달할 수 있는 다양한 파트가 있습니다.이러한 메서드에 대해서는 [프로그래매틱 탐색](./navigation) 가이드에서 자세히 다룰 것입니다. `to` 프로퍼티와 마찬가지로, 이 메서드들도 `name`을 사용하여 (이동할) 위치(정보 객체) 전달을 지원합니다:

```js
router.push({ name: 'profile', params: { username: 'erina' } })
```
