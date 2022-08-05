# RouteLocationNormalizedLoaded

[RouteLocationRaw](../type-aliases/RouteLocationRaw.md) with

## 계층

- `_RouteLocationBase`

  ↳ **`RouteLocationNormalizedLoaded`**

## 속성

### fullPath

• **fullPath**: `string`

The whole location including the `search` and `hash`. This string is
percentage encoded.

#### 다음에서 상속됨

\_RouteLocationBase.fullPath

___

### hash

• **hash**: `string`

Hash of the current location. If present, starts with a `#`.

#### 다음에서 상속됨

\_RouteLocationBase.hash

___

### matched

• **matched**: [`RouteLocationMatched`](RouteLocationMatched.md)[]

Array of [RouteLocationMatched](RouteLocationMatched.md) containing only plain components (any
lazy-loaded components have been loaded and were replaced inside the
`components` object) so it can be directly used to display routes. It
cannot contain redirect records either

___

### meta

• **meta**: [`RouteMeta`](RouteMeta.md)

Merged `meta` properties from all the matched route records.

#### 다음에서 상속됨

\_RouteLocationBase.meta

___

### name

• **name**: `undefined` \| ``null`` \| [`RouteRecordName`](../type-aliases/RouteRecordName.md)

Name of the matched record

#### 다음에서 상속됨

\_RouteLocationBase.name

___

### params

• **params**: [`RouteParams`](../type-aliases/RouteParams.md)

Object of decoded params extracted from the `path`.

#### 다음에서 상속됨

\_RouteLocationBase.params

___

### path

• **path**: `string`

Percentage encoded pathname section of the URL.

#### 다음에서 상속됨

\_RouteLocationBase.path

___

### query

• **query**: [`LocationQuery`](../type-aliases/LocationQuery.md)

Object representation of the `search` property of the current location.

#### 다음에서 상속됨

\_RouteLocationBase.query

___

### redirectedFrom

• **redirectedFrom**: `undefined` \| [`RouteLocation`](RouteLocation.md)

Contains the location we were initially trying to access before ending up
on the current location.

#### 다음에서 상속됨

\_RouteLocationBase.redirectedFrom
