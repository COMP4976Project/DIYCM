// AccountService.js

(function () {

    var accountService = function ($http, $window, localStorageService, $q) {

        var baseUrl = 'http://diycm-api.azurewebsites.net/api/';
        var _authentication = {
            token: "",
            isAuth: false,
            username: ""
        };

        var _login = function (username, password) {
            $.support.cors = true;
            var data = "grant_type=password&username=" + username + "&password=" + password;

            if (username != "" && password != "") {
                localStorageService.set('authorizationData', { username: username });
                _authentication.isAuth = true;
                _authentication.username = username;
                return true;
            } else {
                return false;
            }

            // return $http.post(baseUrl + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            //     .then(function (response) {

            //         localStorageService.set('authorizationData', { token: "Bearer " + response.data.access_token, username: username });

            //         _authentication.isAuth = true;
            //         _authentication.username = username;
            //         _authentication.token = response.access_token;
            //         return response.data;
            //     });
        };

        var _logout = function () {
            localStorageService.remove('authorizationData');
            _authentication.isAuth = false;
            _authentication.userName = "";
        };

        var _fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.username = authData.username;
                _authentication.token = authData.token;
            }
        }

        return {
            login: _login,
            logout: _logout,
            fillAuthData: _fillAuthData,
            authentication: _authentication
        };
    };

    var module = angular.module("diycm");
    module.factory("accountService", ['$http', '$q', 'localStorageService', accountService]);

}());