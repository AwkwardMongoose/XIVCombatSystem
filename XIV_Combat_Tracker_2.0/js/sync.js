"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.undefined = mod.exports;
  }
})(void 0, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sync;

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function sync(animationNameOrNames) {
    var animationNames = new Set(Array.isArray(animationNameOrNames) ? animationNameOrNames : [animationNameOrNames]);
    var elements = new Set();
    var animationDuration;
    var isPaused = false;
    var lastIterationTimestamp = 0;
    var api = {
      getElements: function getElements() {
        return elements;
      },
      free: function free() {
        window.removeEventListener('animationiteration', animationIteration, true);
        window.removeEventListener('animationstart', animationStart, true);
        this.start();
        elements.clear();
      },
      start: function start() {
        elements.forEach(function (el) {
          if (validate(el)) {
            if (isPaused) {
              el.style.removeProperty('animation-play-state');
            } else {
              el.style.removeProperty('animation');
            }
          }
        });
        isPaused = false;
      },
      stop: function stop() {
        isPaused = false;
        elements.forEach(function (el) {
          if (validate(el)) {
            el.style.setProperty('animation', 'none');
          }
        });
      },
      pause: function pause() {
        isPaused = true;
        elements.forEach(function (el) {
          if (validate(el)) {
            el.style.setProperty('animation-play-state', 'paused');
          }
        });
      }
    };

    function shouldSync(event) {
      return animationNames.has(event.animationName);
    }

    function validate(el) {
      var isValid = document.body.contains(el);

      if (!isValid) {
        elements.delete(el);
      }

      return isValid;
    }

    function init() {
      setTimeout(restart, animationDuration);
    }

    function restart() {
      api.stop();
      setTimeout(api.start, 50);
    }

    function animationStart(event) {
      if (shouldSync(event)) {
        var element = event.target,
            timeStamp = event.timeStamp;
        elements.add(element);
        var diff = timeStamp - lastIterationTimestamp;
        element.style.setProperty('animation-delay', "-".concat(diff, "ms"));
      }
    }

    function animationIteration(event) {
      if (shouldSync(event)) {
        var element = event.target,
            timeStamp = event.timeStamp;
        elements.add(element);
        lastIterationTimestamp = timeStamp;

        if (!animationDuration) {
          animationDuration = cssToMs(window.getComputedStyle(element).animationDuration);
          init();
        }
      }
    }

    window.addEventListener('animationiteration', animationIteration, true);
    window.addEventListener('animationstart', animationStart, true);
    return api;
  }

  function cssToMs(time) {
    var num = parseFloat(time);
    var unit = time.match(/m?s/);
    if (!unit) return 0;
    var _unit = unit;

    var _unit2 = _slicedToArray(_unit, 1);

    unit = _unit2[0];

    switch (unit) {
      case 's':
        return num * 1000;

      case 'ms':
        return num;

      default:
        return 0;
    }
  }


  sync('limitbar')
});
