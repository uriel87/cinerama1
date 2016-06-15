


var app = angular.module('orderMovie', []);


app.controller('orderCtl', ['$scope', '$http',function($scope, $http) {


    var data = {
        name: "Central Intelligence"
    };

    $http.post("http://localhost:3000/getMovieDetails/", data).success(function(movie, status) {
        $scope.movies = movie;
        console.log($scope.movies);
    })


    $http.post("http://localhost:3000/getMovie/", data).success(function(movieDetails, status) {
        $scope.movieDetails = movieDetails;
        console.log($scope.movieDetails);
    })


    $http.post("http://localhost:3000/getMovieTrailer/", data).success(function(movieTrailer, status) {
        $scope.movieTrailer = movieTrailer;
        console.log($scope.movieTrailer);
    })


    $http.post("http://localhost:3000/getMovieReview/", data).success(function(review, status) {
        $scope.review = review;
        console.log($scope.review);
    })


}]);






