# 설치하기 %{#Installation}%

<VueMasteryLogoLink></VueMasteryLogoLink>

## 패키지 매니저 %{#Package-managers}%

기존 프로젝트에서 JavaScript 패키지 매니저를 사용하는 경우, npm 레지스트리에서 Vue Router를 설치할 수 있습니다:

::: code-group

```bash [npm]
npm install vue-router@4
```

```bash [yarn]
yarn add vue-router@4
```

```bash [pnpm]
pnpm add vue-router@4
```

:::

새 프로젝트를 시작하는 경우, [create-vue](https://github.com/vuejs/create-vue) 스캐폴딩 도구를 사용하는 것이 더 쉬울 수 있습니다. 이 도구는 Vue Router를 포함할 수 있는 Vite 기반 프로젝트를 생성합니다:

::: code-group

```bash [npm]
npm create vue@latest
```

```bash [yarn]
yarn create vue
```

```bash [pnpm]
pnpm create vue
```

:::

프로젝트 종류에 대한 몇 가지 질문이 표시됩니다. Vue Router를 설치하도록 선택하면, 예제 애플리케이션에서 Vue Router의 핵심 기능 일부를 시연할 것입니다.

패키지 매니저를 사용하는 프로젝트는 일반적으로 ES 모듈을 사용하여 Vue Router에 접근합니다. 예를 들어, `import { createRouter } from 'vue-router'`와 같이 사용합니다.

## 직접 다운로드 / CDN %{#Direct-Download-CDN}%

[https://unpkg.com/vue-router@4](https://unpkg.com/vue-router@4)

<!--email_off-->

[Unpkg.com](https://unpkg.com)은 npm 기반 CDN 링크를 제공합니다. 위의 링크는 항상 npm의 최신 릴리스를 가리킵니다. `https://unpkg.com/vue-router@4.0.15/dist/vue-router.global.js`와 같은 URL을 통해 특정 버전 또는 태그를 사용할 수도 있습니다.

<!--/email_off-->

이렇게 하면 Vue Router가 전역 `VueRouter` 객체를 통해 노출됩니다. 예를 들어, `VueRouter.createRouter(...)`와 같이 사용할 수 있습니다.
