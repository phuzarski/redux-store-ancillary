'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spinner = require('../reducers/spinner');

var _notification = require('../reducers/notification');

var decorateThunkRequest = function (_ref) {
  var onCall = _ref.onCall,
      onSuccess = _ref.onSuccess,
      onError = _ref.onError;
  return function (params) {
    var call = void 0,
        success = void 0,
        spinner = void 0;
    if (params) {
      call = params.call;
      success = params.success;
      spinner = params.spinner;
    }

    return function (dispatch, getState) {
      dispatch((0, _spinner.showSpinner)(spinner));
      onCall({ dispatch: dispatch, getState: getState, call: call }).then(function () {
        for (var _len = arguments.length, response = Array(_len), _key = 0; _key < _len; _key++) {
          response[_key] = arguments[_key];
        }

        dispatch((0, _spinner.hideSpinner)(spinner));
        onSuccess({ dispatch: dispatch, getState: getState, response: response, success: success });
      }).catch(function (error) {
        dispatch((0, _spinner.hideSpinner)(spinner));
        if (onError) onError({ dispatch: dispatch, getState: getState, call: call, error: error });else dispatch((0, _notification.showError)(error));
      });
    };
  };
};

exports.default = decorateThunkRequest;