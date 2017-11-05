(function (angular) {
    var app = angular.module("moviecat_in_theaters", ["ngRoute", "jsonp"]);
    app.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("");
    }]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/in_theaters/:page?", {
            templateUrl: "./in_theaters/in_theaters.html",
            controller: "in_theatersController"
        });
    }]);
    app.controller("in_theatersController", ["$scope", "jsonp", "$routeParams", "$window", "$route", function ($scope, jsonp, $routeParams, $window, $route) {
        $scope.pageNum = 10;
        $scope.pageIndex = +($routeParams.page || "1");
        jsonp({
            url: "http://api.douban.com/v2/movie/in_theaters",
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