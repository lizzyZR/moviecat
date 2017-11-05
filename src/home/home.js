(function (angular) {
    var app = angular.module("moviecat_home", ["ngRoute"]);
    app.config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix("");
    }]);
    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/home_page", {
            templateUrl: "./home/home.html"
        }).when("/", {
            redirectTo: "/home_page"
        });
    }])
}(angular))