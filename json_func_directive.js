angular.module('jsonFunc', [])
  .directive('jsonFuncBuilder', function() {
    return {
      restrict: 'E',
      templateUrl: 'func_template.html',
      scope: {
        raw_data_columns: '=rawDataColumns',
        valid_functions: '=validFunctions',
        column: '=',
      },
      link: function($scope) {
        var json_from_hash = function(func) {
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
            if(typeof arg === 'object') {
              $scope.selected_func.args[i].keys = _.keys(arg);
              $scope.selected_func.args[i].values = _.values(arg);
            } else if(arg[0] === 'list') {
              $scope.selected_func.args[i].values = arg;
            } else {
              $scope.selected_func.args[i].value = arg;
            }
          });

        }

        $scope.$watch('selected_func', function() {
          $scope.column.selected_func = json_from_hash($scope.selected_func);
        }, true);

        $scope.remove_blanks = function(values) {
          return _.compact(values).concat(['']);
        };

        $scope.remove_blanks_from_hash = function(arg) {
          var new_values = [];
          _.each(arg.keys, function(key, index) {
            if(_.identity(key)) {
              new_values.push(arg.values[index] || "");
            }
          });
          arg.keys = _.compact(arg.keys).concat(['']);
          arg.values = new_values;
        };
      },
    };
  })
