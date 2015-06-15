# Ampersand State Fluxible Mixin

This module implements the `dehydrate` and `rehydrate` methods for
[Ampersand.js][] states and models to be used as [Fluxible][fluxible] Stores.

## Install

```sh
npm install --save ampersand-model-fluxible-mixin
```

## Usage

Define your model with the mixin and set the `storeName` for Fluxible:

```js
// MyModel.js

var Model = require("ampersand-model");
var mixin = require("ampersand-model-fluxible-mixin");

var MyModel = Model.extend(mixin, {
  props: {
    that: "string"
  }
});

MyModel.storeName = "MyModel";

module.exports = MyModel;
```

Then, register your model with Fluxible:

```js
// app.js

var Fluxible = require("fluxible");
var MyModel = require("./MyModel");

var app = new Fluxible({ /* options... */ });

app.registerStore(MyModel);

module.exports = app;
```

You may then use Fluxible according to the [API][fluxible-api].

## License

MIT

[Ampersand.js]: http://ampersandjs.com
[fluxible]: http://fluxible.io
[fluxible-api]: http://fluxible.io/api/stores.html
