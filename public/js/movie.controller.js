


var app = angular.module('index', []);


app.controller('moviesCtl', ['$scope', '$http',function($scope, $http) {


	$http.post("http://localhost:3000/getAllMovies/").success(function (data) {
		$scope.movies = data;
		console.log(data);
	}).error(function () {
		return "error was happened"
	});

}]);






