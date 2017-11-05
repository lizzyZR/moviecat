(function (angular) {
    var app = angular.module("moviecat", ["moviecat_home",
        "moviecat_in_theaters",
        "moviecat_details",
        "moviecat_coming_soon",
        "moviecat_top250"]);
    app.controller("searchCtrl",["$scope","$window",function ($scope,$window){
       $scope.search = function (){
           $window.location.hash = "#/search?q="+$scope.keywords;
       }
    }])

})(angular);