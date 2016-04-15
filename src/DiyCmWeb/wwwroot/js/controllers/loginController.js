// controller for the home page
//app.controller('homeController', function ($scope, $http) {
//    $scope.message = 'Everyone come and look!';
//});

app.controller('loginController', ['$scope', '$http', '$location', 'accountService', function ($scope, $http, $location, accountService) {

  $scope.savedSuccessfully = false;
  $scope.message = "";

  $scope.user = {
      username: "",
      password: ""
  }

  $scope.login = function() {
    $scope.dataLoading = true;
    console.log("Checking Credentials");

    var username = $scope.user.username;
    var password = $scope.user.password;

    // accountService.login(username, password)
    //   .then(onAddComplete, onAddError);

    if (accountService.login(username, password)) {
      $scope.dataLoading = false;
      $location.path('/home');
    } else {
      $scope.dataLoading = false;
      $scope.savedSuccessfully = false;
      $scope.message = "Uh oh! Please enter valid credentials.";
      console.log("FALSE");
    }
  };

}]);
