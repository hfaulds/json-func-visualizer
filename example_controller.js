angular.module('exampleApp', ['jsonFunc'])
  .controller('ExampleController', ['$scope', function($scope) {
    $scope.valid_functions = [{"name":"acres_to_sq_feet","description":"Looks up a field, reads the value as acres and converts to sqft","args":[{"name":"lookup_field","description":"A raw data field in acres","template":"lookup.html"}]},{"name":"address","description":"Look up an address based on a list of parts","args":[{"name":"list_lookup_address_parts","description":"A list of raw field address parts in order","template":"list_lookup.html"}]},{"name":"publicly_viewable","description":"Takes a raw field for status and a list of publicly viewable statuses","args":[{"name":"lookup_status","description":"Raw field for status of property","template":"lookup.html"},{"name":"list_str_statuses","description":"A list of statuses that are publicly viewable","template":"list_str.html"}]},{"name":"show_address","description":"Takes a raw field for whether to show the address and a mapping of the possible raw values to either 'Y' or 'G'","args":[{"name":"lookup_field","description":"Raw field for whether to show the address","template":"lookup.html"},{"name":"hash_show_address","description":"A mapping of possible raw values to 'Y' or 'G'","template":"hash.html"}]},{"name":"fetch_or_notify","description":"Takes a raw field for status, a mappings of raw statuses to our statuses and a default value to return if raw gives us a value not in the mapping","args":[{"name":"lookup_status","description":"Raw field for status of property","template":"lookup.html"},{"name":"hash_statuses","description":"A mapping of raw statuses to our statuses","template":"hash.html"},{"name":"str_default","description":"The default status if we cant find the rest statuses in the mapping","template":"str.html"}]}];
    $scope.extras = {
      raw_data_columns: ["A","B","C","D"],
      remove_blanks: function(values) {
        return _.compact(values).concat(['']);
      },
      remove_blanks_from_hash: function(arg) {
        var new_values = [];
        _.each(arg.keys, function(key, index) {
          if(_.identity(key)) {
            new_values.push(arg.values[index] || "");
          }
        });
        arg.keys = _.compact(arg.keys).concat(['']);
        arg.values = new_values;
      }
    }
    $scope.target_columns = [{"name":1,"persisted_func":"[\"acres_to_sq_feet\", \"B\"]"},{"name":2,"persisted_func":"[\"fetch_or_notify\", \"B\", {\"FOO\": \"A\"}, \"A\"]"},{"name":3},{"name":4},{"name":5},{"name":6}];
  }]);
