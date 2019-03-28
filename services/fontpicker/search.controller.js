function SearchController($scope)
{
    var vm = this;
    vm.selectedItem = null;
    vm.text = '';
    vm.filtered = null;
    vm.currentPage = 0;
    vm.pageSize = 12
    vm.totalPages = 0;

    vm.previousPage = function()
    {
        vm.currentPage--;
    }

    vm.nextPage = function()
    {
        vm.currentPage++;
    }

    vm.isLastPage = function()
    {
        return vm.currentPage >= vm.totalPages -1;
    }

    vm.querySearch = function(text) {
        vm.currentPage = 0;
        var items = $scope.googleFonts.items.filter( function (item) {
            return item.family.toLowerCase().indexOf(text.toLowerCase()) == 0;
        });
        vm.filtered = items;
        vm.totalPages = Math.ceil( vm.filtered.length / vm.pageSize);
        return items;
    }
}