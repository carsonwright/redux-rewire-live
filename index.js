"use strict";

module.exports = {
    rewire: function rewire(store) {
        for (var _len = arguments.length, rewires = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rewires[_key - 1] = arguments[_key];
        }

        return {
            dispatch: function dispatch(action) {
                return store.dispatch(action);
            },
            getState: function getState() {
                return rewires.reduce(function (acc, rewire) {
                    return rewire(acc);
                }, store.getState());
            },
            subscribe: function subscribe(cb) {
                return store.subscribe(cb);
            },
            replaceReducer: function replaceReducer() {
                return store.replaceReducer.apply(store, arguments);
            }
        };
    }
};