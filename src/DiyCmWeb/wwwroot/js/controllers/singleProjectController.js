app.controller('singleProjectController', ['$scope', '$http', '$routeParams', 'ProjectsService', 'QuotesService', function ($scope, $http, $routeParams, ProjectsService, QuotesService) {
    $scope.message = 'Everyone come and look!';

    var ProjectId = $routeParams["id"];
    var baseUrl = 'http://diycm-api.azurewebsites.net/api/';

    var onGetProject = function(data) {
        $scope.ActualFinishDate    = (data.ActualFinishDate + "").substring(0, 15);
        $scope.ActualStartDate     = (data.ActualStartDate + "").substring(0, 15);
        $scope.ProjectedStartDate  = (data.ProjectedStartDate + "").substring(0, 15);
        $scope.ProjectedFinishDate = (data.ProjectedFinishDate + "").substring(0, 15);
        $scope.project = data;
        //console.log(data);
    };

    var onGetProjectInfo = function (data) {
        console.log(data);
        $scope.Categories     = data[0];
        $scope.SubCategories  = data[1];
        $scope.QuoteDetails   = data[2];
        $scope.Areas          = data[3];
        $scope.InvoiceDetails = data[4];
    };



    var onGetProjectError = function(reason) {
        //console.error(reason);
    };

    ProjectsService.getProject(ProjectId)
        .then(onGetProject, onGetProjectError);
    ProjectsService.getProjectInfo(ProjectId)
        .then(onGetProjectInfo, onGetProjectError);


}]);
