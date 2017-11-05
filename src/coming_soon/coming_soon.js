(function (angular) {
    var app = angular.module("moviecat_coming_soon", ["ngRoute", "jsonp"]);
    app.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("");
    }]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/coming_soon/:page?", {
            templateUrl: "./coming_soon/coming_soon.html",
            controller: "coming_soonController"
        });
    }]);
    app.controller("coming_soonController", ["$scope", "jsonp", "$routeParams", "$window", "$route", function ($scope, jsonp, $routeParams, $window, $route) {
        $scope.pageNum = 10;
        $scope.pageIndex = +($routeParams.page || "1");
        jsonp({
            url: "http://api.douban.com/v2/movie/coming_soon",
            params: {
                count: $scope.pageNum,
                start: ($scope.pageIndex - 1) * $scope.pageNum
            },
            callback: function (data) {
                $scope.isShow = false;
                console.log(data);
                $scope.movie = data;
                $scope.pageCount = $window.Math.ceil($scope.movie.total / $scope.pageNum);
                $scope.$apply();
            }
        });

        $scope.getPage = function (pageIndex) {
            if (pageIndex < 1 || pageIndex > $scope.pageCount) {
                return;
            }
            $route.updateParams({
                page: pageIndex
            })
        };

    }])
}(angular))