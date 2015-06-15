"use strict";

var assert = require("assert");
var models = require("./models");

describe("Ampersand State Fluxible Mixin", function () {

  it("should dehydrate a simple model", function () {
    var model = new models.SimpleSubject({foo: "a", bar: 2});
    assert.deepEqual(model.dehydrate(), {foo: "a", bar: 2});
  });

  it("should rehydrate a simple model", function () {
    var model = new models.SimpleSubject();
    model.rehydrate({foo: "a", bar: 0});
    assert.deepEqual(model.getAttributes({
      props: true,
      session: true,
      derived: true
    }), {foo: "a", bar: 0, baz: false});
  });

  it("should dehydrate a complex model", function () {
    var model = new models.ComplexSubject({
      foo: "a",
      bar: 2,
      thing: {fab: "yeah"},
      simple: [{fab: "nay"}],
      complex: [{fab: "wah"}]
    });
    assert.deepEqual(model.dehydrate(), {
      foo: "a",
      bar: 2,
      thing: {fab: "yeah"},
      simple: [{fab: "nay"}],
      complex: {
        total: 1,
        items: [{fab: "wah"}]
      }
    });
  });

  it("should rehydrate a complex model", function () {
    var model = new models.ComplexSubject();
    model.rehydrate({
      foo: "a",
      bar: 2,
      thing: {fab: "yeah"},
      simple: [{fab: "nay"}],
      complex: {
        total: 1,
        items: [{fab: "wah"}]
      }
    });
    assert.deepEqual(model.serialize(), {
      foo: "a",
      thing: {fab: "yeah"},
      simple: [{fab: "nay"}],
      complex: [{fab: "wah"}]
    });
    assert.strictEqual(model.bar, 2);
    assert.strictEqual(model.baz, true);
  });

});
