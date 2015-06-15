"use strict";

var mixin = require("..");

var AmpersandState = require("ampersand-state");
var AmpersandCollection = require("ampersand-collection");

var SimpleSubject = exports.SimpleSubject = AmpersandState.extend(mixin, {
  props: {
    foo: "string"
  },
  session: {
    bar: "number"
  },
  derived: {
    baz: {
      deps: ["foo", "bar"],
      fn: function () {
        return !!(this.foo && this.bar);
      }
    }
  }
});

SimpleSubject.storeName = "SimpleSubject";

var ChildModel = exports.ChildModel = AmpersandState.extend({
  props: {
    fab: "string"
  }
});

var SimpleCollection = exports.SimpleCollection = AmpersandCollection.extend({
  model: ChildModel
});

var ComplexCollection = exports.ComplexCollection = SimpleCollection.extend({
  dehydrate: function () {
    return {
      total: this.models.length,
      items: this.serialize()
    };
  },
  rehydrate: function (state) {
    this.total = state.total;
    this.set(state.items, {silent: true});
  }
});

var ComplexSubject = exports.ComplexSubject = SimpleSubject.extend({
  children: {
    thing: ChildModel
  },
  collections: {
    simple: SimpleCollection,
    complex: ComplexCollection
  }
});

ComplexSubject.storeName = "ComplexSubject";
