
DialogController.$inject = ['$scope', '$mdDialog', 'googlefontsService', 'systemFonts'];
function DialogController($scope, $mdDialog, googlefontsService, systemFonts) 
{
    console.log('aqui', systemFonts);
    $scope.googleFonts = null;
    $scope.browseGoogleFonts = false;
    $scope.fontSize = 30;

    $scope.systemFonts = systemFonts;

    // extending functionality by composition
    // ./search.controller.js
    $scope.search = new SearchController($scope);

    $scope.selectFont = function(font)
    {
        if ($scope.selectedFont) $scope.selectedFont.selected = false;
        font.selected = true;
        $scope.selectedFont = font;
    }

    $scope.loadFont = function(font)
    {
        googlefontsService.load(font);
    }

    $scope.filterGoogleFonts = function()
    {
        if ($scope.search.filtered){
            r = $scope.search.filtered;
        } else {
            r = $scope.search.querySearch('');
        }
        return r;
    }

    $scope.hide = function()
    {
        $mdDialog.cancel();
    };

    $scope.cancel = function()
    {
        $mdDialog.cancel();
    };

    $scope.update = function()
    {
        var newFont = new DialogController.Font($scope.selectedFont, $scope.fontSize);
        $mdDialog.hide(Object.assign({}, newFont));
    };

    $scope.$on('$destroy', function() {
        if ($scope.selectedFont) $scope.selectedFont.selected = false;
        $scope.selectedFont = null;
    });

    function init()
    {
        if (!$scope.googleFonts)
        {
            googlefontsService.list().then(
                function(r)
                {
                    $scope.googleFonts = r;
                }
            )
        }
    }

    init();
}

DialogController.Font = function (font, size){
  this.name = font['name'] == null ? font.family : font.name;
  this.family = font.family;
  this.size = size + 'px';
}