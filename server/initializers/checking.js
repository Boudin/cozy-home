// Generated by CoffeeScript 1.6.3
var Application, Manifest, fakePermission, updatePermissions,
  _this = this;

Application = require('../models/application');

Manifest = require('../lib/manifest').Manifest;

fakePermission = '[object Object]';

updatePermissions = function(app) {
  var manifest;
  manifest = new Manifest();
  return manifest.download(app, function(err) {
    if (err) {
      console.log(err);
    }
    return manifest.getPermissions(function(docTypes) {
      return app.updateAttributes({
        permissions: docTypes
      }, function(err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  });
};

module.exports = function() {
  var _this = this;
  return Application.all(function(err, apps) {
    var app, _i, _len, _ref, _results;
    _results = [];
    for (_i = 0, _len = apps.length; _i < _len; _i++) {
      app = apps[_i];
      if (((_ref = app.permissions) != null ? _ref.toString() : void 0) === fakePermission.toString()) {
        _results.push(updatePermissions(app));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  });
};
