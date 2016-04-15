app.controller('invoicesController', ['$scope', '$http', 'InvoicesService', function ($scope, $http, InvoicesService) {

    $scope.message = 'Everyone come and look!';

    var onError = function (reason) {
        console.log(reason);
    };
    var onSuccess = function (data){
      window.location.reload();
      console.log(data);
    };


    $scope.deleteInvoiceHeader = function (id) {
      var InvoiceHeaderId = id;
      console.log(InvoiceHeaderId);
      InvoicesService.deleteInvoiceHeader(InvoiceHeaderId)
        .then(onSuccess, onError);
    };
    $scope.deleteInvoiceDetails = function (id) {
      var InvoiceDetailsId = id;
      console.log(InvoiceDetailsId);
      InvoicesService.deleteInvoiceDetail(InvoiceDetailsId)
        .then(onSuccess, onError);
    };

}]);
