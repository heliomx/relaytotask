// Service for Font picker modal. This module is implemented as a service so it can be easily used
// everywhere in the application

(function()
{
    angular
        .module('ui-services')
        .filter('startFrom', startFromFilter)
        .service('fontpickerService', ['$mdDialog', fontpickerService]);

    function startFromFilter() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    }
    
    function fontpickerService($mdDialog) 
    {
        this.show = function(ev) 
        {
            return $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: './services/fontpicker/fontpicker.template.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                }
            );
        }
    }

    function DialogController($scope, $mdDialog, googlefontsService, $q) 
    {
        $scope.googleFonts = null;
        $scope.browseGoogleFonts = false;
        $scope.fontSize = 30;

        $scope.systemFonts = [
            {
                name: 'Sans serif',
                family: 'sans-serif',
                selected: false
            },
            {
                name: 'Serif',
                family: 'serif',
                selected: false
            },
            {
                name: 'Fantasy',
                family: 'fantasy',
                selected: false
            },
            {
                name: 'Cursive',
                family: 'cursive',
                selected: false
            },
            {
                name: 'Monospace',
                family: 'monospace',
                selected: false
            }
        ];

        $scope.search = new SearchController($scope, $q);
        
        $scope.selectSystemFont = function (font)
        {
            if ($scope.selectedFont) $scope.selectedFont.selected = false;
            font.selected = true;
            $scope.selectedFont = font;
        }

        $scope.selectGoogleFont = function(font)
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
            $mdDialog.hide();
        };
    
        $scope.cancel = function()
        {
            $mdDialog.cancel();
        };
    
        $scope.update = function()
        {
            var newFont = new Font($scope.selectedFont, $scope.fontSize);
            $mdDialog.hide(Object.assign({}, newFont));
        };

        $scope.$on('$destroy', function() {
            $scope.selectedFont.selected = false;
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

    function Font(font, size){
        
        this.name = font.name == null ? font.family : font.name;
        this.family = font.family;
        this.size = size + 'px';
    }

    function SearchController($scope, $q)
    {
        var self = this;
        self.selectedItem = null;
        self.text = '';
        self.filtered = null;
        self.currentPage = 0;
        self.pageSize = 12
        self.totalPages = 0;

        self.previousPage = function()
        {
            self.currentPage--;
        }

        self.nextPage = function()
        {
            self.currentPage++;
        }

        self.isLastPage = function()
        {
            return self.currentPage >= self.totalPages -1;
        }

        self.querySearch = function(text) {
            self.currentPage = 0;
            var items = $scope.googleFonts.items.filter( function (item) {
                return item.family.toLowerCase().indexOf(text.toLowerCase()) == 0;
            });
            self.filtered = items;
            self.totalPages = Math.ceil( self.filtered.length / self.pageSize);
            return items;
        }

    }
}());
