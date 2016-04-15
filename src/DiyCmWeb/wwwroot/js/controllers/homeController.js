// controller for the home page
//app.controller('homeController', function ($scope, $http) {
//    $scope.message = 'Everyone come and look!';
//});

app.controller('homeController', ['$scope', '$http', '$location', 'QuotesService', 'ReportsService', function ($scope, $http, $location, QuotesService, ReportsService) {

    $scope.message = 'Everyone come and look!';

    var onGetAllBudgetActual = function (data) {
        $scope.tableProjects = data;
        console.log(data);
    };
    var onGetAllCategories = function (data) {
        $scope.tableCategories = data;
        console.log($scope.tableCategories);
    };
    var onGetAllSubCategories = function (data) {
        $scope.tableSubCategories = data;
        console.log("SubCategories:");
        console.log($scope.tableSubCategories);
    };
    var onGetAllActivities = function (data) {
        $scope.tableActivities = data;
        console.log($scope.tableActivities);
    };
    var onGetAllError = function (reason) {
        console.log(reason);
    };

    var onGetSupplierHeaders = function (data) {
        $scope.allSupplierHeaders = data;
        console.log(data);
    };

    var getProjectsOverBudget = function(data){
        //filter projects over their budget

        $scope.overBudgetProjects = data;
        console.log(data);
    };
    var getAllQuotes = function(quotelist){
        $scope.tableQuotes = quotelist;
        console.log("QUOTES:");
        console.log(quotelist);
    };

    var getQuotesDetails = function(quotedetails){
        $scope.tableQuotesDetails = quotedetails;
        console.log("QUOTES Details:");
        console.log(quotedetails);
    };

    ReportsService.getAllProjectsBudgetActual()
        .then(onGetAllBudgetActual, onGetAllError);
    ReportsService.getCategoryDetailsAndSummary()
       .then(onGetAllCategories, onGetAllError);
    ReportsService.getSubCategoryDetailsAndSummary()
        .then(onGetAllSubCategories, onGetAllError);
    ReportsService.getActivities()
        .then(onGetAllActivities, onGetAllError);
    ReportsService.getAllProjectsBudgetActual()
        .then(getProjectsOverBudget, onGetAllError);
    QuotesService.getAllQuoteHeaders()
        .then(getAllQuotes, onGetAllError);
    QuotesService.getAllQuoteDetails()
        .then(getQuotesDetails, onGetAllError);

    if ($location.path() != "/login" || $location.path() == null) {
        ReportsService.getAllProjectsBudgetActual()
            .then(onGetAllBudgetActual, onGetAllError);
        ReportsService.getCategoryDetailsAndSummary()
           .then(onGetAllCategories, onGetAllError);
        ReportsService.getSubCategoryDetailsAndSummary()
            .then(onGetAllSubCategories, onGetAllError);
        ReportsService.getActivities()
            .then(onGetAllActivities, onGetAllError);
        ReportsService.getAllProjectsBudgetActual()
            .then(getProjectsOverBudget, onGetAllError);
        QuotesService.getAllQuoteHeaders()
            .then(getAllQuotes, onGetAllError);
        QuotesService.getAllSupplierHeaders()
            .then(onGetSupplierHeaders, onGetAllError);
    }

}]);
