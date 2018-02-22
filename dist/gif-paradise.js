// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    getRoute: function getRoute() {
        var route = window.location.pathname;
        return route;
    },
    setRoute: function setRoute(search) {
        history.pushState(search, null, '?q=' + search);
        window.location.href = '/?q=' + search;
    },
    resetRoute: function resetRoute() {
        history.pushState(search, null, '/');
        window.location = '/';
    }
};
},{}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var on = function on(target, event, handler) {
    return target.addEventListener(event, handler);
};

exports.on = on;
},{}],10:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _routeController = require('../controllers/routeController');

var _routeController2 = _interopRequireDefault(_routeController);

var _events = require('../helpers/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GifsView = function () {
    function GifsView() {
        _classCallCheck(this, GifsView);

        this.searchForm = document.getElementById('search-form');
        this.searchInput = document.getElementById('search-input');
        this.deleteBtn = document.getElementById('delete-btn');
    }

    _createClass(GifsView, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var route = _routeController2.default.getRoute();
            var search = window.location.search;

            this.nav(route, search);

            (0, _events.on)(this.searchForm, "submit", function (e) {
                e.preventDefault();
                var searchTerm = e.target[1].value;
                _routeController2.default.setRoute(searchTerm);
            });

            (0, _events.on)(this.deleteBtn, "click", function (e) {
                _this.searchForm.reset();
                _this.deleteBtn.style.visibility = "hidden";
                _this.searchInput.focus();
                _routeController2.default.resetRoute();
            });

            (0, _events.on)(window, 'onpopstate', function (e) {
                console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
                // nav(route,search)
            });

            (0, _events.on)(this.searchInput, "keydown", function (e) {
                _this.deleteBtn.style.visibility = "visible";
            });
        }
    }, {
        key: 'nav',
        value: function nav(route, search) {
            if (route === '/favourites') {
                document.getElementById('favourites-icon').classList.add("favourite");
                _app2.default.getfavouriteGifs();
            } else if (search.length > 3 && route === '/') {
                console.log('serach ', search);
                var searchTerm = search.split('=')[1];
                this.searchInput.value = searchTerm;
                this.deleteBtn.style.visibility = "visible";
                _app2.default.getGifs(searchTerm);
            } else if (search.length === 3) {
                this.message('<p>Please enter something !</p>');
            } else {
                this.message('<p>Type your search, we will find gif stuff for you !</p>');
            }
        }
    }, {
        key: 'message',
        value: function message(string) {
            document.getElementById('message').innerHTML = string;
        }
    }, {
        key: 'listen',
        value: function listen() {
            var gifs = Array.from(document.querySelectorAll("ul li div i"));
            gifs.forEach(function (gif) {
                (0, _events.on)(gif, 'click', function (e) {
                    var route = _routeController2.default.getRoute();
                    var isFavourite = e.srcElement.classList[2] === "favourite";
                    var obj = {};
                    obj.url = e.path[2].firstElementChild.currentSrc;
                    obj.title = e.path[2].firstElementChild.alt;
                    obj.id = e.path[2].dataset.id;
                    if (!isFavourite) {
                        obj.favourite = true;
                        gif.classList.add("favourite");
                        var favouritemessage = document.getElementById(obj.id);
                        favouritemessage.classList.remove("favourite-message");
                        _app2.default.saveGif(obj);
                    } else {
                        gif.classList.remove("favourite");
                        _app2.default.deleteGif(obj);
                        if (route === '/favourites') {
                            _app2.default.getfavouriteGifs();
                        } else {
                            var _favouritemessage = document.getElementById(obj.id);
                            _favouritemessage.classList.add("favourite-message");
                        }
                    }
                });
            });
        }
    }, {
        key: 'render',
        value: function render(results) {
            var route = _routeController2.default.getRoute();
            if (typeof results === "string") {
                document.getElementById('results').innerHTML = results;
            } else {
                var output = '<ul id="grid" class="card-container">';
                results.forEach(function (gif) {
                    output += '\n        <li class="card" data-id="' + gif.id + '">\n            <img src="' + gif.url + '" alt="' + gif.title + '">\n            <div class="card-body">\n                <p>' + gif.title + '</p>\n                <i class="fas fa-heart ' + (gif.favourite ? 'favourite' : '') + ' "></i>\n                <p id="' + gif.id + '" class="favourite ' + (!gif.favourite || route == '/favourites' ? 'favourite-message' : '') + '"><a href="/favourites">One of your favourites !</a></p>\n            </div>\n        </li>\n        ';
                });
                output += '</ul>' + (route == '/favourites' ? '<a id="back">Back to your search</a>' : '');
                document.getElementById('results').innerHTML = output;
            }
        }
    }]);

    return GifsView;
}();

exports.default = GifsView;
;
},{"../app":6,"../controllers/routeController":13,"../helpers/events":7}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GifModel = function () {
	function GifModel(state) {
		_classCallCheck(this, GifModel);

		var localStorage = window.localStorage;
		var favouriteGifs = void 0;
		this.getLocalStorage = function (state) {
			return favouriteGifs || JSON.parse(localStorage.getItem(state) || '[]');
		};
		this.setLocalStorage = function (state, item) {
			localStorage.setItem(state, item);
		};
	}

	_createClass(GifModel, [{
		key: 'search',
		value: function search(searchTerm) {
			var _this = this;

			return fetch('https://api.giphy.com/v1/gifs/search?api_key=v2k68wqUjqUfJLvBHOXNu6i2fCZiqNV5&q=' + searchTerm + '&limit=25&offset=0&rating=G&lang=en').then(function (res) {
				return res.json();
			}).then(function (data) {
				return data.data.map(function (gif) {
					var favouriteGifs = _this.getLocalStorage('gifs');
					var ids = favouriteGifs.map(function (favourite) {
						return favourite.id;
					});
					var obj = {};
					obj.url = gif.images.original.url;
					obj.title = gif.title;
					obj.id = gif.id;
					obj.favourite = ids.indexOf(gif.id) > -1;
					return obj;
				});
			}).catch(function (err) {
				return console.log(err);
			});
		}
	}, {
		key: 'insert',
		value: function insert(gif) {
			var favouriteGifs = this.getLocalStorage('gifs');
			favouriteGifs.push(gif);
			this.setLocalStorage('gifs', JSON.stringify(favouriteGifs));
		}
	}, {
		key: 'remove',
		value: function remove(gif) {
			var favouriteGifs = this.getLocalStorage('gifs');
			var filteredGifs = favouriteGifs.filter(function (favourite) {
				return favourite.id !== gif.id;
			});
			this.setLocalStorage('gifs', JSON.stringify(filteredGifs));
		}
	}]);

	return GifModel;
}();

exports.default = GifModel;
},{}],12:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = storageAvailable;
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    };
};
},{}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storageAvailable = require('../helpers/storageAvailable');

var _storageAvailable2 = _interopRequireDefault(_storageAvailable);

var _gifsView = require('../views/gifsView');

var _gifsView2 = _interopRequireDefault(_gifsView);

var _gifModel = require('../models/gifModel');

var _gifModel2 = _interopRequireDefault(_gifModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GifController = function () {
    function GifController(GifsView, GifModel) {
        _classCallCheck(this, GifController);

        this.gifsView = GifsView;
        this.gifModel = GifModel;
    }

    _createClass(GifController, [{
        key: 'init',
        value: function init() {
            this.gifsView.init();
        }
    }, {
        key: 'getGifs',
        value: function getGifs(search) {
            var _this = this;

            this.gifModel.search(search).then(function (results) {
                _this.gifsView.render(results);
                _this.gifsView.message('<p>We found ' + results.length + ' Gifs for you !<br />Click on their  <i class="fas fa-heart"></i>  to save your favorites ones.</p>');
                _this.gifsView.listen();
            });
        }
    }, {
        key: 'getfavouriteGifs',
        value: function getfavouriteGifs() {
            var results = this.gifModel.getLocalStorage('gifs');
            this.gifsView.render(results);
            var favouriteMessage = '';
            if (results.length === 0) {
                favouriteMessage = '<p>Oh! It seems you don\'t like gifs !</p>';
            } else {
                favouriteMessage = '<p>You have ' + results.length + ' favourites gifs!<br />Click on their  <i class="fas fa-heart favourite"></i>  if you changed your mind.</p>';
            }
            this.gifsView.message(favouriteMessage);
            this.gifsView.listen();
        }
    }, {
        key: 'saveGif',
        value: function saveGif(gif) {
            if ((0, _storageAvailable2.default)('localStorage')) {
                this.gifModel.insert(gif);
            } else {
                console.log('no storage available !');
            }
        }
    }, {
        key: 'deleteGif',
        value: function deleteGif(gif) {
            this.gifModel.remove(gif);
        }
    }]);

    return GifController;
}();

exports.default = GifController;
;
},{"../helpers/storageAvailable":12,"../views/gifsView":10,"../models/gifModel":8}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gifsView = require('./views/gifsView');

var _gifsView2 = _interopRequireDefault(_gifsView);

var _gifModel = require('./models/gifModel');

var _gifModel2 = _interopRequireDefault(_gifModel);

var _gifController = require('./controllers/gifController');

var _gifController2 = _interopRequireDefault(_gifController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gifsView = new _gifsView2.default();
var gifModel = new _gifModel2.default();

var app = new _gifController2.default(gifsView, gifModel);

exports.default = app;
},{"./views/gifsView":10,"./models/gifModel":8,"./controllers/gifController":9}],14:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],11:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":14}],5:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":11}],2:[function(require,module,exports) {
'use strict';

var _app = require('./src/js/app');

var _app2 = _interopRequireDefault(_app);

var _style = require('./src/css/style.scss');

var _style2 = _interopRequireDefault(_style);

var _events = require('./src/js/helpers/events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _events.on)(window, 'load', function () {
  return _app2.default.init();
});
(0, _events.on)(window, 'hashchange', function () {
  return _app2.default.init();
});
},{"./src/js/app":6,"./src/css/style.scss":5,"./src/js/helpers/events":7}],23:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '60029' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[23,2])
//# sourceMappingURL=/dist/gif-paradise.map