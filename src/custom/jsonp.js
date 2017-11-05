(function (angular) {
    var app = angular.module("jsonp", []);
    var id = 1;
    app.factory("jsonp", ["$window", function ($window) {
        return function (opts) {
            var url = opts.url + "?";
            for (var key in opts.params) {
                url += (key + "=" + opts.params[key] + "&");
            };
            var callbackName = "jsonp_" + (id++);
            $window[callbackName] = opts.callback;
            url += "callback=" + callbackName;
            var script = document.createElement("script");
            script.src = url;
            $window.document.body.appendChild(script);
        }
    }]);
    app.directive("hmTag", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                element.on("click", function () {
                    element.parent().children().removeClass("active");
                    element.addClass("active");
                })
            }
        }
    })
}(angular))
