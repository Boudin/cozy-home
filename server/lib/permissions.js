// Generated by CoffeeScript 1.6.2
(function() {
  var fs, request, url;

  fs = require('fs');

  url = require('url');

  request = require('request-json');

  exports.PermissionsManager = (function() {
    function PermissionsManager() {
      this.docTypes = {};
    }

    PermissionsManager.prototype.get = function(app, callback) {
      var client, path,
        _this = this;

      path = app.git.substring(19, app.git.length - 4);
      client = request.newClient("https://raw.github.com/");
      if (app.branch != null) {
        path = path + '/' + app.branch;
      } else {
        path = path + '/master';
      }
      return client.get(path + '/package.json', function(err, res, body) {
        if (err) {
          console.log(err);
          return callback(null, {});
        } else {
          if (res.statusCode !== 404) {
            if (body["cozy-permissions"] != null) {
              _this.docTypes = body["cozy-permissions"];
            }
            return callback(null, _this.docTypes);
          } else {
            return callback(null, {});
          }
        }
      });
    };

    return PermissionsManager;

  })();

}).call(this);
