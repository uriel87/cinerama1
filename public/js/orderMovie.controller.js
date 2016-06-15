


var app = angular.module('orderMovie', []);


app.controller('orderCtl', ['$scope', '$http',function($scope, $http) {


    var data = {
        name: "Central Intelligence"
    };

    $http.post("https://cinerama.herokuapp.com/getMovieDetails/", data).success(function(movie, status) {
        $scope.movies = movie;
        console.log($scope.movies);
    })


    $http.post("https://cinerama.herokuapp.com/getMovie/", data).success(function(movieDetails, status) {
        $scope.movieDetails = movieDetails;
        console.log($scope.movieDetails);
    })


    $http.post("https://cinerama.herokuapp.com/getMovieTrailer/", data).success(function(movieTrailer, status) {
        $scope.movieTrailer = movieTrailer;
        console.log($scope.movieTrailer);
    })


    $http.post("https://cinerama.herokuapp.com/getMovieReview/", data).success(function(review, status) {
        $scope.review = review;
        console.log($scope.review);
    })


}]);






