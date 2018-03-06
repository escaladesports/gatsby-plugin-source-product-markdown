'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.sourceNodes = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var sourceNodes = exports.sourceNodes = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2, options) {
		var boundActionCreators = _ref2.boundActionCreators;
		var createNode, data;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						options = (0, _extends3.default)({
							path: './src/markdown/products/**/*.md',
							id: 'id',
							body: 'body'
						}, options);
						createNode = boundActionCreators.createNode;
						_context.next = 4;
						return (0, _readMarkdown2.default)(options.path, { results: 'array' });

					case 4:
						data = _context.sent;

						data = data.map(function (data) {
							data.data[options.body] = data.content;
							return data.data;
						});
						data = unpackAllVariants(data, options);
						data.forEach(function (datum) {
							datum.productId = datum[options.id];
							//datum.id = `ProductMarkdown-${datum[options.id]}`
							//console.log(datum)
							datum = (0, _extends3.default)({
								parent: null,
								children: [],
								internal: {
									type: 'ProductMarkdown',
									contentDigest: _crypto2.default.createHash('md5').update(JSON.stringify(datum)).digest('hex')
								}
							}, datum, {
								id: 'ProductMarkdown-' + datum[options.id]
							});
							createNode(datum);
						});

					case 8:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function sourceNodes(_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _frontMatter = require('front-matter');

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _readMarkdown = require('read-markdown');

var _readMarkdown2 = _interopRequireDefault(_readMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unpackAllVariants(arr, options) {
	var res = [];
	arr.forEach(function (product) {
		var products = unpackVariants(product, options);
		res = res.concat(products);
	});
	return res;
}

function unpackVariants(obj, options) {
	var parent = (0, _extends3.default)({}, obj, {
		variant: false
	});
	if ((0, _typeof3.default)(parent.variants) !== 'object') {
		return [parent];
	}
	var products = [parent];
	var ids = [parent[options.id]];
	var variants = parent.variants;
	delete parent.variants;
	variants.forEach(function (product) {
		product = (0, _extends3.default)({}, obj, product, {
			variant: true
		});
		ids.push(product[options.id]);
		products.push(product);
	});
	products.forEach(function (product) {
		var productsClone = products.map(function (product) {
			var obj = (0, _extends3.default)({}, product);
			delete obj.variants;
			return obj;
		});
		var variantsArr = [].concat((0, _toConsumableArray3.default)(productsClone));

		for (var i = variantsArr.length; i--;) {
			if (variantsArr[i].id === product.id) {
				variantsArr.splice(i, 1);
			}
		}

		if (product.id === 'A4CB21005R') {
			console.log(variantsArr);
		}
		product.variants = variantsArr;
	});
	return products;
}
//# sourceMappingURL=gatsby-node.js.map