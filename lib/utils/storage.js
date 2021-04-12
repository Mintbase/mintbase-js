"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadMetadata = exports.uploadToArweave = void 0;

require("isomorphic-unfetch");

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/storage");

var _browserOrNode = require("browser-or-node");

var _uuid = require("uuid");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

if (!_app["default"].apps.length) {
  _app["default"].initializeApp(_constants.CLOUD_STORAGE_CONFIG);
}

var storage = _app["default"].storage();

var ARWEAVE_FOLDER = 'arweave';
var headers = {
  apiKey: 'api-key'
};
/**
 * Uploads raw binary data to the cloud. This method is useful because
 * we can trigger an arweave upload via an http request with the returned file name.
 * @param buffer the raw binary data of the file to upload
 * @param contentType the content type
 * @returns the filename
 */

var _uploadCloud = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(buffer, contentType) {
    var fileName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!_browserOrNode.isNode) {
              _context.next = 2;
              break;
            }

            throw new Error('Node environment does not yet supports uploads.');

          case 2:
            fileName = (0, _uuid.v4)();
            _context.next = 5;
            return storage.ref("".concat(ARWEAVE_FOLDER, "/").concat(fileName)).put(buffer, {
              contentType: contentType
            });

          case 5:
            return _context.abrupt("return", fileName);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _uploadCloud(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Upload file to Arweave via a cloud function
 * @param file the file to upload
 * @returns retunrns an object containing the arweave content identifier and the content type.
 */


var uploadToArweave = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(file, apiKey) {
    var buffer, contentType, fileName, request, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!_browserOrNode.isNode) {
              _context2.next = 2;
              break;
            }

            throw new Error('Node environment does not yet supports uploads.');

          case 2:
            _context2.next = 4;
            return file.arrayBuffer();

          case 4:
            buffer = _context2.sent;
            contentType = file.type; // Uploads to google cloud

            _context2.next = 8;
            return _uploadCloud(buffer, contentType);

          case 8:
            fileName = _context2.sent;
            _context2.next = 11;
            return fetch((0, _constants.CLOUD_GET_FILE_METADATA_URI)(fileName), {
              headers: _defineProperty({}, headers.apiKey, apiKey || 'anonymous')
            });

          case 11:
            request = _context2.sent;
            _context2.next = 14;
            return request.json();

          case 14:
            data = _context2.sent;
            return _context2.abrupt("return", {
              id: data === null || data === void 0 ? void 0 : data.id,
              contentType: data === null || data === void 0 ? void 0 : data.contentType
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function uploadToArweave(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Uploads metadata to Arweave via a cloud function
 * @param metadata metadata object
 * @returns arweave content identifier
 */


exports.uploadToArweave = uploadToArweave;

var uploadMetadata = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(metadata, apiKey) {
    var request, data;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch((0, _constants.CLOUD_POST_METADATA_URI)(), {
              method: 'POST',
              body: JSON.stringify(metadata),
              headers: _defineProperty({}, headers.apiKey, apiKey || 'anonymous')
            });

          case 2:
            request = _context3.sent;
            _context3.next = 5;
            return request.json();

          case 5:
            data = _context3.sent;
            return _context3.abrupt("return", data === null || data === void 0 ? void 0 : data.id);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function uploadMetadata(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.uploadMetadata = uploadMetadata;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbImZpcmViYXNlIiwiYXBwcyIsImxlbmd0aCIsImluaXRpYWxpemVBcHAiLCJDTE9VRF9TVE9SQUdFX0NPTkZJRyIsInN0b3JhZ2UiLCJBUldFQVZFX0ZPTERFUiIsImhlYWRlcnMiLCJhcGlLZXkiLCJfdXBsb2FkQ2xvdWQiLCJidWZmZXIiLCJjb250ZW50VHlwZSIsImlzTm9kZSIsIkVycm9yIiwiZmlsZU5hbWUiLCJyZWYiLCJwdXQiLCJ1cGxvYWRUb0Fyd2VhdmUiLCJmaWxlIiwiYXJyYXlCdWZmZXIiLCJ0eXBlIiwiZmV0Y2giLCJyZXF1ZXN0IiwianNvbiIsImRhdGEiLCJpZCIsInVwbG9hZE1ldGFkYXRhIiwibWV0YWRhdGEiLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBTUEsSUFBSSxDQUFDQSxnQkFBU0MsSUFBVCxDQUFjQyxNQUFuQixFQUEyQjtBQUN6QkYsa0JBQVNHLGFBQVQsQ0FBdUJDLCtCQUF2QjtBQUNEOztBQUVELElBQU1DLE9BQU8sR0FBR0wsZ0JBQVNLLE9BQVQsRUFBaEI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLFNBQXZCO0FBRUEsSUFBTUMsT0FBTyxHQUFHO0FBQ2RDLEVBQUFBLE1BQU0sRUFBRTtBQURNLENBQWhCO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBTUMsWUFBWTtBQUFBLHFFQUFHLGlCQUNuQkMsTUFEbUIsRUFFbkJDLFdBRm1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUlmQyxxQkFKZTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFJRCxJQUFJQyxLQUFKLENBQVUsaURBQVYsQ0FKQzs7QUFBQTtBQU1iQyxZQUFBQSxRQU5hLEdBTUYsZUFORTtBQUFBO0FBQUEsbUJBUWJULE9BQU8sQ0FDVlUsR0FERyxXQUNJVCxjQURKLGNBQ3NCUSxRQUR0QixHQUVIRSxHQUZHLENBRUNOLE1BRkQsRUFFUztBQUFFQyxjQUFBQSxXQUFXLEVBQUVBO0FBQWYsYUFGVCxDQVJhOztBQUFBO0FBQUEsNkNBWVpHLFFBWlk7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBWkwsWUFBWTtBQUFBO0FBQUE7QUFBQSxHQUFsQjtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLElBQU1RLGVBQWU7QUFBQSxzRUFBRyxrQkFDN0JDLElBRDZCLEVBRTdCVixNQUY2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFJekJJLHFCQUp5QjtBQUFBO0FBQUE7QUFBQTs7QUFBQSxrQkFJWCxJQUFJQyxLQUFKLENBQVUsaURBQVYsQ0FKVzs7QUFBQTtBQUFBO0FBQUEsbUJBTVJLLElBQUksQ0FBQ0MsV0FBTCxFQU5ROztBQUFBO0FBTXZCVCxZQUFBQSxNQU51QjtBQU92QkMsWUFBQUEsV0FQdUIsR0FPVE8sSUFBSSxDQUFDRSxJQVBJLEVBUzdCOztBQVQ2QjtBQUFBLG1CQVVOWCxZQUFZLENBQUNDLE1BQUQsRUFBU0MsV0FBVCxDQVZOOztBQUFBO0FBVXZCRyxZQUFBQSxRQVZ1QjtBQUFBO0FBQUEsbUJBYVBPLEtBQUssQ0FBQyw0Q0FBNEJQLFFBQTVCLENBQUQsRUFBd0M7QUFDakVQLGNBQUFBLE9BQU8sc0JBQ0pBLE9BQU8sQ0FBQ0MsTUFESixFQUNhQSxNQUFNLElBQUksV0FEdkI7QUFEMEQsYUFBeEMsQ0FiRTs7QUFBQTtBQWF2QmMsWUFBQUEsT0FidUI7QUFBQTtBQUFBLG1CQW1CVkEsT0FBTyxDQUFDQyxJQUFSLEVBbkJVOztBQUFBO0FBbUJ2QkMsWUFBQUEsSUFuQnVCO0FBQUEsOENBcUJ0QjtBQUFFQyxjQUFBQSxFQUFFLEVBQUVELElBQUYsYUFBRUEsSUFBRix1QkFBRUEsSUFBSSxDQUFFQyxFQUFaO0FBQWdCZCxjQUFBQSxXQUFXLEVBQUVhLElBQUYsYUFBRUEsSUFBRix1QkFBRUEsSUFBSSxDQUFFYjtBQUFuQyxhQXJCc0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBZk0sZUFBZTtBQUFBO0FBQUE7QUFBQSxHQUFyQjtBQXdCUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNPLElBQU1TLGNBQWM7QUFBQSxzRUFBRyxrQkFDNUJDLFFBRDRCLEVBRTVCbkIsTUFGNEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFJTmEsS0FBSyxDQUFDLHlDQUFELEVBQTRCO0FBQ3JETyxjQUFBQSxNQUFNLEVBQUUsTUFENkM7QUFFckRDLGNBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLFFBQWYsQ0FGK0M7QUFHckRwQixjQUFBQSxPQUFPLHNCQUNKQSxPQUFPLENBQUNDLE1BREosRUFDYUEsTUFBTSxJQUFJLFdBRHZCO0FBSDhDLGFBQTVCLENBSkM7O0FBQUE7QUFJdEJjLFlBQUFBLE9BSnNCO0FBQUE7QUFBQSxtQkFXVEEsT0FBTyxDQUFDQyxJQUFSLEVBWFM7O0FBQUE7QUFXdEJDLFlBQUFBLElBWHNCO0FBQUEsOENBYXJCQSxJQWJxQixhQWFyQkEsSUFicUIsdUJBYXJCQSxJQUFJLENBQUVDLEVBYmU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBZEMsY0FBYztBQUFBO0FBQUE7QUFBQSxHQUFwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnaXNvbW9ycGhpYy11bmZldGNoJ1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCdcbmltcG9ydCAnZmlyZWJhc2Uvc3RvcmFnZSdcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJ2Jyb3dzZXItb3Itbm9kZSdcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnXG5pbXBvcnQge1xuICBDTE9VRF9HRVRfRklMRV9NRVRBREFUQV9VUkksXG4gIENMT1VEX1BPU1RfTUVUQURBVEFfVVJJLFxuICBDTE9VRF9TVE9SQUdFX0NPTkZJRyxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuXG5pZiAoIWZpcmViYXNlLmFwcHMubGVuZ3RoKSB7XG4gIGZpcmViYXNlLmluaXRpYWxpemVBcHAoQ0xPVURfU1RPUkFHRV9DT05GSUcpXG59XG5cbmNvbnN0IHN0b3JhZ2UgPSBmaXJlYmFzZS5zdG9yYWdlKClcbmNvbnN0IEFSV0VBVkVfRk9MREVSID0gJ2Fyd2VhdmUnXG5cbmNvbnN0IGhlYWRlcnMgPSB7XG4gIGFwaUtleTogJ2FwaS1rZXknLFxufVxuXG4vKipcbiAqIFVwbG9hZHMgcmF3IGJpbmFyeSBkYXRhIHRvIHRoZSBjbG91ZC4gVGhpcyBtZXRob2QgaXMgdXNlZnVsIGJlY2F1c2VcbiAqIHdlIGNhbiB0cmlnZ2VyIGFuIGFyd2VhdmUgdXBsb2FkIHZpYSBhbiBodHRwIHJlcXVlc3Qgd2l0aCB0aGUgcmV0dXJuZWQgZmlsZSBuYW1lLlxuICogQHBhcmFtIGJ1ZmZlciB0aGUgcmF3IGJpbmFyeSBkYXRhIG9mIHRoZSBmaWxlIHRvIHVwbG9hZFxuICogQHBhcmFtIGNvbnRlbnRUeXBlIHRoZSBjb250ZW50IHR5cGVcbiAqIEByZXR1cm5zIHRoZSBmaWxlbmFtZVxuICovXG5jb25zdCBfdXBsb2FkQ2xvdWQgPSBhc3luYyAoXG4gIGJ1ZmZlcjogQXJyYXlCdWZmZXIgfCBCdWZmZXIsXG4gIGNvbnRlbnRUeXBlOiBzdHJpbmdcbik6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGlmIChpc05vZGUpIHRocm93IG5ldyBFcnJvcignTm9kZSBlbnZpcm9ubWVudCBkb2VzIG5vdCB5ZXQgc3VwcG9ydHMgdXBsb2Fkcy4nKVxuXG4gIGNvbnN0IGZpbGVOYW1lID0gdXVpZHY0KClcblxuICBhd2FpdCBzdG9yYWdlXG4gICAgLnJlZihgJHtBUldFQVZFX0ZPTERFUn0vJHtmaWxlTmFtZX1gKVxuICAgIC5wdXQoYnVmZmVyLCB7IGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSB9KVxuXG4gIHJldHVybiBmaWxlTmFtZVxufVxuXG4vKipcbiAqIFVwbG9hZCBmaWxlIHRvIEFyd2VhdmUgdmlhIGEgY2xvdWQgZnVuY3Rpb25cbiAqIEBwYXJhbSBmaWxlIHRoZSBmaWxlIHRvIHVwbG9hZFxuICogQHJldHVybnMgcmV0dW5ybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGFyd2VhdmUgY29udGVudCBpZGVudGlmaWVyIGFuZCB0aGUgY29udGVudCB0eXBlLlxuICovXG5leHBvcnQgY29uc3QgdXBsb2FkVG9BcndlYXZlID0gYXN5bmMgKFxuICBmaWxlOiBGaWxlLFxuICBhcGlLZXk/OiBzdHJpbmdcbik6IFByb21pc2U8eyBpZDogc3RyaW5nOyBjb250ZW50VHlwZTogc3RyaW5nIH0+ID0+IHtcbiAgaWYgKGlzTm9kZSkgdGhyb3cgbmV3IEVycm9yKCdOb2RlIGVudmlyb25tZW50IGRvZXMgbm90IHlldCBzdXBwb3J0cyB1cGxvYWRzLicpXG5cbiAgY29uc3QgYnVmZmVyID0gYXdhaXQgZmlsZS5hcnJheUJ1ZmZlcigpXG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gZmlsZS50eXBlXG5cbiAgLy8gVXBsb2FkcyB0byBnb29nbGUgY2xvdWRcbiAgY29uc3QgZmlsZU5hbWUgPSBhd2FpdCBfdXBsb2FkQ2xvdWQoYnVmZmVyLCBjb250ZW50VHlwZSlcblxuICAvLyBGZXRjaGVzIGFyd2VhdmUgaWQuIFRoaXMgcmVxdWVzdCB3aWxsIHRyaWdnZXIgYW4gdXBsb2FkIGluIHRoZSBjbG91ZFxuICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2goQ0xPVURfR0VUX0ZJTEVfTUVUQURBVEFfVVJJKGZpbGVOYW1lKSwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIFtoZWFkZXJzLmFwaUtleV06IGFwaUtleSB8fCAnYW5vbnltb3VzJyxcbiAgICB9LFxuICB9KVxuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gIHJldHVybiB7IGlkOiBkYXRhPy5pZCwgY29udGVudFR5cGU6IGRhdGE/LmNvbnRlbnRUeXBlIH1cbn1cblxuLyoqXG4gKiBVcGxvYWRzIG1ldGFkYXRhIHRvIEFyd2VhdmUgdmlhIGEgY2xvdWQgZnVuY3Rpb25cbiAqIEBwYXJhbSBtZXRhZGF0YSBtZXRhZGF0YSBvYmplY3RcbiAqIEByZXR1cm5zIGFyd2VhdmUgY29udGVudCBpZGVudGlmaWVyXG4gKi9cbmV4cG9ydCBjb25zdCB1cGxvYWRNZXRhZGF0YSA9IGFzeW5jIChcbiAgbWV0YWRhdGE6IHVua25vd24sXG4gIGFwaUtleT86IHN0cmluZ1xuKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgcmVxdWVzdCA9IGF3YWl0IGZldGNoKENMT1VEX1BPU1RfTUVUQURBVEFfVVJJKCksIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShtZXRhZGF0YSksXG4gICAgaGVhZGVyczoge1xuICAgICAgW2hlYWRlcnMuYXBpS2V5XTogYXBpS2V5IHx8ICdhbm9ueW1vdXMnLFxuICAgIH0sXG4gIH0pXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuXG4gIHJldHVybiBkYXRhPy5pZCBhcyBzdHJpbmdcbn1cbiJdfQ==