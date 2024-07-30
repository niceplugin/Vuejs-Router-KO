# Typed Routes <Badge type="tip" text="v4.4.0+" /> %{#Typed-Routes-}%

::: danger
‼️ 실험적 기능입니다.
:::

![RouterLink to autocomplete](https://user-images.githubusercontent.com/664177/176442066-c4e7fa31-4f06-4690-a49f-ed0fd880dfca.png)

타입이 지정된 라우트 *맵*을 가진 라우터를 구성할 수 있습니다. 이 구성 작업을 직접할 수 있지만, [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) 플러그인을 사용하여 라우트와 타입을 자동으로 생성하는 것이 좋습니다.

## 직접 구성하기 %{#Manual-Configuration}%

다음은 타입이 지정된 라우트를 직접 구성하는 예제입니다:

```ts
// 라우트에 타입을 지정하기 위해 vue-router에서 `RouteRecordInfo` 타입을 가져옵니다.
import type { RouteRecordInfo } from 'vue-router'

// 라우트 인터페이스를 정의합니다.
export interface RouteNamedMap {
  // 각 키는 이름입니다.
  home: RouteRecordInfo<
    // 여기서 동일한 이름을 사용합니다.
    'home',
    // 이것은 경로입니다. 자동 완성에서 나타날 것입니다.
    '/',
    // 이것은 raw params 입니다. 이 경우 params가 허용되지 않습니다.
    Record<never, never>,
    // 이것은 정규화된 파라미터입니다.
    Record<never, never>
  >
  // 각 라우트 마다 반복합니다..
  // 원하는 대로 이름을 지정할 수 있습니다.
  'named-param': RouteRecordInfo<
    'named-param',
    '/:name',
    { name: string | number }, // 원시 값
    { name: string } // 정규화된 값
  >
  'article-details': RouteRecordInfo<
    'article-details',
    '/articles/:id+',
    { id: Array<number | string> },
    { id: string[] }
  >
  'not-found': RouteRecordInfo<
    'not-found',
    '/:path(.*)',
    { path: string },
    { path: string }
  >
}

// 마지막으로, 이 라우트 맵으로 Vue Router 타입을 확장해야 합니다.
declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap
  }
}
```

::: tip

이 과정은 번거롭고 오류가 발생하기 쉽습니다. 따라서 라우트와 타입을 자동으로 생성하기 위해 [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)를 사용하는 것이 좋습니다.

:::
