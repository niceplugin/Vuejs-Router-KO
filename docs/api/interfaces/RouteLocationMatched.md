# RouteLocationMatched

Normalized version of a [route record](../type-aliases/RouteRecord.md).

## 계층

- [`RouteRecordNormalized`](RouteRecordNormalized.md)

  ↳ **`RouteLocationMatched`**

## 속성

### aliasOf

• **aliasOf**: `undefined` \| [`RouteRecordNormalized`](RouteRecordNormalized.md)

Defines if this record is the alias of another one. This property is
`undefined` if the record is the original one.

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[aliasOf](RouteRecordNormalized.md#aliasof)

___

### beforeEnter

• **beforeEnter**: `undefined` \| [`NavigationGuardWithThis`](NavigationGuardWithThis.md)<`undefined`\> \| [`NavigationGuardWithThis`](NavigationGuardWithThis.md)<`undefined`\>[]

Registered beforeEnter guards

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[beforeEnter](RouteRecordNormalized.md#beforeenter)

___

### children

• **children**: [`RouteRecordRaw`](../type-aliases/RouteRecordRaw.md)[]

Nested route records.

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[children](RouteRecordNormalized.md#children)

___

### components

• **components**: `undefined` \| ``null`` \| `Record`<`string`, [`RouteComponent`](../type-aliases/RouteComponent.md)\>

{@inheritDoc RouteRecordMultipleViews.components}

#### Overrides

[RouteRecordNormalized](RouteRecordNormalized.md).[components](RouteRecordNormalized.md#components)

___

### instances

• **instances**: `Record`<`string`, `undefined` \| ``null`` \| `ComponentPublicInstance`<{}, {}, {}, {}, {}, {}, {}, {}, ``false``, `ComponentOptionsBase`<`any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, `any`, {}\>\>\>

Mounted route component instances
Having the instances on the record mean beforeRouteUpdate and
beforeRouteLeave guards can only be invoked with the latest mounted app
instance if there are multiple application instances rendering the same
view, basically duplicating the content on the page, which shouldn't happen
in practice. It will work if multiple apps are rendering different named
views.

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[instances](RouteRecordNormalized.md#instances)

___

### meta

• **meta**: [`RouteMeta`](RouteMeta.md)

{@inheritDoc _RouteRecordBase.meta}

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[meta](RouteRecordNormalized.md#meta)

___

### name

• **name**: `undefined` \| [`RouteRecordName`](../type-aliases/RouteRecordName.md)

{@inheritDoc _RouteRecordBase.name}

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[name](RouteRecordNormalized.md#name)

___

### path

• **path**: `string`

{@inheritDoc _RouteRecordBase.path}

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[path](RouteRecordNormalized.md#path)

___

### props

• **props**: `Record`<`string`, `_RouteRecordProps`\>

{@inheritDoc RouteRecordMultipleViews.props}

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[props](RouteRecordNormalized.md#props)

___

### redirect

• **redirect**: `undefined` \| `RouteRecordRedirectOption`

{@inheritDoc _RouteRecordBase.redirect}

#### 다음에서 상속됨

[RouteRecordNormalized](RouteRecordNormalized.md).[redirect](RouteRecordNormalized.md#redirect)
