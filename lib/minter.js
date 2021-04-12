"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Minter = void 0;

var _storage = require("./utils/storage");

var _constants = require("./constants");

var _types = require("./types");

var _validFileFormat;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validFileFormat = (_validFileFormat = {}, _defineProperty(_validFileFormat, _types.MetadataField.Image, ['image/jpeg', 'image/png', 'image/gif']), _defineProperty(_validFileFormat, _types.MetadataField.Animation_url, ['audio/ogg', 'video/webm', 'video/mp4', 'audio/mpeg', 'audio/mp3']), _validFileFormat);

/**
 * A programmatic metadata generator.
 */
var Minter = /*#__PURE__*/function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function Minter(minterConfig) {
    _classCallCheck(this, Minter);

    _defineProperty(this, "latestMints", void 0);

    _defineProperty(this, "currentMint", void 0);

    _defineProperty(this, "apiKey", void 0);

    this.latestMints = {};
    this.currentMint = {};
    this.apiKey = minterConfig.apiKey || 'anonymous';
  }
  /**
   * Uploads the current metadata object and returns its content identifier.
   */


  _createClass(Minter, [{
    key: "getMetadataId",
    value: function () {
      var _getMetadataId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var id;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.currentMint && Object.keys(this.currentMint).length === 0 && this.currentMint.constructor === Object)) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Metadata is empty.');

              case 2:
                _context.next = 4;
                return (0, _storage.uploadMetadata)(this.currentMint, this.apiKey);

              case 4:
                id = _context.sent;
                this.latestMints = _objectSpread(_objectSpread({}, this.latestMints), {}, _defineProperty({}, id, this.currentMint));
                this.currentMint = {};
                return _context.abrupt("return", id);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMetadataId() {
        return _getMetadataId.apply(this, arguments);
      }

      return getMetadataId;
    }()
    /**
     * Set a field in metadata.
     * @param key The field key.
     * @param value The field value.
     */

  }, {
    key: "setField",
    value: function setField(key, value) {
      // this.fieldChecks(key, value)
      this.currentMint[key] = value;
    }
  }, {
    key: "setMetadata",
    value: function setMetadata(metadata, override) {
      if (override) {
        this.currentMint = _objectSpread(_objectSpread({}, this.currentMint), metadata);
      } else {
        this.currentMint = _objectSpread(_objectSpread({}, metadata), this.currentMint);
      }
    }
    /**
     * Uploads file and sets its corresponding URI to a field.
     * @param field The metadata field.
     * @param file The file to upload.
     */

  }, {
    key: "upload",
    value: function () {
      var _upload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(field, file) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (validFileFormat[field].includes(file.type)) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('File type not accepted.');

              case 2:
                _context2.next = 4;
                return (0, _storage.uploadToArweave)(file, this.apiKey);

              case 4:
                result = _context2.sent;
                this.currentMint[field] = "".concat(_constants.BASE_ARWEAVE_URI, "/").concat(result === null || result === void 0 ? void 0 : result.id);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function upload(_x, _x2) {
        return _upload.apply(this, arguments);
      }

      return upload;
    }() // TODO: implement all checks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "fieldChecks",
    value: function fieldChecks(key, value) {
      switch (key) {
        case _types.MetadataField.Youtube_url:
          if (typeof value !== 'string') throw new Error('Value is not of type string.'); // eslint-disable-next-line no-case-declarations

          var urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi; // eslint-disable-next-line no-case-declarations

          var regex = new RegExp(urlRegex);
          if (!value.match(regex)) throw new Error('URL is not well formatted.');
          break;

        case _types.MetadataField.Name:
          if (typeof value !== 'string') throw new Error('Value is not of type string.');
          break;

        case _types.MetadataField.Description:
          if (typeof value !== 'string') throw new Error('Value is not of type string.');
          break;

        default:
          break;
      }
    }
  }]);

  return Minter;
}();

exports.Minter = Minter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9taW50ZXIudHMiXSwibmFtZXMiOlsidmFsaWRGaWxlRm9ybWF0IiwiTWV0YWRhdGFGaWVsZCIsIkltYWdlIiwiQW5pbWF0aW9uX3VybCIsIk1pbnRlciIsIm1pbnRlckNvbmZpZyIsImxhdGVzdE1pbnRzIiwiY3VycmVudE1pbnQiLCJhcGlLZXkiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiY29uc3RydWN0b3IiLCJFcnJvciIsImlkIiwia2V5IiwidmFsdWUiLCJtZXRhZGF0YSIsIm92ZXJyaWRlIiwiZmllbGQiLCJmaWxlIiwiaW5jbHVkZXMiLCJ0eXBlIiwicmVzdWx0IiwiQkFTRV9BUldFQVZFX1VSSSIsIllvdXR1YmVfdXJsIiwidXJsUmVnZXgiLCJyZWdleCIsIlJlZ0V4cCIsIm1hdGNoIiwiTmFtZSIsIkRlc2NyaXB0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsZUFBNEMsNkRBQy9DQyxxQkFBY0MsS0FEaUMsRUFDekIsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QixXQUE1QixDQUR5QixxQ0FFL0NELHFCQUFjRSxhQUZpQyxFQUVqQixDQUM3QixXQUQ2QixFQUU3QixZQUY2QixFQUc3QixXQUg2QixFQUk3QixZQUo2QixFQUs3QixXQUw2QixDQUZpQixvQkFBbEQ7O0FBZUE7QUFDQTtBQUNBO0lBQ2FDLE07QUFDWDtBQUVBO0FBS0Esa0JBQVlDLFlBQVosRUFBNkM7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFDM0MsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFFQSxTQUFLQyxNQUFMLEdBQWNILFlBQVksQ0FBQ0csTUFBYixJQUF1QixXQUFyQztBQUNEO0FBRUQ7QUFDRjtBQUNBOzs7Ozs7bUZBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBRUksS0FBS0QsV0FBTCxJQUNBRSxNQUFNLENBQUNDLElBQVAsQ0FBWSxLQUFLSCxXQUFqQixFQUE4QkksTUFBOUIsS0FBeUMsQ0FEekMsSUFFQSxLQUFLSixXQUFMLENBQWlCSyxXQUFqQixLQUFpQ0gsTUFKckM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsc0JBTVUsSUFBSUksS0FBSixDQUFVLG9CQUFWLENBTlY7O0FBQUE7QUFBQTtBQUFBLHVCQVFtQiw2QkFBZSxLQUFLTixXQUFwQixFQUFpQyxLQUFLQyxNQUF0QyxDQVJuQjs7QUFBQTtBQVFRTSxnQkFBQUEsRUFSUjtBQVVFLHFCQUFLUixXQUFMLG1DQUF3QixLQUFLQSxXQUE3QiwyQkFBMkNRLEVBQTNDLEVBQWdELEtBQUtQLFdBQXJEO0FBQ0EscUJBQUtBLFdBQUwsR0FBbUIsRUFBbkI7QUFYRixpREFhU08sRUFiVDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7OztBQWdCQTtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0Usa0JBQWdCQyxHQUFoQixFQUFvQ0MsS0FBcEMsRUFBMEQ7QUFDeEQ7QUFDQSxXQUFLVCxXQUFMLENBQWlCUSxHQUFqQixJQUF3QkMsS0FBeEI7QUFDRDs7O1dBRUQscUJBQW1CQyxRQUFuQixFQUFrQ0MsUUFBbEMsRUFBNEQ7QUFDMUQsVUFBSUEsUUFBSixFQUFjO0FBQ1osYUFBS1gsV0FBTCxtQ0FDSyxLQUFLQSxXQURWLEdBRUtVLFFBRkw7QUFJRCxPQUxELE1BS087QUFDTCxhQUFLVixXQUFMLG1DQUNLVSxRQURMLEdBRUssS0FBS1YsV0FGVjtBQUlEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7Ozs0RUFDRSxrQkFBb0JZLEtBQXBCLEVBQW1DQyxJQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFFT3BCLGVBQWUsQ0FBQ21CLEtBQUQsQ0FBZixDQUF1QkUsUUFBdkIsQ0FBZ0NELElBQUksQ0FBQ0UsSUFBckMsQ0FGUDtBQUFBO0FBQUE7QUFBQTs7QUFBQSxzQkFHVSxJQUFJVCxLQUFKLENBQVUseUJBQVYsQ0FIVjs7QUFBQTtBQUFBO0FBQUEsdUJBU3VCLDhCQUFnQk8sSUFBaEIsRUFBc0IsS0FBS1osTUFBM0IsQ0FUdkI7O0FBQUE7QUFTUWUsZ0JBQUFBLE1BVFI7QUFXRSxxQkFBS2hCLFdBQUwsQ0FBaUJZLEtBQWpCLGNBQTZCSywyQkFBN0IsY0FBaURELE1BQWpELGFBQWlEQSxNQUFqRCx1QkFBaURBLE1BQU0sQ0FBRVQsRUFBekQ7O0FBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7OztRQWNBO0FBQ0E7Ozs7V0FDQSxxQkFBb0JDLEdBQXBCLEVBQXdDQyxLQUF4QyxFQUEwRDtBQUN4RCxjQUFRRCxHQUFSO0FBQ0UsYUFBS2QscUJBQWN3QixXQUFuQjtBQUNFLGNBQUksT0FBT1QsS0FBUCxLQUFpQixRQUFyQixFQUNFLE1BQU0sSUFBSUgsS0FBSixDQUFVLDhCQUFWLENBQU4sQ0FGSixDQUlFOztBQUNBLGNBQU1hLFFBQVEsR0FBRyxxTkFBakIsQ0FMRixDQU1FOztBQUNBLGNBQU1DLEtBQUssR0FBRyxJQUFJQyxNQUFKLENBQVdGLFFBQVgsQ0FBZDtBQUVBLGNBQUksQ0FBQ1YsS0FBSyxDQUFDYSxLQUFOLENBQVlGLEtBQVosQ0FBTCxFQUF5QixNQUFNLElBQUlkLEtBQUosQ0FBVSw0QkFBVixDQUFOO0FBQ3pCOztBQUNGLGFBQUtaLHFCQUFjNkIsSUFBbkI7QUFDRSxjQUFJLE9BQU9kLEtBQVAsS0FBaUIsUUFBckIsRUFDRSxNQUFNLElBQUlILEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBRUY7O0FBRUYsYUFBS1oscUJBQWM4QixXQUFuQjtBQUNFLGNBQUksT0FBT2YsS0FBUCxLQUFpQixRQUFyQixFQUNFLE1BQU0sSUFBSUgsS0FBSixDQUFVLDhCQUFWLENBQU47QUFFRjs7QUFFRjtBQUNFO0FBekJKO0FBMkJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXBsb2FkVG9BcndlYXZlLCB1cGxvYWRNZXRhZGF0YSB9IGZyb20gJy4vdXRpbHMvc3RvcmFnZSdcbmltcG9ydCB7IEJBU0VfQVJXRUFWRV9VUkkgfSBmcm9tICcuL2NvbnN0YW50cydcbmltcG9ydCB7IE1ldGFkYXRhRmllbGQgfSBmcm9tICcuL3R5cGVzJ1xuXG5jb25zdCB2YWxpZEZpbGVGb3JtYXQ6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSA9IHtcbiAgW01ldGFkYXRhRmllbGQuSW1hZ2VdOiBbJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZiddLFxuICBbTWV0YWRhdGFGaWVsZC5BbmltYXRpb25fdXJsXTogW1xuICAgICdhdWRpby9vZ2cnLFxuICAgICd2aWRlby93ZWJtJyxcbiAgICAndmlkZW8vbXA0JyxcbiAgICAnYXVkaW8vbXBlZycsXG4gICAgJ2F1ZGlvL21wMycsXG4gIF0sXG59XG5cbmludGVyZmFjZSBNaW50ZXJDb25maWdQcm9wcyB7XG4gIGFwaUtleT86IHN0cmluZ1xufVxuXG4vKipcbiAqIEEgcHJvZ3JhbW1hdGljIG1ldGFkYXRhIGdlbmVyYXRvci5cbiAqL1xuZXhwb3J0IGNsYXNzIE1pbnRlciB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyBsYXRlc3RNaW50czogYW55XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIHB1YmxpYyBjdXJyZW50TWludDogYW55XG5cbiAgcHVibGljIGFwaUtleTogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IobWludGVyQ29uZmlnOiBNaW50ZXJDb25maWdQcm9wcykge1xuICAgIHRoaXMubGF0ZXN0TWludHMgPSB7fVxuICAgIHRoaXMuY3VycmVudE1pbnQgPSB7fVxuXG4gICAgdGhpcy5hcGlLZXkgPSBtaW50ZXJDb25maWcuYXBpS2V5IHx8ICdhbm9ueW1vdXMnXG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkcyB0aGUgY3VycmVudCBtZXRhZGF0YSBvYmplY3QgYW5kIHJldHVybnMgaXRzIGNvbnRlbnQgaWRlbnRpZmllci5cbiAgICovXG4gIHB1YmxpYyBhc3luYyBnZXRNZXRhZGF0YUlkKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jdXJyZW50TWludCAmJlxuICAgICAgT2JqZWN0LmtleXModGhpcy5jdXJyZW50TWludCkubGVuZ3RoID09PSAwICYmXG4gICAgICB0aGlzLmN1cnJlbnRNaW50LmNvbnN0cnVjdG9yID09PSBPYmplY3RcbiAgICApXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGFkYXRhIGlzIGVtcHR5LicpXG5cbiAgICBjb25zdCBpZCA9IGF3YWl0IHVwbG9hZE1ldGFkYXRhKHRoaXMuY3VycmVudE1pbnQsIHRoaXMuYXBpS2V5KVxuXG4gICAgdGhpcy5sYXRlc3RNaW50cyA9IHsgLi4udGhpcy5sYXRlc3RNaW50cywgW2lkXTogdGhpcy5jdXJyZW50TWludCB9XG4gICAgdGhpcy5jdXJyZW50TWludCA9IHt9XG5cbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBmaWVsZCBpbiBtZXRhZGF0YS5cbiAgICogQHBhcmFtIGtleSBUaGUgZmllbGQga2V5LlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIGZpZWxkIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIHNldEZpZWxkKGtleTogTWV0YWRhdGFGaWVsZCwgdmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICAvLyB0aGlzLmZpZWxkQ2hlY2tzKGtleSwgdmFsdWUpXG4gICAgdGhpcy5jdXJyZW50TWludFtrZXldID0gdmFsdWVcbiAgfVxuXG4gIHB1YmxpYyBzZXRNZXRhZGF0YShtZXRhZGF0YTogYW55LCBvdmVycmlkZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAob3ZlcnJpZGUpIHtcbiAgICAgIHRoaXMuY3VycmVudE1pbnQgPSB7XG4gICAgICAgIC4uLnRoaXMuY3VycmVudE1pbnQsXG4gICAgICAgIC4uLm1ldGFkYXRhLFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNaW50ID0ge1xuICAgICAgICAuLi5tZXRhZGF0YSxcbiAgICAgICAgLi4udGhpcy5jdXJyZW50TWludCxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkcyBmaWxlIGFuZCBzZXRzIGl0cyBjb3JyZXNwb25kaW5nIFVSSSB0byBhIGZpZWxkLlxuICAgKiBAcGFyYW0gZmllbGQgVGhlIG1ldGFkYXRhIGZpZWxkLlxuICAgKiBAcGFyYW0gZmlsZSBUaGUgZmlsZSB0byB1cGxvYWQuXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgdXBsb2FkKGZpZWxkOiBzdHJpbmcsIGZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBUT0RPOiBhbGxvd2VkRmlsZXNcbiAgICBpZiAoIXZhbGlkRmlsZUZvcm1hdFtmaWVsZF0uaW5jbHVkZXMoZmlsZS50eXBlKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmlsZSB0eXBlIG5vdCBhY2NlcHRlZC4nKVxuXG4gICAgLy8gVE9ETzogdmFsaWRhdGVGaWxlXG5cbiAgICAvLyBUT0RPOiBjaGVjayBmaWxlIHNpemUgbGltaXRzXG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGxvYWRUb0Fyd2VhdmUoZmlsZSwgdGhpcy5hcGlLZXkpXG5cbiAgICB0aGlzLmN1cnJlbnRNaW50W2ZpZWxkXSA9IGAke0JBU0VfQVJXRUFWRV9VUkl9LyR7cmVzdWx0Py5pZH1gXG4gIH1cblxuICAvLyBUT0RPOiBpbXBsZW1lbnQgYWxsIGNoZWNrc1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwcml2YXRlIGZpZWxkQ2hlY2tzKGtleTogTWV0YWRhdGFGaWVsZCwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlIE1ldGFkYXRhRmllbGQuWW91dHViZV91cmw6XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWUgaXMgbm90IG9mIHR5cGUgc3RyaW5nLicpXG5cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNhc2UtZGVjbGFyYXRpb25zXG4gICAgICAgIGNvbnN0IHVybFJlZ2V4ID0gLyhodHRwcz86XFwvXFwvKD86d3d3XFwufCg/IXd3dykpW2EtekEtWjAtOV1bYS16QS1aMC05LV0rW2EtekEtWjAtOV1cXC5bXlxcc117Mix9fHd3d1xcLlthLXpBLVowLTldW2EtekEtWjAtOS1dK1thLXpBLVowLTldXFwuW15cXHNdezIsfXxodHRwcz86XFwvXFwvKD86d3d3XFwufCg/IXd3dykpW2EtekEtWjAtOV0rXFwuW15cXHNdezIsfXx3d3dcXC5bYS16QS1aMC05XStcXC5bXlxcc117Mix9KS9naVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY2FzZS1kZWNsYXJhdGlvbnNcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHVybFJlZ2V4KVxuXG4gICAgICAgIGlmICghdmFsdWUubWF0Y2gocmVnZXgpKSB0aHJvdyBuZXcgRXJyb3IoJ1VSTCBpcyBub3Qgd2VsbCBmb3JtYXR0ZWQuJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgTWV0YWRhdGFGaWVsZC5OYW1lOlxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIGlzIG5vdCBvZiB0eXBlIHN0cmluZy4nKVxuXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgTWV0YWRhdGFGaWVsZC5EZXNjcmlwdGlvbjpcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBpcyBub3Qgb2YgdHlwZSBzdHJpbmcuJylcblxuICAgICAgICBicmVha1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxufVxuIl19