/**
 * Zone.js configuration flags
 * These flags configure zone.js behavior before it's loaded
 */

// Fix for zone.js hasOwnProperty error with null prototype objects
// This patches Object.getPrototypeOf to ensure all prototypes have hasOwnProperty
(function () {
  const originalGetPrototypeOf = Object.getPrototypeOf;
  const originalHasOwnProperty = Object.prototype.hasOwnProperty;
  const patchedProtos = new WeakSet();

  // Helper to ensure a prototype has hasOwnProperty
  function ensureHasOwnProperty(proto: any) {
    if (!proto || patchedProtos.has(proto)) {
      return proto;
    }

    try {
      // Check if hasOwnProperty exists and is callable
      if (typeof proto.hasOwnProperty !== 'function') {
        Object.defineProperty(proto, 'hasOwnProperty', {
          value: function (this: any, prop: string | number | symbol) {
            return originalHasOwnProperty.call(this, prop);
          },
          writable: true,
          configurable: true,
          enumerable: false,
        });
      }
      patchedProtos.add(proto);
    } catch (e) {
      // Ignore errors for frozen/sealed objects
    }

    return proto;
  }

  // Patch Object.getPrototypeOf to fix all prototypes as they're accessed
  Object.getPrototypeOf = function (obj: any) {
    if (obj === null || obj === undefined) {
      return null;
    }
    const proto = originalGetPrototypeOf(obj);
    return ensureHasOwnProperty(proto);
  };

  // Also patch common built-in prototypes preemptively
  const builtIns = [
    Object,
    Array,
    Function,
    String,
    Number,
    Boolean,
    Date,
    RegExp,
    Error,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Promise,
  ];

  builtIns.forEach(BuiltIn => {
    try {
      if (BuiltIn && BuiltIn.prototype) {
        ensureHasOwnProperty(BuiltIn.prototype);
      }
    } catch (e) {
      // Ignore
    }
  });
})();
