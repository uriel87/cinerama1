


var app = angular.module('index', []);


app.controller('moviesCtl', ['$scope', '$http',function($scope, $http) {


	$http.post("https://cinerama.herokuapp.com/getAllMovies/").success(function (data) {
		$scope.movies = data;
		console.log(data);
	}).error(function () {
		return "error was happened or the result is empty";
	});

}]);






