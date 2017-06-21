(function(){
  var app = angular.module('movieStore',['store-directives']);


  var getMovieName = function(movieTitle){
    return movieTitle.substring(0,movieTitle.indexOf('('));
  }

  app.controller('movieCtrl', ['$http',function($http) {
    var x = this;
    $http.get('http://localhost:8000/movies/getMovies').then(function(response){
      x.movies = response.data;
    });

    this.orderByDate = function(movie){
      return new Date(movie.release_date);
    };

  }]);

  app.controller('genreCtrl',['$http', function($http){
    var x = this;

    $http.get('http://localhost:8000/movies/genre/action').then(function(response){
      x.genreSorted = response.data;
    });

  }]);

})();
