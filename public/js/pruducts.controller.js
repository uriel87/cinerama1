


var app = angular.module('payment', []);


app.controller('paymentCtl', ['$scope', '$http',function($scope, $http) {


	$http.post("https://cinerama.herokuapp.com/getAllProduct/").success(function (data) {
		$scope.products = data;
		console.log(data);
	}).error(function () {
		return "error was happened or the result is empty";
	});

}]);






