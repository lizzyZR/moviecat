(function (angular) {
    var app = angular.module("moviecat_details", ["ngRoute", "jsonp"]);
    app.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("");
    }]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/details/:id", {
            templateUrl: "./details/details.html",
            controller: "detailsCtroller"
        })
    }]);
    app.controller("detailsCtroller", ["$scope", "$routeParams", "jsonp", function ($scope, $routeParams, jsonp) {
        jsonp({
            url: "http://api.douban.com/v2/movie/subject/" + $routeParams.id,
            params: {},
            callback: function (data) {
                $scope.isShow = false;
                console.log(data);
                $scope.movie = data;
                $scope.$apply();
            }
        })
    }])
}(angular))
