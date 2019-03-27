angular
  .module('components')
  .directive('main', mainComponent);

  function mainComponent()
  {
    var directive = {
      restrict: 'E',
      templateUrl: './components/main/main.template.html',
      controller: controller
    }

    return directive;

    function controller($scope, $element, fontpickerService)
    {
      $scope.text = 'If music be the food of love, play on.';

      $scope.textFont = {
          name: 'Sans serif',
          family: 'sans-serif',
          size: '30px'
      };

      $scope.status = 'start';
      $scope.pickFont = function(ev)
      {
        fontpickerService.show(ev, $scope.textFont)
        .then(
          function(result) 
          {
              $scope.textFont = result;
          }
        );
      }
    }
  }