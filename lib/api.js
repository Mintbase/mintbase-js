"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = void 0;

require("isomorphic-unfetch");

var _graphqlRequest = require("graphql-request");

var _types = require("./types");

var _constants = require("./constants");

var _queries = require("./queries");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Mintbase API.
 * Main entry point for users read Mintbase data.
 */
var API = /*#__PURE__*/function () {
  function API(config) {
    _classCallCheck(this, API);

    _defineProperty(this, "apiBaseUrl", _constants.API_BASE_NEAR_TESTNET);

    _defineProperty(this, "defaultLimit", 10);

    _defineProperty(this, "chainName", _types.Chain.near);

    _defineProperty(this, "networkName", _types.Network.testnet);

    switch (config.chain) {
      case _types.Chain.near:
        this.apiBaseUrl = config.apiBaseUrl || _constants.API_BASE_NEAR_TESTNET;
        this.chainName = _types.Chain.near;
        break;

      default:
        this.apiBaseUrl = config.apiBaseUrl || _constants.API_BASE_NEAR_TESTNET;
        this.chainName = config.chain;
        break;
    }
  }
  /**
   * Fetch marketplace and each token's metadata (w/ cursor offset pagination enabled).
   * @param limit number of results
   * @param offset number of records to skip
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  _createClass(API, [{
    key: "fetchMarketplace",
    value: function () {
      var _fetchMarketplace = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(limit, offset) {
        var _this = this;

        var listings, promises, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _graphqlRequest.request)(this.apiBaseUrl, _queries.FETCH_MARKETPLACE, {
                  limit: limit || this.defaultLimit,
                  offset: offset || 0
                });

              case 2:
                listings = _context2.sent;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                promises = listings.list.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(list) {
                    var metadata;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this.fetchMetadata(list.token.thingId);

                          case 2:
                            metadata = _context.sent;
                            return _context.abrupt("return", _objectSpread(_objectSpread({}, list), {}, {
                              metadata: metadata
                            }));

                          case 4:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context2.next = 6;
                return Promise.all(promises);

              case 6:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchMarketplace(_x, _x2) {
        return _fetchMarketplace.apply(this, arguments);
      }

      return fetchMarketplace;
    }()
    /**
     * Fetch token metadata.
     * @param tokenId token id
     * @returns token metadata
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "fetchTokenMetadata",
    value: function () {
      var _fetchTokenMetadata = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(tokenId, storeId) {
        var result, token, metadata;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _graphqlRequest.request)(this.apiBaseUrl, _queries.GET_TOKEN_BY_ID, {
                  tokenId: "".concat(tokenId, ":").concat(storeId)
                });

              case 2:
                result = _context3.sent;

                if (!(result.token.length === 0)) {
                  _context3.next = 5;
                  break;
                }

                throw new Error("".concat(tokenId, " is not a valid token."));

              case 5:
                token = result.token[0];
                _context3.next = 8;
                return this.fetchMetadata(token.thingId);

              case 8:
                metadata = _context3.sent;
                return _context3.abrupt("return", metadata);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchTokenMetadata(_x4, _x5) {
        return _fetchTokenMetadata.apply(this, arguments);
      }

      return fetchTokenMetadata;
    }()
    /**
     * Fetch lists without metadata.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "fetchLists",
    value: function () {
      var _fetchLists = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        var list;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _graphqlRequest.request)(this.apiBaseUrl, _queries.GET_LATEST_LIST, {
                  groupId: id
                });

              case 2:
                list = _context4.sent;
                return _context4.abrupt("return", list);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchLists(_x6) {
        return _fetchLists.apply(this, arguments);
      }

      return fetchLists;
    }()
    /**
     * Fetch thing.
     * TODO: Not yet implemented
     */

  }, {
    key: "fetchThing",
    value: function () {
      var _fetchThing = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                throw new Error('Not yet implemented.');

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function fetchThing() {
        return _fetchThing.apply(this, arguments);
      }

      return fetchThing;
    }()
    /**
     * Fetch token
     * @param tokenId token id
     * @param storeId store id
     * @returns the token
     */

  }, {
    key: "fetchToken",
    value: function () {
      var _fetchToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(tokenId, storeId) {
        var result, token;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return (0, _graphqlRequest.request)(this.apiBaseUrl, _queries.GET_TOKEN_BY_ID, {
                  tokenId: "".concat(tokenId, ":").concat(storeId)
                });

              case 2:
                result = _context6.sent;

                if (!(result.token.length === 0)) {
                  _context6.next = 5;
                  break;
                }

                throw new Error("".concat(tokenId, " is not a valid token"));

              case 5:
                token = result.token[0];
                return _context6.abrupt("return", token);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function fetchToken(_x7, _x8) {
        return _fetchToken.apply(this, arguments);
      }

      return fetchToken;
    }()
    /**
     * Fetch metadata from Arweave
     * @param id arweave content identifier
     * @returns metadata
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "fetchMetadata",
    value: function () {
      var _fetchMetadata = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id) {
        var request, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return fetch("".concat(_constants.BASE_ARWEAVE_URI, "/").concat(id));

              case 2:
                request = _context7.sent;
                _context7.next = 5;
                return request.json();

              case 5:
                result = _context7.sent;
                return _context7.abrupt("return", result);

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function fetchMetadata(_x9) {
        return _fetchMetadata.apply(this, arguments);
      }

      return fetchMetadata;
    }()
    /**
     * Fetch account owned tokens
     * @param accountId account id
     * @returns list of tokens
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "fetchOwnerTokens",
    value: function () {
      var _fetchOwnerTokens = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(accountId) {
        var result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return (0, _graphqlRequest.request)(this.apiBaseUrl, _queries.GET_TOKENS_BY_OWNER_ID, {
                  ownerId: accountId
                });

              case 2:
                result = _context8.sent;
                return _context8.abrupt("return", result.token);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchOwnerTokens(_x10) {
        return _fetchOwnerTokens.apply(this, arguments);
      }

      return fetchOwnerTokens;
    }()
    /**
     * Checks whether account owns a token or not.
     * @param tokenId token id
     * @param accountId account id
     * @returns whether an account owns a token or not.
     */

  }, {
    key: "isOwner",
    value: function () {
      var _isOwner = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(tokenId, accountId) {
        var result, token;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return (0, _graphqlRequest.request)(this.apiBaseUrl, _queries.GET_TOKEN_BY_ID, {
                  tokenId: tokenId
                });

              case 2:
                result = _context9.sent;

                if (!(result.token.length === 0)) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return", false);

              case 5:
                token = result.token[0];
                return _context9.abrupt("return", token.ownerId === accountId);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function isOwner(_x11, _x12) {
        return _isOwner.apply(this, arguments);
      }

      return isOwner;
    }()
    /**
     * Makes custom GraphQL query
     * @param query custom GraphQL query
     * @param variables object with variables passed to the query
     * @returns result of query
     */

  }, {
    key: "custom",
    value: function () {
      var _custom = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(query, variables) {
        var result;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return (0, _graphqlRequest.request)(this.apiBaseUrl, query, variables);

              case 2:
                result = _context10.sent;
                return _context10.abrupt("return", result);

              case 4:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function custom(_x13, _x14) {
        return _custom.apply(this, arguments);
      }

      return custom;
    }()
  }]);

  return API;
}();

exports.API = API;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcGkudHMiXSwibmFtZXMiOlsiQVBJIiwiY29uZmlnIiwiQVBJX0JBU0VfTkVBUl9URVNUTkVUIiwiQ2hhaW4iLCJuZWFyIiwiTmV0d29yayIsInRlc3RuZXQiLCJjaGFpbiIsImFwaUJhc2VVcmwiLCJjaGFpbk5hbWUiLCJsaW1pdCIsIm9mZnNldCIsIkZFVENIX01BUktFVFBMQUNFIiwiZGVmYXVsdExpbWl0IiwibGlzdGluZ3MiLCJwcm9taXNlcyIsImxpc3QiLCJtYXAiLCJmZXRjaE1ldGFkYXRhIiwidG9rZW4iLCJ0aGluZ0lkIiwibWV0YWRhdGEiLCJQcm9taXNlIiwiYWxsIiwicmVzdWx0IiwidG9rZW5JZCIsInN0b3JlSWQiLCJHRVRfVE9LRU5fQllfSUQiLCJsZW5ndGgiLCJFcnJvciIsImlkIiwiR0VUX0xBVEVTVF9MSVNUIiwiZ3JvdXBJZCIsImZldGNoIiwiQkFTRV9BUldFQVZFX1VSSSIsInJlcXVlc3QiLCJqc29uIiwiYWNjb3VudElkIiwiR0VUX1RPS0VOU19CWV9PV05FUl9JRCIsIm93bmVySWQiLCJxdWVyeSIsInZhcmlhYmxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtJQUNhQSxHO0FBTVgsZUFBWUMsTUFBWixFQUF1QztBQUFBOztBQUFBLHdDQUxYQyxnQ0FLVzs7QUFBQSwwQ0FKakIsRUFJaUI7O0FBQUEsdUNBSFpDLGFBQU1DLElBR007O0FBQUEseUNBRlZDLGVBQVFDLE9BRUU7O0FBQ3JDLFlBQVFMLE1BQU0sQ0FBQ00sS0FBZjtBQUNFLFdBQUtKLGFBQU1DLElBQVg7QUFDRSxhQUFLSSxVQUFMLEdBQWtCUCxNQUFNLENBQUNPLFVBQVAsSUFBcUJOLGdDQUF2QztBQUNBLGFBQUtPLFNBQUwsR0FBaUJOLGFBQU1DLElBQXZCO0FBQ0E7O0FBQ0Y7QUFDRSxhQUFLSSxVQUFMLEdBQWtCUCxNQUFNLENB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UjtBQUFBLGtEQUtTQSxNQUFNLENBQUNMLEtBTGhCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE87Ozs7Ozs7O0FBUUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs2RUFDRSxrQkFBcUJNLE9BQXJCLEVBQXNDWSxTQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN1Qiw2QkFBUSxLQUFLN0IsVUFBYixFQUF5Qm1CLHdCQUF6QixFQUEwQztBQUM3REYsa0JBQUFBLE9BQU8sRUFBRUE7QUFEb0QsaUJBQTFDLENBRHZCOztBQUFBO0FBQ1FELGdCQUFBQSxNQURSOztBQUFBLHNCQUtNQSxNQUFNLENBQUNMLEtBQVAsQ0FBYVMsTUFBYixLQUF3QixDQUw5QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrREFLd0MsS0FMeEM7O0FBQUE7QUFPUVQsZ0JBQUFBLEtBUFIsR0FPZ0JLLE1BQU0sQ0FBQ0wsS0FBUCxDQUFhLENBQWIsQ0FQaEI7QUFBQSxrREFTU0EsS0FBSyxDQUFDb0IsT0FBTixLQUFrQkYsU0FUM0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7QUFZQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OzRFQUNFLG1CQUFvQkcsS0FBcEIsRUFBbUNDLFNBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3VCLDZCQUFRLEtBQUtqQyxVQUFiLEVBQXlCZ0MsS0FBekIsRUFBZ0NDLFNBQWhDLENBRHZCOztBQUFBO0FBQ1FqQixnQkFBQUEsTUFEUjtBQUFBLG1EQUVTQSxNQUZUOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2lzb21vcnBoaWMtdW5mZXRjaCdcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICdncmFwaHFsLXJlcXVlc3QnXG5pbXBvcnQgeyBNaW50YmFzZUFQSUNvbmZpZywgTmV0d29yaywgQ2hhaW4sIFRva2VuIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCB7IEFQSV9CQVNFX05FQVJfVEVTVE5FVCwgQkFTRV9BUldFQVZFX1VSSSB9IGZyb20gJy4vY29uc3RhbnRzJ1xuaW1wb3J0IHtcbiAgRkVUQ0hfTUFSS0VUUExBQ0UsXG4gIEdFVF9MQVRFU1RfTElTVCxcbiAgR0VUX1RPS0VOU19CWV9PV05FUl9JRCxcbiAgR0VUX1RPS0VOX0JZX0lELFxufSBmcm9tICcuL3F1ZXJpZXMnXG5cbi8qKlxuICogTWludGJhc2UgQVBJLlxuICogTWFpbiBlbnRyeSBwb2ludCBmb3IgdXNlcnMgcmVhZCBNaW50YmFzZSBkYXRhLlxuICovXG5leHBvcnQgY2xhc3MgQVBJIHtcbiAgcHVibGljIGFwaUJhc2VVcmw6IHN0cmluZyA9IEFQSV9CQVNFX05FQVJfVEVTVE5FVFxuICBwdWJsaWMgZGVmYXVsdExpbWl0ID0gMTBcbiAgcHVibGljIGNoYWluTmFtZTogc3RyaW5nID0gQ2hhaW4ubmVhclxuICBwdWJsaWMgbmV0d29ya05hbWU6IHN0cmluZyA9IE5ldHdvcmsudGVzdG5ldFxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogTWludGJhc2VBUElDb25maWcpIHtcbiAgICBzd2l0Y2ggKGNvbmZpZy5jaGFpbikge1xuICAgICAgY2FzZSBDaGFpbi5uZWFyOlxuICAgICAgICB0aGlzLmFwaUJhc2VVcmwgPSBjb25maWcuYXBpQmFzZVVybCB8fCBBUElfQkFTRV9ORUFSX1RFU1RORVRcbiAgICAgICAgdGhpcy5jaGFpbk5hbWUgPSBDaGFpbi5uZWFyXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmFwaUJhc2VVcmwgPSBjb25maWcuYXBpQmFzZVVybCB8fCBBUElfQkFTRV9ORUFSX1RFU1RORVRcbiAgICAgICAgdGhpcy5jaGFpbk5hbWUgPSBjb25maWcuY2hhaW5cbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggbWFya2V0cGxhY2UgYW5kIGVhY2ggdG9rZW4ncyBtZXRhZGF0YSAody8gY3Vyc29yIG9mZnNldCBwYWdpbmF0aW9uIGVuYWJsZWQpLlxuICAgKiBAcGFyYW0gbGltaXQgbnVtYmVyIG9mIHJlc3VsdHNcbiAgICogQHBhcmFtIG9mZnNldCBudW1iZXIgb2YgcmVjb3JkcyB0byBza2lwXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwdWJsaWMgYXN5bmMgZmV0Y2hNYXJrZXRwbGFjZShsaW1pdD86IG51bWJlciwgb2Zmc2V0PzogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBsaXN0aW5ncyA9IGF3YWl0IHJlcXVlc3QodGhpcy5hcGlCYXNlVXJsLCBGRVRDSF9NQVJLRVRQTEFDRSwge1xuICAgICAgbGltaXQ6IGxpbWl0IHx8IHRoaXMuZGVmYXVsdExpbWl0LFxuICAgICAgb2Zmc2V0OiBvZmZzZXQgfHwgMCxcbiAgICB9KVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBwcm9taXNlcyA9IGxpc3RpbmdzLmxpc3QubWFwKGFzeW5jIChsaXN0OiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgdGhpcy5mZXRjaE1ldGFkYXRhKGxpc3QudG9rZW4udGhpbmdJZClcblxuICAgICAgcmV0dXJuIHsgLi4ubGlzdCwgbWV0YWRhdGE6IG1ldGFkYXRhIH1cbiAgICB9KVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggdG9rZW4gbWV0YWRhdGEuXG4gICAqIEBwYXJhbSB0b2tlbklkIHRva2VuIGlkXG4gICAqIEByZXR1cm5zIHRva2VuIG1ldGFkYXRhXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwdWJsaWMgYXN5bmMgZmV0Y2hUb2tlbk1ldGFkYXRhKFxuICAgIHRva2VuSWQ6IHN0cmluZyxcbiAgICBzdG9yZUlkOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0KHRoaXMuYXBpQmFzZVVybCwgR0VUX1RPS0VOX0JZX0lELCB7XG4gICAgICB0b2tlbklkOiBgJHt0b2tlbklkfToke3N0b3JlSWR9YCxcbiAgICB9KVxuXG4gICAgaWYgKHJlc3VsdC50b2tlbi5sZW5ndGggPT09IDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dG9rZW5JZH0gaXMgbm90IGEgdmFsaWQgdG9rZW4uYClcblxuICAgIGNvbnN0IHRva2VuID0gcmVzdWx0LnRva2VuWzBdXG5cbiAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IHRoaXMuZmV0Y2hNZXRhZGF0YSh0b2tlbi50aGluZ0lkKVxuXG4gICAgcmV0dXJuIG1ldGFkYXRhXG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggbGlzdHMgd2l0aG91dCBtZXRhZGF0YS5cbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyBhc3luYyBmZXRjaExpc3RzKGlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IGxpc3QgPSBhd2FpdCByZXF1ZXN0KHRoaXMuYXBpQmFzZVVybCwgR0VUX0xBVEVTVF9MSVNULCB7XG4gICAgICBncm91cElkOiBpZCxcbiAgICB9KVxuXG4gICAgcmV0dXJuIGxpc3RcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGluZy5cbiAgICogVE9ETzogTm90IHlldCBpbXBsZW1lbnRlZFxuICAgKi9cbiAgcHVibGljIGFzeW5jIGZldGNoVGhpbmcoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkLicpXG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggdG9rZW5cbiAgICogQHBhcmFtIHRva2VuSWQgdG9rZW4gaWRcbiAgICogQHBhcmFtIHN0b3JlSWQgc3RvcmUgaWRcbiAgICogQHJldHVybnMgdGhlIHRva2VuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgZmV0Y2hUb2tlbih0b2tlbklkOiBudW1iZXIsIHN0b3JlSWQ6IHN0cmluZyk6IFByb21pc2U8VG9rZW4+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0KHRoaXMuYXBpQmFzZVVybCwgR0VUX1RPS0VOX0JZX0lELCB7XG4gICAgICB0b2tlbklkOiBgJHt0b2tlbklkfToke3N0b3JlSWR9YCxcbiAgICB9KVxuXG4gICAgaWYgKHJlc3VsdC50b2tlbi5sZW5ndGggPT09IDApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dG9rZW5JZH0gaXMgbm90IGEgdmFsaWQgdG9rZW5gKVxuXG4gICAgY29uc3QgdG9rZW4gPSByZXN1bHQudG9rZW5bMF1cblxuICAgIHJldHVybiB0b2tlblxuICB9XG5cbiAgLyoqXG4gICAqIEZldGNoIG1ldGFkYXRhIGZyb20gQXJ3ZWF2ZVxuICAgKiBAcGFyYW0gaWQgYXJ3ZWF2ZSBjb250ZW50IGlkZW50aWZpZXJcbiAgICogQHJldHVybnMgbWV0YWRhdGFcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyBhc3luYyBmZXRjaE1ldGFkYXRhKGlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChgJHtCQVNFX0FSV0VBVkVfVVJJfS8ke2lkfWApXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggYWNjb3VudCBvd25lZCB0b2tlbnNcbiAgICogQHBhcmFtIGFjY291bnRJZCBhY2NvdW50IGlkXG4gICAqIEByZXR1cm5zIGxpc3Qgb2YgdG9rZW5zXG4gICAqL1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwdWJsaWMgYXN5bmMgZmV0Y2hPd25lclRva2VucyhhY2NvdW50SWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVxdWVzdCh0aGlzLmFwaUJhc2VVcmwsIEdFVF9UT0tFTlNfQllfT1dORVJfSUQsIHtcbiAgICAgIG93bmVySWQ6IGFjY291bnRJZCxcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdC50b2tlblxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIGFjY291bnQgb3ducyBhIHRva2VuIG9yIG5vdC5cbiAgICogQHBhcmFtIHRva2VuSWQgdG9rZW4gaWRcbiAgICogQHBhcmFtIGFjY291bnRJZCBhY2NvdW50IGlkXG4gICAqIEByZXR1cm5zIHdoZXRoZXIgYW4gYWNjb3VudCBvd25zIGEgdG9rZW4gb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGFzeW5jIGlzT3duZXIodG9rZW5JZDogbnVtYmVyLCBhY2NvdW50SWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlcXVlc3QodGhpcy5hcGlCYXNlVXJsLCBHRVRfVE9LRU5fQllfSUQsIHtcbiAgICAgIHRva2VuSWQ6IHRva2VuSWQsXG4gICAgfSlcblxuICAgIGlmIChyZXN1bHQudG9rZW4ubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2VcblxuICAgIGNvbnN0IHRva2VuID0gcmVzdWx0LnRva2VuWzBdXG5cbiAgICByZXR1cm4gdG9rZW4ub3duZXJJZCA9PT0gYWNjb3VudElkXG4gIH1cblxuICAvKipcbiAgICogTWFrZXMgY3VzdG9tIEdyYXBoUUwgcXVlcnlcbiAgICogQHBhcmFtIHF1ZXJ5IGN1c3RvbSBHcmFwaFFMIHF1ZXJ5XG4gICAqIEBwYXJhbSB2YXJpYWJsZXMgb2JqZWN0IHdpdGggdmFyaWFibGVzIHBhc3NlZCB0byB0aGUgcXVlcnlcbiAgICogQHJldHVybnMgcmVzdWx0IG9mIHF1ZXJ5XG4gICAqL1xuICBwdWJsaWMgYXN5bmMgY3VzdG9tKHF1ZXJ5OiBzdHJpbmcsIHZhcmlhYmxlcz86IHVua25vd24pOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXF1ZXN0KHRoaXMuYXBpQmFzZVVybCwgcXVlcnksIHZhcmlhYmxlcylcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiJdfQ==