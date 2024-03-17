# 이름이 있는 라우트 %{#Named-Routes}%

<VueSchoolLink
href="https://vueschool.io/lessons/named-routes"
title="Learn about the named routes"
/>

라우트를 생성할 때, 우리는 선택적으로 라우트에 `name`을 지정할 수 있습니다:

```js
const routes = [
  {
    path: '/user/:username',
    name: 'profile', // [!code highlight]
    component: User
  }
]
```

그러면 `<router-link>`에 `to` prop을 전달할 때 `path` 대신 `name`을 사용할 수 있습니다:

```vue-html
<router-link :to="{ name: 'profile', params: { username: 'erina' } }">
  사용자 프로필
</router-link>
```

위의 예제는 `/user/erina`로의 링크를 생성할 것입니다.

- [플레이그라운드에서 확인하기](https://play.vuejs.org/#eNqtVVtP2zAU/itWNqlFauNNIB6iUMEQEps0NjH2tOzBtKY1JLZlO6VTlP++4+PcelnFwyRofe7fubaKCiZk/GyjJBKFVsaRiswNZ45faU1q8mRUQUbrko8yuaPwlRfK/LkV1sHXpGHeq9JxMzScGmT19t5xkMaUaR1vOb9VBe+kntgWXz2Cs06O1LbCTwvRW7knGnEm50paRwIYcrEFd1xlkpBVyCQ5lN74ZOJV0Nom5JcnCFRCM7dKyIiOJkSygsNzBZiBmivAI7l0SUipRvuhCfPge7uWHBiGZPctS0iLJv7T2/YutFFPIt+JjgUJPn7DZ32CtWg7PIZ/4BASg7txKE6gC1VKNx69gw6NTqJJ1HQK5iR1vNA52M+8Yrr6OLuD+AuCtbQpBQYK9Oy6NAZAhLI1KKuKvEc69jSp65Tqw/oh3V7f00P9MsdveOWiecE75DDNhXwhiVMXWVRttYbUWdRpE2xOZ0sHxq1v2jl/a5jQyZ042Mv/HKjvt2aGFTCXFWmnAsTcCMkAxw4SHIjG9E2AUtpUusWyFvyVUGCltBsFmJB2W/dHZCHWswdYLwJ/XiulnrNr323zcQeodthDuAHTgmm4aEqCH1zsrBHYLIISheyyqD9Nnp1FK+e0TSgtpX5ZxrBBtNe4PItP4w8Q07oBN+a2mD4a9erPzDN4bzY1iy5BiS742imV2ynT4l8h9hQvz+Pz+COU/pGCdyrkgm/Qt3ddw/5Cms7CLXsSy50k/dJDT8037QTcuq1kWZ6r1y/Ic6bkHdD5is9fDvCf7SZA/m44ZLfmg+QcM0vugvjmxx3fwLsTFmpRwlwdE95zq/LSYwxqn0q5ANgDPUT7GXsm5PLB3mwcl7ZNygPFaqA+NvL6SOo93NP4bFDF9sfh+LThtgxvkF80fyxxy/Ac7U9i/RcYNWrd).

`name`을 사용하는 것은 여러 가지 이점이 있습니다:

- 하드코딩된 URL이 없음.
- `params`의 자동 인코딩.
- URL 오타 방지.
- 경로 순위를 우회하여, 같은 경로와 일치하는 하위 순위 라우트를 표시.

각 이름은 모든 라우트에서 **유일해야 합니다**. 같은 이름을 여러 라우트에 추가하면 라우터는 마지막 것만 유지할 것입니다. 이에 대해 더 자세히 알아보려면 [동적 라우팅](../advanced/dynamic-routing#Removing-routes) 섹션을 참고하세요.

Vue Router의 다른 부분에서도 위치를 전달할 수 있습니다. 예를 들어 `router.push()`와 `router.replace()` 메소드입니다. 이 메소드에 대해서는 [프로그래밍 방식 네비게이션](./navigation) 가이드에서 더 자세히 다룰 것입니다. `to` prop처럼, 이 메소드들도 `name`을 사용하여 위치를 전달할 수 있습니다:

```js
router.push({ name: 'profile', params: { username: 'erina' } })
```
