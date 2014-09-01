angular.module('jsonFunc', [])
  .directive('jsonFuncBuilder', function() {
    return {
      restrict: 'E',
      templateUrl: 'func_template.html',
      scope: {
        valid_functions: '=validFunctions',
        column: '=',
        extras: '=',
      },
      link: function($scope) {
        function json_from_hash(func) {
          if(func && func.args) {
            var arg_values = _.map(func.args, function(arg) {
              if(arg.value) {
                return arg.value;
              } else if(arg.keys) {
                return _.object(_.compact(arg.keys), arg.values);
              } else {
                return ['list'].concat(_.compact(arg.values));
              }
            })
            var json = [func.name].concat(arg_values);
            return JSON.stringify(json);
          }
        };
        $scope.valid_functions = angular.copy($scope.valid_functions);

        if($scope.column.persisted_func) {
          var arr = JSON.parse($scope.column.persisted_func);
          $scope.selected_func = _.findWhere($scope.valid_functions, {name: arr[0]});

          _.each(_.rest(arr, 1), function(arg, i) {
            if(arg[0] === 'list') {
              $scope.selected_func.args[i].values = _.rest(arg, 1);
            } else if(typeof arg === 'object') {
              $scope.selected_func.args[i].keys = _.keys(arg);
              $scope.selected_func.args[i].values = _.values(arg);
            } else {
              $scope.selected_func.args[i].value = arg;
            }
          });
        }

        $scope.$watch('selected_func', function() {
          $scope.column.selected_func = json_from_hash($scope.selected_func);
          if($scope.extras && $scope.extras.onchange) {
            $scope.extras.onchange(column);
          }
        }, true);
      },
    };
  })