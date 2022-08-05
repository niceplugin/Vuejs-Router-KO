# RouteLocation

[RouteLocationRaw](../type-aliases/RouteLocationRaw.md) resolved using the matcher

## 계층

- `_RouteLocationBase`

  ↳ **`RouteLocation`**

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

• **matched**: [`RouteRecordNormalized`](RouteRecordNormalized.md)[]

Array of [RouteRecord](../type-aliases/RouteRecord.md) containing components as they were
passed when adding records. It can also contain redirect records. This
can't be used directly

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
