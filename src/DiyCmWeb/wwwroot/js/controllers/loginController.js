// controller for the home page
//app.controller('homeController', function ($scope, $http) {
//    $scope.message = 'Everyone come and look!';
//});

app.controller('loginController', ['$scope', '$http', 'accountService', function ($scope, $http, accountService) {

  $scope.savedSuccessfully = false;
  $scope.message = "";

  $scope.user = {
      username: "",
      password: ""
  }

  var onAddComplete = function (data) {
    $scope.dataLoading = false;
    $location.path('/home');
    console.log(data);
  };

  var onAddError = function (response) {
    $scope.dataLoading = false;
    $scope.savedSuccessfully = false;
    $scope.message = "Uh oh! We were unable to log you in.";

    console.log(response);
    console.log(response.statusText + ', error code: ' + response.status);
  };

  $scope.login = function() {
    $scope.dataLoading = true;
    console.log("Checking Credentials");

    var username = $scope.user.username;
    var password = $scope.user.password;
    accountService.login(username, password)
      .then(onAddComplete, onAddError);
  };

}]);
