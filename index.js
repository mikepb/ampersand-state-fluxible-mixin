"use strict";

/**
 * Assign properties from sources to target.
 *
 * @param {Object} target The target object.
 * @param {...Object} sources The source object.
 * @return {Object} The target object.
 * @private
 */

var assign = function (target /* ...sources */) {
  var source, key, i = 1;
  while (source = arguments[i++]) {
    for (key in source) target[key] = source[key];
  }
  return target;
};

/**
 * Dehydrate the children of a model into the given state.
 *
 * @param {Model} model The immediate model.
 * @param {Object} defs The child definitions.
 * @param {Object} state Target state to which to dehydrate the children.
 * @private
 */

function dehydrate (model, defs, state) {
  var key, child, value;

  // for each child definition
  for (key in defs) {

    // ignore missing child
    if (!(child = model[key])) continue;

    // dehydrate the child
    value = child.dehydrate ? child.dehydrate() : child.serialize();

    // assign the value if not null
    if (value != null) state[key] = value;
  }
}

/**
 * Rehydrate the children of a model using the given state.
 *
 * @param {Model} model The immediate model.
 * @param {Object} defs The child definitions.
 * @param {Object} state Target state with which to rehydrate the children.
 * @private
 */

function rehydrate (model, defs, state) {
  var key, value, child;

  // for each child definition
  for (key in defs) {

    // ignore missing state
    if (!(value = state[key])) continue;

    // prevent default handler from setting value on child
    delete state[key];

    // ignore missing child
    if (!(child = model[key])) continue;

    // rehydrate the child
    if (child.rehydrate) child.rehydrate(value);

    // fallback to setting the value
    else child.set(value, {silent: true});
  }
};

/**
 * Ampersand Model Fluxible Mixin implements the `dehydrate` and `rehydrate`
 * methods for Ampersand.js states and models to be used as Fluxible stores.
 */

module.exports = {

  /**
   * Serialize the model for sending state to the client.
   *
   * @return {Object}
   */

  dehydrate: function () {

    // dehydrate immediate model
    var state = this.getAttributes({props: true, session: true}, true);

    // dehydrate children
    dehydrate(this, this._children, state);

    // dehydrate collections
    dehydrate(this, this._collections, state);

    return state;
  },

  /**
   * Restore the model state from the given state.
   *
   * @param {Object} state
   */

  rehydrate: function (state) {

    // copy state
    state = assign({}, state);

    // rehydrate children
    rehydrate(this, this._children, state);

    // rehydrate collections
    rehydrate(this, this._collections, state);

    // rehydrate immediate model
    this.set(state, {silent: true});
  }

};
