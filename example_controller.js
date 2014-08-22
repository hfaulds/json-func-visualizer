angular.module('exampleApp', ['jsonFunc'])
  .controller('ExampleController', ['$scope', function($scope) {
    $scope.valid_functions = valid_functions;
    $scope.raw_data_columns = raw_data_columns;
    $scope.target_columns = target_columns;
  }]);
