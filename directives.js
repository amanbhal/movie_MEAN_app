var app = angular.module('store-directives', []);

app.directive("navBar", function(){
  return {
    restrict: "E",
    templateUrl: "navigation.html"
  };
});

app.directive("latestMovies", function(){
  return {
    restrict: "E",
    templateUrl: "latest-movies.html"
  };
});

app.directive("displayMovie", function(){
  return {
    restrict: "E",
    templateUrl: "display-movie.html"
  };
});

app.directive("facets", function(){
  return {
    restrict: "E",
    templateUrl: "facets.html"
  };
});

app.directive("bestRated", function(){
  return {
    restrict: "E",
    templateUrl: "best-rated.html"
  };
});
