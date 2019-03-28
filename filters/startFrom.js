// Filter to offset an array for ng-repeat rendering

(function(){
  
  angular
    .module('app.uiServices')
    .filter('startFrom', startFromFilter);

  function startFromFilter() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
  }
}())